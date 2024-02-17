import { findDocs } from '@/dummydocs/controller'
import { DEFAULT_PAGING_CNT } from '@/util/constant'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
    const COUNT = DEFAULT_PAGING_CNT
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const keyword = url.searchParams.get('keyword') || undefined
    const docs = await findDocs({ keyword, page }, COUNT)
    return NextResponse.json(docs)
}
