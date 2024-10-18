/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from '@/lib/fetch'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'

  const response = await get<any>(`/api/v1/users?page=${page}&limit=${limit}`)

  return NextResponse.json({
    ...response,
    data: {
      ...response.data,
    },
  })
}
