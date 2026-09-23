// ---------------------------------------------------------------------------
// SimplyAI concierge — backend powered by Google Gemini (free tier)
//
// Setup:
//   npm install express cors @google/genai @supabase/supabase-js dotenv
//   node chat.js
//
// Get a free Gemini API key (no credit card needed) at:
//   https://aistudio.google.com/apikey
//
// NOTE (2026 migration): Google deprecated @google/generative-ai in favor of
// the unified @google/genai SDK. New API keys are also issued in the "Auth
// key" format (prefixed "AQ.") instead of the old "Standard key" format
// (prefixed "AIzaSy..."). @google/genai understands both key formats, so no
// extra config is needed here beyond swapping the package.
// ---------------------------------------------------------------------------

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

// Keeps track of which conversation id belongs to which browser session.
// In production, key this by a signed cookie or the widget's own session id.
const sessionConversations = new Map();

app.post("/api/chat", async (req, res) => {
  try {
    const { sessionId, room, guestName, message, language } = req.body;
    if (!message) return res.status(400).json({ error: "message is required" });

    // 1. Find or create the conversation row for this guest session.
    let conversationId = sessionConversations.get(sessionId);
    if (!conversationId) {
      const { data, error } = await supabase
        .from("conversations")
        .insert({ room, guest_name: guestName, language: language || "EN" })
        .select()
        .single();
      if (error) throw error;
      conversationId = data.id;
      sessionConversations.set(sessionId, conversationId);
    }

    // 2. Log the guest's message.
    await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender: "guest",
      content: message,
    });

    // 3. Pull current FAQs so the AI answers with up-to-date hotel info.
    const { data: faqs } = await supabase.from("faqs").select("question, answer");
    const knowledgeBase = (faqs || [])
      .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
      .join("\n\n");

    // 4. Ask Gemini for a reply, and ask it to flag if this needs a human.
    //    We request structured JSON so the server can act on the decision
    //    without any fragile keyword matching.
    const systemInstruction = `You are the AI concierge for a hotel. Answer guest questions using only the knowledge base below. If the request is something only hotel staff can fulfil (room service, spa/other bookings, complaints, maintenance issues, anything needing a person), set "needs_staff" to true and pick the closest "escalation_type" from: "Room service", "Spa booking", "Complaint", "General request".

Knowledge base:
${knowledgeBase}

Respond ONLY with JSON in this exact shape, nothing else:
{"reply": "your reply to the guest", "needs_staff": true or false, "escalation_type": "..." or null}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: message,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });
    const raw = response.text;

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = { reply: raw, needs_staff: false, escalation_type: null };
    }

    // 5. Log the AI's reply.
    await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender: "ai",
      content: parsed.reply,
    });

    // 6. If the AI flagged this as needing staff, create the escalation
    //    and mark the conversation accordingly — this is what makes it
    //    show up in the receptionist panel.
    if (parsed.needs_staff) {
      await supabase.from("escalations").insert({
        conversation_id: conversationId,
        room,
        guest_name: guestName,
        type: parsed.escalation_type || "General request",
        message,
      });
      await supabase
        .from("conversations")
        .update({ outcome: "Escalated" })
        .eq("id", conversationId);
    }

    res.json({ reply: parsed.reply, escalated: !!parsed.needs_staff });
  } catch (err) {
    console.error("chat error:", err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Concierge backend running on http://localhost:${PORT}`));