import { useState } from "react";
import {
  clearNotifications,
  getNotifications,
  markNotificationAsRead,
} from "../services/notificationService";

function Notifications() {
  const [notifications, setNotifications] = useState(() => getNotifications());

  function markRead(id) {
    setNotifications(markNotificationAsRead(id));
  }

  function clearAll() {
    setNotifications(clearNotifications());
  }

  return (
    <section className="panel">
      <div className="pageHeader">
        <div>
          <h2>🔔 Meldingen</h2>
          <p className="empty">Alle systeemmeldingen van HF Office X.</p>
        </div>

        <button onClick={clearAll}>Alles wissen</button>
      </div>

      <div className="customerList">
        {notifications.length === 0 ? (
          <p className="empty">Geen meldingen.</p>
        ) : (
          notifications.map((notification) => (
            <div className="noteItem" key={notification.id}>
              <strong>
                {notification.read ? "✅" : "🔔"} {notification.type}
              </strong>
              <p>{notification.message}</p>
              <p className="empty">{notification.date}</p>

              {!notification.read && (
                <button onClick={() => markRead(notification.id)}>
                  Markeer als gelezen
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Notifications;
