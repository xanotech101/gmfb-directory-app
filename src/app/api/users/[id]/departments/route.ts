/* eslint-disable @typescript-eslint/no-explicit-any */

import { getTokens } from '@/lib/get-tokens'
import { patch } from '@/lib/fetch'
import { NextResponse } from 'next/server'
import { handleServerError } from '@/lib/handle-server-error'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const { accessToken } = await getTokens()

  if(!params.id) {
    return NextResponse.json('User ID is required', { status: 400 })
  }

  try {
    const response = await patch<any>(`/api/v1/users/${params.id}`, {
      body,
      options: {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    })
    return NextResponse.json(response)
  } catch (error) {
    return handleServerError(error)
  }
}