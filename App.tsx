
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import WordCounter from './pages/WordCounter';
import ImagePro from './pages/ImageCompressor'; // Renamed logically
import TextConverter from './pages/TextConverter';
import LoremIpsum from './pages/LoremIpsum';
import QRCodeGenerator from './pages/QRCode';
import PDFCompressor from './pages/PDFCompressor';
import PDFToImage from './pages/PDFToImage';
import PDFToWord from './pages/PDFToWord';
import WordToPDF from './pages/WordToPDF';
import MergePDF from './pages/MergePDF';
import ResumeBuilder from './pages/ResumeBuilder';
import { BlogList, BlogPostView } from './pages/Blog';
import { Privacy, Terms, About, Contact } from './pages/Legal';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/image-pro" element={<ImagePro />} />
          <Route path="/pdf-to-image" element={<PDFToImage />} />
          <Route path="/pdf-to-word" element={<PDFToWord />} />
          <Route path="/word-to-pdf" element={<WordToPDF />} />
          <Route path="/merge-pdf" element={<MergePDF />} />
          <Route path="/pdf-compressor" element={<PDFCompressor />} />
          <Route path="/word-counter" element={<WordCounter />} />
          <Route path="/text-converter" element={<TextConverter />} />
          <Route path="/qr-generator" element={<QRCodeGenerator />} />
          <Route path="/lorem-ipsum" element={<LoremIpsum />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPostView />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
