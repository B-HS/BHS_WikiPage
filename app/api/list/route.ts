import { findDocs } from '@/dummydocs/controller'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest, { params }: { params: { docid: string } }) => {
    const COUNT = 5
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)

    const docs = await findDocs(page, COUNT)
    return NextResponse.json(docs)
}
