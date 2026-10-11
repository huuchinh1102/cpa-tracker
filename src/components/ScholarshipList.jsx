// src/components/ScholarshipList.jsx
import { useState, useMemo, useRef, useEffect } from 'react';
import { SCHOLARSHIP_DATA } from '../data/scholarships';
import ScholarshipTable from './ScholarshipTable';

export default function ScholarshipList() {
  const [sortConfig, setSortConfig] = useState({ key: 'semester', direction: 'desc' });
  
  // States cho Lọc
  const allUniqueMajors = useMemo(() => [...new Set(SCHOLARSHIP_DATA.map(item => item.major))].sort(), []);
  const allUniqueSemesters = useMemo(() => [...new Set(SCHOLARSHIP_DATA.map(item => item.semester))].sort((a, b) => b.localeCompare(a)), []);
  
  const [selectedMajors, setSelectedMajors] = useState(allUniqueMajors);
  const [selectedSemester, setSelectedSemester] = useState('All');
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const toggleMajor = (major) => {
    if (selectedMajors.includes(major)) {
      setSelectedMajors(selectedMajors.filter(m => m !== major));
    } else {
      setSelectedMajors([...selectedMajors, major]);
    }
  };

  const filteredMajorsList = useMemo(() => {
    return allUniqueMajors.filter(major => 
      major.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allUniqueMajors, searchTerm]);

  // Logic: Lọc và Sắp xếp data truyền xuống Table
  const processedData = useMemo(() => {
    let filtered = SCHOLARSHIP_DATA.filter(item => selectedMajors.includes(item.major));
    
    if (selectedSemester !== 'All') {
      filtered = filtered.filter(item => item.semester === selectedSemester);
    }

    filtered.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [selectedMajors, selectedSemester, sortConfig]);

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8 border-t-8 border-t-red-600 animate-fade-in pb-16">
      
      {/* Header và Toolbar Lọc */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800">Tra cứu Học bổng (Nhóm Ngành)</h2>
          <p className="text-sm text-gray-500 mt-1">So sánh điểm GPA & ĐRL chuẩn học bổng qua từng học kỳ</p>
        </div>
        
        <div className="flex gap-3 items-center">
          <select 
            value={selectedSemester} 
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
          >
            <option value="All">Tất cả các kỳ</option>
            {allUniqueSemesters.map(sem => (
              <option key={sem} value={sem}>Kỳ {sem}</option>
            ))}
          </select>

          <div className="relative" ref={filterRef}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
              Lọc Nhóm ({selectedMajors.length}/{allUniqueMajors.length})
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 shadow-2xl rounded-xl p-4 z-50">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-gray-700">Chọn Nhóm Ngành hiển thị</span>
                  <button 
                    onClick={() => setSelectedMajors(selectedMajors.length === allUniqueMajors.length ? [] : allUniqueMajors)}
                    className="text-xs text-blue-600 hover:underline font-bold"
                  >
                    {selectedMajors.length === allUniqueMajors.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                  </button>
                </div>

                <div className="mb-3 relative">
                  <input 
                    type="text" 
                    placeholder="Tìm mã ngành, tên ngành (vd: IT1, Elitech)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-red-500 transition-shadow"
                  />
                  <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>

                <div className="max-h-72 overflow-y-auto space-y-1 pr-1 border-t pt-2">
                  {filteredMajorsList.length > 0 ? (
                    filteredMajorsList.map(major => (
                      <label key={major} className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 mt-0.5 text-red-600 rounded focus:ring-red-500"
                          checked={selectedMajors.includes(major)}
                          onChange={() => toggleMajor(major)}
                        />
                        <span className="text-sm text-gray-700 font-medium leading-tight">{major}</span>
                      </label>
                    ))
                  ) : (
                    <div className="text-center py-4 text-sm text-gray-500 font-medium">Không tìm thấy nhóm ngành nào</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gọi Component Table và truyền Props xuống */}
      <ScholarshipTable 
        data={processedData} 
        sortConfig={sortConfig} 
        requestSort={requestSort} 
      />
      
    </div>
  );
}