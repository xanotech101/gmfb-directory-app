import { NextRequest, NextResponse } from 'next/server'
import { patch } from '@/lib/fetch'
import { getTokens } from '@/lib/get-tokens'
import { handleServerError } from '@/lib/handle-server-error'

export async function PATCH(req: NextRequest, { params }: { params: { roleId: string } }) {
  try {
    const roleId = params.roleId
    const payload = (await req.json()) as { permissions: string[] }

    if (!roleId) {
      return new Response('Role ID is required', { status: 400 })
    }

    const { accessToken } = await getTokens()
    const response = await patch(`/api/v1/roles/${roleId}/permissions`, {
      body: payload,
      options: {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    })
    return NextResponse.json(await response)
  } catch (error) {
    return handleServerError(error)
  }

}