import { findDocById } from '@/dummydocs/controller'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest, { params }: { params: { docid: string } }) => {
    const page = request.url.split('?')[1].split('=')[1] || 1

    const docs = await findDocById(params.docid, page)
    return NextResponse.json(docs)
}
