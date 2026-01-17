
import React from 'react';
import { Tool, BlogPost } from './types';

const Icons = {
  Image: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
  ),
  FileText: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
  ),
  FileArchive: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 12.5v5"/><path d="M14 12.5v5"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
  ),
  Hash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
  ),
  Case: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18"/><path d="m15 18 6-6-6-6"/><path d="m9 6-6 6 6 6"/></svg>
  ),
  QrCode: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v.01"/></svg>
  ),
  Type: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>
  ),
  Switch: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>
  ),
  Briefcase: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
  ),
  Merge: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 18 4-4 4 4"/><path d="M12 10v4"/><path d="m19 7-7 7-7-7"/></svg>
  )
};

export const TOOLS: Tool[] = [
  {
    id: 'image-pro',
    name: 'Image Pro: Crop & Resize',
    description: 'Trending: The all-in-one image workspace. Crop, resize with presets, and optimize instantly.',
    path: '/image-pro',
    icon: <Icons.Image />,
    category: 'Image'
  },
  {
    id: 'resume-builder',
    name: 'AI Resume Builder (PRO)',
    description: 'Trending: Build ATS-ready resumes with AI writing help and professional layout templates.',
    path: '/resume-builder',
    icon: <Icons.Briefcase />,
    category: 'Generator'
  },
  {
    id: 'pdf-compressor',
    name: 'PDF Compressor',
    description: 'Popular: Reduce PDF size for email attachments without losing quality. Fully local.',
    path: '/pdf-compressor',
    icon: <Icons.FileArchive />,
    category: 'PDF'
  },
  {
    id: 'merge-pdf',
    name: 'Merge PDF Documents',
    description: 'Combine multiple PDF files into one clean document seamlessly in seconds.',
    path: '/merge-pdf',
    icon: <Icons.Merge />,
    category: 'PDF'
  },
  {
    id: 'pdf-to-word',
    name: 'PDF to Word',
    description: 'Extract text and layout from PDF files into editable Microsoft Word documents.',
    path: '/pdf-to-word',
    icon: <Icons.FileText />,
    category: 'PDF'
  },
  {
    id: 'word-counter',
    name: 'Word Counter Pro',
    description: 'Check word count, keyword density, and Flesch readability for better SEO.',
    path: '/word-counter',
    icon: <Icons.Hash />,
    category: 'Text'
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Create custom QR codes for websites and text with one click.',
    path: '/qr-generator',
    icon: <Icons.QrCode />,
    category: 'Generator'
  },
  {
    id: 'text-converter',
    name: 'Text Case Converter',
    description: 'Quickly switch between UPPERCASE, lowercase, Sentence case, and more.',
    path: '/text-converter',
    icon: <Icons.Case />,
    category: 'Text'
  },
  {
    id: 'word-to-pdf',
    name: 'Word to PDF',
    description: 'Convert DOCX documents to standard PDF format with layout preservation.',
    path: '/word-to-pdf',
    icon: <Icons.FileArchive />,
    category: 'PDF'
  },
  {
    id: 'pdf-to-image',
    name: 'PDF to Image',
    description: 'Extract pages from PDF documents as high-quality PNG images.',
    path: '/pdf-to-image',
    icon: <Icons.Switch />,
    category: 'Image'
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text for design prototypes and web layouts.',
    path: '/lorem-ipsum',
    icon: <Icons.Type />,
    category: 'Generator'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Why Browser-Side Tools are the Future of Privacy',
    slug: 'privacy-first-tools',
    excerpt: 'Explore how modern Web APIs allow us to process files locally, keeping your sensitive data off the cloud.',
    content: `
      <h2>The Shift to Client-Side Computing</h2>
      <p>For years, the internet followed a simple model: you upload a file, a server processes it, and you download the result. While convenient, this model introduces significant privacy risks. Your sensitive documents, personal photos, and business spreadsheets are stored on someone else's server, often indefinitely.</p>
      
      <h3>What is Browser-Side Processing?</h3>
      <p>Browser-side processing (or client-side processing) means that the heavy lifting of converting a PDF, compressing an image, or analyzing text happens right inside your web browser. Using technologies like WebAssembly (WASM) and modern JavaScript APIs, EuroTools can perform complex tasks without ever sending your file to our backend.</p>

      <h3>Key Benefits of Local Processing</h3>
      <ul>
        <li><strong>Security:</strong> Since files never leave your device, they cannot be intercepted or leaked from a server database.</li>
        <li><strong>Speed:</strong> You don't have to wait for large files to upload or download. The processing starts instantly.</li>
        <li><strong>Offline Capability:</strong> Many of our tools can function even when you have a spotty internet connection once the page is loaded.</li>
      </ul>

      <p>At EuroTools, we believe that your data belongs to you. By choosing tools that run locally, you're taking a stand for digital sovereignty and privacy.</p>
    `,
    date: 'Oct 24, 2024',
    category: 'Privacy',
    readTime: '4 min'
  },
  {
    id: '2',
    title: 'How to Build an ATS-Friendly Resume in 2025',
    slug: 'ats-resume-tips',
    excerpt: 'ATS systems are evolving. Learn how to structure your resume to ensure it actually gets seen by recruiters.',
    content: `
      <h2>Understanding the ATS (Applicant Tracking System)</h2>
      <p>Most medium to large companies use ATS software to filter through thousands of resumes. If your resume isn't formatted correctly, it might be rejected by the algorithm before a human ever sees it.</p>

      <h3>Formatting for Success</h3>
      <p>Complex layouts, multi-column designs, and heavy graphics can confuse older ATS systems. While modern systems are getting better, the "Safe" approach is still a clean, single-column or simple grid layout.</p>
      
      <h3>Keyword Optimization</h3>
      <p>The ATS looks for specific keywords that match the job description. If you're a "Project Manager," ensure that phrase—and related ones like "Agile Methodology" or "Budget Oversight"—appears naturally in your text.</p>

      <h3>How EuroTools Helps</h3>
      <p>Our <strong>AI Resume Builder</strong> is designed with ATS compatibility in mind. We provide clean PDF exports that preserve text layers, ensuring the system can accurately read your experience and skills. Plus, our AI tool helps you identify the best professional language to use.</p>

      <p>Stop sending resumes into a black hole. Use professional tools to ensure your career gets the attention it deserves.</p>
    `,
    date: 'Oct 22, 2024',
    category: 'Career',
    readTime: '5 min'
  },
  {
    id: '3',
    title: 'Optimizing Images for Web Performance',
    slug: 'image-optimization-guide',
    excerpt: 'Images are often the heaviest part of a website. Learn how to reduce load times with WebP and proper compression.',
    content: `
      <h2>The Weight of the Web</h2>
      <p>Did you know that images typically account for over 60% of a website's total weight? Slow load times lead to higher bounce rates and lower SEO rankings. Optimizing your images is the single most effective thing you can do for web performance.</p>

      <h3>Choosing the Right Format</h3>
      <ul>
        <li><strong>WebP:</strong> The modern standard. It provides superior lossless and lossy compression for images on the web.</li>
        <li><strong>JPEG:</strong> Best for colorful photographs where small file size is a priority.</li>
        <li><strong>PNG:</strong> Essential for images that require transparency.</li>
      </ul>

      <h3>Using Image Pro</h3>
      <p>With our <strong>Image Pro</strong> tool, you can crop to specific social media aspect ratios, resize to exact dimensions, and choose the perfect compression level—all in one workflow. By converting your old JPEGs to WebP, you can often save up to 80% in file size without noticeable quality loss.</p>

      <p>Make your website fly. Optimize every image before you hit upload.</p>
    `,
    date: 'Oct 20, 2024',
    category: 'SEO',
    readTime: '6 min'
  },
  {
    id: '4',
    title: 'Mastering PDF Productivity: Merge, Split, and Compress',
    slug: 'pdf-productivity-hacks',
    excerpt: 'PDFs are the digital paper of the business world. Learn how to handle them like a pro without paid software.',
    content: `
      <h2>Stop Paying for PDF Editors</h2>
      <p>Many people believe they need an expensive subscription to Adobe Acrobat just to merge two files or reduce a file's size. That's simply not true anymore. Browser-based tools have caught up.</p>

      <h3>Efficient Document Management</h3>
      <p>Whether you're merging quarterly reports into one document or compressing a large portfolio to fit into an email attachment, EuroTools provides the utilities you need for free.</p>
      
      <h3>Professional Tips</h3>
      <ol>
        <li><strong>Merge First, Compress Last:</strong> When combining documents, always merge them into one file first, then run that final file through the compressor. This ensures a consistent file size optimization.</li>
        <li><strong>Check for Text Layers:</strong> When converting PDFs to Word, ensure your PDF isn't just a scanned image. If you can select text in the PDF, our tool can extract it perfectly.</li>
      </ol>

      <p>Streamline your office workflow today with our suite of PDF utilities.</p>
    `,
    date: 'Oct 18, 2024',
    category: 'Productivity',
    readTime: '3 min'
  }
];
