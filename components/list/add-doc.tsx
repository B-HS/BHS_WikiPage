'use client'
import { PageContext } from '@/context/contexts/page-context'
import { useRouter } from 'next/navigation'
import { createElement, useContext, useRef, useState } from 'react'
import Button from '../button'
import Modal from '../modal'
import { DEFAULT_PAGING_CNT } from '@/util/constant'

interface ModalRefProps {
    open: Function
    close: Function
}

const AddDoc = () => {
    const { setPage, setKeyword } = useContext(PageContext)
    const router = useRouter()
    const addModal = useRef<ModalRefProps>()
    const [docInfos, setDocInfos] = useState({
        title: '',
        description: '',
    })
    const handleChange = (name: string, value: string) => setDocInfos({ ...docInfos, [name]: value })
    const resetChanges = () =>
        setDocInfos({
            title: '',
            description: '',
        })

    const addDoc = () => {
        if (!docInfos.title || !docInfos.description) {
            alert('값를 입력해 주세요')
            return
        }
        fetch('/api/write', { method: 'POST', body: JSON.stringify(docInfos) }).then(async (response) => {
            const { total, docid } = await response.json()
            const page = total % DEFAULT_PAGING_CNT === 1 ? Math.ceil(total / DEFAULT_PAGING_CNT) - 1 : Math.ceil(total / DEFAULT_PAGING_CNT)
            setPage(page)
            setKeyword('')
            router.push(`/doc/${docid}?page=${page}`)
            resetChanges()
        })
    }

    const AddBtns = () => (
        <section className='flex flex-1 justify-end px-3 gap-2'>
            <Button size='md' variant='secondary' onClick={resetChanges}>
                초기화
            </Button>
            <Button size='md' variant='primary' onClick={addDoc}>
                등록
            </Button>
            <Button size='md' variant='outline' onClick={() => addModal.current?.close()}>
                취소
            </Button>
        </section>
    )

    return (
        <section>
            <Modal
                ref={addModal}
                title='추가'
                trigger={
                    <Button size='sm' variant='outline' className='rounded-none'>
                        추가
                    </Button>
                }
                btns={<AddBtns />}
            >
                <section className='p-5'>
                    {['title', 'description'].map((item) => (
                        <section key={item} className='my-2 space-y-2'>
                            <label className='capitalize' htmlFor={item}>
                                {item}
                            </label>
                            {createElement(item === 'description' ? 'textarea' : 'input', {
                                id: item,
                                className: 'w-full border p-3 shadow placeholder:capitalize ' + (item === 'description' ? 'h-[50vh]' : ''),
                                placeholder: item,
                                value: docInfos[item as keyof typeof docInfos],
                                onChange: (e: { target: { value: string } }) => handleChange(item, e.target.value),
                            })}
                        </section>
                    ))}
                </section>
            </Modal>
        </section>
    )
}

export default AddDoc
