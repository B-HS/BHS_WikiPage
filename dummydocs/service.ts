import { DocProps } from '@/app/doc/[docid]/page'
import fs from 'fs/promises'
import path from 'path'

const getFullfiles = async (): Promise<DocProps[]> => {
    try {
        const filePath = path.join(process.cwd(), 'dummydocs', 'dummyDocs.json')
        const files = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(files)
    } catch (error) {
        return []
    }
}

const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
export const findDocsWithPageable = async (page: number, cnt: number) => {
    const docs = await getFullfiles()
    return { data: docs.splice(cnt * (page - 1), cnt), total: docs.length + cnt }
}

export const findDocByDocid = async (docid: string, page: number | string) => {
    try {
        const docs = await getFullfiles()
        const targetDoc = docs.find((ele) => ele.docid.toString() === docid)
        if (targetDoc) {
            docs.forEach((ele) => {
                if (ele.title !== targetDoc.title) {
                    const regex = new RegExp(`\\b${escapeRegExp(ele.title)}\\b`, 'g')
                    targetDoc.description = targetDoc.description.replace(regex, `<a class='border-b' href="/doc/${ele.docid}?page=${page}">${ele.title} 🔗</a>`)
                }
            })
        }
        return targetDoc
    } catch (error) {
        console.error('Error fetching documents:', error)
        return null
    }
}
