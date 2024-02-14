import List from '@/components/list/list'
import { DocProps } from './doc/[docid]/page'

const Home = () => {
    const dummy = Array.from({ length: 30 }).map((_, idx) => ({ docid: idx, title: `title${idx}`, description: `description${idx}` })) as DocProps[]
    return (
        <section className='flex flex-col flex-1'>
            <List docs={dummy} />
        </section>
    )
}

export default Home
