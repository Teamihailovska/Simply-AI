# SimplyAI hotel concierge admin

Open `/admin` on the Vite website. It lists staff requests and transcripts, and lets an approved employee manage FAQs. The dashboard refreshes every 15 seconds.

1. In the SAME Supabase project used by `server/.env`, open SQL Editor and run `sql/admin_setup.sql`.
2. In Authentication → Users, create a user with your own email and password (or use an existing user). If email confirmation is enabled, confirm the email before logging in.
3. Back in SQL Editor, run this command after replacing the example email with the exact address of that user:

```sql
insert into public.admin_users(user_id)
select id from auth.users where email = 'YOUR_EMAIL@example.com'
on conflict (user_id) do nothing;
```

4. From the project's root, run `npm install` and `npm run dev`; open the local URL ending in `/admin`. The backend still runs separately: `cd server`, `npm install`, `node chat.js`.

The browser uses a publishable key; the secret/service key belongs only in `server/.env`. Never publish `.env`. The public `/api/chat` endpoint is a prototype and needs rate limiting and input validation before production use.
