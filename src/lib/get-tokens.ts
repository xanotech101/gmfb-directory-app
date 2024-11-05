"use server"

import { cookies } from 'next/headers'

export async function getTokens() {
  const cookiesStore = cookies()

  const accessToken = cookiesStore.get('gmfbEToken')?.value
  const refreshToken = cookiesStore.get('gmfbRefreshToken')?.value

  return {accessToken, refreshToken}
}