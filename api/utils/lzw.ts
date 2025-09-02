// eslint-disable-next-line ts/ban-ts-comment
// @ts-nocheck
/**
 * LZW Compression/Decompression
 * Implements LZW algorithm for string compression/decompression
 */

interface LzwDictionary {
  [key: string]: number
  [key: number]: string
}

/**
 * Encodes a string using LZW compression
 * @param input The string to encode
 * @returns Compressed string with 'lzw:' prefix
 */
export function lzwEncode(input: string): string {
  if (!input) {return 'lzw:'}

  const dict: LzwDictionary = {}
  let nextCode = 256
  let current = input[0]
  let result = ''

  // Initialize dictionary with all single characters
  for (let i = 0; i < 256; i++) {
    dict[String.fromCharCode(i)] = i
  }

  for (let i = 1; i < input.length; i++) {
    const char = input[i]
    const combined = current + char

    if (dict[combined] !== undefined) {
      current = combined
    } else {
      result += String.fromCharCode(dict[current])
      dict[combined] = nextCode++
      current = char
    }
  }

  // Add the last sequence
  result += String.fromCharCode(dict[current])
  return `lzw:${result}`
}

/**
 * Decodes a string compressed with LZW
 * @param encoded The compressed string with 'lzw:' prefix
 * @returns The original uncompressed string
 * @throws {Error} If the input is not a valid LZW-encoded string
 */
export function lzwDecode(encoded: string): string {
  if (!encoded.startsWith('lzw:')) {
    throw new Error('Invalid LZW encoded string')
  }

  const data = encoded.substring(4)
  if (!data) {return ''}

  const dict: LzwDictionary = {}
  let nextCode = 256

  // Initialize dictionary with all single characters
  for (let i = 0; i < 256; i++) {
    dict[i] = String.fromCharCode(i)
  }

  let current = String.fromCharCode(data.charCodeAt(0))
  let result = current

  for (let i = 1; i < data.length; i++) {
    const code = data.charCodeAt(i)
    let entry: string

    if (dict[code] !== undefined) {
      entry = dict[code]
    } else if (code === nextCode) {
      entry = current + current[0]
    } else {
      throw new Error('Invalid LZW encoding')
    }

    result += entry
    dict[nextCode++] = current + entry[0]
    current = entry
  }

  return result
}
