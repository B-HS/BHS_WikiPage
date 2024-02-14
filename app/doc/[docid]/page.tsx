export interface DocProps {
    docid: number | string
    title: string
    description: string
}

const Document = ({ params }: { params: { docid: string } }) => {
    return <section> Document {params.docid} </section>
}

export default Document
