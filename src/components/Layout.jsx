import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SideNavbar from './SideNavbar';
import TopBar from './TopBar';
import PageLoader from './PageLoader';
import BottomBar from './BottomBar';

export default function Layout() {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const t = setTimeout(() => setLoading(false), 1300);
        return () => clearTimeout(t);
    }, [location.pathname]);

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-zinc-900 text-slate-800 dark:text-zinc-100">
            <SideNavbar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar />
                <AnimatePresence mode="wait">
                    {loading && <PageLoader key="loader" />}
                    <motion.main
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        className="flex-1 overflow-y-auto p-6">
                        <Outlet />
                    </motion.main>
                </AnimatePresence>
                <BottomBar/>
            </div>
        </div>
    );
}