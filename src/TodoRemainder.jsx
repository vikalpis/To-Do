

import { useEffect } from "react"

const TodoReminder = ({ todo, time }) => {

  useEffect(() => {
  if ("Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission !== "granted") {
        alert("Please allow notifications for reminders!");
      }
    });
  }
}, []);

  const scheduleReminder = () => {
    if (!todo || !time) {
      alert("Please ensure task and time are set!")
      return
    }

    const delay = new Date(time) - new Date()
    if (delay <= 0) {
      alert("Please select a future time for the reminder.")
      return
    }

    const scheduleNotification = () => {
      if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            setTimeout(() => {
              new Notification("Reminder!", {
                body: `Time to complete: ${todo}`,
                icon: "/notification-icon.png", // Make sure this icon exists in your public folder
              })
            }, delay)
            alert("Reminder set successfully!")
          } else {
            alert("Notification permission denied. Reminder will not be shown.")
          }
        })
      } else {
        // Fallback for browsers that don't support Notification API
        setTimeout(() => {
          alert(`Reminder: Time to complete ${todo}`)
        }, delay)
        alert("Reminder set successfully (will use alert)!")
      }
    }

    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "SCHEDULE_NOTIFICATION",
        todo,
        time,
      })
    } else {
      scheduleNotification()
    }
  }

  return (
    <button onClick={scheduleReminder} className="bg-blue-900 text-white px-2 py-1 mt-1 rounded hover:bg-blue-700">
      Set Reminder
    </button>
  )
}

export default TodoReminder

