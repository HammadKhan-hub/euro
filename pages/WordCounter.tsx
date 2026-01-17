
import React, { useState, useMemo } from 'react';
import { ToolLayout } from '../components/ToolLayout';
import { SEOContent } from '../types';
import { Tooltip } from '../components/Tooltip';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');

  const analysis = useMemo(() => {
    const trimmed = text.trim();
    const wordsArr = trimmed ? trimmed.toLowerCase().split(/\W+/).filter(w => w.length > 2) : [];
    const wordsCount = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const sentences = trimmed ? trimmed.split(/[.!?]+/).filter(Boolean).length : 0;
    
    // Keyword Density
    const freq: Record<string, number> = {};
    wordsArr.forEach(w => freq[w] = (freq[w] || 0) + 1);
    const keywords = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Readability (Simple estimate)
    const syllables = wordsArr.reduce((acc, word) => acc + (word.match(/[aeiouy]{1,2}/g)?.length || 1), 0);
    const score = wordsCount > 0 ? 206.835 - 1.015 * (wordsCount / (sentences || 1)) - 84.6 * (syllables / wordsCount) : 0;

    return { 
      words: wordsCount, 
      chars, 
      sentences, 
      readingTime: Math.ceil(wordsCount / 200),
      keywords,
      readability: score.toFixed(1)
    };
  }, [text]);

  const getReadabilityLabel = (score: number) => {
    if (score > 80) return { label: 'Very Easy', color: 'text-green-500', desc: 'Content is easy for an average 5th grader.' };
    if (score > 60) return { label: 'Easy', color: 'text-blue-500', desc: 'Standard conversational English.' };
    if (score > 30) return { label: 'Complex', color: 'text-amber-500', desc: 'Fairly difficult to read; best for college students.' };
    return { label: 'Very Hard', color: 'text-red-500', desc: 'Extremely complex or academic text.' };
  };

  const seoContent: SEOContent = {
    title: 'Advanced Word Counter - Keyword Density & Readability',
    h1: 'Professional Text Analyzer',
    description: 'More than a counter. Get deep insights into keyword frequency, readability scores, and character statistics for perfect SEO content.',
    mainContent: `
      <p>Modern content writing requires more than just meeting a word count target. Our <strong>advanced word counter</strong> helps you optimize for both humans and search engines.</p>
      <h3>SEO Keyword Analysis</h3>
      <p>Identify which words you are using most frequently. This is crucial for avoiding keyword stuffing while ensuring your primary topics are covered.</p>
    `,
    howTo: [
      'Type or paste your content.',
      'Check the real-time counters for length.',
      'Review the Keyword Density section to optimize for SEO.',
      'Check the Readability score to ensure your audience can understand your writing.'
    ],
    faqs: [
      { question: 'What is Flesch Readability?', answer: 'It is a score that indicates how difficult a passage in English is to understand.' }
    ]
  };

  return (
    <ToolLayout content={seoContent}>
      <div className="space-y-8">
        <textarea
          className="w-full h-80 p-6 border border-slate-200 rounded-3xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none resize-none text-slate-800 text-lg leading-relaxed shadow-inner bg-slate-50/30"
          placeholder="Paste your content here for deep analysis..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Tooltip text="Total number of words detected in your text.">
            <StatBox label="Words" value={analysis.words} />
          </Tooltip>
          <Tooltip text="Total characters including spaces and punctuation.">
            <StatBox label="Characters" value={analysis.chars} />
          </Tooltip>
          <Tooltip text="Estimated number of sentences based on punctuation.">
            <StatBox label="Sentences" value={analysis.sentences} />
          </Tooltip>
          <Tooltip text="Average time it takes a human to read this content (200 words/min).">
            <StatBox label="Reading Time" value={`${analysis.readingTime}m`} />
          </Tooltip>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Top Keywords</h4>
              <Tooltip text="The most frequent non-common words found. Useful for SEO keyword checking.">
                <span className="cursor-help text-indigo-400 text-[10px] font-black border border-indigo-400/30 rounded-full px-1.5">i</span>
              </Tooltip>
            </div>
            <div className="space-y-3">
              {analysis.keywords.map(([word, count]) => (
                <div key={word} className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-600">{word}</span>
                  <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{count}x</span>
                </div>
              ))}
              {analysis.keywords.length === 0 && <p className="text-sm text-slate-400 italic">No keywords detected yet...</p>}
            </div>
          </div>

          <div className="bg-indigo-900 p-8 rounded-3xl text-white">
            <div className="flex items-center gap-2 mb-4">
              <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-widest">Readability Index</h4>
              <Tooltip text="Flesch Reading Ease score. Higher = Easier. Target 60+ for web content.">
                <span className="cursor-help text-indigo-400 text-[10px] font-black border border-indigo-400/30 rounded-full px-1.5">i</span>
              </Tooltip>
            </div>
            <div className="flex items-end gap-4 mb-4">
              <span className="text-5xl font-black">{analysis.readability}</span>
              <Tooltip text={getReadabilityLabel(Number(analysis.readability)).desc}>
                <span className={`text-xl font-bold ${getReadabilityLabel(Number(analysis.readability)).color}`}>
                  {getReadabilityLabel(Number(analysis.readability)).label}
                </span>
              </Tooltip>
            </div>
            <p className="text-sm text-indigo-200 leading-relaxed">
              Based on the Flesch-Kincaid formula. Most standard blogs aim for a score between 60 and 70.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

const StatBox: React.FC<{ label: string, value: string | number }> = ({ label, value }) => (
  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center w-full">
    <div className="text-2xl font-black text-slate-900">{value}</div>
    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</div>
  </div>
);

export default WordCounter;
