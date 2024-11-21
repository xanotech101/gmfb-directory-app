/* eslint-disable @typescript-eslint/no-explicit-any */
import { post } from '@/lib/fetch'
import { NextRequest, NextResponse } from 'next/server'
import { getTokens } from '@/lib/get-tokens'
import { handleServerError } from '@/lib/handle-server-error'

export async function POST(req: NextRequest) {
  const {accessToken} = await getTokens()
  const payload = (await req.json()) as { email: string; type: string }
  try {
    const response = await post<any>('/api/v1/otps/generate', {
      body: payload,
      options: {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    })
    return NextResponse.json(response)
  } catch (error) {
    return handleServerError(error)
  }
}
