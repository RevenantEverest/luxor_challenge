"use client"

import type { RootState } from '@@store/index';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaCircleUser } from 'react-icons/fa6';
import { HiLogout } from 'react-icons/hi';
import { AnimatePresence, motion } from 'framer-motion';
import { redirect } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@@hooks';
import { authActions } from '@@store/actions';

import { Button, Dropdown, DropdownItem } from '@@components/Common';

function Navbar() {

    const auth = useAppSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const renderLoginButtons = (widthClass = "") => (
        <React.Fragment>
            <Link href="/signup">
                <Button outlined className={`px-6 ${widthClass}`} size="sm">
                    <p>Sign Up</p>
                </Button>
            </Link>
            <Link href="/login">
                <Button className={`px-6 py-1 ${widthClass}`} size="sm">
                    <p>Login</p>
                </Button>
            </Link>
        </React.Fragment>
    );

    const renderUserDropdown = () => (
        <Dropdown 
            headerComponent={() => (
                <FaCircleUser 
                    className="text-4xl rounded-full text-text hover:cursor-pointer"
                />
            )}
        >
            <DropdownItem 
                onClick={() => {
                    dispatch(authActions.clearAuthUser());
                    redirect("/");
                }}
            >
                <HiLogout />
                <p className="relative -top-0.5">Sign Out</p>
            </DropdownItem>
        </Dropdown>
    );

    return(
        <div className="z-50 fixed">
            <div className="bg-card h-20 fixed w-full z-50 shadow-xl">
                <div className="flex flex-row items-center justify-center h-full px-10 md:px-20 xl:px-96">
                    <div className="flex-1">
                        <Link href="/">
                            <strong>Luxor Challenge</strong>
                        </Link>
                    </div>
                    <div className="hidden md:flex-1 w-full h-full">
                        {/* Routes */}
                    </div>
                    <div className="hidden md:flex flex-1 gap-2 justify-end">
                        {auth.user ? renderUserDropdown() : renderLoginButtons()}
                    </div>
                    <div className="flex md:hidden flex-1 justify-end">
                        <FaBars className="text-3xl hover:cursor-pointer z-20" onClick={() => setIsMobileOpen(!isMobileOpen)} />
                    </div>
                </div>
                
            </div>
            <AnimatePresence key="navbar-ap" mode="wait">
                {
                    isMobileOpen &&
                    (
                        <motion.div
                            key="mobile-nav"
                            initial={{ y: "-100vh" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-100vh" }}
                            transition={{ duration: .3 }}
                            className="z-10 absolute bg-card w-screen h-screen"
                        >
                            <div className="flex flex-col h-full pt-24 px-5">
                                <div className="h-5/6">

                                </div>
                                <div className="flex flex-1 gap-2">
                                    {auth.user ? renderUserDropdown() : renderLoginButtons("w-1/2")}
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    );
};

export default Navbar;