/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from '@/lib/fetch'
import { NextResponse } from 'next/server'
import { getTokens } from '@/lib/get-tokens'

export async function GET() {
  const {accessToken} = await getTokens()
  const response = await get<any>('/api/v1/analytics', {
    options: {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  })

  return NextResponse.json(response)
}
