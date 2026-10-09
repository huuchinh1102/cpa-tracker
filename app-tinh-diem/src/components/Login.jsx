import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [studentId, setStudentId] = useState(''); // Đổi từ email thành studentId
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Tự động biến Mã Sinh Viên thành định dạng email giả lập để Firebase chấp nhận
    const fakeEmail = `${studentId.trim().toLowerCase()}@student.hust.edu.vn`;

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, fakeEmail, password);
      } else {
        await signInWithEmailAndPassword(auth, fakeEmail, password);
      }
    } catch (err) {
      // Phân tích lỗi chi tiết từ Firebase
      if (err.code === 'auth/email-already-in-use') {
        setError('Mã sinh viên này đã được đăng ký!');
      } else if (err.code === 'auth/invalid-email') {
        setError('Mã sinh viên không hợp lệ (Không chứa ký tự đặc biệt).');
      } else if (err.code === 'auth/weak-password') {
        setError('Mật khẩu quá ngắn (tối thiểu 6 ký tự).');
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('Mã sinh viên hoặc mật khẩu không chính xác.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('LỖI: Bạn chưa bật tính năng Email/Password trong Firebase Console!');
      } else {
        setError('Lỗi kết nối. Vui lòng thử lại sau.');
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-700 via-red-600 to-yellow-500 font-sans p-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4 shadow-sm">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l-9 5m9-5l9 5"></path></svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">HUST CPA Tracker</h1>
          <p className="text-gray-500 font-medium">
            {isRegistering ? 'Đăng ký tài khoản mới' : 'Đăng nhập vào hệ thống'}
          </p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-600 border border-red-200 rounded-lg text-sm text-center font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Mã Sinh Viên</label>
            <input 
              type="text" required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none transition-all bg-gray-50 uppercase"
              placeholder="vd: 20241234"
              value={studentId} onChange={(e) => setStudentId(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Mật khẩu</label>
            <input 
              type="password" required minLength="6"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none transition-all bg-gray-50"
              placeholder="Tối thiểu 6 ký tự"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1">
            {isRegistering ? 'Đăng Ký Tài Khoản' : 'Đăng Nhập'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6 cursor-pointer hover:text-red-600 transition-colors font-medium" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Đã có tài khoản? Đăng nhập ngay' : 'Chưa có tài khoản? Đăng ký ngay'}
        </p>
      </div>
    </div>
  );
}