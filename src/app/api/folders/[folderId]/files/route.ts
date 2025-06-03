/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from '@/lib/fetch'
import { getTokens } from '@/lib/get-tokens'
import { handleServerError } from '@/lib/handle-server-error'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: { folderId: string } }) {
  const folderId = params.folderId
  try {
    if (!folderId) {
      return new Response('Folder ID is required', { status: 400 })
    }

    const { accessToken } = await getTokens()

    const response = await get<any>(`/api/v1/folders/${folderId}/files`, {
      options: {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    })
    return NextResponse.json(response)
  } catch (error) {
    return handleServerError(error)
  }
}
