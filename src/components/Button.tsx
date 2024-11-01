type SearchType = {
    text: string;
    variant?: 'primary' | 'secondary'
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({ text, onClick, variant = 'primary' }: SearchType) {
    return (
        <div className='flex gap-[16px] w-full md:max-w-[275px]'>
            <button
                onClick={onClick}
                className={variant === 'primary' ? 'px-[16px] py-[8px] bg-gray-200 rounded-md w-full' : 'px-[16px] py-[8px] rounded-md w-full border'}
            >
                {text}
            </button>
        </div>
    );
}
