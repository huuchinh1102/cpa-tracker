import { useState, useRef } from 'react';
import { COURSE_DB, GRADE_MAP } from '../data/Subjects';

export default function CourseForm({ isSimulating, onAdd }) {
  const [semester, setSemester] = useState('20231');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [grade, setGrade] = useState('A');
  
  const searchRef = useRef(null);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setSelectedCourse(null);
    
    if (val.trim() === '') {
      setSuggestions([]);
      return;
    }
    
    const filtered = COURSE_DB.filter(c => 
      c.code.toLowerCase().includes(val.toLowerCase()) || 
      c.name.toLowerCase().includes(val.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSelectSuggestion = (course) => {
    setSelectedCourse(course);
    setSearchTerm(`${course.code} - ${course.name}`);
    setSuggestions([]);
  };

  const handleSubmit = () => {
    if (!selectedCourse) return;
    onAdd({
      code: selectedCourse.code,
      name: selectedCourse.name,
      credits: selectedCourse.credits,
      grade: grade,
      semester: semester
    });
    setSearchTerm('');
    setSelectedCourse(null);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-8 bg-gray-50 p-4 rounded-lg border relative">
      <select 
        className="border border-gray-300 rounded px-3 py-2 bg-white outline-none"
        value={semester} onChange={(e) => setSemester(e.target.value)}
      >
        <option value="20231">Kỳ 2023.1</option>
        <option value="20232">Kỳ 2023.2</option>
        <option value="20233">Kỳ 2023.3</option>
        <option value="20241">Kỳ 2024.1</option>
        <option value="20242">Kỳ 2024.2</option>
        <option value="20242">Kỳ 2024.3</option>
        <option value="20251">Kỳ 2025.1</option>
        <option value="20252">Kỳ 2025.2</option>
        <option value="20253">Kỳ 2025.3</option>
        <option value="20261">Kỳ 2026.1</option>
        <option value="20262">Kỳ 2026.2</option>
      </select>

      <div className="flex-1 relative" ref={searchRef}>
        <input 
          type="text" placeholder="Gõ mã môn (vd: IT3120) hoặc tên..." 
          className="border border-gray-300 rounded px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm} onChange={handleSearchChange}
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded-md shadow-lg max-h-48 overflow-y-auto">
            {suggestions.map(course => (
              <li 
                key={course.code}
                onClick={() => handleSelectSuggestion(course)}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700 border-b last:border-0 flex justify-between"
              >
                <span><strong>{course.code}</strong> - {course.name}</span>
                <span className="text-gray-400 text-sm">{course.credits} TC</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <select 
        className="border border-gray-300 rounded px-3 py-2 bg-white outline-none"
        value={grade} onChange={(e) => setGrade(e.target.value)}
      >
        {Object.keys(GRADE_MAP).map(g => <option key={g} value={g}>{g}</option>)}
      </select>

      <button 
        onClick={handleSubmit}
        disabled={!selectedCourse}
        className={`font-bold py-2 px-6 rounded transition-colors ${
          !selectedCourse ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 
          (isSimulating ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-blue-600 text-white hover:bg-blue-700')
        }`}
      >
        Lưu Điểm
      </button>
    </div>
  );
}