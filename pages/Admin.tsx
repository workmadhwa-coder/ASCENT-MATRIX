
import React, { useState, useEffect } from 'react';
import { RegistrationData, SponsorshipInquiry } from '../types';
import { QrCode, X, Briefcase, TrendingUp, Users, CheckCircle, CreditCard, Calendar } from '../components/Icons';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'registrations' | 'sponsorships'>('registrations');
  const [isLoading, setIsLoading] = useState(false);
  
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [sponsorships, setSponsorships] = useState<SponsorshipInquiry[]>([]);
  const [selectedReg, setSelectedReg] = useState<RegistrationData | null>(null);
  
  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [checkInFilter, setCheckInFilter] = useState('All');

  useEffect(() => {
    if (isAuthenticated) loadData();
  }, [isAuthenticated, activeTab]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const endpoint = activeTab === 'registrations' ? '/api/admin/registrations' : '/api/admin/sponsorships';
      const res = await fetch(`http://localhost:3000${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (activeTab === 'registrations') {
        setRegistrations(data);
      } else {
        setSponsorships(data);
      }
    } catch (err) {
      console.error("Data load failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.status === 'success') {
        setToken(data.token);
        setIsAuthenticated(true);
      } else {
        alert('Invalid Credentials');
      }
    } catch (err) {
      alert('Auth Server Down');
    }
  };

  const filteredRegs = registrations.filter(r => {
    const matchesSearch = 
      r.fullName.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.organization.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || r.paymentStatus === statusFilter;
    const matchesCheckIn = checkInFilter === 'All' || (checkInFilter === 'Yes' ? r.checkedIn : !r.checkedIn);

    return matchesSearch && matchesStatus && matchesCheckIn;
  });

  const filteredSponsorships = sponsorships.filter(s => {
    const matchesSearch = 
      s.companyName.toLowerCase().includes(search.toLowerCase()) ||
      s.contactName.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    
    return matchesSearch;
  });

  const stats = {
    total: registrations.length,
    paid: registrations.filter(r => r.paymentStatus === 'PAID').length,
    pending: registrations.filter(r => r.paymentStatus === 'PENDING').length,
    revenue: registrations.filter(r => r.paymentStatus === 'PAID').reduce((a, b) => a + b.totalAmount, 0),
    tickets: registrations.filter(r => r.paymentStatus === 'PAID').reduce((a, b) => a + b.ticketCount, 0),
    stalls: registrations.filter(r => r.paymentStatus === 'PAID' && r.stallType !== 'None').length
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 pt-32">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl">
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-8 text-center">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-white outline-none focus:border-purple-500" required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-white outline-none focus:border-purple-500" required />
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-xl">Secure Access</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 pt-32">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {[
          { label: 'Total Reg', val: stats.total, icon: Users, col: 'text-white' },
          { label: 'Paid Pass', val: stats.paid, icon: CheckCircle, col: 'text-green-400' },
          { label: 'Pending', val: stats.pending, icon: Calendar, col: 'text-yellow-500' },
          { label: 'Revenue', val: `₹${stats.revenue.toLocaleString()}`, icon: TrendingUp, col: 'text-purple-400' },
          { label: 'Total Tickets', val: stats.tickets, icon: Briefcase, col: 'text-pink-500' },
          { label: 'Stalls', val: stats.stalls, icon: QrCode, col: 'text-blue-400' },
        ].map((s, i) => (
          <div key={i} className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl">
            <div className="flex justify-between items-start mb-2"><s.icon className={`w-5 h-5 ${s.col}`} /></div>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{s.label}</p>
            <p className={`text-2xl font-black ${s.col} mt-1`}>{s.val}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div className="flex bg-zinc-900 p-1 rounded-2xl border border-zinc-800">
          <button onClick={() => { setActiveTab('registrations'); setSearch(''); }} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${activeTab === 'registrations' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}>Registrations</button>
          <button onClick={() => { setActiveTab('sponsorships'); setSearch(''); }} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${activeTab === 'sponsorships' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}>Sponsorships</button>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <input type="text" placeholder={activeTab === 'registrations' ? "Search Master..." : "Search Company..."} value={search} onChange={e => setSearch(e.target.value)} className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-[10px] text-white outline-none w-48 focus:border-purple-500" />
          {activeTab === 'registrations' && (
            <>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-[10px] font-black text-zinc-400 uppercase">
                <option>All</option><option>PAID</option><option>PENDING</option>
              </select>
              <select value={checkInFilter} onChange={e => setCheckInFilter(e.target.value)} className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-[10px] font-black text-zinc-400 uppercase">
                <option value="All">All Check-ins</option><option value="Yes">Checked In</option><option value="No">Awaiting</option>
              </select>
            </>
          )}
        </div>
      </div>

      <div className="bg-zinc-900 rounded-[2.5rem] border border-zinc-800 overflow-hidden shadow-2xl">
        {isLoading ? (
          <div className="py-20 text-center text-zinc-500 font-black uppercase animate-pulse">Synchronizing Cloud Matrix...</div>
        ) : activeTab === 'registrations' ? (
          <table className="w-full text-left">
            <thead className="bg-zinc-800/50 text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-800">
              <tr>
                <th className="p-6">Ticket ID</th>
                <th className="p-6">Delegate</th>
                <th className="p-6">Organization</th>
                <th className="p-6">Status</th>
                <th className="p-6">Check-in</th>
                <th className="p-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredRegs.map(r => (
                <tr key={r.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-6 text-purple-400 font-mono text-xs">{r.id}</td>
                  <td className="p-6">
                    <div className="text-white font-black uppercase italic text-sm">{r.fullName}</div>
                    <div className="text-[10px] text-zinc-500 font-bold">{r.email}</div>
                  </td>
                  <td className="p-6 text-zinc-400 text-xs font-bold uppercase">{r.organization}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${r.paymentStatus === 'PAID' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-500'}`}>{r.paymentStatus}</span>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${r.checkedIn ? 'bg-purple-500/20 text-purple-400' : 'bg-zinc-800 text-zinc-600'}`}>{r.checkedIn ? 'YES' : 'NO'}</span>
                  </td>
                  <td className="p-6">
                    <button onClick={() => setSelectedReg(r)} className="text-[10px] font-black text-zinc-500 uppercase hover:text-white transition-colors">View Master</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-zinc-800/50 text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-800">
              <tr>
                <th className="p-6">Inquiry ID</th>
                <th className="p-6">Company</th>
                <th className="p-6">Contact</th>
                <th className="p-6">Tier</th>
                <th className="p-6">Budget</th>
                <th className="p-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredSponsorships.map(s => (
                <tr key={s.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-6 text-pink-500 font-mono text-xs">{s.id}</td>
                  <td className="p-6 font-black uppercase italic text-sm text-white">{s.companyName}</td>
                  <td className="p-6">
                    <div className="text-white font-bold text-xs">{s.contactName}</div>
                    <div className="text-[10px] text-zinc-500">{s.email}</div>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${s.tier === 'Platinum' ? 'bg-purple-500/10 text-purple-400' : 'bg-zinc-800 text-zinc-400'}`}>{s.tier}</span>
                  </td>
                  <td className="p-6 text-zinc-400 text-xs font-bold">{s.budget}</td>
                  <td className="p-6 text-zinc-500 text-[10px]">{new Date(s.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedReg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-[3rem] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Master Delegate View</h3>
              <button onClick={() => setSelectedReg(null)} className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-10 overflow-y-auto space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                   <h4 className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-4">Core Identity</h4>
                   <p className="text-white font-black text-xl mb-1">{selectedReg.fullName}</p>
                   <p className="text-zinc-500 text-xs">{selectedReg.phone}</p>
                   <p className="text-zinc-500 text-xs">{selectedReg.email}</p>
                </div>
                <div>
                   <h4 className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-4">Professional Matrix</h4>
                   <p className="text-white font-black text-lg mb-1">{selectedReg.organization}</p>
                   <p className="text-zinc-400 text-xs font-bold uppercase">{selectedReg.designation}</p>
                </div>
                <div className="text-center">
                   <h4 className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-4">Security QR</h4>
                   <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${selectedReg.id}`} className="w-24 h-24 mx-auto bg-white p-2 rounded-xl" alt="QR" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
