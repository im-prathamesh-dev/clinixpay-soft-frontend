// AdminLayout.jsx
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 min-h-screen bg-gray-100 p-4 pb-20 md:pb-4">
        {children}
      </main>

      <BottomNav />
    </div>
  );
};

export default AdminLayout;
