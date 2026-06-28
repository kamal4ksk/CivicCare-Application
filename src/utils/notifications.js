const DEFAULT_NOTIFICATIONS = [
  {
    id: 1,
    title: "New comment on your post",
    description: 'Jane Doe commented: "I have the same issue!"',
    time: "5m ago",
    unread: true,
    type: "comment"
  },
  {
    id: 2,
    title: "12 people liked your post",
    description: 'Your post "Large pothole on Main Street" received new likes.',
    time: "1h ago",
    unread: true,
    type: "like"
  }
];

export const getNotifications = () => {
  const data = localStorage.getItem("civiccare_notifications");
  if (!data) {
    localStorage.setItem("civiccare_notifications", JSON.stringify(DEFAULT_NOTIFICATIONS));
    return DEFAULT_NOTIFICATIONS;
  }
  return JSON.parse(data);
};

export const saveNotifications = (notifications) => {
  localStorage.setItem("civiccare_notifications", JSON.stringify(notifications));
  window.dispatchEvent(new Event("notifications_updated"));
};
