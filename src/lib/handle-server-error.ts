/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'

export const handleServerError = async (error: any) => {
  return NextResponse.json(
    {
      message: error.message || 'Failed to process the request',
      details: error.errors || [],
    },
    { status: error.code || 500 }
  );
}