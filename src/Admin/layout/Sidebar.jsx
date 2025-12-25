import { NavLink } from "react-router-dom";

const menu = [
  { path: "/admin", label: "Dashboard" },
  { path: "/admin/licenses", label: "Licenses & Revenue" },
  { path: "/admin/customers", label: "Customers" },
  { path: "/admin/notifications", label: "Notifications" },
  { path: "/admin/support", label: "Support Tickets" },
  // { path: "/admin/team", label: "Team" }
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">ClinixPay Admin</h2>

      <nav className="space-y-2">
        {menu.map((m) => (
          <NavLink
            key={m.path}
            to={m.path}
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-primary" : "hover:bg-gray-700"
              }`
            }
          >
            {m.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
