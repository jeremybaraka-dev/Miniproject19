import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypingText = ({ text, speed = 50, className = "", delay = 0, loop = false }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        // Reset if text changes
        setDisplayedText("");
        setCurrentIndex(0);
        setIsDeleting(false);
    }, [text]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isDeleting) {
                if (currentIndex > 0) {
                    setDisplayedText(prev => prev.slice(0, -1));
                    setCurrentIndex(prev => prev - 1);
                } else if (loop) {
                    setIsDeleting(false);
                }
            } else {
                if (typeof text === 'string') {
                    if (currentIndex < text.length) {
                        setDisplayedText(prev => prev + text[currentIndex]);
                        setCurrentIndex(prev => prev + 1);
                    } else if (loop) {
                        setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
                    }
                } else if (Array.isArray(text)) {
                    // Handle array of strings if needed, but for now assuming simple string usage mostly
                    // If we need rotating text, we'd handle it differently.
                    // Let's stick to simple string typing for this requested feature.
                }
            }
        }, isDeleting ? speed / 2 : speed);

        return () => clearTimeout(timeout);
    }, [currentIndex, isDeleting, text, speed, loop]);

    return (
        <span className={className}>
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ marginLeft: '1px', borderRight: '2px solid currentColor' }}
            />
        </span>
    );
};

export default TypingText;
