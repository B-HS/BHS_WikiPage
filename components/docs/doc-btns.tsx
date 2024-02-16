'use client'
import { DocProps } from '@/app/doc/[docid]/page'
import { useRouter } from 'next/navigation'
import { createElement, useEffect, useRef, useState } from 'react'
import Button from '../button'
import Modal from '../modal'

interface ModalRefProps {
    open: Function
    close: Function
}

const DocumentButtons = ({ info }: { info: DocProps }) => {
    const router = useRouter()
    const modifyModal = useRef<ModalRefProps>()
    const deleteModal = useRef<ModalRefProps>()
    const [docInfos, setDocInfos] = useState({
        ...info,
        description: info.description?.replace(/<[^>]*>/g, '').replaceAll('🔗', ''),
    })

    const handleChange = (name: string, value: string) => setDocInfos({ ...docInfos, [name]: value })

    const resetChanges = () =>
        setDocInfos({
            ...info,
            description: info.description?.replace(/<[^>]*>/g, '').replaceAll('🔗', ''),
        })

    const modifyDoc = () => {
        if (!docInfos.title || !docInfos.description) {
            alert('값를 입력해 주세요')
            return
        }
        fetch('/api/modify', { method: 'POST', body: JSON.stringify(docInfos) }).then((response) => {
            response.status === 200 && modifyModal.current?.close()
            location.reload()
        })
    }

    const deleteDoc = () => {
        fetch('/api/delete', { method: 'POST', body: JSON.stringify(docInfos) }).then((response) => {
            response.status === 200 && modifyModal.current?.close()
            router.replace('/')
        })
    }

    const ModifyBtns = () => (
        <section className='flex flex-1 justify-end px-3 gap-2'>
            <Button size='md' variant='secondary' onClick={resetChanges}>
                수정 초기화
            </Button>
            <Button size='md' variant='warning' onClick={modifyDoc}>
                수정
            </Button>
            <Button size='md' variant='outline' onClick={() => modifyModal.current?.close()}>
                취소
            </Button>
        </section>
    )

    const DeleteBtns = () => (
        <section className='flex flex-1 justify-end px-3 gap-2'>
            <Button size='md' variant='danger' onClick={deleteDoc}>
                삭제
            </Button>
            <Button size='md' variant='outline' onClick={() => deleteModal.current?.close()}>
                취소
            </Button>
        </section>
    )

    return (
        <section className='flex justify-end gap-3 px-2 py-7'>
            <Modal ref={modifyModal} title='수정' trigger={<Button variant='warning'>수정</Button>} btns={<ModifyBtns />}>
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
            <Modal ref={deleteModal} title='삭제' trigger={<Button variant='danger'>삭제</Button>} btns={<DeleteBtns />}>
                <section className='p-5'>해당 글을 삭제하시겠습니까 ?</section>
            </Modal>
        </section>
    )
}
export default DocumentButtons
