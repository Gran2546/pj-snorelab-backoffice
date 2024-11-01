import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Pagination({ totalPages = 10 }) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        // Set the search parameter
        searchParams.set('page', currentPage + '');
        // Navigate to the new query string
        navigate(`?${searchParams.toString()}`);
    }, [currentPage, location.search, navigate])

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='flex justify-center items-center space-x-2 mt-4'>
            <button
                onClick={goToPreviousPage}
                className={`px-3 py-1 bg-gray-200 rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {/* Render page numbers dynamically */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    className={`px-3 py-1 rounded-md ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                onClick={goToNextPage}
                className={`px-3 py-1 bg-gray-200 rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}
