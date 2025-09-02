import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Minimal device info we persist in the app store.
 * Uses Capacitor Device plugin shape where available, with a safe web fallback.
 */
export interface DeviceInfo {
  /** Unique identifier for the device, if available */
  deviceId?: string
  /** Device model (e.g., iPhone15,3) */
  model?: string
  /** Operating system name (iOS, Android, Web) */
  operatingSystem?: string
  /** OS version string */
  osVersion?: string
  /** Platform (ios | android | web) */
  platform?: string
  /** Manufacturer (e.g., Apple, Google) */
  manufacturer?: string
  /** Is the app running in a virtualized environment (emulator/simulator) */
  isVirtual?: boolean
  // Note: Intentional omission of languageCode to match Capacitor v6 typings
}

/** LocalStorage key for persisted device info */
const LS_DEVICE_KEY = 'app.device.info.v1'

export const useAppStore = defineStore('app', () => {
  const globalLoading = ref(false)
  const modalShown = ref(false)
  // New: device info state
  const deviceInfo = ref<DeviceInfo | null>(null)

  function showLoading() {
    globalLoading.value = true
  }

  function hideLoading() {
    globalLoading.value = false
  }

  function showModal() {
    globalLoading.value = true
  }

  function hideModal() {
    globalLoading.value = false
  }
  /**
   * Load device info from localStorage (if any).
   * This is synchronous and safe to call during bootstrap before plugins resolve.
   */
  function loadDeviceFromStorage(): void {
    try {
      const raw = localStorage.getItem(LS_DEVICE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as DeviceInfo
        deviceInfo.value = parsed
      }
    } catch {
      // ignore storage parse errors silently
    }
  }

  /**
   * Persist current device info to localStorage.
   */
  function persistDeviceToStorage(): void {
    try {
      if (deviceInfo.value) {
        localStorage.setItem(LS_DEVICE_KEY, JSON.stringify(deviceInfo.value))
      }
    } catch {
      // ignore storage write errors silently
    }
  }

  /**
   * Initialize device info using Capacitor Device plugin when available,
   * otherwise fall back to a lightweight web fingerprint.
   *
   * This function is idempotent and can be safely re-called.
   */
  async function initDeviceInfo(): Promise<void> {
    // Optimistically load cached data first
    if (!deviceInfo.value) {loadDeviceFromStorage()}

    // Attempt Capacitor Device plugin
    try {
      // Import only what's needed to satisfy linter and bundler tree-shaking
      const { Device } = await import('@capacitor/device')

      // If running purely on web without native layer, Capacitor may still work with web impl.
      const [info, id] = await Promise.all([
        Device.getInfo(),
        Device.getId().catch(() => ({ identifier: undefined } as { identifier?: string })),
      ])

      deviceInfo.value = {
        deviceId: id?.identifier,
        model: info.model,
        operatingSystem: info.operatingSystem,
        osVersion: info.osVersion,
        platform: info.platform,
        manufacturer: info.manufacturer,
        isVirtual: info.isVirtual,
        // Capacitor v6 Device.getInfo does not expose languageCode; omit to satisfy TS
      }
      persistDeviceToStorage()
      return
    } catch {
      // Fallback to web-only info (no Capacitor)
    }

    // Web fallback using navigator/platform data
    try {
      const nav = window.navigator as Navigator & { userAgentData?: { platform?: string } }
      const ua = nav.userAgent || ''
      const platform = (nav.userAgentData?.platform || nav.platform || 'web').toString()

      // Lightweight, non-unique ID seed (not a fingerprint; just for session grouping)
      const seed = `${platform}|${ua}`.slice(0, 256)
      const webId = `web-${btoa(unescape(encodeURIComponent(seed))).slice(0, 24)}`

      deviceInfo.value = {
        deviceId: webId,
        model: undefined,
        operatingSystem: 'web',
        osVersion: undefined,
        platform: 'web',
        manufacturer: undefined,
        isVirtual: false,
      }
      persistDeviceToStorage()
    } catch {
      // As a last resort, keep whatever was loaded from storage (if any)
    }
  }

  return {
    // state
    globalLoading,
    deviceInfo,
    modalShown,
    // actions
    showLoading,
    hideLoading,
    showModal,
    hideModal,
    initDeviceInfo,
    loadDeviceFromStorage,
    persistDeviceToStorage,
  }
})
