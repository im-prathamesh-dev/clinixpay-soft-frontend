const AdminHeader = () => {
  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">
      <h1 className="font-semibold text-black">Admin Dashboard</h1>
   

      <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          window.location.href = "/admin/login";
        }}
        className="text-sm text-red-600"
      >
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;
