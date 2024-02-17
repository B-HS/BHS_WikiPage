import { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof BTN_VARIABLES
    size?: keyof typeof BTN_SIZE
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    className?: string
    children?: React.ReactNode
}
export const BTN_VARIABLES = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white rounded',
    secondary: 'bg-gray-500 hover:bg-gray-700 text-white rounded',
    success: 'bg-green-500 hover:bg-green-700 text-white rounded',
    danger: 'bg-red-500 hover:bg-red-700 text-white rounded',
    warning: 'bg-yellow-500 hover:bg-yellow-700 text-white rounded',
    outline: 'bg-background hover:bg-foreground hover:text-background font-semibold border rounded hover:border-foreground',
    outlineInverted: 'bg-foreground hover:bg-background hover:text-foreground font-semibold border rounded text-white dark:text-black border-foreground hover:border-background',
    ghost: 'bg-background hover:bg-foreground hover:text-background font-semibold rounded',
}
export const BTN_SIZE = {
    xs: 'py-1 px-1.5 text-xs',
    sm: 'py-1 px-2 text-sm',
    md: 'py-1.5 px-2.5 text-md',
    lg: 'py-2 px-3 text-lg',
    iconSm: 'flex justify-center items-center w-6 h-6',
    iconMd: 'flex justify-center items-center w-8 h-8',
    iconLg: 'flex justify-center items-center w-10 h-10',
}

const Button = ({ variant = 'primary', size = 'sm', type = 'button', onClick, disabled = false, className = '', children }: ButtonProps) => {
    return (
        <button className={`transition-all  ${BTN_VARIABLES[variant]} ${BTN_SIZE[size]} ${className}`} type={type} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button
