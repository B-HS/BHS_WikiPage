import { DocProps } from '@/app/doc/[docid]/page'
import { deleteDoc, findDocByDocid, findDocsWithPageable, insertDoc, updateDoc } from './service'

export const findDocs = (page: number, cnt: number) => {
    return findDocsWithPageable(page, cnt)
}

export const findDocById = (docid: string, page: number | string) => {
    return findDocByDocid(docid, page)
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
