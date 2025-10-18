"use client"


import RouteSkeleton from "@/src/components/routeSkeleton";
import Details from "@/src/views/DetailsPage";
import { Suspense } from "react";



export default function DetailsRoute() {

    return <RouteSkeleton>
        <Suspense>
            <Details />
        </Suspense>
    </RouteSkeleton>

}