export default function Sidebar({ currentView, setView }) {
  return (
    <div className="w-48 bg-white border-r border-gray-200 shadow-sm flex flex-col h-full">
      <div className="p-6 border-b border-gray-100 flex items-center justify-center">
        <img 
          src="/Logo_Đại_học_Bách_Khoa_Hà_Nội.svg" 
          alt="Logo Bách Khoa Hà Nội" 
          className="h-16 w-auto object-contain drop-shadow-sm"
        />
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <button 
          onClick={() => setView('home')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${currentView === 'home' ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          Trang chủ
        </button>
        
        <button 
          onClick={() => setView('scholarships')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${currentView === 'scholarships' ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l-9 5m9-5l9 5"></path></svg>
          Học bổng
        </button>
      </nav>
    </div>
  );
}