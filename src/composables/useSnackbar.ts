import { ref } from 'vue'

// Snackbar notification types
export interface SnackbarOptions {
  variant?: 'success' | 'error' | 'warning' | 'info'
  timeout?: number
  position?: 'top' | 'bottom'
}

export interface SnackbarItem extends SnackbarOptions {
  id: number
  message: string
  timer?: number
}

// Global state
const notifications = ref<SnackbarItem[]>([])
let notificationId = 0

// Global function to add notification (can be used directly)
export function enqueueSnackbar(message: string, options: SnackbarOptions = {}) {
  const id = ++notificationId
  const { variant = 'info', timeout = 5000, position = 'top' } = options

  const notification: SnackbarItem = {
    id,
    message,
    variant,
    timeout,
    position,
  }

  notifications.value.push(notification)

  // Auto remove after timeout
  if (timeout > 0) {
    notification.timer = window.setTimeout(() => {
      removeSnackbar(id)
    }, timeout)
  }

  return id
}

// Function to remove notification
export function removeSnackbar(id: number) {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    const notification = notifications.value[index]
    if (notification.timer) {
      clearTimeout(notification.timer)
    }
    notifications.value.splice(index, 1)
  }
}

// Composable function
export function useSnackbar() {
  return {
    notifications: readonly(notifications),
    enqueueSnackbar,
    removeSnackbar,
  }
}

// Helper function for readonly
function readonly<T>(obj: T): T {
  return obj
}