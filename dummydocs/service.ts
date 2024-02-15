import { DocProps } from '@/app/doc/[docid]/page'
import fs from 'fs/promises'
import path from 'path'

// 더미 doc READ IO
const getFullFiles = async (): Promise<DocProps[]> => {
    try {
        const filePath = path.join(process.cwd(), 'dummydocs', 'dummyDocs.json')
        const files = await fs.readFile(filePath, 'utf-8')
        return JSON.parse(files)
    } catch (error) {
        return []
    }
}

// 더미 doc INSERT IO
const writeDoc = async (docs: DocProps[]) => fs.writeFile(path.join(process.cwd(), 'dummydocs', 'dummyDocs.json'), JSON.stringify(docs))

// 더미 doc Read시에 이름 문자열을 처리할 Regexp
// +, ? 등등 \붙여서 리턴
const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// 더미 doc 페이징 리스트 출력
export const findDocsWithPageable = async (page: number, cnt: number) => {
    const docs = await getFullFiles()
    return { data: docs.splice(cnt * (page - 1), cnt), total: docs.length + cnt }
}

// 더미 doc docid기준으로 READ, 자동 링크처리를 위해 doc전체목록 + replace로 해당 타이틀을 anchor로 replacing
// 테스트 기준 20만자
// ㄴ api 처리 400ms +-10,
// ㄴ 렌더링까지 1~2.5초
export const findDocByDocid = async (docid: string, page: number | string) => {
    try {
        const docs = await getFullFiles()
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

// 더미 doc 추가
export const insertDoc = async (doc: DocProps): Promise<void> => {
    try {
        const docs = await getFullFiles()
        docs.push(doc)
        await writeDoc(docs)
    } catch (error) {
        console.error('Error inserting document:', error)
    }
}

// 더미 doc 업데이트
export const updateDoc = async (doc: DocProps): Promise<void> => {
    try {
        const docs = await getFullFiles()
        const index = docs.findIndex((ele) => ele.docid === doc.docid)
        if (index !== -1) {
            docs[index] = doc
            await writeDoc(docs)
        }
    } catch (error) {
        console.error('Error updating document:', error)
    }
}

// 더미 doc 삭제
export const deleteDoc = async (docid: string): Promise<void> => {
    try {
        const docs = await getFullFiles()
        const index = docs.findIndex((ele) => ele.docid === docid)
        if (index !== -1) {
            docs.splice(index, 1)
            await writeDoc(docs)
        }
    } catch (error) {
        console.error('Error deleting document:', error)
    }
}
