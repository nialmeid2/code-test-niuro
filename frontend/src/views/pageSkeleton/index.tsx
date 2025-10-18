"use client"

import { DataContext } from "@/src/context/DataContext";
import { ReactNode, useContext, useState } from "react"
import Header from "../header";
import Footer from "../footer";
import Menu from "../menu";

export default function PageSkeleton({ children }: {
    children: ReactNode
}) {

    const { mode } = useContext(DataContext);
    

    return <div className={`bg-neutral-200 text-black transition-colors duration-300 ease-in dark:bg-zinc-900 dark:text-white flex flex-col ` +
            `w-screen max-w-[100%] min-h-screen h-[100%] gap-[1em] overflow-x-hidden ${mode} `}>
            <Header />
            <main className="flex-1 px-[1em]">
                <div className="flex ">
                    <Menu />
                    {children}
                </div>
            </main>
            <Footer />
    </div>

}