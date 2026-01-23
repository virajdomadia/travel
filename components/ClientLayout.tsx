"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import PageTransition from "./PageTransition";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    return (
        <>
            {!isAdmin && <Navbar />}
            <SmoothScroll>
                <PageTransition>
                    {children}
                </PageTransition>
            </SmoothScroll>
            {!isAdmin && <Footer />}
        </>
    );
}
