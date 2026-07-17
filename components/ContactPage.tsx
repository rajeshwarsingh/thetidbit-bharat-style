'use client';
import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Instagram, Clock } from 'lucide-react';
import SEO from './SEO';
import Reveal from './Reveal';
import { CONTACT_INFO, SOCIAL_LINKS, GOOGLE_MAPS_URL } from '../constants';
import { contactUrl, openWhatsApp } from '../utils/whatsapp';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `${name ? `Hi TheTidbit, I'm ${name}.` : 'Hi TheTidbit.'} ${message}`.trim();
    openWhatsApp(contactUrl(text), 'contact_submit', { placement: 'contact-page' });
  };

  const CARDS: { icon: typeof Phone; label: string; value: React.ReactNode; href?: string }[] = [
    { icon: Phone, label: 'Call / WhatsApp', value: CONTACT_INFO.mobile, href: `tel:${CONTACT_INFO.mobile}` },
    { icon: Mail, label: 'Email', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
    {
      icon: MapPin,
      label: 'Registered address',
      href: GOOGLE_MAPS_URL,
      value: (
        <span className="leading-relaxed">
          {CONTACT_INFO.addressLines.map((line) => (
            <span key={line} className="block">{line}</span>
          ))}
          <span className="block text-xs text-brand-green mt-1 font-semibold">Open in Google Maps →</span>
        </span>
      ),
    },
    { icon: Clock, label: 'Support Hours', value: 'Mon–Sat, 10am – 7pm IST' },
  ];

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with TheTidbit for orders, bulk enquiries and support. Reach us on WhatsApp, phone or email — we usually reply within a few hours."
        canonicalUrl="https://thetidbit.in/contact"
      />

      <section className="bg-jute-100 dark:bg-stone-950 py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Reveal>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100">We'd love to hear from you</h1>
            <p className="mt-3 text-stone-600 dark:text-stone-400">Questions, custom orders or feedback — we're one message away.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 bg-white dark:bg-stone-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          {/* Contact details */}
          <Reveal>
            <div className="grid sm:grid-cols-2 gap-4">
              {CARDS.map((c) => {
                const inner = (
                  <div className="h-full rounded-2xl border border-stone-100 dark:border-stone-700 p-6 hover:shadow-md transition-shadow">
                    <div className="w-11 h-11 rounded-full bg-jute-100 dark:bg-stone-800 flex items-center justify-center text-brand-green mb-3">
                      <c.icon size={20} />
                    </div>
                    <div className="text-xs uppercase tracking-wide text-stone-500 dark:text-stone-400">{c.label}</div>
                    <div className="mt-1 font-semibold text-stone-900 dark:text-stone-100 break-words">{c.value}</div>
                  </div>
                );
                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    {...(c.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="block"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={c.label}>{inner}</div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => openWhatsApp(contactUrl('I have a question.'), 'whatsapp_contact_click', { placement: 'contact-page' })}
                className="inline-flex items-center gap-2 bg-brand-green text-white font-bold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </button>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-200 font-bold px-6 py-3 rounded-full hover:border-brand-green transition-colors"
              >
                <Instagram size={18} /> Instagram
              </a>
            </div>
          </Reveal>

          {/* Form (opens WhatsApp) */}
          <Reveal delayMs={100}>
            <form onSubmit={submit} className="rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-700 p-6 sm:p-8">
              <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">Send us a message</h2>
              <label className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-1">Your name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mb-4 px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-brand-green"
                placeholder="e.g. Priya"
              />
              <label className="block text-sm font-medium text-stone-600 dark:text-stone-300 mb-1">Message</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full mb-5 px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-brand-green resize-none"
                placeholder="How can we help?"
              />
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold py-3 rounded-xl hover:bg-brand-green dark:hover:bg-brand-green dark:hover:text-white transition-colors">
                <MessageCircle size={18} /> Send via WhatsApp
              </button>
              <p className="mt-3 text-xs text-stone-500 dark:text-stone-400 text-center">Opens WhatsApp with your message pre-filled.</p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default ContactPage;