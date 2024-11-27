/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTokens } from '@/lib/get-tokens'
import { put } from '@/lib/fetch'
import { NextResponse } from 'next/server'
import { handleServerError } from '@/lib/handle-server-error'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { accessToken } = await getTokens()
  const body = await request.json()

  if(!params.id) {
    return NextResponse.json('Department ID is required', { status: 400 })
  }

  try {
    const response = await put<any>(`/api/v1/departments/${params.id}`, {
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