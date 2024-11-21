/* eslint-disable @typescript-eslint/no-explicit-any */

import { get } from '@/lib/fetch'
import { NextRequest, NextResponse } from 'next/server'
import { getTokens } from '@/lib/get-tokens'
import { handleServerError } from '@/lib/handle-server-error'

export async function GET(_req: NextRequest, { params }: { params: { roleId:string }}) {
  const roleId = params.roleId
  try {
    if (!roleId) {
      return new Response('Role ID is required', { status: 400 })
    }

    const { accessToken } = await getTokens()

    const response = await get<any>(`/api/v1/roles/${roleId}`, {
      options: {
        headers: {
          'authorization': `Bearer ${accessToken}`
        }
      }
    })
    return NextResponse.json(response)
  } catch(error) {
    return handleServerError(error)
  }
}