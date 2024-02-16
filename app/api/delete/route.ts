import { removeDoc } from '@/dummydocs/controller'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
    try {
        const body = (await request.json()) as { docid: string }
        await removeDoc(body.docid)
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ success: false })
    }
}
