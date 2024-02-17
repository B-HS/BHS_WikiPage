import Button from '@/components/button'
import { clearAllWikiList, setDummyJson } from '@/util/page-util'
import Link from 'next/link'

const Home = async () => {
    const removeWikiList = async () => {
        'use server'
        await clearAllWikiList()
    }

    const setDummyData = async () => {
        'use server'
        await setDummyJson()
    }
    return (
        <div>
            <p className='text-3xl font-bold'>코딩허브 프론트엔드 과제 - 위키페이지</p>
            <p>2023. 02. 18 - 변현석</p>
            <section className='flex gap-2 py-3'>
                <Link href='/doc'>
                    <Button variant='outline'>위키페이지로 이동하기</Button>
                </Link>
                <form action={removeWikiList}>
                    <Button type='submit' variant='danger'>
                        위키 목록 지우기
                    </Button>
                </form>
                <form action={setDummyData}>
                    <Button type='submit' variant='warning'>
                        위키 더미데이터로 교체하기
                    </Button>
                </form>
            </section>
        </div>
    )
}
export default Home
