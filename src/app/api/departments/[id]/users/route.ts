/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from '@/lib/fetch'
import { NextResponse } from 'next/server'
import { getTokens } from '@/lib/get-tokens'
import { handleServerError } from '@/lib/handle-server-error'

export async function GET(request: Request, { params: { id } }: { params: { id: string } }) {
  const { accessToken } = await getTokens()

  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '50'
  const search = searchParams.get('search') || ''

  try {
    const response = await get<any>(`/api/v1/departments/${id}/users?page=${page}&limit=${limit}&search=${search}`, {
      options: {
        headers: {
          'authorization': `Bearer ${accessToken}`,
        },
      },
    })

    return NextResponse.json(response)
  } catch (error) {
    return handleServerError(error)
  }
}

