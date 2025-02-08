self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SCHEDULE_NOTIFICATION") {
    const { todo, time } = event.data;
    const delay = new Date(time) - new Date();

    if (delay > 0) {
      setTimeout(() => {
        // ✅ Check if notification permission is granted
        if (Notification.permission === "granted") {
          self.registration.showNotification("Reminder!", {
            body: `Time to complete: ${todo}`,
            icon: "/notification-icon.png",
          });
        } else {
          console.error("Notification permission not granted.");
        }
      }, delay);
    }
  }
});


  
