
import React, { useState } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { SEOContent } from '../types';

const TextConverter: React.FC = () => {
  const [text, setText] = useState('');

  const converters = {
    upper: () => setText(text.toUpperCase()),
    lower: () => setText(text.toLowerCase()),
    sentence: () => {
      const result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
      setText(result);
    },
    title: () => {
      const result = text.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
      setText(result);
    },
    inverse: () => {
      const result = text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
      setText(result);
    }
  };

  const seoContent: SEOContent = {
    title: 'Free Text Case Converter - Change Text Case Online',
    h1: 'Online Text Case Converter',
    description: 'Easily change your text case between UPPERCASE, lowercase, Sentence case, and Title Case. A fast and free utility for writers and coders.',
    mainContent: `
      <p>Ever accidentally left your Caps Lock on? Or perhaps you need to format a list of names into Title Case? Our <strong>text case converter</strong> is a simple yet powerful tool that saves you from re-typing entire paragraphs.</p>
      <p>Simply paste your text, select the desired transformation, and get your perfectly formatted text instantly. This tool is ideal for content creators, social media managers, and developers who need to quickly normalize text formats.</p>
      <h3>Supported Cases:</h3>
      <ul>
        <li><strong>UPPER CASE:</strong> CONVERTS ALL LETTERS TO CAPITAL.</li>
        <li><strong>lower case:</strong> converts all letters to small letters.</li>
        <li><strong>Sentence Case:</strong> Capitalizes the first letter of every sentence.</li>
        <li><strong>Title Case:</strong> Capitalizes The First Letter Of Every Word.</li>
      </ul>
    `,
    howTo: [
      'Paste your source text into the text area.',
      'Choose one of the transformation buttons (e.g., UPPER CASE).',
      'The text will be updated immediately in the same window.',
      'Copy your newly formatted text to your clipboard.'
    ],
    faqs: [
      {
        question: 'Does this tool work with special characters?',
        answer: 'Yes, it transforms all standard alphabetic characters while leaving numbers and symbols untouched.'
      },
      {
        question: 'Is there a limit to how much text I can convert?',
        answer: 'You can convert massive amounts of text—thousands of words—in less than a millisecond.'
      }
    ]
  };

  return (
    <ToolLayout content={seoContent}>
      <div className="space-y-6">
        <textarea
          className="w-full h-64 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-800"
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <div className="flex flex-wrap gap-2">
          <button onClick={converters.upper} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-bold transition-all">UPPER CASE</button>
          <button onClick={converters.lower} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-bold transition-all">lower case</button>
          <button onClick={converters.sentence} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-bold transition-all">Sentence case</button>
          <button onClick={converters.title} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-bold transition-all">Title Case</button>
          <button onClick={converters.inverse} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-bold transition-all">iNVERSE cASE</button>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
           <button 
            onClick={() => {
              navigator.clipboard.writeText(text);
              alert('Text copied!');
            }}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Copy Result
          </button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TextConverter;
