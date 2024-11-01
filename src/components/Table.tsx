import React from 'react';

type TableProps<T> = {
    column: Column[];
    data: T[];
    isDelete?: boolean;
    onDelete?: (item: T) => void; // Pass a delete handler function
};

type Column = {
    name: string;
    key: string;
    order: 'asc' | 'desc' | null;
    width: number;
};

const ColumnComponent = (column: Column[]) => {
    return (
        column.map((item) => (
            <div
                key={item.key}
                className='font-semibold flex flex-col items-center'
                style={{ width: item.width }}
            >
                {item.name}
            </div>
        ))
    );
};

function DataComponent<T>(item: T, columns: Column[]) {
    return (
        columns.map((column) => (
            <div
                key={column.key}
                className='font-thin text-[#6A727E] flex flex-col items-center'
                style={{ width: column.width }}
            >
                {item?.[column.key as never]}
            </div>
        ))
    );
}

export default function Table<T>({ column, data, isDelete = false, onDelete }: TableProps<T>) {
    return (
        <div className='w-[calc(70vw)] flex overflow-auto rounded-xl border h-[calc(100vh-220px)]'>
            <div className='flex flex-col'>
                <div className='flex h-[48px] items-center gap-[16px] border-b px-[16px]'>
                    {ColumnComponent(column)}
                    {isDelete && <div style={{ width: 100 }} className='font-semibold flex justify-center'>Delete</div>}
                </div>

                {data.map((item, index) => (
                    <div key={index} className='flex h-[48px] items-center gap-[16px] px-[16px]'>
                        {DataComponent(item, column)}
                        {isDelete && (
                            <div style={{ width: 100 }} className='flex justify-center'>
                                <button
                                    className='text-red-600 font-semibold'
                                    onClick={() => onDelete?.(item)} // Call the delete handler
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
