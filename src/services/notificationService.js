const NOTIFICATION_KEY = "hf-notifications";

function readNotifications() {
  const saved = localStorage.getItem(NOTIFICATION_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveNotifications(notifications) {
  localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(notifications));
}

export function getNotifications() {
  return readNotifications();
}

export function addNotification(type, message) {
  const notifications = readNotifications();

  const newNotification = {
    id: `NOT-${Date.now()}`,
    type,
    message,
    date: new Date().toLocaleString("nl-NL"),
    read: false,
  };

  const updated = [newNotification, ...notifications];

  saveNotifications(updated);

  return updated;
}

export function markNotificationAsRead(id) {
  const notifications = readNotifications();

  const updated = notifications.map((notification) =>
    notification.id === id
      ? { ...notification, read: true }
      : notification
  );

  saveNotifications(updated);

  return updated;
}

export function clearNotifications() {
  saveNotifications([]);
  return [];
}
