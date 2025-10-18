"use client"

import { DataProvider } from "@/src/context/DataContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ReactNode, useState } from "react";

export default function RouteSkeleton({ children }: {
    children: ReactNode
}) {

    const [queryClient] = useState(() => new QueryClient());


    return <QueryClientProvider client={queryClient}>
        <DataProvider>
            {children}
        </DataProvider>
    </QueryClientProvider>
}