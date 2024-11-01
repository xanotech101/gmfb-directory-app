/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, post } from '@/lib/fetch'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '50'

  const response = await get<any>(`/api/v1/departments?page=${page}&limit=${limit}`)

  return NextResponse.json({
    ...response,
    data: {
      ...response.data,
    },
  })
}

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as { name: string; hod?: string }
  const response = await post<any>('/api/v1/departments', {
    body: payload,
  })

  return NextResponse.json({
    ...response,
    data: {
      ...response.data,
    },
  })
}

