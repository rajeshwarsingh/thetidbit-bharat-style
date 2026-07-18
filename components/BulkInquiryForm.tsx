'use client';
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { openWhatsApp, bulkQuoteFormUrl } from '../utils/whatsapp';

interface BulkInquiryFormProps {
  /** Analytics placement label */
  placement?: string;
  className?: string;
}

/**
 * B2B lead-capture form — matches Contact page input styles and
 * routes the inquiry to WhatsApp with structured fields pre-filled.
 */
const BulkInquiryForm: React.FC<BulkInquiryFormProps> = ({
  placement = 'bulk-inquiry-form',
  className = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(
      bulkQuoteFormUrl({ name, email, company, quantity, message }),
      'bulk_inquiry_submit',
      { placement, company, quantity }
    );
  };

  const fieldClass =
    'w-full mb-4 px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-green';
  const labelClass = 'block text-sm font-medium text-stone-600 mb-1';

  return (
    <form
      id="bulk-inquiry"
      onSubmit={submit}
      className={`scroll-mt-28 rounded-2xl bg-stone-50 border border-stone-100 p-6 sm:p-8 ${className}`}
      aria-labelledby="bulk-inquiry-heading"
    >
      <h2 id="bulk-inquiry-heading" className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
        Request a Bulk Quote
      </h2>
      <p className="text-stone-600 leading-relaxed mb-6 text-base sm:text-lg">
        Share your requirement and our team will send a custom digital catalog and pricing quote within 24 hours.
      </p>

      <label className={labelClass} htmlFor="bulk-full-name">
        Full Name
      </label>
      <input
        id="bulk-full-name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={fieldClass}
        placeholder="e.g. Kavya Menon"
        autoComplete="name"
      />

      <label className={labelClass} htmlFor="bulk-company-email">
        Company Email
      </label>
      <input
        id="bulk-company-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={fieldClass}
        placeholder="you@company.com"
        autoComplete="email"
      />

      <label className={labelClass} htmlFor="bulk-company-name">
        Company Name
      </label>
      <input
        id="bulk-company-name"
        required
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className={fieldClass}
        placeholder="e.g. Acme Technologies"
        autoComplete="organization"
      />

      <label className={labelClass} htmlFor="bulk-quantity">
        Estimated Quantity
      </label>
      <input
        id="bulk-quantity"
        required
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className={fieldClass}
        placeholder="e.g. 100–250 bags"
        inputMode="text"
      />

      <label className={labelClass} htmlFor="bulk-message">
        Message
      </label>
      <textarea
        id="bulk-message"
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        className={`${fieldClass} mb-5 resize-none`}
        placeholder="Event type, branding needs, colours, deadline…"
      />

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 text-white font-bold py-3.5 rounded-xl hover:bg-brand-green transition-colors"
      >
        <MessageCircle size={18} /> Request a Bulk Quote
      </button>
      <p className="mt-3 text-xs text-stone-500 text-center">
        Opens WhatsApp with your inquiry pre-filled so we can reply faster.
      </p>
    </form>
  );
};

export default BulkInquiryForm;
