/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, post } from '@/lib/fetch'
import { NextResponse, NextRequest } from 'next/server'
import { getTokens } from '@/lib/get-tokens'

export async function GET() {
  const response = await get<any>('/api/v1/roles')
  return NextResponse.json(response)
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as any
  const {accessToken} = await getTokens()
  const response = await post<any>('/api/v1/roles', {
    body: body,
    options: {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  })
  return NextResponse.json(response)
}

