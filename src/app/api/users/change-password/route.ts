/* eslint-disable @typescript-eslint/no-explicit-any */

import { getTokens } from '@/lib/get-tokens'
import { patch } from '@/lib/fetch'
import { NextResponse } from 'next/server'
import { handleServerError } from '@/lib/handle-server-error'

export async function PATCH(request: Request) {
  const body = await request.json()

  const {accessToken} = await getTokens()

  try {
    const response = await patch<any>('/api/v1/users/change-password', {
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