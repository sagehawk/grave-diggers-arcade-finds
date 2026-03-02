
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Send, Mail, MessageSquare, User, AtSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      toast({
        title: 'Message Sent!',
        description: "Thanks for reaching out. We'll get back to you soon.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-ggrave-red/20 rounded-xl">
                <Mail size={32} className="text-ggrave-red" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 font-pixel">
              Get in Touch
            </h1>
            <p className="text-gray-400">
              Have a question, feedback, or partnership inquiry? We'd love to hear from you.
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block flex items-center gap-1.5">
                  <User size={12} /> Name
                </label>
                <Input
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block flex items-center gap-1.5">
                  <AtSign size={12} /> Email
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1.5 block flex items-center gap-1.5">
                <MessageSquare size={12} /> Subject
              </label>
              <Input
                placeholder="What's this about?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1.5 block flex items-center gap-1.5">
                <Send size={12} /> Message
              </label>
              <Textarea
                placeholder="Tell us more..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="bg-gray-900 border-gray-700 text-white resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-ggrave-red hover:bg-red-700 text-white py-3 font-semibold transition-all"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send size={16} />
                  Send Message
                </span>
              )}
            </Button>
          </form>

          {/* Additional Info */}
          <div className="mt-10 text-center text-sm text-gray-500">
            <p>You can also reach us at <span className="text-ggrave-red">support@gamergrave.com</span></p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
