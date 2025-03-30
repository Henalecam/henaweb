'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import Container from './ui/Container';
import { Section, SectionHeader } from './ui/Section';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    whatsapp?: string;
  }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateWhatsApp = (whatsapp: string) => {
    // Brazilian phone number format: (XX) XXXXX-XXXX
    const whatsappRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return whatsappRegex.test(whatsapp);
  };

  const formatWhatsApp = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');
    
    // Format as (XX) XXXXX-XXXX
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 11) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    
    // Limit to 11 digits
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    setValidationErrors({});

    // Validate email
    if (!validateEmail(formData.email)) {
      setValidationErrors(prev => ({
        ...prev,
        email: 'Please enter a valid email address'
      }));
      setStatus('error');
      return;
    }

    // Validate WhatsApp if provided
    if (formData.whatsapp && !validateWhatsApp(formData.whatsapp)) {
      setValidationErrors(prev => ({
        ...prev,
        whatsapp: 'Please enter a valid WhatsApp number in format (XX) XXXXX-XXXX'
      }));
      setStatus('error');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', whatsapp: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage('Error sending message. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Format WhatsApp number as user types
    if (name === 'whatsapp') {
      const formattedValue = formatWhatsApp(value);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear validation errors when user types
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <Section>
      <Container>
        <SectionHeader
          title="Get in Touch"
          description="Have any questions or proposals? Contact us and we'll get back to you as soon as possible."
        />

        <div className="mx-auto max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-secondary-300 bg-white px-3 py-2 text-secondary-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg border ${
                  validationErrors.email ? 'border-red-500' : 'border-secondary-300'
                } bg-white px-3 py-2 text-secondary-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-400`}
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {validationErrors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                WhatsApp
              </label>
              <input
                type="tel"
                name="whatsapp"
                id="whatsapp"
                placeholder="(00) 00000-0000"
                value={formData.whatsapp}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-lg border ${
                  validationErrors.whatsapp ? 'border-red-500' : 'border-secondary-300'
                } bg-white px-3 py-2 text-secondary-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-400`}
              />
              {validationErrors.whatsapp && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {validationErrors.whatsapp}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Subject
              </label>
              <select
                name="subject"
                id="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-secondary-300 bg-white px-3 py-2 text-secondary-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-400"
              >
                <option value="">Select a subject</option>
                <option value="quote">Quote</option>
                <option value="support">Support</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-secondary-300 bg-white px-3 py-2 text-secondary-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-400"
              />
            </div>

            {status === 'success' && (
              <div className="rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/50 dark:text-green-200">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            {status === 'error' && !validationErrors.email && !validationErrors.whatsapp && (
              <div className="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/50 dark:text-red-200">
                {errorMessage}
              </div>
            )}

            <Button
              type="submit"
              disabled={status === 'loading'}
              className="w-full"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </Container>
    </Section>
  );
} 