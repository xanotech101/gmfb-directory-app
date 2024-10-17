/* eslint-disable @typescript-eslint/no-explicit-any */
import { post } from '@/lib/fetch'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as { email: string; type: string }
  const response = await post<any>('/api/v1/otps/generate', {
    body: payload,
  })

  return NextResponse.json({
    ...response,
    data: {
      ...response.data,
    },
  })
}
