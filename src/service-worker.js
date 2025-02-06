self.addEventListener("message", (event) => {
    const data = event.data;
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: "notification-icon.png",
    });
});
