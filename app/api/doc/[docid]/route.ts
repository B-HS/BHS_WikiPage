import { findDocById } from '@/dummydocs/controller'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest, { params }: { params: { docid: string } }) => {
    const searchParamObj = new URLSearchParams(request.url)
    const page = Number(searchParamObj.get('page')) || 1
    const keyword = searchParamObj.get('keyword') || undefined

    const docs = await findDocById(params.docid, { page, keyword })
    return NextResponse.json(docs)
}
