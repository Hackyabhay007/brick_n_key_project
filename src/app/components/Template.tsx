"use client"

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import Unlock from './Unlock';

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isMobileFilter = pathname === '/mobile_filter';

    return (
        <>
            {!isMobileFilter && <Header />}
            {children}
            {!isMobileFilter && <Unlock />}
            {!isMobileFilter && <Footer />}
        </>
    );
}
