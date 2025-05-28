/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, post } from '@/lib/fetch'
import { NextRequest, NextResponse } from 'next/server'
import { getTokens } from '@/lib/get-tokens'
import { handleServerError } from '@/lib/handle-server-error'
import { ITEMS_PER_PAGE } from '@/constants'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || ITEMS_PER_PAGE
  try {
    const { accessToken } = await getTokens()
    const response = await get<any>(`/api/v1/announcements?page=${page}&limit=${limit}`, {
      options: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    })
    return NextResponse.json(response)
  } catch (error) {
    return handleServerError(error)
  }
}

export async function POST(req: NextRequest) {
  const { accessToken } = await getTokens()
  try {
    const payload = (await req.json()) as { name: string; hod?: string }
    const response = await post<any>('/api/v1/announcements', {
      body: payload,
      options: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    })
    return NextResponse.json(response)
  } catch (error) {
    return handleServerError(error)
  }
}
