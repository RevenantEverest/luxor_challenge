"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface DropdownProps {
    headerComponent: React.FC<React.HTMLProps<HTMLDivElement>>
};

function Dropdown({ headerComponent, children }: React.PropsWithChildren<DropdownProps>) {

    const bgColor = "bg-card-light";
    const Header = headerComponent;

    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseDownClose = useCallback((e: MouseEvent) => {
        if(!triggerRef.current || !dropdownRef.current || !e.target || !isOpen) {
            return;
        }

        if(!dropdownRef.current.contains(e.target as Node) && !triggerRef.current.contains(e.target as Node)){
            setIsOpen(false);
        }
    }, [isOpen]);

    useEffect(() => {
        document.addEventListener("mousedown", handleMouseDownClose);

        return () => {
            document.removeEventListener("mousedown", handleMouseDownClose);
        };
    }, [handleMouseDownClose]);

    return(
        <div className="flex">
            <div ref={triggerRef} className="" onClick={() => setIsOpen(!isOpen)}>
                <Header />
            </div>
            <AnimatePresence key="nav-user-dropdown" mode="wait">
                {
                    isOpen &&
                    <motion.div
                        ref={dropdownRef}
                        className={`absolute bottom-0 w-full ${bgColor}`}
                        initial={{ y: "-1vh", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-1vh", opacity: 0 }}
                    >
                        <div className={`absolute -top-3 -left-1 rounded-lg px-2 py-2 ${bgColor}`}>
                            {children}
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
};

export default Dropdown;