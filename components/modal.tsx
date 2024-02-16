'use client'
import { XIcon } from 'lucide-react'
import { ReactNode, forwardRef, useImperativeHandle, useState } from 'react'

interface ModalProps {
    title: string
    children: ReactNode
    btns: ReactNode
    trigger: ReactNode
}

const Modal = forwardRef(({ title, children, btns, trigger }: ModalProps, eModal) => {
    const [isModal, setIsModal] = useState(false)
    const open = () => setIsModal(true)
    const close = () => setIsModal(false)

    useImperativeHandle(eModal, () => ({
        open,
        close,
    }))

    return (
        <section onKeyDown={(e) => e.key === 'Escape' && close()}>
            <section className='w-full h-full' onClick={open}>
                {trigger}
            </section>
            {isModal && (
                <section className='fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur' onClick={close}>
                    <section
                        className='fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex justify-center items-center w-full max-w-3xl z-50'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <section className='relative overflow-hidden rounded-lg bg-white shadow-xl transition-all w-full'>
                            <section className='bg-white py-5'>
                                <section>
                                    <section className='mt-3 text-center sm:mt-0 sm:text-left'>
                                        <section className='flex justify-between px-5 items-center pb-3.5'>
                                            <h3 className='text-base font-semibold leading-6 text-gray-900' id='modal-title'>
                                                {title}
                                            </h3>
                                            <XIcon className='cursor-pointer' onClick={close} />
                                        </section>
                                        <hr />
                                        {children}
                                    </section>
                                </section>
                            </section>
                            <hr />
                            <section className='flex p-3 w-full'>{btns}</section>
                        </section>
                    </section>
                </section>
            )}
        </section>
    )
})

Modal.displayName = 'Modal'
export default Modal
