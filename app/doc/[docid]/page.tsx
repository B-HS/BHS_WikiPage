import { PageSetter } from '@/context/contexts/page-context'
import { headers } from 'next/headers'
import Doc from '../../../components/docs/doc'

export interface DocProps {
    docid: number | string
    title: string
    description: string
}

const Document = async ({ params, searchParams }: { params: { docid: string }; searchParams: { page: string } }) => {
    const headersList = headers()
    const domain = headersList.get('x-forwarded-host')
    const origin = headersList.get('x-forwarded-proto')
    const currentURL = `${origin}://${domain}`
    const fetchData = await fetch(`${currentURL}/api/doc/${params.docid}?page=${searchParams.page}`)
    const { title, docid, description } = await fetchData.json()
    return (
        <>
            <Doc doc={{ title, docid, description }} />
            <PageSetter />
        </>
    )
}

export default Document
