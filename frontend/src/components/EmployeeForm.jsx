import { useEffect, useState } from 'react';

const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations'];

const empty = {
  name: '',
  email: '',
  phone: '',
  department: '',
  position: '',
  salary: '',
  joiningDate: '',
};

const EmployeeForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        department: initialData.department || '',
        position: initialData.position || '',
        salary: initialData.salary || '',
        joiningDate: initialData.joiningDate
          ? initialData.joiningDate.slice(0, 10)
          : '',
      });
    } else {
      setForm(empty);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setForm({ ...form, phone: value.replace(/\D/g, '').slice(0, 11) });
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.phone || !form.department || !form.position || !form.salary || !form.joiningDate) {
      setError('All fields are required');
      return;
    }

    if (!/^\d{1,11}$/.test(form.phone)) {
      setError('Phone must be up to 11 digits');
      return;
    }

    if (Number(form.salary) <= 0) {
      setError('Salary must be greater than 0');
      return;
    }

    onSubmit({ ...form, salary: Number(form.salary) });
  };

  const inputClass =
    'w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500';

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-lg p-4 md:p-6 space-y-4">
      <h3 className="text-lg font-semibold text-slate-800">
        {initialData ? 'Edit Employee' : 'Add Employee'}
      </h3>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm mb-1">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            maxLength={11}
            inputMode="numeric"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Department</label>
          <select name="department" value={form.department} onChange={handleChange} className={inputClass}>
            <option value="">Select department</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Position</label>
          <input name="position" value={form.position} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm mb-1">Salary</label>
          <input type="number" name="salary" value={form.salary} onChange={handleChange} className={inputClass} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Joining Date</label>
          <input type="date" name="joiningDate" value={form.joiningDate} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-60"
        >
          {loading ? 'Saving...' : initialData ? 'Update' : 'Save'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-slate-300 rounded-md hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default EmployeeForm;
