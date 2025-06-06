/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, post } from '@/lib/fetch'
import { NextResponse } from 'next/server'
import { getTokens } from '@/lib/get-tokens'
import { handleServerError } from '@/lib/handle-server-error'
import { ITEMS_PER_PAGE } from '@/constants'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || ITEMS_PER_PAGE
  const search = searchParams.get('search') || ''

  const { accessToken } = await getTokens()
  const response = await get<any>(`/api/v1/users?page=${page}&limit=${limit}&search=${search}`, {
    options: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  })

  return NextResponse.json(response)
}

export async function POST(request: Request) {
  const body = await request.json()
  try {
    const { accessToken } = await getTokens()
    const response = await post<any>('/api/v1/users/invite', {
      body,
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
