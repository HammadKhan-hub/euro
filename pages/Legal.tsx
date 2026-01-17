import React from 'react';

export const Privacy: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 prose prose-indigo">
    <h1>Privacy Policy</h1>
    <p>At EuroTools, we take your privacy seriously. This policy explains how we handle your data.</p>
    <h2>1. Data Processing</h2>
    <p>Most of our tools process data entirely in your browser using JavaScript. Your files (images, PDFs, text) are never uploaded to our servers unless explicitly stated.</p>
    <h2>2. Cookies and Analytics</h2>
    <p>We use minimal cookies for site functionality and basic analytics to understand how visitors use our site. We also use Google AdSense which may use cookies to serve personalized ads.</p>
    <h2>3. Compliance</h2>
    <p>We are fully compliant with privacy regulations including GDPR. Since we do not store personal data or require accounts, we represent a "Privacy by Design" approach.</p>
  </div>
);

export const Terms: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 prose prose-indigo">
    <h1>Terms of Service</h1>
    <p>By using EuroTools, you agree to the following terms:</p>
    <ul>
      <li>The tools are provided "as is" without any warranties.</li>
      <li>You are responsible for the content you process using our tools.</li>
      <li>Commercial use is permitted and encouraged.</li>
      <li>We reserve the right to modify or discontinue tools at any time.</li>
    </ul>
  </div>
);

export const About: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 prose prose-indigo">
    <h1>About EuroTools</h1>
    <p>EuroTools was born out of a frustration with "free" online tools that were slow, required accounts, or flooded the screen with aggressive ads.</p>
    <p>Our mission is to provide high-quality, privacy-focused utility tools for the global market. We believe in a web where simple tasks don't require sacrificing your personal information.</p>
    <div className="bg-indigo-50 p-8 rounded-2xl not-prose border border-indigo-100 mt-12">
        <h3 className="text-indigo-900 font-bold text-xl mb-2">Our Commitments</h3>
        <ul className="space-y-4 text-indigo-800">
            <li className="flex items-center">✅ No Registration Ever</li>
            <li className="flex items-center">✅ No Payment Required</li>
            <li className="flex items-center">✅ No File Storage (Local Processing)</li>
            <li className="flex items-center">✅ High Performance Design</li>
        </ul>
    </div>
  </div>
);

export const Contact: React.FC = () => {
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://formspree.io/f/xojjjbob", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSent(true);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      alert("Error sending message. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-8">Have a suggestion for a new tool or found a bug? We'd love to hear from you.</p>
      
      {sent ? (
        <div className="bg-green-50 p-8 rounded-2xl border border-green-200 text-center animate-fade-in">
          <div className="text-4xl mb-4">✉️</div>
          <h3 className="text-green-800 font-bold text-xl">Message Sent!</h3>
          <p className="text-green-700 mt-2">Thanks for reaching out. We'll get back to you soon.</p>
          <button onClick={() => setSent(false)} className="mt-6 text-sm text-green-600 font-bold underline">Send another message</button>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Your Name</label>
            <input name="name" type="text" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="John Doe" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
            <input name="email" type="email" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="john@example.com" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Message</label>
            <textarea name="message" className="w-full p-3 border border-gray-200 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 outline-none resize-none" placeholder="How can we help you?" required></textarea>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg disabled:bg-indigo-300"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
};