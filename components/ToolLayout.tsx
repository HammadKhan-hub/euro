
import React from 'react';
import { SEOContent } from '../types';
import { AdPlaceholder } from './AdPlaceholder';

interface ToolLayoutProps {
  content: SEOContent;
  children: React.ReactNode;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({ content, children }) => {
  React.useEffect(() => {
    document.title = `${content.title} | EuroTools`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', content.description);
  }, [content]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-12 overflow-x-hidden">
      <nav className="mb-6 sm:mb-8 text-[11px] sm:text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
        <ol className="flex list-none p-0">
          <li className="flex items-center">
            <a href="/#/" className="hover:text-indigo-600">Home</a>
            <span className="mx-2 text-gray-300">/</span>
          </li>
          <li className="text-gray-800 font-medium truncate">{content.h1}</li>
        </ol>
      </nav>

      <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight leading-tight">
        {content.h1}
      </h1>
      <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl leading-relaxed">
        {content.description}
      </p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8 sm:mb-12">
        {children}
      </div>

      <AdPlaceholder className="mb-8 sm:mb-12 h-32 sm:h-64" />

      <section className="prose prose-indigo prose-sm sm:prose-lg max-w-none text-gray-700">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">About {content.h1}</h2>
        <div dangerouslySetInnerHTML={{ __html: content.mainContent }} className="mb-8 sm:mb-12 leading-relaxed" />
        
        <div className="bg-indigo-50 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-bold text-indigo-900 mb-4 mt-0">How to use it?</h2>
          <ol className="space-y-4">
            {content.howTo.map((step, idx) => (
              <li key={idx} className="flex gap-3 sm:gap-4">
                <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm">
                  {idx + 1}
                </span>
                <span className="text-indigo-800 text-sm sm:text-base">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {content.faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-gray-200 pb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-sm sm:text-base text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
