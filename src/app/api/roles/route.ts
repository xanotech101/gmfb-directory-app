/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, post } from '@/lib/fetch'
import { NextResponse, NextRequest } from 'next/server'

export async function GET() {
  const response = await get<any>('/api/v1/roles')

  return NextResponse.json({
    ...response,
  })
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as any
  const response = await post<any>('/api/v1/roles', {
    body: body,
  })

  return NextResponse.json({
    ...response,
  })
}

