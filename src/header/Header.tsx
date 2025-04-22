import React from 'react';
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="shadow-md w-full z-50 bg-[#222831] text-[#D65A31] font-bold mb-3">
            <div className="container mx-auto items-center justify-between py-3">
                <nav className={'flex gap-5'}>
                    <NavLink className={'hover:opacity-80 transition duration-300 easy-linear'} to={'/'}>Главная</NavLink>
                    <NavLink className={'hover:opacity-80 transition duration-300 easy-linear'} to={'/login'}>Вход</NavLink>
                </nav>
            </div>
        </header>
    )
        ;
}

export default Header;