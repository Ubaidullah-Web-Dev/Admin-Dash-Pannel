import { motion, AnimatePresence } from 'framer-motion';
const liquid = {
    animate: {
        scale: [1, 1.15, 1],
        rotate: [0, 360],
        borderRadius: ['50%', '20%', '50%'],
    },
    transition: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' },
};

const orbit = (i) => ({
    animate: {
        rotate: 360,
        x: [0, Math.cos(i * 60 * Math.PI / 180) * 90, 0],
        y: [0, Math.sin(i * 60 * Math.PI / 180) * 90, 0],
    },
    transition: { repeat: Infinity, duration: 3, delay: i * 0.1, ease: 'linear' },
});

const shock = {
    animate: { scale: [1, 2.5, 2.5], opacity: [0.5, 0, 0] },
    transition: { repeat: Infinity, duration: 2, ease: 'easeOut' },
};

const bounce = {
    animate: { scale: [1, 1.3, 1], y: [0, -20, 0] },
    transition: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' },
};
export default function PageLoader() {
    const dots = Array.from({ length: 6 });

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/80 backdrop-blur-lg"
            >
                <motion.div
                    variants={shock}
                    animate="animate"
                    className="absolute h-40 w-40 rounded-full border-2 border-green-400"
                />
                <motion.div
                    variants={liquid}
                    animate="animate"
                    className="absolute h-32 w-32 rounded-full border-4 border-cyan-400/50"
                />
                {dots.map((_, i) => (
                    <motion.div
                        key={i}
                        variants={orbit(i)}
                        animate="animate"
                        className="absolute h-3 w-3 rounded-full bg-linear-to-r from-green-400 to-cyan-400 shadow-lg shadow-green-500/50"
                    />
                ))}
                <motion.div
                    variants={bounce}
                    animate="animate"
                    className="relative h-14 w-14 rounded-full bg-linear-to-br from-green-400 to-cyan-500 shadow-2xl shadow-green-500/60"
                >
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
                </motion.div>
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-12 text-sm text-zinc-300"
                >
                    Loading...
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}