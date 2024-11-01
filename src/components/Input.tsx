import { ChangeEvent } from "react";

type InputAction = {
    type?: string;
    label: string;
    text?: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ type = 'text', label = 'label', text, handleChange }: InputAction) {
    return (
        <div className='flex gap-[16px] flex-col w-full md:max-w-[275px]'>
            {label}
            <input
                type={type === 'text' ? 'text' : 'password'}
                value={text}
                onChange={handleChange}
                placeholder={`${label}...`}
                className='border rounded-md h-[48px] p-[16px] outline-none'
            />
        </div>
    );
}
