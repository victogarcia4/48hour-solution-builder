'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Layout, Users, MessageSquare, LogOut, ChevronRight, Download } from 'lucide-react';

const supabase = createClient();
const ADMIN_PASSWORD = 'Zulybeth97@';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'messages'>('leads');
  const [leads, setLeads] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
    } else {
      alert('Incorrect password');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    setLoading(true);
    const { data: leadsData } = await supabase
      .from('funnel_leads')
      .select('*')
      .order('created_at', { ascending: false });
    
    const { data: messagesData } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    setLeads(leadsData || []);
    setMessages(messagesData || []);
    setLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brutal-yellow flex items-center justify-center p-6">
        <div className="brutal-card bg-white p-12 max-w-md w-full shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-4xl font-black uppercase mb-8 text-center">ADMIN ACCESS</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block font-black uppercase text-sm mb-2">PASSWORD</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-4 border-4 border-black text-lg font-bold focus:outline-none focus:bg-brutal-pink transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="brutal-btn bg-black text-white w-full py-4 text-xl">
              ENTER DASHBOARD
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-8 hidden md:block">
        <h2 className="text-2xl font-black uppercase mb-12 tracking-tighter">
          48H STUDIO <br />
          <span className="text-brutal-yellow">ADMIN</span>
        </h2>
        
        <nav className="space-y-4">
          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center gap-3 p-4 font-bold uppercase transition-colors ${activeTab === 'leads' ? 'bg-brutal-yellow text-black' : 'hover:bg-white/10'}`}
          >
            <Users size={20} /> Funnel Leads
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center gap-3 p-4 font-bold uppercase transition-colors ${activeTab === 'messages' ? 'bg-brutal-pink text-black' : 'hover:bg-white/10'}`}
          >
            <MessageSquare size={20} /> Messages
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 p-4 font-bold uppercase hover:text-brutal-pink transition-colors absolute bottom-8"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black uppercase">
            {activeTab === 'leads' ? 'Funnel Submissions' : 'Contact Messages'}
          </h1>
          <div className="flex gap-4">
            <button onClick={fetchData} className="brutal-btn bg-brutal-cyan px-6 py-2 font-bold uppercase text-sm">Refresh</button>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-2xl font-black animate-pulse">LOADING DATA...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === 'leads' ? (
              leads.length === 0 ? (
                <p className="text-xl font-bold opacity-50 uppercase">No funnel leads yet.</p>
              ) : (
                leads.map(lead => (
                  <div key={lead.id} className="brutal-card bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-black uppercase">{lead.name}</h3>
                        <p className="font-bold text-brutal-pink">{lead.email}</p>
                      </div>
                      <span className="bg-black text-white px-3 py-1 font-bold text-xs uppercase">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t-2 border-black/10">
                      <div>
                        <label className="block text-[10px] font-black opacity-40 uppercase">Business</label>
                        <p className="font-bold">{lead.business_name || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black opacity-40 uppercase">Industry</label>
                        <p className="font-bold">{lead.industry || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black opacity-40 uppercase">Plan Recommended</label>
                        <p className="font-bold text-brutal-green underline decoration-2">{lead.recommended_plan}</p>
                      </div>
                    </div>

                    <details className="mt-6">
                      <summary className="cursor-pointer font-black uppercase text-sm hover:text-brutal-cyan transition-colors">
                        View Project Details
                      </summary>
                      <div className="mt-4 p-4 bg-gray-50 border-2 border-black font-mono text-sm overflow-x-auto">
                        <pre>{JSON.stringify(lead.specific_details, null, 2)}</pre>
                      </div>
                    </details>
                  </div>
                ))
              )
            ) : (
              messages.length === 0 ? (
                <p className="text-xl font-bold opacity-50 uppercase">No messages yet.</p>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className="brutal-card bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-black uppercase">{msg.name}</h3>
                        <p className="font-bold text-brutal-cyan">{msg.email}</p>
                      </div>
                      <span className="bg-black text-white px-3 py-1 font-bold text-xs uppercase">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mt-4">
                      <label className="block text-[10px] font-black opacity-40 uppercase">Business</label>
                      <p className="font-bold mb-4">{msg.business_name || 'N/A'}</p>
                      <label className="block text-[10px] font-black opacity-40 uppercase">Message</label>
                      <p className="font-bold text-lg leading-snug whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
}
