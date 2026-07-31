const Navbar = ({ userName, onLogout }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-slate-800">Employee Management</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-600">{userName}</span>
        <button
          onClick={onLogout}
          className="px-3 py-1.5 text-sm bg-slate-800 text-white rounded hover:bg-slate-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
