import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  Moon,
  Sun,
  Wifi,
  WifiOff,
  User,
  LogOut,
  Bell
} from "lucide-react";
import axios from "axios";

const Header = ({ syncStatus = "online" }) => {
  const { isDark, toggleTheme } = useTheme();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [customer, setCustomer] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("token");

  /* =========================
     FETCH CUSTOMER
  ========================= */
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/customer-details",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setCustomer(res.data.customer);
      } catch (err) {
        console.error("Failed to load customer details");
      }
    };

    if (token) fetchCustomer();
  }, [token]);

  /* =========================
     FETCH NOTIFICATIONS
  ========================= */
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/customer/notifications",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setNotifications(res.data.notifications || []);
      } catch (err) {
        console.error("Failed to load notifications");
      }
    };

    if (token) fetchNotifications();
  }, [token]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  /* =========================
     MARK AS READ
  ========================= */
  const markAsRead = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/v1/customer/notifications/mark-read/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );
    } catch (err) {
      console.error("Failed to mark notification as read");
    }
  };

  const fullName = customer
    ? `${customer.fullName.firstName} ${customer.fullName.lastName}`
    : "Loading...";

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        {/* Left: Store Name & Sync Status */}
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {customer?.storeName || "Medical Store"}
          </h2>

          {syncStatus === "online" ? (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium">
              <Wifi className="w-3 h-3" />
              Online
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-medium">
              <WifiOff className="w-3 h-3" />
              Offline
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* 🔔 Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />

                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border z-50">
                  <div className="px-4 py-2 border-b font-semibold">
                    Notifications
                  </div>

                  {notifications.length === 0 ? (
                    <p className="px-4 py-6 text-sm text-gray-500">
                      No notifications
                    </p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n._id}
                        onClick={() => markAsRead(n._id)}
                        className={`px-4 py-3 text-sm cursor-pointer border-b
                          ${
                            !n.isRead
                              ? "bg-blue-50 dark:bg-blue-900/30"
                              : ""
                          }`}
                      >
                        <p className="font-medium">{n.title}</p>
                        <p className="text-xs text-gray-500">
                          {n.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDark ? <Sun /> : <Moon />}
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                <User className="w-4 h-4" />
              </div>
            </button>

            {showProfileMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfileMenu(false)}
                />

                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-semibold">{fullName}</p>
                    <p className="text-xs text-gray-500">
                      {customer?.email}
                    </p>
                  </div>

                  <button
                    onClick={() => (window.location.href = "/profile")}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.href = "/login";
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
