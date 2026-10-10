export default function ScholarshipList() {
  // Dữ liệu mẫu tạm thời. Khi có file PDF, tôi sẽ gen toàn bộ mảng này cho bạn.
  const scholarships = [
    { id: 1, major: 'Khoa học Máy tính (IT1)', semester: '2023.1', upperBound: 4.0, lowerBound: 3.6, avgCPA: 3.75, count: 45 },
    { id: 2, major: 'Kỹ thuật Máy tính (IT2)', semester: '2023.1', upperBound: 3.9, lowerBound: 3.5, avgCPA: 3.65, count: 30 },
  ];

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 border-t-8 border-t-red-600 animate-fade-in">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Danh sách học bổng</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-left text-sm whitespace-nowrap">
          <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50 text-gray-600 font-bold">
            <tr>
              <th className="px-6 py-4">Ngành</th>
              <th className="px-6 py-4">Kỳ học</th>
              <th className="px-6 py-4">Cận trên</th>
              <th className="px-6 py-4">Cận dưới</th>
              <th className="px-6 py-4">CPA TB</th>
              <th className="px-6 py-4">Số lượng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {scholarships.map((s) => (
              <tr key={s.id} className="hover:bg-red-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-800">{s.major}</td>
                <td className="px-6 py-4 text-gray-600">{s.semester}</td>
                <td className="px-6 py-4 text-green-600 font-bold">{s.upperBound}</td>
                <td className="px-6 py-4 text-orange-500 font-bold">{s.lowerBound}</td>
                <td className="px-6 py-4 text-blue-600 font-bold">{s.avgCPA}</td>
                <td className="px-6 py-4 text-gray-600">{s.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}