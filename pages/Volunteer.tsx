import React, { useState, useEffect, useRef } from 'react';

// Icon Components
const QrCode = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
  </svg>
);

const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Menu = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

// Types
interface RegistrationData {
  id: string;
  fullName: string;
  email: string;
  organization: string;
  ticketType: string;
  ticketCount: number;
  paymentStatus: string;
  checkedIn: boolean;
}

declare const Html5Qrcode: any;

const Volunteer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [activeTab, setActiveTab] = useState<'scan' | 'list' | 'search'>('scan');
  const [users, setUsers] = useState<RegistrationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scannedAttendee, setScannedAttendee] = useState<RegistrationData | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [search, setSearch] = useState('');
  const [manualSearch, setManualSearch] = useState('');
  const [manualSearchResults, setManualSearchResults] = useState<RegistrationData[]>([]);
  const scannerInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (isLoggedIn) loadData();
    return () => stopScanner();
  }, [isLoggedIn]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/admin/registrations');
      const data = await res.json();
      setUsers(data.filter((u: any) => u.paymentStatus === 'PAID'));
    } catch (err) {
      console.error("Failed to load guest list");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    if (passkey === "VOLUNTEER@2026") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid Access Passkey");
    }
  };

  const stopScanner = async () => {
    if (scannerInstanceRef.current && scannerInstanceRef.current.isScanning) {
      try {
        await scannerInstanceRef.current.stop();
        scannerInstanceRef.current = null;
      } catch (err) {}
    }
    setIsScanning(false);
  };

  const startScanner = async () => {
    setScannedAttendee(null);
    setIsScanning(true);
    setTimeout(async () => {
      const scannerElement = document.getElementById("reader");
      if (!scannerElement) return;
      try {
        const html5QrCode = new Html5Qrcode("reader");
        scannerInstanceRef.current = html5QrCode;
        await html5QrCode.start(
          { facingMode: "environment" }, 
          { fps: 10, qrbox: { width: 250, height: 250 } }, 
          onScanSuccess, 
          () => {}
        );
      } catch (err) {
        alert("Could not start camera. Please ensure you have granted camera permissions.");
        setIsScanning(false);
      }
    }, 300);
  };

  const onScanSuccess = (decodedText: string) => {
    const user = users.find(u => u.id === decodedText);
    if (user) {
      setScannedAttendee(user);
      stopScanner();
    } else {
      alert("Invalid QR Code or Unpaid Delegate");
    }
  };

  const handleCheckIn = async (id: string) => {
    try {
      const res = await fetch('http://localhost:3000/api/volunteer/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId: id })
      });
      const data = await res.json();
      if (data.status === 'success') {
        loadData();
        setScannedAttendee(prev => prev ? {...prev, checkedIn: true} : null);
        // If we are in manual search mode, update that list too
        if (activeTab === 'search') {
            setManualSearchResults(prev => prev.map(u => u.id === id ? {...u, checkedIn: true} : u));
        }
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Check-in Failed");
    }
  };

  const filteredUsers = users.filter(u => 
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.id.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleManualSearch = () => {
    if (!manualSearch.trim()) {
      setManualSearchResults([]);
      return;
    }
    
    const results = users.filter(u => 
      u.fullName.toLowerCase().includes(manualSearch.toLowerCase()) ||
      u.id.toLowerCase().includes(manualSearch.toLowerCase()) ||
      u.organization.toLowerCase().includes(manualSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(manualSearch.toLowerCase())
    );
    
    setManualSearchResults(results);
  };

  const totalGuests = users.length;
  const checkedInCount = users.filter(u => u.checkedIn).length;
  const pendingCount = totalGuests - checkedInCount;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
          <div className="w-16 h-16 bg-purple-600/20 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-8">
             <Menu className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-white mb-8 uppercase italic tracking-tighter text-center">Volunteer Gate</h2>
          <div className="space-y-4">
            <input 
              type="password" 
              placeholder="PASSKEY" 
              value={passkey} 
              onChange={e => setPasskey(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full bg-black border border-zinc-700 p-5 rounded-xl text-white outline-none focus:border-purple-500 text-center tracking-[0.5em] placeholder:tracking-normal" 
              required 
            />
            <button 
              onClick={handleLogin}
              className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
            >
              Connect Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-10 pt-12 md:pt-20">
      <div className="max-w-5xl mx-auto">
        {/* Header with Stats */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
            <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter border-l-4 border-purple-600 pl-4">
              Volunteer Panel
            </h1>
            
            {/* Tab Navigation - Fixed Wrapping */}
            <div className="flex flex-wrap bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 w-full lg:w-auto">
              <button 
                onClick={() => { stopScanner(); setActiveTab('scan'); setManualSearch(''); setManualSearchResults([]); }} 
                className={`flex-1 lg:flex-none px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'scan' ? 'bg-zinc-800 text-white shadow-xl' : 'text-zinc-500 hover:text-white'}`}
              >
                QR Scan
              </button>
              <button 
                onClick={() => { stopScanner(); setActiveTab('search'); setManualSearch(''); setManualSearchResults([]); }} 
                className={`flex-1 lg:flex-none px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'search' ? 'bg-zinc-800 text-white shadow-xl' : 'text-zinc-500 hover:text-white'}`}
              >
                Manual Search
              </button>
              <button 
                onClick={() => { stopScanner(); setActiveTab('list'); }} 
                className={`flex-1 lg:flex-none px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'list' ? 'bg-zinc-800 text-white shadow-xl' : 'text-zinc-500 hover:text-white'}`}
              >
                Guest List
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-600/20 text-purple-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Total Guests</span>
              </div>
              <p className="text-3xl font-black text-white">{totalGuests}</p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl border border-green-500/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-600/20 text-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Checked In</span>
              </div>
              <p className="text-3xl font-black text-green-500">{checkedInCount}</p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl border border-orange-500/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-600/20 text-orange-500 rounded-lg flex items-center justify-center">
                  <QrCode className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Pending</span>
              </div>
              <p className="text-3xl font-black text-orange-500">{pendingCount}</p>
            </div>
          </div>
        </div>

        <hr className="border-zinc-800 mb-8" />

        {/* Tab Content: QR Scan */}
        {activeTab === 'scan' && (
          <div className="max-w-md mx-auto py-4">
              {!isScanning && !scannedAttendee ? (
                <div className="bg-zinc-900 p-8 md:p-12 rounded-[3rem] border border-zinc-800 text-center">
                   <div className="w-24 h-24 bg-purple-600/10 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-purple-500/20">
                      <QrCode className="w-12 h-12" />
                   </div>
                   <h3 className="text-xl font-black text-white uppercase mb-4 italic">Ready for Scanning</h3>
                   <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-10">Scan delegate passes for admission</p>
                   <button 
                     onClick={startScanner} 
                     className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl hover:bg-zinc-200 transition-all"
                   >
                     Launch Camera
                   </button>
                </div>
              ) : isScanning ? (
                <div className="bg-zinc-900 p-4 rounded-[3rem] border border-purple-500/50 overflow-hidden">
                  <div id="reader" className="w-full overflow-hidden rounded-2xl bg-black aspect-square"></div>
                  <button 
                    onClick={stopScanner} 
                    className="w-full mt-6 py-4 bg-zinc-800 text-white rounded-xl font-black uppercase text-[10px] hover:bg-zinc-700 transition-colors"
                  >
                    Cancel Scan
                  </button>
                </div>
              ) : scannedAttendee && (
                <div className="bg-zinc-900 p-8 md:p-10 rounded-[3rem] border-2 border-purple-600 shadow-2xl animate-in fade-in zoom-in duration-300">
                   <button 
                     onClick={() => setScannedAttendee(null)} 
                     className="float-right text-zinc-500 hover:text-white transition-colors"
                   >
                     <X className="w-6 h-6" />
                   </button>
                   <h2 className="text-3xl font-black text-white uppercase italic leading-none mb-2">{scannedAttendee.fullName}</h2>
                   <p className="text-purple-400 font-mono text-xs mb-8">{scannedAttendee.id}</p>
                   
                   <div className="space-y-4 mb-10">
                      <div className="flex justify-between border-b border-white/5 pb-3">
                         <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Organization</span>
                         <span className="text-white font-bold">{scannedAttendee.organization}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-3">
                         <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Ticket</span>
                         <span className="text-white font-bold">{scannedAttendee.ticketType} (x{scannedAttendee.ticketCount})</span>
                      </div>
                   </div>

                   {scannedAttendee.checkedIn ? (
                     <div className="bg-green-500/10 text-green-500 py-5 rounded-2xl border border-green-500/20 text-center font-black uppercase tracking-widest">
                        Admission Verified ✓
                     </div>
                   ) : (
                     <button 
                       onClick={() => handleCheckIn(scannedAttendee.id)} 
                       className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:opacity-90 transition-all"
                     >
                       Confirm Entry
                     </button>
                   )}
                </div>
              )}
          </div>
        )}

        {/* Tab Content: Manual Search */}
        {activeTab === 'search' && (
          <div className="space-y-6 max-w-2xl mx-auto py-4">
             <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter Name, Email or ID..." 
                  value={manualSearch} 
                  onChange={e => setManualSearch(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleManualSearch()}
                  className="flex-1 bg-zinc-900 border border-zinc-800 p-5 rounded-2xl text-white outline-none focus:border-purple-500" 
                />
                <button 
                  onClick={handleManualSearch}
                  className="bg-purple-600 text-white px-8 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-purple-500"
                >
                  Search
                </button>
             </div>

             <div className="space-y-4">
                {manualSearchResults.length > 0 ? (
                    manualSearchResults.map(u => (
                        <div key={u.id} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h4 className="text-white font-black uppercase italic">{u.fullName}</h4>
                                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{u.organization}</p>
                                <p className="text-purple-400 font-mono text-[10px] mt-1">{u.id}</p>
                            </div>
                            {u.checkedIn ? (
                                <span className="text-green-500 font-black text-[10px] uppercase tracking-widest bg-green-500/10 px-4 py-2 rounded-lg">Checked In ✓</span>
                            ) : (
                                <button 
                                    onClick={() => handleCheckIn(u.id)}
                                    className="bg-white text-black px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-zinc-200"
                                >
                                    Check In Now
                                </button>
                            )}
                        </div>
                    ))
                ) : manualSearch && (
                    <p className="text-center text-zinc-500 font-bold uppercase text-xs py-10">No results found for "{manualSearch}"</p>
                )}
             </div>
          </div>
        )}

        {/* Tab Content: Guest List */}
        {activeTab === 'list' && (
          <div className="space-y-6 py-4">
            <div className="relative group">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-purple-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Filter Guest List..." 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                className="w-full bg-zinc-900 border border-zinc-800 p-5 pl-12 rounded-2xl text-white outline-none focus:border-purple-500 placeholder:text-zinc-600" 
              />
            </div>
            
            {isLoading ? (
              <div className="text-center py-20">
                <div className="inline-block w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-zinc-500 mt-4 text-xs font-black uppercase tracking-widest">Syncing Database...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-20 bg-zinc-900/50 rounded-[3rem] border border-zinc-800 border-dashed">
                <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">No matching records</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                 {filteredUsers.map(u => (
                   <div key={u.id} className={`bg-zinc-900/40 p-6 rounded-3xl border transition-all hover:bg-zinc-900/80 ${u.checkedIn ? 'border-green-500/30' : 'border-white/5'}`}>
                     <div className="flex justify-between items-start mb-4">
                        <div className="h-12 w-12 bg-zinc-800 rounded-xl flex items-center justify-center text-purple-400 font-black italic text-xl">
                          {u.fullName.charAt(0)}
                        </div>
                        {u.checkedIn && (
                          <span className="bg-green-500/10 text-green-500 text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            ADMITTED
                          </span>
                        )}
                     </div>
                     <h4 className="text-white font-black uppercase italic text-sm mb-1 truncate">{u.fullName}</h4>
                     <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1 truncate">{u.organization}</p>
                     <p className="text-zinc-600 text-[9px] mb-4 truncate">{u.email}</p>
                     <div className="flex justify-between items-center pt-4 border-t border-white/5">
                        <span className="text-purple-400 font-mono text-[10px]">{u.id}</span>
                        {!u.checkedIn && (
                          <button 
                            onClick={() => { setScannedAttendee(u); setActiveTab('scan'); }} 
                            className="text-[10px] font-black text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Verify
                          </button>
                        )}
                     </div>
                   </div>
                 ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Volunteer;