import TargetSetter from './components/TargetSetter';
import { useState, useEffect } from 'react';
import { GRADE_MAP } from './data/Subjects';
import Login from './components/Login';
import Overview from './components/Overview';
import CourseForm from './components/CourseForm';
import SemesterList from './components/SemesterList';

// Import Firebase
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function App() {
  const [user, setUser] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [realCourses, setRealCourses] = useState([]);
  
  const [isSimulating, setIsSimulating] = useState(false);
  const [simCourses, setSimCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('input');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Kéo dữ liệu từ Đám mây về
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRealCourses(docSnap.data().courses || []);
        } else {
          setRealCourses([]);
        }
      } else {
        setUser(null);
        setRealCourses([]);
        setSimCourses([]);
        setIsSimulating(false);
      }
      setIsDataLoaded(true); // Đánh dấu đã tải xong
    });
    return () => unsubscribe();
  }, []);

  const currentCourses = isSimulating ? simCourses : realCourses;
  const setCurrentCourses = isSimulating ? setSimCourses : setRealCourses;

  // 2. Hàm Lưu chuyên dụng: LƯU KÈM MSSV ĐỂ ADMIN DỄ QUẢN LÝ
  const saveToFirebase = (updatedList) => {
    if (user && !isSimulating) {
      const mssv = user.email.split('@')[0].toUpperCase();
      setDoc(doc(db, 'users', user.uid), { 
        mssv: mssv,             // Dữ liệu mới thêm cho Admin xem
        email: user.email,
        courses: updatedList    // Danh sách điểm
      });
    }
  };

  // 3. Chỉ lưu khi người dùng thực sự bấm THÊM MÔN
  const handleAddCourse = (newCourseData) => {
    const existingIndex = currentCourses.findIndex(c => c.code === newCourseData.code);
    let updatedList = [...currentCourses];
    if (existingIndex !== -1) {
      updatedList[existingIndex] = { ...updatedList[existingIndex], ...newCourseData };
    } else {
      updatedList.push({ id: Math.random().toString(), ...newCourseData });
    }
    
    setCurrentCourses(updatedList);
    saveToFirebase(updatedList); // Đẩy lên Firebase
  };

  // 4. Chỉ lưu khi người dùng thực sự bấm XÓA MÔN
  const handleDelete = (id) => {
    const updatedList = currentCourses.filter(c => c.id !== id);
    setCurrentCourses(updatedList);
    saveToFirebase(updatedList); // Đẩy lên Firebase
  };

  const groupedBySemester = currentCourses.reduce((acc, course) => {
    if (!acc[course.semester]) acc[course.semester] = [];
    acc[course.semester].push(course);
    return acc;
  }, {});
  const sortedSemesters = Object.keys(groupedBySemester).sort();

  let accCredits = 0; let accPoints = 0;
  const chartData = sortedSemesters.map(sem => {
    let semCredits = 0; let semPoints = 0;
    groupedBySemester[sem].forEach(c => {
      semCredits += c.credits;
      semPoints += c.credits * GRADE_MAP[c.grade];
    });
    accCredits += semCredits; accPoints += semPoints;
    
    const formattedSem = sem.length === 5 ? `${sem.slice(0, 4)}.${sem.slice(4)}` : sem;

    return {
      name: `Kỳ ${formattedSem}`,
      GPA: semCredits > 0 ? Number((semPoints / semCredits).toFixed(2)) : 0,
      CPA: accCredits > 0 ? Number((accPoints / accCredits).toFixed(2)) : 0
    };
  });

  const finalCPA = chartData.length > 0 ? chartData[chartData.length - 1].CPA : 0;
  const latestGPA = chartData.length > 0 ? chartData[chartData.length - 1].GPA : 0;

  if (!isDataLoaded) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">Đang tải dữ liệu...</div>;
  if (!user) return <Login />;

  return (
    <div className={`min-h-screen p-8 font-sans transition-colors duration-500 ${isSimulating ? 'bg-orange-50' : 'bg-gray-100'}`}>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 border-t-8 border-t-red-600">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-6 mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-xl uppercase">
              {user.email.split('@')[0].substring(0, 2)}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-800">CPA Tracker</h1>
              <p className="text-sm text-gray-500 mt-1">MSSV: <span className="font-bold text-gray-700 uppercase">{user.email.split('@')[0]}</span></p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                if (!isSimulating) setSimCourses([...realCourses]);
                setIsSimulating(!isSimulating);
              }}
              className={`px-6 py-2.5 rounded-xl font-bold shadow-sm transition-all transform hover:scale-105 ${isSimulating ? 'bg-orange-500 text-white shadow-orange-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {isSimulating ? '🛠 Đang Mô Phỏng' : 'Bật Mô Phỏng'}
            </button>
            <button 
              onClick={() => signOut(auth)}
              className="text-gray-400 hover:text-red-500 font-medium p-2 transition-colors" title="Đăng xuất"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-8 bg-gray-50 p-2 rounded-xl border border-gray-100 shadow-inner">
          {['input', 'gpa', 'cpa'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 font-bold rounded-lg transition-all ${activeTab === tab ? 'bg-white shadow text-red-600' : 'text-gray-500 hover:bg-gray-200'}`}>
              {tab === 'input' ? '📝 Quản Lý Điểm' : tab === 'gpa' ? '📈 Phân Tích GPA' : '🎓 Phân Tích CPA'}
            </button>
          ))}
        </div>

        {activeTab === 'input' && (
          <div className="animate-fade-in">
            <CourseForm isSimulating={isSimulating} onAdd={handleAddCourse} />
            <SemesterList sortedSemesters={sortedSemesters} groupedBySemester={groupedBySemester} chartData={chartData} isSimulating={isSimulating} onDelete={handleDelete} />
          </div>
        )}
        
        {activeTab === 'gpa' && (
          <div className="animate-fade-in">
             <Overview type="GPA" score={latestGPA} chartData={chartData} isSimulating={isSimulating} />
          </div>
        )}
        
 feature/update-ui

        {/* Đã thêm bộ TargetSetter vào tab CPA */}
 main
        {activeTab === 'cpa' && (
          <div className="animate-fade-in space-y-6">
            <Overview type="CPA" score={finalCPA} chartData={chartData} isSimulating={isSimulating} />
            <TargetSetter currentCPA={finalCPA} totalCredits={accCredits} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;