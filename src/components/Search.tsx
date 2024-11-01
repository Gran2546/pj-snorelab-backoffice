import { useState, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type SearchType = {
    rightButtonLabel?: string
    onRightButtonClick?: () => void
}

export default function Search({ rightButtonLabel, onRightButtonClick }:SearchType) {
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setText(event.target.value); // Update the state with the input value
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault(); // Prevent default form submission if necessary

        const searchParams = new URLSearchParams(location.search);
        // Set the search parameter
        searchParams.set('search', text);
        // Navigate to the new query string
        navigate(`?${searchParams.toString()}`);
    }

    return (
        <div className='flex gap-[16px] justify-between'>
            <div className='flex gap-[16px]'>
                <input
                    type='text'
                    value={text}
                    onChange={handleChange}
                    placeholder='Search...'
                    className='border rounded-md h-[48px] p-[16px] outline-none'
                />

                <button
                    onClick={handleClick}
                    className='px-3 py-1 bg-gray-200 rounded-md'
                >
                    Search
                </button>
            </div>

            {rightButtonLabel &&
                <button
                    onClick={onRightButtonClick}
                    className='px-3 py-1 bg-gray-200 rounded-md'
                >
                    {rightButtonLabel}
                </button>}
        </div>
    );
}
