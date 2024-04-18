import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

import { DEFAULTS } from '@@constants';

export interface PaginationNavigatorProps {
    count: number,
    currentPage: number,
    setPage: (value: number) => void
};

function PaginationNavigator({ count, currentPage, setPage }: PaginationNavigatorProps) {

    const totalPages = Math.ceil(count / DEFAULTS.PAGINATION.LIMIT);

    const renderPageList = () => {
        const Pages: JSX.Element[] = [];

        for(let i = 0; i < totalPages; i++) {
            const isCurrentPage = (i + 1) === currentPage;
            const activePageStyles = "bg-card-light text-text";
            Pages.push(
                <div 
                    className={`
                        px-2 py-1 rounded-md flex items-center justify-center text-muted hover:cursor-pointer
                        ${isCurrentPage && activePageStyles}
                    `}
                    onClick={() => setPage(i + 1)}
                >
                    <p className="font-semibold">{i + 1}</p>
                </div>
            );
        }

        return Pages;
    };

    return(
        <div className="flex gap-2 items-center justify-center py-5">
            {
                (currentPage - 1 !== 0) &&
                <FaAngleLeft className="font-semibold hover:cursor-pointer" onClick={() => setPage(currentPage - 1)} />
            }
            {renderPageList()}
            {
                (currentPage + 1 <= totalPages) &&
                <FaAngleRight className="font-semibold hover:cursor-pointer" onClick={() => setPage(currentPage + 1)} />
            }
        </div>
    );
};

export default PaginationNavigator;