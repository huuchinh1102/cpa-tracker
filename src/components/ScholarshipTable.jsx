
function SortArrow({ columnKey, sortConfig }) {
  if (sortConfig.key !== columnKey) return <span className="text-gray-300 ml-1">↕</span>;
  return <span className="text-red-600 ml-1">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>;
}

export default function ScholarshipTable({ data, sortConfig, requestSort }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full text-left text-sm whitespace-nowrap">
        <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50 text-gray-600 font-bold select-none text-xs">
          <tr>
            <th className="px-4 py-4 cursor-pointer hover:bg-gray-100" onClick={() => requestSort('major')}>
              Cụm Ngành <SortArrow columnKey="major" sortConfig={sortConfig} />
            </th>
            <th className="px-4 py-4 cursor-pointer hover:bg-gray-100" onClick={() => requestSort('semester')}>
              Kỳ <SortArrow columnKey="semester" sortConfig={sortConfig} />
            </th>
            <th className="px-4 py-4 cursor-pointer hover:bg-blue-50 text-blue-800 bg-blue-50/50" onClick={() => requestSort('upperBound')}>
              Cận trên GPA <SortArrow columnKey="upperBound" sortConfig={sortConfig} />
            </th>
            <th className="px-4 py-4 cursor-pointer hover:bg-blue-50 text-blue-800 bg-blue-50/50" onClick={() => requestSort('lowerBound')}>
              Cận dưới GPA <SortArrow columnKey="lowerBound" sortConfig={sortConfig} />
            </th>
            <th className="px-4 py-4 cursor-pointer hover:bg-blue-50 text-blue-800 bg-blue-50/50" onClick={() => requestSort('avgGPA')}>
              GPA TB <SortArrow columnKey="avgGPA" sortConfig={sortConfig} />
            </th>
            <th className="px-4 py-4 cursor-pointer hover:bg-green-50 text-green-800 bg-green-50/50" onClick={() => requestSort('upperDRL')}>
              Cận trên ĐRL <SortArrow columnKey="upperDRL" sortConfig={sortConfig} />
            </th>
            <th className="px-4 py-4 cursor-pointer hover:bg-green-50 text-green-800 bg-green-50/50" onClick={() => requestSort('lowerDRL')}>
              Cận dưới ĐRL <SortArrow columnKey="lowerDRL" sortConfig={sortConfig} />
            </th>
            <th className="px-4 py-4 cursor-pointer hover:bg-green-50 text-green-800 bg-green-50/50" onClick={() => requestSort('avgDRL')}>
              ĐRL TB <SortArrow columnKey="avgDRL" sortConfig={sortConfig} />
            </th>
            <th className="px-4 py-4 cursor-pointer hover:bg-gray-100" onClick={() => requestSort('count')}>
              Số lượng <SortArrow columnKey="count" sortConfig={sortConfig} />
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length > 0 ? (
            data.map((s) => (
              <tr key={s.id} className="hover:bg-red-50 bg-white transition-colors">
                <td className="px-4 py-4 font-semibold text-gray-800">{s.major}</td>
                <td className="px-4 py-4 font-bold text-gray-600">{s.semester}</td>
                <td className="px-4 py-4 text-blue-600 font-bold bg-blue-50/10">{s.upperBound.toFixed(2)}</td>
                <td className="px-4 py-4 text-blue-600 font-bold bg-blue-50/10">{s.lowerBound.toFixed(2)}</td>
                <td className="px-4 py-4 text-blue-800 font-bold bg-blue-50/10">{s.avgGPA.toFixed(2)}</td>
                <td className="px-4 py-4 text-green-600 font-bold bg-green-50/10">{s.upperDRL}</td>
                <td className="px-4 py-4 text-green-600 font-bold bg-green-50/10">{s.lowerDRL}</td>
                <td className="px-4 py-4 text-green-800 font-bold bg-green-50/10">{s.avgDRL.toFixed(1)}</td>
                <td className="px-4 py-4 text-gray-600 font-bold text-center">{s.count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="px-6 py-12 text-center text-gray-500 font-medium bg-gray-50">
                Không có dữ liệu phù hợp với bộ lọc hiện tại.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}