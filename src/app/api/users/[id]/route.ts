/* eslint-disable @typescript-eslint/no-explicit-any */

import { getTokens } from '@/lib/get-tokens'
import { del } from '@/lib/fetch'
import { NextResponse } from 'next/server'
import { handleServerError } from '@/lib/handle-server-error'

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { accessToken } = await getTokens()

  if (!params.id) {
    return NextResponse.json('User ID is required', { status: 400 })
  }

  try {
    const response = await del<any>(`/api/v1/users/${params.id}`, {
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
