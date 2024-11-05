import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'


export async function POST(req: NextRequest) {
  const cookieStore = cookies()

  cookieStore.delete('gmfbEToken')
  cookieStore.delete('gmfbERefreshToken')

  return NextResponse.redirect(new URL('/', req.url))
}