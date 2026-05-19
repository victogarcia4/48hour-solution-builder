'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Users, MessageSquare, LogOut, Download, Trash2, Pencil, X, Check } from 'lucide-react';

const ADMIN_PASSWORD = 'Zulybeth97@';

// ─── CSV download ─────────────────────────────────────────────────────────────

function downloadCSV(data: Record<string, unknown>[], filename: string) {
  if (!data.length) return;
  const keys = Object.keys(data[0]);
  const rows = data.map(row =>
    keys.map(k => {
      const val = row[k];
      if (val === null || val === undefined) return '';
      const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
      return `"${str.replace(/"/g, '""')}"`;
    }).join(',')
  );
  const csv = [keys.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Inline edit forms ────────────────────────────────────────────────────────

function EditLead({
  lead,
  onSave,
  onCancel,
}: {
  lead: Record<string, unknown>;
  onSave: (fields: Record<string, unknown>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    name: (lead.name as string) || '',
    email: (lead.email as string) || '',
    business_name: (lead.business_name as string) || '',
    contact_phone: (lead.contact_phone as string) || '',
  });
  const fields: { key: keyof typeof form; label: string }[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'business_name', label: 'Business Name' },
    { key: 'contact_phone', label: 'Phone' },
  ];
  return (
    <div className="mt-4 p-4 bg-brutal-yellow border-4 border-black space-y-3">
      <p className="font-black uppercase text-sm">Editing lead</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-[10px] font-black uppercase mb-1 opacity-60">{label}</label>
            <input
              className="w-full p-2 border-4 border-black font-bold text-sm focus:outline-none focus:bg-white"
              value={form[key]}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-3 pt-1">
        <button
          onClick={() => onSave(form)}
          className="brutal-btn bg-black text-white px-5 py-2 flex items-center gap-2 font-bold uppercase text-xs"
        >
          <Check size={14} /> Save
        </button>
        <button
          onClick={onCancel}
          className="brutal-btn bg-white px-5 py-2 flex items-center gap-2 font-bold uppercase text-xs"
        >
          <X size={14} /> Cancel
        </button>
      </div>
    </div>
  );
}

function EditMessage({
  msg,
  onSave,
  onCancel,
}: {
  msg: Record<string, unknown>;
  onSave: (fields: Record<string, unknown>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    name: (msg.name as string) || '',
    email: (msg.email as string) || '',
    business_name: (msg.business_name as string) || '',
    phone: (msg.phone as string) || '',
    message: (msg.message as string) || '',
  });
  return (
    <div className="mt-4 p-4 bg-brutal-cyan border-4 border-black space-y-3">
      <p className="font-black uppercase text-sm">Editing message</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {(['name', 'email', 'business_name', 'phone'] as const).map(field => (
          <div key={field}>
            <label className="block text-[10px] font-black uppercase mb-1 opacity-60">
              {field.replace('_', ' ')}
            </label>
            <input
              className="w-full p-2 border-4 border-black font-bold text-sm focus:outline-none focus:bg-white"
              value={form[field]}
              onChange={e => setForm({ ...form, [field]: e.target.value })}
            />
          </div>
        ))}
      </div>
      <div>
        <label className="block text-[10px] font-black uppercase mb-1 opacity-60">Message</label>
        <textarea
          rows={3}
          className="w-full p-2 border-4 border-black font-bold text-sm focus:outline-none focus:bg-white resize-none"
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
        />
      </div>
      <div className="flex gap-3 pt-1">
        <button
          onClick={() => onSave(form)}
          className="brutal-btn bg-black text-white px-5 py-2 flex items-center gap-2 font-bold uppercase text-xs"
        >
          <Check size={14} /> Save
        </button>
        <button
          onClick={onCancel}
          className="brutal-btn bg-white px-5 py-2 flex items-center gap-2 font-bold uppercase text-xs"
        >
          <X size={14} /> Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Delete confirm overlay ───────────────────────────────────────────────────

function DeleteConfirm({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="mt-4 p-4 bg-red-50 border-4 border-red-500 flex items-center justify-between gap-4 flex-wrap">
      <p className="font-black uppercase text-sm text-red-700">Delete this record permanently?</p>
      <div className="flex gap-3">
        <button
          onClick={onConfirm}
          className="bg-red-600 text-white border-4 border-black px-5 py-2 font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          Yes, Delete
        </button>
        <button
          onClick={onCancel}
          className="brutal-btn bg-white px-5 py-2 font-black uppercase text-xs"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Action buttons ───────────────────────────────────────────────────────────

function CardActions({
  id,
  editingId,
  deleteConfirmId,
  onEdit,
  onDelete,
  onCancelEdit,
  onCancelDelete,
}: {
  id: string;
  editingId: string | null;
  deleteConfirmId: string | null;
  onEdit: () => void;
  onDelete: () => void;
  onCancelEdit: () => void;
  onCancelDelete: () => void;
}) {
  const isEditing = editingId === id;
  const isDeleting = deleteConfirmId === id;
  return (
    <div className="flex items-center gap-2 shrink-0">
      <button
        onClick={isEditing ? onCancelEdit : onEdit}
        title={isEditing ? 'Cancel edit' : 'Edit'}
        className={`border-4 border-black p-2 font-bold transition-all hover:translate-x-[2px] hover:translate-y-[2px] ${isEditing ? 'bg-brutal-yellow' : 'bg-white hover:bg-brutal-yellow'}`}
      >
        {isEditing ? <X size={16} /> : <Pencil size={16} />}
      </button>
      <button
        onClick={isDeleting ? onCancelDelete : onDelete}
        title={isDeleting ? 'Cancel delete' : 'Delete'}
        className={`border-4 border-black p-2 font-bold transition-all hover:translate-x-[2px] hover:translate-y-[2px] ${isDeleting ? 'bg-red-200' : 'bg-white hover:bg-red-200'}`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdminPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'messages'>('leads');
  const [leads, setLeads] = useState<Record<string, unknown>[]>([]);
  const [messages, setMessages] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

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
    setIsMounted(true);
    if (localStorage.getItem('admin_auth') === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  const fetchData = async () => {
    const supabase = createClient();
    setLoading(true);
    try {
      const [{ data: leadsData }, { data: messagesData }] = await Promise.all([
        supabase.from('funnel_leads').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
      ]);
      setLeads(leadsData || []);
      setMessages(messagesData || []);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLead = async (id: string, fields: Record<string, unknown>) => {
    const supabase = createClient();
    const { data } = await supabase.from('funnel_leads').update(fields).eq('id', id).select().single();
    if (data) setLeads(prev => prev.map(l => l.id === id ? { ...l, ...data } : l));
    setEditingId(null);
  };

  const handleDeleteLead = async (id: string) => {
    const supabase = createClient();
    await supabase.from('funnel_leads').delete().eq('id', id);
    setLeads(prev => prev.filter(l => l.id !== id));
    setDeleteConfirmId(null);
  };

  const handleUpdateMessage = async (id: string, fields: Record<string, unknown>) => {
    const supabase = createClient();
    const { data } = await supabase.from('contact_messages').update(fields).eq('id', id).select().single();
    if (data) setMessages(prev => prev.map(m => m.id === id ? { ...m, ...data } : m));
    setEditingId(null);
  };

  const handleDeleteMessage = async (id: string) => {
    const supabase = createClient();
    await supabase.from('contact_messages').delete().eq('id', id);
    setMessages(prev => prev.filter(m => m.id !== id));
    setDeleteConfirmId(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  if (!isMounted) return null;

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

  const currentData = activeTab === 'leads' ? leads : messages;
  const csvFilename = activeTab === 'leads'
    ? `funnel-leads-${new Date().toISOString().slice(0, 10)}.csv`
    : `contact-messages-${new Date().toISOString().slice(0, 10)}.csv`;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-8 hidden md:flex flex-col">
        <h2 className="text-2xl font-black uppercase mb-12 tracking-tighter">
          48H STUDIO<br />
          <span className="text-brutal-yellow">ADMIN</span>
        </h2>
        <nav className="space-y-4">
          <button
            onClick={() => { setActiveTab('leads'); setEditingId(null); setDeleteConfirmId(null); }}
            className={`w-full flex items-center gap-3 p-4 font-bold uppercase transition-colors ${activeTab === 'leads' ? 'bg-brutal-yellow text-black' : 'hover:bg-white/10'}`}
          >
            <Users size={20} /> Funnel Leads
          </button>
          <button
            onClick={() => { setActiveTab('messages'); setEditingId(null); setDeleteConfirmId(null); }}
            className={`w-full flex items-center gap-3 p-4 font-bold uppercase transition-colors ${activeTab === 'messages' ? 'bg-brutal-pink text-black' : 'hover:bg-white/10'}`}
          >
            <MessageSquare size={20} /> Messages
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 p-4 font-bold uppercase hover:text-brutal-pink transition-colors"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex flex-wrap justify-between items-center gap-4 mb-10">
          <h1 className="text-4xl font-black uppercase">
            {activeTab === 'leads' ? `Funnel Leads (${leads.length})` : `Messages (${messages.length})`}
          </h1>
          <div className="flex gap-3">
            <button
              onClick={fetchData}
              className="brutal-btn bg-brutal-cyan px-6 py-2 font-bold uppercase text-sm"
            >
              Refresh
            </button>
            <button
              onClick={() => downloadCSV(currentData, csvFilename)}
              disabled={currentData.length === 0}
              className="brutal-btn bg-brutal-green px-6 py-2 font-bold uppercase text-sm flex items-center gap-2 disabled:opacity-40"
            >
              <Download size={16} /> Download CSV
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-2xl font-black animate-pulse">LOADING DATA...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* ── LEADS ── */}
            {activeTab === 'leads' && (
              leads.length === 0
                ? <p className="text-xl font-bold opacity-50 uppercase">No funnel leads yet.</p>
                : leads.map(lead => {
                    const id = lead.id as string;
                    return (
                      <div key={id} className="brutal-card bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black">
                        <div className="flex justify-between items-start gap-4">
                          <div className="min-w-0">
                            <h3 className="text-2xl font-black uppercase truncate">{lead.name as string}</h3>
                            <p className="font-bold text-brutal-pink">{lead.email as string}</p>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="bg-black text-white px-3 py-1 font-bold text-xs uppercase hidden sm:block">
                              {new Date(lead.created_at as string).toLocaleDateString()}
                            </span>
                            <CardActions
                              id={id}
                              editingId={editingId}
                              deleteConfirmId={deleteConfirmId}
                              onEdit={() => { setEditingId(id); setDeleteConfirmId(null); }}
                              onDelete={() => { setDeleteConfirmId(id); setEditingId(null); }}
                              onCancelEdit={() => setEditingId(null)}
                              onCancelDelete={() => setDeleteConfirmId(null)}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t-2 border-black/10">
                          <div>
                            <label className="block text-[10px] font-black opacity-40 uppercase">Business</label>
                            <p className="font-bold">{(lead.business_name as string) || 'N/A'}</p>
                          </div>
                          <div>
                            <label className="block text-[10px] font-black opacity-40 uppercase">Plan</label>
                            <p className="font-bold text-brutal-green underline decoration-2">{(lead.recommended_plan as string) || '—'}</p>
                          </div>
                          <div>
                            <label className="block text-[10px] font-black opacity-40 uppercase">Branch</label>
                            <p className="font-bold">{(lead.branch as string) || '—'}</p>
                          </div>
                        </div>

                        {editingId === id && (
                          <EditLead
                            lead={lead}
                            onSave={fields => handleUpdateLead(id, fields)}
                            onCancel={() => setEditingId(null)}
                          />
                        )}
                        {deleteConfirmId === id && (
                          <DeleteConfirm
                            onConfirm={() => handleDeleteLead(id)}
                            onCancel={() => setDeleteConfirmId(null)}
                          />
                        )}

                        <details className="mt-6">
                          <summary className="cursor-pointer font-black uppercase text-sm hover:text-brutal-cyan transition-colors">
                            View All Fields
                          </summary>
                          <div className="mt-4 p-4 bg-gray-50 border-2 border-black font-mono text-xs overflow-x-auto">
                            <pre>{JSON.stringify(lead, null, 2)}</pre>
                          </div>
                        </details>
                      </div>
                    );
                  })
            )}

            {/* ── MESSAGES ── */}
            {activeTab === 'messages' && (
              messages.length === 0
                ? <p className="text-xl font-bold opacity-50 uppercase">No messages yet.</p>
                : messages.map(msg => {
                    const id = msg.id as string;
                    return (
                      <div key={id} className="brutal-card bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black">
                        <div className="flex justify-between items-start gap-4">
                          <div className="min-w-0">
                            <h3 className="text-2xl font-black uppercase truncate">{msg.name as string}</h3>
                            <p className="font-bold text-brutal-cyan">{msg.email as string}</p>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="bg-black text-white px-3 py-1 font-bold text-xs uppercase hidden sm:block">
                              {new Date(msg.created_at as string).toLocaleDateString()}
                            </span>
                            <CardActions
                              id={id}
                              editingId={editingId}
                              deleteConfirmId={deleteConfirmId}
                              onEdit={() => { setEditingId(id); setDeleteConfirmId(null); }}
                              onDelete={() => { setDeleteConfirmId(id); setEditingId(null); }}
                              onCancelEdit={() => setEditingId(null)}
                              onCancelDelete={() => setDeleteConfirmId(null)}
                            />
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-black opacity-40 uppercase">Business</label>
                            <p className="font-bold">{(msg.business_name as string) || 'N/A'}</p>
                          </div>
                          <div>
                            <label className="block text-[10px] font-black opacity-40 uppercase">Source</label>
                            <p className="font-bold">{(msg.source as string) || '—'}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="block text-[10px] font-black opacity-40 uppercase">Message</label>
                          <p className="font-bold text-base leading-snug whitespace-pre-wrap mt-1">
                            {(msg.message as string) || '—'}
                          </p>
                        </div>

                        {editingId === id && (
                          <EditMessage
                            msg={msg}
                            onSave={fields => handleUpdateMessage(id, fields)}
                            onCancel={() => setEditingId(null)}
                          />
                        )}
                        {deleteConfirmId === id && (
                          <DeleteConfirm
                            onConfirm={() => handleDeleteMessage(id)}
                            onCancel={() => setDeleteConfirmId(null)}
                          />
                        )}
                      </div>
                    );
                  })
            )}
          </div>
        )}
      </main>
    </div>
  );
}
