'use client';

import React, { useState } from 'react';
import { Card, CardContent, Input, Textarea, Button, Badge } from '@/components/ui';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock submit behavior
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="bg-stone-50 dark:bg-neutral-950 py-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="gold">Get in touch</Badge>
          <h1 className="text-4xl font-serif font-bold text-stone-900 dark:text-white">Contact Teertha Support</h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm">
            Have questions about temple directory records, partnership integrations, or Atreal Studios services? Drop us a line.
          </p>
        </div>

        {/* Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Info Card (Left 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 h-full p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-white pb-3 border-b border-stone-100 dark:border-neutral-800/40">
                  Head Office Info
                </h2>

                <div className="space-y-6 text-sm">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-maroon-800/10 dark:bg-gold-500/10 flex items-center justify-center text-maroon-800 dark:text-gold-400 flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-800 dark:text-stone-200">Address</h4>
                      <p className="text-stone-500 dark:text-stone-400 mt-1">Atreal Studios Private Limited, Tech Park Road, Sector 62, Noida, Uttar Pradesh, 201301</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-maroon-800/10 dark:bg-gold-500/10 flex items-center justify-center text-maroon-800 dark:text-gold-400 flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-800 dark:text-stone-200">Email Address</h4>
                      <p className="text-stone-500 dark:text-stone-400 mt-1">contact@atrealstudios.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-maroon-800/10 dark:bg-gold-500/10 flex items-center justify-center text-maroon-800 dark:text-gold-400 flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-800 dark:text-stone-200">Phone Hotline</h4>
                      <p className="text-stone-500 dark:text-stone-400 mt-1">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-maroon-800/10 dark:bg-gold-500/10 flex items-center justify-center text-maroon-800 dark:text-gold-400 flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-stone-800 dark:text-stone-200">Support Hours</h4>
                      <p className="text-stone-500 dark:text-stone-400 mt-1">Monday - Friday (09:00 AM - 06:00 PM IST)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 text-xs text-stone-400 mt-8 border-t border-stone-100 dark:border-neutral-800/40">
                Atreal Studios is committed to delivering quality digital platforms with high security and scalable database architectures.
              </div>
            </Card>
          </div>

          {/* Form Card (Right 3 columns) */}
          <div className="lg:col-span-3">
            <Card className="border border-stone-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 sm:p-8">
              {isSubmitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-white">Message Sent Successfully!</h3>
                  <p className="text-sm text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                    Thank you for reaching out. A representative from the Atreal Studios support team will contact you shortly.
                  </p>
                  <div className="pt-4">
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Send Another Message
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-white pb-3 border-b border-stone-100 dark:border-neutral-800/40">
                    Send Inquiry Message
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name"
                      id="name"
                      required
                      placeholder="e.g. Amit Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input
                      label="Email Address"
                      id="email"
                      type="email"
                      required
                      placeholder="e.g. amit@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <Input
                    label="Subject Inquiry"
                    id="subject"
                    required
                    placeholder="e.g. Suggestions for Kedarnath details page"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />

                  <Textarea
                    label="Detail Message"
                    id="message"
                    required
                    rows={5}
                    placeholder="Describe your inquiry or suggestions here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />

                  <div className="pt-2">
                    <Button type="submit" variant="primary" disabled={loading} className="w-full sm:w-auto flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
