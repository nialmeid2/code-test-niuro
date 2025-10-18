"use client"

import RouteSkeleton from "@/src/components/routeSkeleton";
import SearchPage from "@/src/pages/SearchPage";


export default function HomeRoute() {
    return <RouteSkeleton>
        <SearchPage />
    </RouteSkeleton>
}
