
'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        setSubmitStatus('Message sent successfully! We\'ll contact you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          budget: '',
          message: '',
          timeline: ''
        });
      } else {
        setSubmitStatus('Error sending message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('Error sending message. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="py-12 md:py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Contact Information */}
          <div className="space-y-8 md:space-y-12">
            <div>
              <h2 id="get-in-touch" className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 pt-24 md:pt-32">
                <span className="bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">
                  Get In Touch
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Ready to elevate your wealth management strategy? Our team of experts is here to guide you through personalized solutions that align with your financial goals.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6 md:space-y-8">
              {[{
                icon: 'ri-phone-line',
                title: 'Phone Consultation',
                info: '+1 (555) 123-4567',
                description: 'Immediate response within 2 hours'
              }, {
                icon: 'ri-mail-line',
                title: 'Email Support',
                info: 'contact@wealthdesign.com',
                description: 'Detailed responses within 24 hours'
              }, {
                icon: 'ri-map-pin-line',
                title: 'Office Location',
                info: '1250 Financial District, NYC',
                description: 'In-person meetings by appointment'
              }, {
                icon: 'ri-calendar-line',
                title: 'Business Hours',
                info: 'Mon-Fri: 8AM-6PM EST',
                description: 'Emergency support available 24/7'
              }].map((contact, index) => (
                <div key={index} className="group flex items-start space-x-4 p-4 md:p-6 bg-gradient-to-r from-gray-800/50 to-transparent rounded-lg border border-amber-400/10 hover:border-amber-400/30 transition-all duration-300">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <i className={`${contact.icon} text-black text-lg md:text-xl`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-white mb-1">{contact.title}</h3>
                    <p className="text-amber-400 font-medium mb-1 text-sm md:text-base break-words">{contact.info}</p>
                    <p className="text-xs md:text-sm text-gray-400">{contact.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Response Time Guarantee */}
            <div className="p-4 md:p-6 bg-gradient-to-r from-amber-400/10 to-yellow-600/10 rounded-lg border border-amber-400/20">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-amber-400 rounded-full flex-shrink-0">
                  <i className="ri-time-line text-black text-xs md:text-sm" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-amber-400">Response Guarantee</h3>
              </div>
              <p className="text-gray-300 text-sm">
                We guarantee a response within 2 hours during business hours. For urgent matters, our 24/7 emergency line ensures immediate assistance.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-amber-400/20 p-6 md:p-8 mt-24 md:mt-32">
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-400 focus:outline-none transition-colors duration-300 text-sm"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-400 focus:outline-none transition-colors duration-300 text-sm"
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-400 focus:outline-none transition-colors duration-300 text-sm"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-400 focus:outline-none transition-colors duration-300 text-sm"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Service Interest</label>
                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-amber-400 focus:outline-none transition-colors duration-300 text-sm pr-8 appearance-none cursor-pointer"
                    >
                      <option value="">Select a service</option>
                      <option value="portfolio-management">Portfolio Management</option>
                      <option value="financial-planning">Financial Planning</option>
                      <option value="investment-advisory">Investment Advisory</option>
                      <option value="risk-assessment">Risk Assessment</option>
                      <option value="estate-planning">Estate Planning</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <i className="ri-arrow-down-s-line text-gray-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Investment Budget</label>
                  <div className="relative">
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-amber-400 focus:outline-none transition-colors duration-300 text-sm pr-8 appearance-none cursor-pointer"
                    >
                      <option value="">Select budget range</option>
                      <option value="100k-500k">$100K - $500K</option>
                      <option value="500k-1m">$500K - $1M</option>
                      <option value="1m-5m">$1M - $5M</option>
                      <option value="5m-plus">$5M+</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <i className="ri-arrow-down-s-line text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Timeline</label>
                <div className="relative">
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-amber-400 focus:outline-none transition-colors duration-300 text-sm pr-8 appearance-none cursor-pointer"
                  >
                    <option value="">When would you like to start?</option>
                    <option value="immediate">Immediately</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="3-months">Within 3 months</option>
                    <option value="6-months">Within 6 months</option>
                    <option value="planning">Just planning ahead</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <i className="ri-arrow-down-s-line text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  maxLength={500}
                  rows={5}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-400 focus:outline-none transition-colors duration-300 text-sm resize-none"
                  placeholder="Tell us about your financial goals and how we can help you achieve them..."
                />
                <div className="text-xs text-gray-400 mt-1">
                  {formData.message.length}/500 characters
                </div>
              </div>

              {submitStatus && (
                <div className={`p-4 rounded-lg text-sm ${submitStatus.includes('Error') ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'bg-green-500/10 border border-green-500/20 text-green-400'}`}>
                  {submitStatus}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-bold text-base md:text-lg tracking-wider hover:shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <i className="ri-loader-4-line animate-spin" />
                    <span>SENDING MESSAGE...</span>
                  </span>
                ) : (
                  'SEND MESSAGE'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
