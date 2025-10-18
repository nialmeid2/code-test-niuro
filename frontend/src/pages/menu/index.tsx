"use client"

import { DataContext } from "@/src/context/DataContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";


export default function Menu() {

    const { mode, toggleMode, menuShown, toggleMenu } = useContext(DataContext);

    const pathname = usePathname();
    const renderCaret = (pathCompare: string) => <>{pathname == pathCompare ? <i className="bi bi-caret-right-fill mr-[1ch]"></i> : <></>}</>
    const mobileStyles = `max-[1080px]:fixed max-[1080px]:mt-0 max-[1080px]:max-w-[70%] max-[1080px]:w-[30ch] transition-[left] duration-300 ` + 
                `max-[1080px]:top-[0] max-[1080px]:h-[100vh] z-[99] ${menuShown ? 'max-[1080px]:left-[0]' : 'max-[1080px]:left-[-100vw]'}`

    return <>
        <aside className={`mt-[2em] w-[20ch] bg-blue-300 dark:bg-blue-700 self-start ml-auto p-[2em] py-[1em] ${mobileStyles}`}>
            <nav>
                <ul className="flex flex-col gap-[1em] text-[1.1em]">
                    <li>
                        <Link href={'/'} className="hover:underline">{renderCaret('/')}Search</Link>
                    </li>
                    <li>
                        <Link href={'/favorites'} className="hover:underline">{renderCaret('/favorites')}Favorites</Link>
                    </li>
                    <li className="hidden max-[1080px]:block mt-[2em]">
                        <button className="px-[2em] py-[1em] text-white bg-slate-900" onClick={toggleMode}>
                            {
                                mode == 'dark' ? <i className="bi bi-moon-fill"></i>
                                    : <i className="bi bi-brightness-high-fill"></i>
                            }
                        </button>
                    </li>
                </ul>
            </nav>
            <button className="hidden max-[1080px]:block absolute top-[.25em] right-[.35em] text-[1.5em]" onClick={toggleMenu}>
                <i className="bi bi-x-lg"></i>
            </button>
        </aside>

        <button className={`fixed top-[0] left-[0] bottom-[0] right-[0] bg-black/85 z-[98] hidden ${
            !menuShown ? 'max-[1080px]:hidden' : 'max-[1080px]:block'} `} onClick={toggleMenu}></button>
    </>
}