import { findDocByDocid, findDocsWithPageable } from './service'

export const findDocs = (page: number, cnt: number) => {
    return findDocsWithPageable(page, cnt)
}

export const findDocById = (docid: string, page: number | string) => {
    return findDocByDocid(docid, page)
}
