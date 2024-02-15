'use client'

import { useRouter } from 'next/navigation'
import Button from './button'
import { ArrowLeft } from 'lucide-react'

const GoBackButton = () => {
    const router = useRouter()
    return (
        <Button variant='outline' size='iconMd' onClick={() => router.back()}>
            <ArrowLeft />
        </Button>
    )
}

export default GoBackButton
