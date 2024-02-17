import { DocProps } from '@/app/doc/[docid]/page'
import { deleteDoc, findDocByDocid, findDocsWithPageable, insertDoc, updateDoc } from './service'

export interface RequestParam {
    page: number
    keyword?: string
}

export const findDocs = (info: RequestParam, cnt: number) => {
    return findDocsWithPageable(info, cnt)
}

export const findDocById = (docid: string, info: RequestParam) => {
    !info.keyword && delete info.keyword
    return findDocByDocid(docid, info)
}

export const writeDoc = (doc: DocProps) => {
    return insertDoc(doc)
}

export const modifyDoc = (doc: DocProps) => {
    return updateDoc(doc)
}

export const removeDoc = (docid: string) => {
    return deleteDoc(docid)
}
