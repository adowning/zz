export const hashPassword = async (password: string): Promise<string> => {
  return await Bun.password.hash(password)
}

export const isPasswordMatch = async (password: string, hash: string): Promise<boolean> => {
  return await Bun.password.verify(password, hash)
}
