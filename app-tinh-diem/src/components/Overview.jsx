import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Overview({ type, score, chartData, isSimulating }) {
  // Biến type sẽ nhận giá trị là 'GPA' hoặc 'CPA' tùy vào việc bạn click tab nào
  return (
    <div className="animate-fade-in">
      <div className={`rounded-xl p-6 text-center mb-8 border ${
        isSimulating ? 'bg-orange-100 border-orange-300' : 'bg-blue-50 border-blue-200'
      }`}>
        <p className="text-gray-600 text-lg font-medium">
          {type} {isSimulating ? 'Dự Kiến' : 'Thực Tế'}
        </p>
        <p className={`text-6xl font-extrabold ${isSimulating ? 'text-orange-600' : 'text-blue-700'}`}>
          {score.toFixed(2)}
        </p>
      </div>

      {chartData.length > 0 && (
        <div className="h-96 mb-8 bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="text-center font-bold text-gray-700 mb-4">Biểu đồ biến động {type}</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 4]} />
              <Tooltip />
              <Legend />
              {/* Sửa thành type="linear" (đường thẳng), stroke="#ef4444" (màu đỏ) */}
              <Line 
                type="linear" 
                dataKey={type} 
                stroke="#ef4444" 
                strokeWidth={3} 
                name={`${type} ${type === 'GPA' ? 'Học kỳ' : 'Tích lũy'}`} 
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}