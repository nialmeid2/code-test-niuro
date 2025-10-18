"use client"

import { DataContext } from "@/src/context/DataContext"
import { useContext } from "react"
import Container from "../container";


export default function Header() {

    const { mode, toggleMode, toggleMenu } = useContext(DataContext);


    return <header className="w-screen p-[1em] bg-red-300 dark:bg-orange-600 border-b-black dark:border-b-white border-b-[.25em]">
        <Container className="flex items-center justify-between">
            <section className="flex text-[2.25em]">
                <i className="bi bi-camera-video mr-[1ch]"></i>
                <h1 className="font-[Roboto_Slab] uppercase font-bold">Movies For all</h1>
            </section>
            <section className="flex text-[1.5em]">
                <button onClick={toggleMode} className="cursor-pointer max-[600px]:hidden">
                    {
                        mode == 'dark' ? <i className="bi bi-moon-fill"></i>
                            : <i className="bi bi-brightness-high-fill"></i>
                    }
                </button>  
                <button className="hidden max-[1080px]:block ml-[1ch]" onClick={toggleMenu}>
                    <i className="bi bi-list text-[1.5em]"></i>
                </button>          
            </section>            
        </Container>
    </header>


}