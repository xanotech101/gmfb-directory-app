import { NextResponse } from 'next/server'
import { version } from '../../../../package.json'
export async function GET(request: Request) {
  const response = {
    status: 'ok',
    message: 'Alive and kicking!',
    version,
    uptime: process.uptime(),
  }
  return NextResponse.json(response)
}
