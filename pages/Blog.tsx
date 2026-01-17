
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const BlogList: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-6">EuroTools <span className="text-indigo-600">Blog</span></h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">Insights into productivity, web performance, and privacy-first engineering.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {BLOG_POSTS.map(post => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="group">
            <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all h-full flex flex-col">
              <div className="h-56 bg-indigo-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-indigo-900 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="text-white font-black text-4xl opacity-20 select-none uppercase tracking-[0.2em]">{post.category}</div>
                </div>
              </div>
              <div className="p-8 flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{post.category}</span>
                  <span className="text-[10px] font-bold text-gray-400">{post.date}</span>
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">{post.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
              </div>
              <div className="p-8 pt-0 mt-auto flex items-center justify-between border-t border-gray-50 pt-6">
                <span className="text-xs font-bold text-gray-400">{post.readTime} read</span>
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Read More &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <AdPlaceholder className="mt-20 h-32" />
    </div>
  );
};

export const BlogPostView: React.FC = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);
  const [subscribed, setSubscribed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (post) {
      document.title = `${post.title} | EuroTools Blog`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', post.excerpt);
    }
  }, [post]);

  if (!post) return <div className="text-center py-20 font-black text-2xl">Post not found.</div>;

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("https://formspree.io/f/xojjjbob", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) setSubscribed(true);
    } catch (err) {
      alert("Subscription failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-16">
      <nav className="mb-8 text-sm font-bold text-gray-400">
        <Link to="/blog" className="hover:text-indigo-600">Blog</Link> / <span className="text-gray-900">{post.title}</span>
      </nav>
      
      <header className="mb-12">
        <div className="mb-6">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
            {post.category}
          </span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-8 leading-tight">{post.title}</h1>
        <div className="flex items-center space-x-6 text-sm text-gray-500 font-bold border-y border-gray-100 py-6">
           <div className="flex items-center">
             <div className="w-8 h-8 bg-indigo-600 text-white rounded-full mr-3 flex items-center justify-center text-[10px]">E</div>
             <span>EuroTools Editor</span>
           </div>
           <div className="h-4 w-px bg-gray-200"></div>
           <span>{post.date}</span>
           <div className="h-4 w-px bg-gray-200"></div>
           <span>{post.readTime} reading time</span>
        </div>
      </header>

      <div className="prose prose-indigo prose-xl max-w-none text-gray-700 leading-relaxed mb-16">
        <div className="lead text-2xl text-gray-500 font-medium mb-12 italic border-l-4 border-indigo-100 pl-8">
          {post.excerpt}
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden mb-16">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px]"></div>
        <div className="relative z-10 max-w-lg">
           <h3 className="text-2xl font-black mb-4">Want more productivity tips?</h3>
           <p className="text-slate-400 mb-8">Join 50,000+ professionals who get our privacy-first tool updates directly in their inbox. No spam, ever.</p>
           {subscribed ? (
              <div className="text-indigo-400 font-black flex items-center bg-white/5 p-4 rounded-2xl animate-fade-in border border-white/10">
                 <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                 Success! Check your inbox.
              </div>
            ) : (
              <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubscribe}>
                <input 
                  name="email" 
                  type="email" 
                  className="flex-grow p-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-slate-500" 
                  placeholder="your@email.com" 
                  required 
                />
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 disabled:bg-slate-700"
                >
                  {loading ? 'Joining...' : 'Subscribe'}
                </button>
              </form>
            )}
        </div>
      </div>

      <AdPlaceholder className="mb-16 h-64" />
      
      <div className="flex justify-between items-center border-t border-gray-100 pt-12">
         <Link to="/blog" className="text-xs font-black uppercase tracking-widest text-indigo-600 hover:underline flex items-center">
           <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
           Back to Blog
         </Link>
         <div className="flex space-x-4">
           {/* Simple Social Share Placeholder Icons */}
           <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-indigo-600 hover:text-white transition-all">
             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
           </div>
           <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-indigo-600 hover:text-white transition-all">
             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.989v-10.1c0-7.852-8.661-7.611-11.02-3.321v-2.579z"/></svg>
           </div>
         </div>
      </div>
    </article>
  );
};
