import { useEffect } from "react";
const TodoReminder = ({ todo, time }) => {
  // Register Service Worker
useEffect(() => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker Registered", registration);
        
        // Ensure it's controlling the page
        if (!navigator.serviceWorker.controller) {
          window.location.reload(); // Refresh to let SW take control
        }
      })
      .catch((err) => console.log("Service Worker Registration Failed", err));
  }
}, []);

  // Schedule Reminder
  const scheduleReminder = () => {
    if (!todo || !time) {
      alert("Please ensure task and time are set!")
      return
    }

    const delay = new Date(time) - new Date()
    const taskName = todo

    if (delay > 0) {
      setTimeout(() => {
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            title: "Reminder!",
            body: `Time to complete: ${taskName}`,
          })
        } else {
          new Notification("Reminder!", {
            body: `Time to complete: ${taskName}`,
            icon: "notification-icon.png",
          })
        }
      }, delay)
    }
    alert("Reminder Set Successfully!")
  }

  return (
    <button onClick={scheduleReminder} className="bg-blue-900 mt-1 text-white px-2 py-1 rounded hover:bg-blue-700">
      Set Reminder
    </button>
  )
}

export default TodoReminder

