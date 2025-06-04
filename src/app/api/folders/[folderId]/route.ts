/* eslint-disable @typescript-eslint/no-explicit-any */

import { del, get, put } from '@/lib/fetch'
import { NextRequest, NextResponse } from 'next/server'
import { getTokens } from '@/lib/get-tokens'
import { handleServerError } from '@/lib/handle-server-error'

export async function PUT(req: NextRequest, { params }: { params: { folderId: string } }) {
  const body = await req.json()
  const folderId = params.folderId
  try {
    if (!folderId) {
      return new Response('Folder ID is required', { status: 400 })
    }

    const { accessToken } = await getTokens()

    const response = await put<any>(`/api/v1/folders/${folderId}`, {
      body,
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

export async function GET(_req: NextRequest, { params }: { params: { folderId: string } }) {
  const folderId = params.folderId
  try {
    if (!folderId) {
      return new Response('Folder ID is required', { status: 400 })
    }

    const { accessToken } = await getTokens()

    const response = await get<any>(`/api/v1/folders/${folderId}`, {
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

export async function DELETE(_req: NextRequest, { params }: { params: { folderId: string } }) {
  const folderId = params.folderId
  try {
    if (!folderId) {
      return new Response('Folder ID is required', { status: 400 })
    }

    const { accessToken } = await getTokens()

    const response = await del<any>(`/api/v1/folders/${folderId}`, {
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
