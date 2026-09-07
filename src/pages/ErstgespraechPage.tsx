import React, { useState } from 'react';
import { useLang } from '@/i18n/LanguageContext';
import { toast } from 'sonner';
import { Send } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface FormState {
  name: string;
  email: string;
  concern: string;
}

interface Errors {
  name?: string;
  email?: string;
  concern?: string;
}

function validate(
  data: FormState,
  t: ReturnType<typeof useLang>['t']
): Errors {
  const errors: Errors = {};

  if (!data.name.trim()) {
    errors.name = t.contact.name + ' *';
  }

  if (
    !data.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    errors.email = t.contact.email + ' *';
  }

  // Anliegen is optional on the Erstgespräch page

  return errors;
}

export default function ErstgespraechPage() {
  const { t } = useLang();
  const { contact, erstgespraechPage } = t;
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    concern: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));

    setErrors((previous) => ({
      ...previous,
      [e.target.name]: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(form, t);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    // Frontend-only for now.
    // Backend/email connection can be added later.
    await new Promise((resolve) => setTimeout(resolve, 800));

    setSubmitting(false);

    toast.success(contact.successTitle, {
      description: contact.successDesc,
    });

    setForm({
      name: '',
      email: '',
      concern: '',
    });
  };

  const fieldClass = (error?: string) =>
    `w-full bg-muted border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/60 transition-colors duration-150 ${
      error ? 'border-destructive' : 'border-border'
    }`;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar />

      <main className="flex-1 pt-24">
        <section
          id="contact"
          className="relative py-24 md:py-32 border-t border-border overflow-hidden"
          style={{
            backgroundColor: 'hsl(218 40% 8%)',
          }}
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(hsl(220 90% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(220 90% 60%) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">

              {/* LEFT SIDE */}
              <div className="opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600">

               <p className="section-label mb-4">
  {erstgespraechPage.sectionLabel}
</p>

<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
  {erstgespraechPage.heading}{' '}
  <span className="gold-ai">
    {erstgespraechPage.headingHighlight}
  </span>
</h1>

<p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
  {erstgespraechPage.sub}
</p>

                {/* Benefits */}
                <div className="mt-10 space-y-5">

                  <div className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full border border-primary/40 text-primary shrink-0">
                      ✓
                    </span>

                    <span className="text-foreground/90 pt-0.5">
                      Unverbindlich und kostenlos
                    </span>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full border border-primary/40 text-primary shrink-0">
                      ✓
                    </span>

                    <span className="text-foreground/90 pt-0.5">
                      Konkrete Einschätzung für Ihren Anwendungsfall
                    </span>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full border border-primary/40 text-primary shrink-0">
                      ✓
                    </span>

                    <span className="text-foreground/90 pt-0.5">
                      Direkter Draht zum Gründerteam
                    </span>
                  </div>

                </div>

                {/* Company information */}
                <div className="mt-12 pt-8 border-t border-border/50">
                  <div className="text-mono text-muted-foreground/30 text-xs leading-relaxed">
                    <p>SIMPLYAI GMBH</p>
                    <p>GRAZ, ÖSTERREICH</p>
                    <p className="mt-2">kontakt@simplyai.at</p>
                  </div>
                </div>

              </div>

              {/* RIGHT SIDE — FORM */}
              <div className="opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600 intersect:delay-150">

                <div className="border border-border/70 rounded-2xl p-6 md:p-8 bg-background/20 backdrop-blur-sm">

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >

                    {/* NAME */}
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-2 text-mono">
                        {contact.name} *
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={contact.namePlaceholder}
                        className={fieldClass(errors.name)}
                      />

                      {errors.name && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* EMAIL */}
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-2 text-mono">
                        {contact.email} *
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={contact.emailPlaceholder}
                        className={fieldClass(errors.email)}
                      />

                      {errors.email && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* CONCERN */}
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-2 text-mono">
                        Ihre Idee / Ihr Anliegen{' '}
                        <span className="text-muted-foreground/60">
                          (optional)
                        </span>
                      </label>

                      <textarea
                        name="concern"
                        rows={5}
                        value={form.concern}
                        onChange={handleChange}
                        placeholder={contact.concernPlaceholder}
                        className={`${fieldClass(
                          errors.concern
                        )} resize-none`}
                      />

                      {errors.concern && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.concern}
                        </p>
                      )}
                    </div>

                    {/* SUBMIT */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-semibold text-sm rounded-full hover:bg-accent transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <span className="inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      ) : (
                        <Send size={15} />
                      )}

                      Erstgespräch anfragen
                    </button>

                  </form>

                </div>

              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}