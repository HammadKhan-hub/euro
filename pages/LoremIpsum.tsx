
import React, { useState } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { SEOContent } from '../types';

const LoremIpsum: React.FC = () => {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [generated, setGenerated] = useState('');

  const LOREM_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const generate = () => {
    let result = '';
    if (type === 'paragraphs') {
      result = Array(count).fill(LOREM_TEXT).join('\n\n');
    } else if (type === 'sentences') {
      const sentences = LOREM_TEXT.split('. ');
      result = Array(count).fill(null).map((_, i) => sentences[i % sentences.length]).join('. ') + '.';
    } else {
      const words = LOREM_TEXT.split(' ');
      result = Array(count).fill(null).map((_, i) => words[i % words.length]).join(' ');
    }
    setGenerated(result);
  };

  React.useEffect(generate, []);

  const seoContent: SEOContent = {
    title: 'Free Lorem Ipsum Generator - Placeholder Text Generator',
    h1: 'Lorem Ipsum Generator',
    description: 'Generate high-quality placeholder text for your designs and layouts. Choose between paragraphs, sentences, or words instantly.',
    mainContent: `
      <p>Designers often need filler text to visualize how a layout will look before the actual content is ready. <strong>Lorem Ipsum</strong> has been the industry standard for centuries.</p>
      <p>Our generator provides clean, standard Lorem Ipsum text that you can customize to fit your specific needs. Whether you need a single word for a button label or five paragraphs for a blog template, we've got you covered.</p>
    `,
    howTo: [
      'Select the quantity you need (number of items).',
      'Choose the type: Paragraphs, Sentences, or Words.',
      'Click "Generate" to refresh the text.',
      'Copy the text and paste it into your design tool.'
    ],
    faqs: [
      {
        question: 'Why is Lorem Ipsum used?',
        answer: 'It provides a natural-looking distribution of letters, making it easier to judge typography and layout without being distracted by readable content.'
      }
    ]
  };

  return (
    <ToolLayout content={seoContent}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-2">Quantity</label>
            <input 
              type="number" 
              min="1" 
              max="50" 
              value={count} 
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value as any)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>
          <div className="flex items-end">
            <button 
              onClick={generate}
              className="w-full sm:w-auto px-8 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700"
            >
              Generate
            </button>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 min-h-[200px] whitespace-pre-wrap text-gray-700 leading-relaxed italic">
          {generated}
        </div>

        <div className="flex justify-end">
          <button 
            onClick={() => {
              navigator.clipboard.writeText(generated);
              alert('Copied to clipboard!');
            }}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Copy Text
          </button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default LoremIpsum;
