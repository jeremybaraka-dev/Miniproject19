import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function WordRotate({
    words,
    duration = 2500,
    className,
}) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, duration);

        return () => clearInterval(interval);
    }, [words, duration]);

    return (
        <div style={{ display: 'inline-flex', verticalAlign: 'top', height: '1.2em', overflow: 'hidden' }} className={className}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={words[index]}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ display: 'inline-block' }}
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}

export default WordRotate;
