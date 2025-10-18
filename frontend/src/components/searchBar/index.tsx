import { FormEvent, Ref } from "react"


export default function SearchBar({ref, triggerFormEvent} : {
    ref: Ref<HTMLInputElement> | undefined,
    triggerFormEvent: (e: FormEvent<HTMLFormElement>) => void
}) {
    return <section className="w-[100%] p-[1em] px-[2em] bg-sky-800 mt-[2em] ">
        <form className="w-[100%] flex gap-[2ch]" onSubmit={(e) => triggerFormEvent(e)}>
            <input ref={ref} type="text" className="p-[.5em] flex-1 w-[100%] bg-white text-black" placeholder="Search for your movies here" />
            <button className="px-[1em] py-[.5em] cursor-pointer text-white bg-slate-900">
                <i className="bi bi-search h-[1.5em]"></i>
            </button>
        </form>
    </section>
}