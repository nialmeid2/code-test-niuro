import { ReactNode } from "react"


export default function Container({children, widthClass = "w-[70em]", className} : {
    children: ReactNode,
    widthClass?: string,
    className?: string
}) {
    return <div className={`${widthClass} max-w-[95%] mx-auto ${className}`}>
        {children}
    </div>
}