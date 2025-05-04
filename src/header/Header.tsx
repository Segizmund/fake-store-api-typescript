import { NavLink } from "react-router-dom";
import {useEffect, useState, useRef} from "react";
import {useAuth} from "../auth/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

function Header() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleExit = () => {
        logout();
        navigate('/login');
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);
    return (
        <header className="shadow-md w-full z-50 bg-[#222831] text-[#D65A31] font-bold mb-3">
            <div className="container mx-auto flex items-center justify-between py-3">
                <nav className={'flex gap-5'}>
                    <NavLink className={'p-2 hover:opacity-80 transition duration-300 easy-linear'} to={'/'}>Главная</NavLink>
                </nav>
                <div>
                    {
                        isLoggedIn ?
                            <div className={`relative flex items-center gap-2 p-2 group cursor-pointer ${isOpen ? 'bg-[#D65A31] text-white rounded-t-xl' : null} `} onClick={toggleDropdown}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                         className="bi bi-person-circle group-hover:opacity-80 transition duration-300 easy-linear" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                        <path fill-rule="evenodd"
                                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                                    </svg>
                                </div>
                                <span className={'group-hover:opacity-80 transition duration-300 easy-linear'}>{localStorage.getItem('name')}</span>

                                { isOpen && (
                                    <div className={'absolute z-10 top-10 border-t border-white left-0 w-full bg-[#D65A31] text-white p-2 rounded-b-xl'}>
                                        <div className={'flex flex-col gap-2'}>
                                            <NavLink className={'hover:opacity-80 transition duration-300 easy-linear flex items-center gap-2'} to={'/'}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-vcard" viewBox="0 0 16 16">
                                                <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5"/>
                                                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z"/>
                                            </svg>
                                                Профиль</NavLink>
                                            <button
                                                className={'group flex items-center gap-2 cursor-pointer hover:opacity-80 transition duration-300 easy-linear'}
                                                onClick={handleExit}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                     fill="currentColor"
                                                     className="bi bi-box-arrow-right group-hover:opacity-80 transition duration-300 easy-linear"
                                                     viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd"
                                                          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                                    <path fill-rule="evenodd"
                                                          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                                </svg>
                                                Выход
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            :
                            <NavLink className={'hover:opacity-80 transition duration-300 easy-linear'}
                                     to={'/login'}>Вход</NavLink>
                    }
                </div>
            </div>
        </header>
    )
        ;
}

export default Header;