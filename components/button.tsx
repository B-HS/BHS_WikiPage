const Variables = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white font-bold rounded',
    secondary: 'bg-gray-500 hover:bg-gray-700 text-white font-bold rounded',
    success: 'bg-green-500 hover:bg-green-700 text-white font-bold rounded',
    danger: 'bg-red-500 hover:bg-red-700 text-white font-bold rounded',
    warning: 'bg-yellow-500 hover:bg-yellow-700 text-white font-bold rounded',
    outline: 'bg-background hover:bg-foreground hover:text-background font-semibold border rounded',
    outlineInverted: 'bg-foreground hover:bg-background hover:text-foreground font-semibold border rounded text-white dark:text-black',
    ghost: 'bg-background hover:bg-foreground hover:text-background font-semibold rounded',
}

const Size = {
    xs: 'py-1 px-1.5 text-xs',
    sm: 'py-1 px-2 text-sm',
    md: 'py-1.5 px-2.5 text-md',
    lg: 'py-2 px-3 text-lg',
    iconSm: 'flex justify-center items-center w-6 h-6',
    iconMd: 'flex justify-center items-center w-8 h-8',
    iconLg: 'flex justify-center items-center w-10 h-10',
}

interface ButtonProps {
    variant?: keyof typeof Variables
    size?: keyof typeof Size
    type?: 'button' | 'submit' | 'reset'
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    className?: string
    children?: React.ReactNode
}

const Button = ({ variant = 'primary', size = 'sm', type = 'button', onClick, disabled = false, className = '', children }: ButtonProps) => {
    const buttonClass = `transition-all ${Size[size]} ${Variables[variant]} ${className}`
    return (
        <button className={buttonClass} type={type} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button
