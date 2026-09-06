import React from 'react';
import { Star, MessageSquareQuote, ShieldCheck } from 'lucide-react';
import '../styles/Testimonials.css';

export default function TestimonialsSection() {
  const reviews = [
    {
      name: "Marcus Vance",
      role: "CTO @ Apex Financial Inc.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote: "CODEXA engineered our mobile wallet in record time. Their React Native and security architecture skills are world-class. Our user base grew by 280% within 90 days of release.",
      stars: 5,
      impact: "+280% User Growth"
    },
    {
      name: "Elena Rostova",
      role: "Head of Product @ Synthetix Labs",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      quote: "The Next.js 14 SaaS dashboard CODEXA built for us is ultra-fast and handles millions of real-time data points seamlessly. Highly recommended for any serious dev project.",
      stars: 5,
      impact: "Sub-100ms Page Load"
    },
    {
      name: "David Chen",
      role: "Founder @ BioMed Analytics",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote: "Our AI document parser cut our manual review times by 90%. CODEXA's team integrated OpenAI and vector search with bulletproof accuracy.",
      stars: 5,
      impact: "90% Time Saved"
    }
  ];

  return (
    <section className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <MessageSquareQuote size={14} />
            <span>Client Testimonials</span>
          </div>
          <h2 className="section-title">
            Trusted By Founders & <br />
            <span className="text-gradient">Engineering Leaders</span>
          </h2>
          <p className="section-subtitle">
            See what founders and enterprise product leaders say about working with CODEXA.
          </p>
        </div>

        <div className="grid-3">
          {reviews.map((rev, idx) => (
            <div key={idx} className="glass-card testimonial-card">
              <div className="testimonial-stars">
                {[...Array(rev.stars)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="testimonial-quote">"{rev.quote}"</p>

              <div className="testimonial-author-row">
                <img src={rev.avatar} alt={rev.name} className="author-avatar" />
                <div className="author-info">
                  <div className="author-name">{rev.name}</div>
                  <div className="author-role">{rev.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
