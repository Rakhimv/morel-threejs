import { motion } from "framer-motion";
import { Html, useProgress } from "@react-three/drei";

export function Loader() {
    const { progress } = useProgress();

    return (
        <Html>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex scale-70 flex-col items-center justify-center bg-black/90 backdrop-blur-sm z-50"
            >
                <div className="relative w-16 h-16 mb-6">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                    >
                        <div className="w-4 h-4 bg-white rounded-full absolute top-0 -translate-y-1/4 left-1/2 -translate-x-1/2" />
                    </motion.div>
                    <div className="w-16 h-16 border-4  rounded-full" />
                </div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white font-mono text-3xl tracking-wider"
                >
                    {Math.round(progress)}%
                </motion.div>
            </motion.div>
        </Html>
    );
}