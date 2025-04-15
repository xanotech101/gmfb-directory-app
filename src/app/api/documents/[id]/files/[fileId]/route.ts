/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTokens } from '@/lib/get-tokens'
import { del, get } from '@/lib/fetch'
import { NextResponse } from 'next/server'
import { handleServerError } from '@/lib/handle-server-error'

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string; fileId: string } },
) {
  const { id, fileId } = params
  try {
    if (!id) {
      return NextResponse.json('Document ID is required', { status: 400 })
    }

    if (!fileId) {
      return NextResponse.json('File ID is required', { status: 400 })
    }

    const { accessToken } = await getTokens()
    const response = await del<any>(`/api/v1/documents/${params.id}/files/${fileId}`, {
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
