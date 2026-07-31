import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginUser, registerUser } from '../services/api';

const passwordOk = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        if (!form.name) {
          toast.error('Name is required');
          return;
        }
        if (!passwordOk(form.password)) {
          toast.error('Use 8+ chars with uppercase, lowercase, number and special character');
          return;
        }
        const res = await registerUser(form);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data));
        toast.success('Registered successfully');
      } else {
        const res = await loginUser({ email: form.email, password: form.password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data));
        toast.success('Login Successful');
      }
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || (isRegister ? 'Registration failed' : 'Login Failed'));
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500';

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white w-full max-w-md rounded-lg border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">
          {isRegister ? 'Register' : 'Login'}
        </h1>
        <p className="text-slate-500 mb-6">Employee Management System</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input name="name" value={form.name} onChange={handleChange} className={inputClass} required />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} required />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className={inputClass} required />
            {isRegister && (
              <p className="text-xs text-slate-500 mt-1">
                Must include uppercase, lowercase, number and special character
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-60"
          >
            {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-4 text-center">
          {isRegister ? 'Already have an account?' : 'No account?'}{' '}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-teal-700 hover:underline"
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
