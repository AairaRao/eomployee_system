import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeForm from '../components/EmployeeForm';
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../services/api';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (department) params.department = department;
      const res = await getEmployees(params);
      setEmployees(res.data);
    } catch (error) {
      toast.error('Failed to load employees');
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    const timer = setTimeout(fetchEmployees, 300);
    return () => clearTimeout(timer);
  }, [search, department]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSave = async (data) => {
    setSaving(true);
    try {
      if (editEmployee) {
        await updateEmployee(editEmployee._id, data);
        toast.success('Employee Updated');
      } else {
        await createEmployee(data);
        toast.success('Employee Added');
      }
      setShowForm(false);
      setEditEmployee(null);
      fetchEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (emp) => {
    setEditEmployee(emp);
    setShowForm(true);
  };

  const handleDelete = async (emp) => {
    if (!window.confirm(`Delete ${emp.name}?`)) return;
    try {
      await deleteEmployee(emp._id);
      toast.success('Employee Deleted');
      fetchEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar userName={user?.name} onLogout={handleLogout} />

      <main className="p-4 md:p-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Employees</h2>
            <p className="text-slate-500 text-sm">Manage your team members</p>
          </div>
          <button
            onClick={() => {
              setEditEmployee(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Add Employee
          </button>
        </div>

        {showForm && (
          <div className="mb-6">
            <EmployeeForm
              initialData={editEmployee}
              onSubmit={handleSave}
              onCancel={() => {
                setShowForm(false);
                setEditEmployee(null);
              }}
              loading={saving}
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-slate-300 rounded-md"
          />
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full md:w-48 px-3 py-2 border border-slate-300 rounded-md bg-white"
          >
            <option value="">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Operations">Operations</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-slate-500 py-10">Loading...</p>
        ) : (
          <EmployeeTable
            employees={employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
