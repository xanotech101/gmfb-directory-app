/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, post } from '@/lib/fetch'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '50'
  const search = searchParams.get('search') || ''

  const response = await get<any>(`/api/v1/users?page=${page}&limit=${limit}&search=${search}`)

  return NextResponse.json({
    ...response,
    data: {
      ...response.data,
    },
  })
}

export async function POST(request: Request) {
  const body = await request.json()

  const response = await post<any>('/api/v1/users/invite', {
    body,
  })

  return NextResponse.json({
    ...response,
    data: {
      ...response.data,
    },
  })
}
