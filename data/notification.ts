export interface Notification {
  title: string;
  message: string;
};

export const getNotification: () => Notification = () => ({
  title: "Service message",
  message: "This is the developer local environment."
});