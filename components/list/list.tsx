import { DocProps } from '@/app/doc/[docid]/page'
import ListTile from './list-tile'

const List = ({ docs }: { docs: DocProps[] }) => {
    return (
        <section className='flex flex-col gap-2'>
            {docs.map((ele) => (
                <ListTile key={ele.title} info={ele} />
            ))}
        </section>
    )
}
export default List
