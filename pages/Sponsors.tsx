import React, { useState } from 'react';
import { api } from '../services/api';
import { Loader2, CheckCircle, Globe, Zap, Upload } from 'lucide-react';
import { useToast } from '../App';
import { LiveBackground } from '../components/LiveBackground';

export const Sponsors: React.FC = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    orgName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [logo, setLogo] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (logo) {
        await api.uploads.uploadFile(logo, 'sponsor');
      }
      await api.submissions.submitSponsor({
          ...formData,
          logo: logo || undefined,
          status: 'new'
      });
      setSuccess(true);
      addToast("Inquiry sent successfully", "success");
      window.scrollTo(0,0);
    } catch (err) {
      addToast("Submission failed. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
        <div className="min-h-screen pt-24 px-4 flex items-center justify-center relative overflow-hidden">
          <LiveBackground />
          <div className="glass-panel p-8 sm:p-10 rounded-2xl max-w-lg text-center border-brand-secondary/30 relative overflow-hidden z-10 w-full mx-auto">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-secondary" />
            <CheckCircle className="mx-auto text-brand-secondary mb-6 drop-shadow-[0_0_15px_rgba(112,0,255,0.5)]" size={80} />
            <h2 className="text-2xl sm:text-3xl font-black mb-4">Inquiry Received</h2>
            <p className="text-gray-300 text-sm sm:text-base">
              We have received your message. Our partnerships team will review your proposal and contact you shortly.
            </p>
          </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-20 relative overflow-hidden">
      <LiveBackground />
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start relative z-10">
        {/* Copy Section */}
        <div className="flex flex-col justify-center lg:pt-10 lg:sticky lg:top-24">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 lg:mb-8 leading-none tracking-tight">
                POWER THE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-primary">FUTURE</span>
            </h1>
            <p className="text-lg sm:text-xl text-brand-muted mb-8 lg:mb-10 leading-relaxed max-w-lg">
                AI Impact Media connects forward-thinking brands with the next generation of storytelling. 
                Sponsor our original productions and reach a tech-savvy, engaged audience.
            </p>
            
            <div className="space-y-4 sm:space-y-6">
                <div className="glass-panel p-5 sm:p-6 rounded-xl border-l-4 border-brand-primary flex gap-4 items-start">
                    <div className="p-3 bg-brand-primary/10 rounded-lg text-brand-primary flex-shrink-0">
                        <Globe size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg">Global Reach</h4>
                        <p className="text-sm text-brand-muted mt-1">Content streamed worldwide via our optimized Cloud CDN.</p>
                    </div>
                </div>
                <div className="glass-panel p-5 sm:p-6 rounded-xl border-l-4 border-brand-secondary flex gap-4 items-start">
                    <div className="p-3 bg-brand-secondary/10 rounded-lg text-brand-secondary flex-shrink-0">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-lg">Innovation First</h4>
                        <p className="text-sm text-brand-muted mt-1">Associate your brand with cutting-edge AI creative technology.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Form Section */}
        <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl mt-6 lg:mt-0">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                Partner Inquiry
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Organization Name</label>
                    <input required type="text" className="input-field" 
                        value={formData.orgName} onChange={e => setFormData({...formData,orgName: e.target.value})}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Email</label>
                        <input required type="email" className="input-field" 
                            value={formData.email} onChange={e => setFormData({...formData,email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Phone (Opt)</label>
                        <input type="tel" className="input-field" 
                            value={formData.phone} onChange={e => setFormData({...formData,phone: e.target.value})}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Subject</label>
                    <input required type="text" className="input-field" 
                        value={formData.subject} onChange={e => setFormData({...formData,subject: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Message</label>
                    <textarea required rows={5} className="input-field resize-none" 
                        value={formData.message} onChange={e => setFormData({...formData,message: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">Upload Logo (Vector/PNG)</label>
                    <div className="relative">
                        <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                            onChange={e => setLogo(e.target.files ? e.target.files[0] : null)}
                        />
                         <div className="input-field flex items-center gap-2 text-brand-muted">
                            <Upload size={16} />
                            <span className="truncate">{logo ? logo.name : "Choose file..."}</span>
                        </div>
                    </div>
                </div>
                
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full btn-primary py-4 mt-4 text-lg"
                >
                    {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : 'SEND INQUIRY'}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};