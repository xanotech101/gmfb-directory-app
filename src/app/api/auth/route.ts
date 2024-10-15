/* eslint-disable @typescript-eslint/no-explicit-any */
import { post } from '@/lib/fetch'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as {
    email: string
    password: string
    otp: string
  }
  const response = await post<any>('/api/v1/auth/login', {
    body: payload,
  })

  return NextResponse.json({
    ...response,
    data: {
      ...response.data,
    },
  })
}
