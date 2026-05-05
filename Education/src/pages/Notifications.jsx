import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCheck, Loader } from "lucide-react";
import { useUserStore } from "../store/useuserStore";

const Notifications = () => {
  const navigate = useNavigate();
  const {
    notifications,
    notificationsLoading,
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useUserStore();

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const openNotification = async (notification) => {
    if (!notification.read) {
      await markNotificationAsRead(notification._id);
    }

    if (notification.reference) {
      navigate(notification.reference);
    }
  };

  return (
    <main className="min-h-screen bg-base-100 pt-24 px-4 pb-12">
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Bell className="size-7 text-primary" />
              Notifications
            </h1>
            <p className="text-sm text-base-content/70 mt-1">
              {unreadCount} unread update{unreadCount === 1 ? "" : "s"}
            </p>
          </div>

          <button
            type="button"
            className="btn btn-outline btn-sm gap-2"
            disabled={!unreadCount}
            onClick={markAllNotificationsAsRead}
          >
            <CheckCheck className="size-4" />
            Mark all read
          </button>
        </div>

        {notificationsLoading ? (
          <div className="flex justify-center py-20">
            <Loader className="size-10 animate-spin text-primary" />
          </div>
        ) : notifications.length ? (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <button
                key={notification._id}
                type="button"
                onClick={() => openNotification(notification)}
                className={`w-full text-left rounded-lg border p-4 transition hover:border-primary hover:bg-base-200 ${
                  notification.read ? "bg-base-100 border-base-300" : "bg-primary/10 border-primary/40"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-2 size-2 rounded-full flex-shrink-0 ${
                      notification.read ? "bg-base-300" : "bg-primary"
                    }`}
                  />
                  <div className="space-y-1">
                    <p className="font-medium">{notification.message}</p>
                    <p className="text-xs text-base-content/60">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-base-300 bg-base-200 p-8 text-center">
            <Bell className="size-10 mx-auto text-base-content/50" />
            <p className="mt-3 font-semibold">No notifications yet</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Notifications;
