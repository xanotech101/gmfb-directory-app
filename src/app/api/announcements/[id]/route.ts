/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTokens } from '@/lib/get-tokens'
import { get } from '@/lib/fetch'
import { NextResponse } from 'next/server'
import { handleServerError } from '@/lib/handle-server-error'

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    if(!params.id) {
      return NextResponse.json('Announcement ID is required', { status: 400 })
    }
    const { accessToken } = await getTokens()
    const response = await get<any>(`/api/v1/announcements/${params.id}`, {
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
