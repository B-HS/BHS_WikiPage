import fs from 'fs/promises'
import path from 'path'

const dummyPath = path.join(process.cwd(), 'dummydocs')
export const clearAllWikiList = async () => {
    fs.writeFile(`${dummyPath}/dummyDocs.json`, JSON.stringify([]))
}
export const setDummyJson = async () => {
    fs.cp(`${dummyPath}/dummyorg.json`, `${dummyPath}/dummyDocs.json`, { force: true })
}
