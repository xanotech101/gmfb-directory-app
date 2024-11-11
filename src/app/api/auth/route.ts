/* eslint-disable @typescript-eslint/no-explicit-any */
import { post } from '@/lib/fetch'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'


export async function POST(req: NextRequest) {
  const cookieStore = cookies()

  const payload = (await req.json()) as {
    email: string
    password: string
    otp: string
  }
  const response = await post<any>('/api/v1/auth/login', {
    body: payload,
  })

  cookieStore.set('gmfbEToken', response.data.tokens?.access, {
    httpOnly: true,  //This flag prevents client-side access to the cookie, reducing the risk of XSS attacks.
    secure: process.env.NODE_ENV === 'production', //This ensures the cookie is only sent over HTTPS in production.
    maxAge: 24 * 60 * 60, // 1 day
    path: '/',
  })

  cookieStore.set('gmfbERefreshToken', response.data.tokens?.refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60, // 1 week
    path: '/',
  })

  return NextResponse.json(response)
}
