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
export const findDocByDocid = async (docid: string, page: number | string) => {
    try {
        const docs = await getFullFiles()
        const targetDoc = docs.find((ele) => ele.docid.toString() === docid)
        if (targetDoc) {
            // 전체 리스트에서  씌울 title 추출
            // 글자가 긴 순으로 정렬(중복되는 문자열이 있을 경우 긴 순서부터 하면 중복replacing 방지 가능)
            const replacelist = docs
                .filter((ele) => {
                    const regex = new RegExp(`\\b${escapeRegExp(ele.title)}\\b`, 'g')
                    return regex.test(targetDoc.description)
                })
                .map((ele) => ({ ...ele, isReplaced: false }))
                .sort((a, b) => b?.description.length - a?.description.length)

            // 다른 중복문자열 문제를 피하기위해 정렬된 Title arrayt 기준으로 본문을 인덱스로 REPLACING
            replacelist.forEach((ele, idx) => {
                if (!ele.isReplaced && ele.title) {
                    const regex = new RegExp(`\\b${escapeRegExp(ele.title)}\\b`, 'g')
                    targetDoc.description = targetDoc.description.replace(regex, `$[${idx}]$`)
                    ele.isReplaced = true
                }
            })
            // $[숫자]$용 regex
            const regexPlaceholder = /\$\[(\d+)\]\$/g

            // Description에 INDEX 기준으로 최종 결과 Anchor 추가
            const replacedDescription = targetDoc.description.replace(regexPlaceholder, (match, index) => {
                index = parseInt(index)
                if (index >= 0 && index < replacelist.length) {
                    const ele = replacelist[index]
                    // 목표title이 replacing할 description의 title과 같은 경우
                    if (ele.title === targetDoc.title) {
                        return ele.title
                    }
                    return `<a class='border-b' href="/doc/${ele.docid}?page=${page}">${ele.title} 🔗</a>`
                }
                return match
            })

            targetDoc.description = replacedDescription
            return targetDoc
        }
        return {}
    } catch (error) {
        console.error('Error fetching documents:', error)
        return {}
    }
}

// 더미 doc 추가
export const insertDoc = async (doc: DocProps): Promise<{ total: number; docid: string }> => {
    try {
        const docs = await getFullFiles()
        const docid = crypto.randomUUID()
        doc.docid = docid
        docs.push(doc)
        await writeDoc(docs)
        return { total: docs.length + 1, docid }
    } catch (error) {
        console.error('Error inserting document:', error)
        return { total: -1, docid: '' }
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
