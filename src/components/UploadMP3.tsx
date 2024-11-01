// src/components/UploadMp3.tsx
import React, { useRef, useState } from 'react';

type UploadMp3Type = {
    handleSelectFile: (file: File | null) => void;
    label?: string
};

const UploadMp3: React.FC<UploadMp3Type> = ({ handleSelectFile, label = "" }) => {
    const [file, setFile] = useState<File | null>(null);
    const [audioSrc, setAudioSrc] = useState<string | null>(null);

    // Reference to the hidden file input element
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    // Handle file change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];

        // Ensure it's an MP3 file
        if (selectedFile && selectedFile.type === "audio/mpeg") {
            setFile(selectedFile);
            handleSelectFile(selectedFile);

            // Create an audio source URL to preview the file
            const fileURL = URL.createObjectURL(selectedFile);
            setAudioSrc(fileURL);
        } else {
            alert("Please select an MP3 file");
            setFile(null);
            setAudioSrc(null);
        }
    };

    // Handle click event for the custom button
    const handleButtonClick = () => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };

    return (
        <div className='flex gap-[16px] flex-col w-full md:max-w-[275px]'>
            {label}
            {!file && <button
                className='border rounded-md h-[48px] outline-none text-[#a6a6a6] text-left px-[16px]'
                onClick={handleButtonClick}
            >
                Choose file
            </button>
            }
            {/* Hidden File Input */}
            <input
                type="file"
                accept=".mp3"
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            {/* Display Selected File Name */}
            {file && <button
                onClick={handleButtonClick}
                className='flex flex-col gap-[4px] border rounded-md h-[48px] outline-none text-[#a6a6a6] text-left px-[16px] text-xs justify-center'>
                {file.name}
                <div className='w-full h-[8px] bg-blue-600 rounded-3xl'></div>
            </button>}
        </div>
    );
};

export default UploadMp3;
