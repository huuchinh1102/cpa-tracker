import { useState } from 'react';

export default function TargetSetter({ currentCPA, totalCredits }) {
  const [targetCPA, setTargetCPA] = useState('');
  const [nextCredits, setNextCredits] = useState(15);

  const calculateAdvice = () => {
    if (!targetCPA || totalCredits === 0) return null;
    
    const target = parseFloat(targetCPA);
    const credits = parseInt(nextCredits);
    
    if (isNaN(target) || isNaN(credits) || credits <= 0) return null;

    const rawRequiredGPA = ((target * (totalCredits + credits)) - (currentCPA * totalCredits)) / credits;
    const roundedRequiredGPA = Number(rawRequiredGPA.toFixed(2));
    
    if (target <= currentCPA) {
      return { 
        status: 'easy', 
        color: 'bg-green-50 text-green-700 border-green-200',
        message: 'Mục tiêu thấp hơn hoặc bằng CPA hiện tại. Cứ giữ vững phong độ hiện tại là bạn thừa sức vượt qua!' 
      };
    }

    if (roundedRequiredGPA > 4.0) {
      // Tính điểm tối đa có thể đạt được nếu kỳ tới full A
      const maxPossibleCPA = ((currentCPA * totalCredits) + (4.0 * credits)) / (totalCredits + credits);
      return { 
        status: 'impossible', 
        color: 'bg-red-50 text-red-700 border-red-200',
        message: `Mission Impossible! Dù kỳ tới bạn có đạt full A (4.0), CPA cao nhất chỉ lên được ${maxPossibleCPA.toFixed(2)}. Bạn cần học nhiều hơn ${credits} tín chỉ hoặc hạ mục tiêu xuống một chút.` 
      };
    }

    return { 
      status: 'possible', 
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      message: `Khả thi! Với dự định học ${credits} tín chỉ kỳ tới, bạn cần đạt điểm tổng kết (GPA) học kỳ tối thiểu là ${roundedRequiredGPA.toFixed(2)} để kéo CPA lên ${target}.` 
    };
  };

  const advice = calculateAdvice();

  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm mt-6">
      <h3 className="text-lg font-bold text-gray-700 mb-4">🎯 Tính toán chiến lược học tập</h3>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mục tiêu CPA muốn đạt</label>
          <input 
            type="number" 
            step="0.01"
            value={targetCPA}
            onChange={(e) => setTargetCPA(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="VD: 3.20"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Số tín chỉ dự kiến kỳ tới</label>
          <input 
            type="number" 
            value={nextCredits}
            onChange={(e) => setNextCredits(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="VD: 15"
          />
        </div>
      </div>

      {totalCredits === 0 ? (
        <div className="p-4 rounded-lg bg-gray-50 text-gray-600 border border-gray-200 text-sm">
          Vui lòng nhập điểm các kỳ trước để công cụ có cơ sở dữ liệu tính toán.
        </div>
      ) : advice ? (
        <div className={`p-4 rounded-lg border text-sm font-medium leading-relaxed transition-all duration-300 ${advice.color}`}>
          {advice.message}
        </div>
      ) : null}
    </div>
  );
}