import { NextRequest, NextResponse } from 'next/server'
import { handleServerError } from '@/lib/handle-server-error'

const BASE_URL = process.env.API_BASE_URL as string
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) { // 10MB limit
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 })
    }

    const response = await fetch(`${BASE_URL}/api/v1/media-upload`, {
      method: 'POST',
      body: formData,
    })

    if(!response.ok) {
      throw await response.json()
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return handleServerError(error)
  }
}