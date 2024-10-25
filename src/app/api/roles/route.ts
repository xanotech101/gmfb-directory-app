/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from '@/lib/fetch'
import { NextResponse } from 'next/server'

export async function GET() {
  const response = await get<any>('/api/v1/roles')

  console.log(response)

  return NextResponse.json({
    ...response,
  })
}
