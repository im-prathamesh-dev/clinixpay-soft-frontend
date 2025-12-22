import { useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const sendNotification = async () => {
    await axios.post(
      "http://localhost:5000/api/admin/notification/send",
      { title, message, type: "offer" },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`
        }
      }
    );
    alert("Notification sent");
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-semibold mb-4">
        Send Notification
      </h2>

      <input
        className="w-full p-2 border rounded mb-3"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full p-2 border rounded mb-3"
        placeholder="Message"
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendNotification}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        Send
      </button>
    </div>
  );
};

export default Notifications;
