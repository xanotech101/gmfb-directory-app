/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, post } from '@/lib/fetch'
import { NextRequest, NextResponse } from 'next/server'
import { getTokens } from '@/lib/get-tokens'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '50'

  const {accessToken} = await getTokens()
  const response = await get<any>(`/api/v1/announcements?page=${page}&limit=${limit}`, {
    options: {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  })

  return NextResponse.json(response)
}


export async function POST(req: NextRequest) {
  const {accessToken} = await getTokens()
  const payload = (await req.json()) as { name: string; hod?: string }
  const response = await post<any>('/api/v1/announcements', {
    body: payload,
    options: {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  })

  return NextResponse.json(response)
}
