/**
 * This module provides simple encryption and decryption functionalities
 * using the RC4 stream cipher.
 *
 * @module crypto
 */

'use strict'

const HEX_CHARS = '0123456789abcdef'

/**
 * Converts a hexadecimal string into an array of bytes.
 * @param hexString - The hexadecimal string to convert.
 * @returns An array of bytes.
 */
function hexStringToByteArray(hexString: string): number[] {
  if (typeof hexString !== 'string') {
    return []
  }

  const bytes: number[] = []
  for (let i = 0; i < hexString.length; i += 2) {
    const high = HEX_CHARS.indexOf(hexString[i])
    const low = HEX_CHARS.indexOf(hexString[i + 1])
    bytes.push((high << 4) | low)
  }
  return bytes
}

/**
 * Converts an array of bytes into a hexadecimal string.
 * @param bytes - The array of bytes to convert.
 * @returns A hexadecimal string.
 */
function byteArrayToHexString(bytes: number[]): string {
  let result = ''
  for (const byte of bytes) {
    result += HEX_CHARS[(byte >> 4) & 0x0F]
    result += HEX_CHARS[byte & 0x0F]
  }
  return result
}

/**
 * RC4 stream cipher implementation.
 * WARNING: RC4 is considered cryptographically insecure and should not be
 * used for sensitive data. It is provided here for compatibility or
 * educational purposes only.
 */
class RC4 {
  private s: number[]
  private i: number
  private j: number

  /**
   * Creates a new RC4 instance with the given key.
   * @param key - The encryption/decryption key as a string or byte array.
   */
  constructor(key: string | number[]) {
    const keyBytes = typeof key === 'string' ? this.stringToByteArray(key) : key
    this.s = []
    this.i = 0
    this.j = 0
    this.initialize(keyBytes)
  }

  /**
   * Initializes the RC4 state with the given key.
   * @param key - The key as an array of bytes.
   */
  private initialize(key: number[]): void {
    // Initialize state array
    for (let i = 0; i < 256; i++) {
      this.s[i] = i
    }

    // Key-scheduling algorithm (KSA)
    let j = 0
    for (let i = 0; i < 256; i++) {
      j = (j + this.s[i] + (key[i % key.length] || 0)) % 256
      this.swap(i, j)
    }

    // Reset indices
    this.i = 0
    this.j = 0
  }

  /**
   * Swaps two elements in the state array.
   * @param i - First index.
   * @param j - Second index.
   */
  private swap(i: number, j: number): void {
    const temp = this.s[i]
    this.s[i] = this.s[j]
    this.s[j] = temp
  }

  /**
   * Generates the next pseudo-random byte.
   * @returns The next pseudo-random byte.
   */
  private nextByte(): number {
    this.i = (this.i + 1) % 256
    this.j = (this.j + this.s[this.i]) % 256
    this.swap(this.i, this.j)
    return this.s[(this.s[this.i] + this.s[this.j]) % 256]
  }

  /**
   * Encrypts or decrypts the given data.
   * @param data - The data to process (as string or byte array).
   * @returns The processed data as a byte array.
   */
  crypt(data: string | number[]): number[] {
    const input = typeof data === 'string' ? this.stringToByteArray(data) : data
    const output: number[] = []

    for (let k = 0; k < input.length; k++) {
      output[k] = input[k] ^ this.nextByte()
    }

    return output
  }

  /**
   * Converts a string to an array of bytes.
   * @param str - The string to convert.
   * @returns An array of bytes.
   */
  private stringToByteArray(str: string): number[] {
    const bytes: number[] = []
    for (let i = 0; i < str.length; i++) {
      bytes.push(str.charCodeAt(i) & 0xFF)
    }
    return bytes
  }
}

/**
 * Encrypts a message using RC4.
 * @param message - The message to encrypt.
 * @param key - The encryption key.
 * @returns The encrypted message as a hexadecimal string.
 */
export function encrypt(message: string, key: string): string {
  const rc4 = new RC4(key)
  const encrypted = rc4.crypt(message)
  return byteArrayToHexString(encrypted)
}

/**
 * Decrypts a message using RC4.
 * @param encryptedMessage - The encrypted message as a hexadecimal string.
 * @param key - The decryption key.
 * @returns The decrypted message.
 */
export function decrypt(encryptedMessage: string, key: string): string {
  const rc4 = new RC4(key)
  const encryptedBytes = hexStringToByteArray(encryptedMessage)
  const decryptedBytes = rc4.crypt(encryptedBytes)

  // Convert byte array back to string
  return String.fromCharCode(...decryptedBytes)
}

export default {
  encrypt,
  decrypt
}
