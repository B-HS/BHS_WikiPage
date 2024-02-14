import Button from '@/components/button'

const Navigation = () => {
    return (
        <section className='flex flex-wrap space-x-2'>
            <Button size='md' variant='ghost'>
                목록
            </Button>
            <Button size='md' variant='ghost'>
                추가
            </Button>
        </section>
    )
}

export default Navigation
