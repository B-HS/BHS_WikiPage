import Navigation from './navagation'

const Header = () => {
    return (
        <header className='sticky top-0 z-50 w-full border-b backdrop-blur'>
            <section className='flex h-14 justify-between items-center px-3'>
                <a href={'/'} className='flex gap-2 items-center text-xl font-bold'>
                    위키
                </a>
                <Navigation />
            </section>
        </header>
    )
}

export default Header
