export async function createHashedPassword(password: string): Promise<string> {
  const { createHash } = await import('node:crypto')

  return createHash('sha256')
    .update(password.trim())
    .digest('hex')
}
