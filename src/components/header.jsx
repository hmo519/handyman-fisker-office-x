import { useState } from "react";
import {
  getNotifications,
  markNotificationAsRead,
} from "../services/notificationService";

function Header({ activePage }) {
  const [notifications, setNotifications] = useState(() => getNotifications());
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  function markRead(id) {
    setNotifications(markNotificationAsRead(id));
  }

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Welkom terug, Christian 👋</p>
        <h1>{activePage}</h1>
      </div>

      <div className="topInfo">
        <div className="notificationBell">
          <button onClick={() => setOpen(!open)}>
            🔔 {unreadCount}
          </button>

          {open && (
            <div className="notificationDropdown">
              {notifications.length === 0 ? (
                <p className="empty">Geen meldingen</p>
              ) : (
                notifications.slice(0, 5).map((notification) => (
                  <div className="notificationItem" key={notification.id}>
                    <strong>{notification.type}</strong>
                    <p>{notification.message}</p>

                    {!notification.read && (
                      <button onClick={() => markRead(notification.id)}>
                        Gelezen
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <span className="version">v2.1 Core</span>
      </div>
    </header>
  );
}

export default Header;
