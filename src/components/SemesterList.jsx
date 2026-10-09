export default function SemesterList({ sortedSemesters, groupedBySemester, chartData, isSimulating, onDelete }) {
  if (sortedSemesters.length === 0) {
    return <div className="text-center p-6 text-gray-400 border rounded-lg">Chưa có dữ liệu học tập.</div>;
  }

  return (
    <>
      {sortedSemesters.map(sem => {

        const formattedSem = sem.length === 5 ? `${sem.slice(0, 4)}.${sem.slice(4)}` : sem;
        
        const currentChartData = chartData.find(d => d.name === `Kỳ ${formattedSem}`);

        return (
          <div key={sem} className="mb-6 border rounded-lg overflow-hidden shadow-sm">
            <div className="bg-gray-100 p-3 font-bold text-gray-700 flex justify-between">
              <span>Học kỳ {formattedSem}</span>
              <span className="text-blue-600">
                GPA Kỳ: {currentChartData ? currentChartData.GPA.toFixed(2) : '0.00'}
              </span>
            </div>
            <table className="w-full text-left border-collapse">
              <tbody>
                {groupedBySemester[sem].map(course => (
                  <tr key={course.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-3 font-semibold text-gray-600 w-24">{course.code}</td>
                    <td className="p-3 font-medium text-gray-800">{course.name}</td>
                    <td className="p-3 text-center text-gray-500 w-20">{course.credits} TC</td>
                    <td className={`p-3 text-center font-bold text-lg w-20 ${isSimulating ? 'text-orange-600' : 'text-blue-600'}`}>
                      {course.grade}
                    </td>
                    <td className="p-3 text-right w-20">
                      <button onClick={() => onDelete(course.id)} className="text-red-500 text-sm hover:underline">Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}