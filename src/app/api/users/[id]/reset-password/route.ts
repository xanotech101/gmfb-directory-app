/* eslint-disable @typescript-eslint/no-explicit-any */

import { getTokens } from '@/lib/get-tokens'
import { patch } from '@/lib/fetch'
import { NextResponse } from 'next/server'
import { handleServerError } from '@/lib/handle-server-error'

export async function PATCH(_request: Request, { params }: { params: { id: string } }) {
  const { accessToken } = await getTokens()
console.log(params.id)
  if(!params.id) {
    return NextResponse.json('User ID is required', { status: 400 })
  }

  try {
    const response = await patch<any>(`/api/v1/users/${params.id}/reset-password`, {
      body: {},
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