const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  if (!employees.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-10 text-center text-slate-500">
        No employees found.
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-left text-slate-600">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">Position</th>
            <th className="px-4 py-3">Salary</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id} className="border-t border-slate-100 hover:bg-slate-50">
              <td className="px-4 py-3">{emp.name}</td>
              <td className="px-4 py-3">{emp.email}</td>
              <td className="px-4 py-3">{emp.phone}</td>
              <td className="px-4 py-3">{emp.department}</td>
              <td className="px-4 py-3">{emp.position}</td>
              <td className="px-4 py-3">${emp.salary}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(emp)}
                    className="px-2 py-1 text-teal-700 border border-teal-600 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(emp)}
                    className="px-2 py-1 text-red-700 border border-red-600 rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
