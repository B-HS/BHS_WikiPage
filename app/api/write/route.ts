import { insertDoc } from '@/dummydocs/service'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json()
        return NextResponse.json({ success: true, ...(await insertDoc(body)) })
    } catch (error) {
        return NextResponse.json({ success: false })
    }
}
