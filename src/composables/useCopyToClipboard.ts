const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.warn('Fallback: Could not copy text: ', err)
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    let success = false
    try {
      success = document.execCommand('copy')
    } catch (execErr) {
      console.warn('Fallback: Could not copy text: ', execErr)
    }

    document.body.removeChild(textArea)
    return success
  }
}

export function useCopyToClipboard() {
  return {
    copy: copyToClipboard
  }
}