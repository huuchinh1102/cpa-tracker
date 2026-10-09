import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Overview({ type, score, chartData, isSimulating }) {
  
  // Tính toán xếp loại học lực chuẩn Bách Khoa
  const getRanking = (s) => {
    if (s >= 3.6) return { text: 'Xuất sắc', color: 'bg-green-100 text-green-700 border-green-300' };
    if (s >= 3.2) return { text: 'Giỏi', color: 'bg-blue-100 text-blue-700 border-blue-300' };
    if (s >= 2.5) return { text: 'Khá', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' };
    if (s >= 2.0) return { text: 'Trung bình', color: 'bg-gray-100 text-gray-700 border-gray-300' };
    return { text: 'Cảnh báo học vụ', color: 'bg-red-100 text-red-700 border-red-300' };
  };

  const rank = getRanking(score);

  return (
    <div className="space-y-6">
      {/* Thẻ hiển thị Điểm và Xếp loại */}
      <div className={`p-8 rounded-2xl border-2 text-center shadow-sm transition-all ${
          isSimulating ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-100'
        }`}>
        <h2 className="text-xl font-bold text-gray-700 mb-2">
          {type} {isSimulating ? 'Mô Phỏng' : 'Thực Tế'}
        </h2>
        <div className="text-6xl font-black text-blue-600 mb-4">
          {score > 0 ? score.toFixed(2) : '0.00'}
        </div>
        
        {/* Nút Badge hiển thị xếp loại */}
        {score > 0 && (
          <div className={`inline-block px-4 py-1.5 rounded-full border font-bold text-sm shadow-sm ${rank.color}`}>
            Xếp loại: {rank.text}
          </div>
        )}
      </div>

      {/* Biểu đồ */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <h3 className="text-lg font-bold text-gray-700 mb-6 text-center">Biểu đồ biến động {type}</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData} 
              margin={{ top: 10, right: 30, left: 0, bottom: 25 }} 
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                axisLine={true} 
                tickLine={false} 
                tick={{fill: '#6B7280', fontSize: 12, fontWeight: 'bold'}} 
                dy={10} 
              />
              <YAxis 
                domain={[0, 4]} 
                ticks={[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4]} 
                tickFormatter={(val) => val.toFixed(1)} 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#6B7280', fontSize: 12, fontWeight: 'bold'}}
                width={35}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Legend 
                align="center" 
                verticalAlign="bottom" 
                wrapperStyle={{ paddingTop: '20px', paddingLeft: '30px' }} 
              />
              <Line 
                type="linear" 
                dataKey={type} 
                stroke="#DC2626" 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                activeDot={{ r: 6, fill: '#DC2626', stroke: 'white', strokeWidth: 2 }}
                name={`${type} Tích lũy`}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}