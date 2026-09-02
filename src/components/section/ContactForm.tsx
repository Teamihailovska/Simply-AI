import React, { useState } from 'react';
import { useLang } from '@/i18n/LanguageContext';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

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

function validate(data: FormState, t: ReturnType<typeof useLang>['t']): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = t.contact.name + ' *';
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = t.contact.email + ' *';
  if (!data.concern.trim()) errors.concern = t.contact.concern + ' *';
  return errors;
}

export default function ContactForm() {
  const { t } = useLang();
  const { contact } = t;

  const [form, setForm] = useState<FormState>({ name: '', email: '', concern: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form, t);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    // Frontend-only: form submission can be connected to backend/email service later
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    toast.success(contact.successTitle, { description: contact.successDesc });
    setForm({ name: '', email: '', concern: '' });
  };

  const fieldClass = (err?: string) =>
    `w-full bg-muted border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/60 transition-colors duration-150 ${
      err ? 'border-destructive' : 'border-border'
    }`;

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 border-t border-border"
      style={{ backgroundColor: 'hsl(218 40% 8%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(220 90% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(220 90% 60%) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left */}
          <div
            className="opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600"
          >
            <p className="section-label mb-4">{contact.sectionLabel}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              {contact.heading}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {contact.sub}
            </p>

            {/* Blueprint dimension annotation */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <div className="text-mono text-muted-foreground/30 text-xs leading-relaxed">
                <p>SIMPLYAI GMBH</p>
                <p>GRAZ, ÖSTERREICH</p>
                <p className="mt-2">kontakt@simplyai.at</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className="opacity-0 intersect:opacity-100 intersect:transition intersect:duration-600 intersect:delay-150"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 text-mono">
                  {contact.name}
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
                  <p className="text-xs text-destructive mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 text-mono">
                  {contact.email}
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
                  <p className="text-xs text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              {/* Concern */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 text-mono">
                  {contact.concern}
                </label>
                <textarea
                  name="concern"
                  rows={5}
                  value={form.concern}
                  onChange={handleChange}
                  placeholder={contact.concernPlaceholder}
                  className={`${fieldClass(errors.concern)} resize-none`}
                />
                {errors.concern && (
                  <p className="text-xs text-destructive mt-1">{errors.concern}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-semibold text-sm hover:bg-accent transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <Send size={15} />
                )}
                {contact.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
