// menuConfig.js
import {
  LayoutDashboard,
  CreditCard,
  Users,
  Bell,
  Headphones
} from "lucide-react";

export const menu = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/licenses", label: "Licenses", icon: CreditCard },
  { path: "/admin/customers", label: "Customers", icon: Users },
  { path: "/admin/notifications", label: "Alerts", icon: Bell },
  { path: "/admin/support", label: "Support", icon: Headphones },
];
