
// Add React import to fix "Cannot find namespace 'React'" error on line 7
import React from 'react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  category: 'Text' | 'Image' | 'PDF' | 'Generator';
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SEOContent {
  title: string;
  h1: string;
  description: string;
  mainContent: string;
  howTo: string[];
  faqs: FAQ[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
}