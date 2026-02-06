import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomInt = (max) => Math.floor(Math.random() * max);

export const HyperText = ({
    children,
    className,
    duration = 800,
    delay = 0,
}) => {
    const [displayText, setDisplayText] = useState(typeof children === 'string' ? children.split("") : []);
    const [trigger, setTrigger] = useState(false);
    const interations = useRef(0);
    const isFirstRender = useRef(true);

    // If children changes, update the internal state
    const text = typeof children === 'string' ? children : '';

    const triggerAnimation = () => {
        interations.current = 0;
        setTrigger(true);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!trigger) return;

            if (interations.current < text.length) {
                setDisplayText((t) =>
                    t.map((l, i) => {
                        if (i < interations.current) {
                            return text[i];
                        }
                        return ALPHABETS[getRandomInt(26)];
                    })
                );
                interations.current = interations.current + 0.1;
            } else {
                setTrigger(false);
                setDisplayText(text.split(""));
                clearInterval(interval);
            }
        }, duration / (text.length * 10)); // Adjust speed based on length and duration

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [text, duration, trigger]);

    // Trigger on hover or on mount? The user example shows "Hover Me!" 
    // but for the footer title it might be better to trigger on view or mount.
    // The user says "EXPERIENCE LIFTOFF". It should probably animate on hover or view.
    // I will make it trigger on hover as per the "Hover Me!" demo usually associated with this.
    // But for a headline, maybe loop or just hover.
    // Let's ensure it resets correctly.

    return (
        <div
            className={`flex scale-100 cursor-default overflow-hidden py-2 ${className}`}
            onMouseEnter={triggerAnimation}
            style={{ display: 'flex', overflow: 'hidden' }}
        >
            <AnimatePresence mode="wait">
                {displayText.map((letter, i) => (
                    <motion.h1
                        key={i}
                        className={className}
                        style={{ width: letter === " " ? "0.5em" : "auto" }} // monospaced or just consistent width helps
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        delay={i * 0.05}
                    >
                        {letter}
                    </motion.h1>
                ))}
                {/* Wait, the scramble effect is better done without AnimatePresence per letter if we just update text. 
             The AnimatePresence approach is for "character by character entry".
             HyperText usually means "random characters scramble".
             Let's use a simpler rendering for the scramble effect. 
         */}
            </AnimatePresence>
            <div style={{ display: 'flex' }}>
                {displayText.map((letter, i) => (
                    <span key={i} style={{ width: letter === " " ? "0.3em" : "auto", display: 'inline-block' }}>{letter.toUpperCase()}</span>
                ))}
            </div>
        </div>
    );
};

// Re-implementing simplified version to match the "Hyper Text" scramble behavior closer to common implementations
// (Scrambles letters then resolves).

const HyperTextSimple = ({ children, className, duration = 800, animateOnLoad = true }) => {
    const [text, setText] = useState(children);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const intervalRef = useRef(null);

    const startAnimation = () => {
        let iteration = 0;
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setText(prev =>
                children
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return children[index];
                        }
                        if (letter === " ") return " ";
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("")
            );

            if (iteration >= children.length) {
                clearInterval(intervalRef.current);
            }

            iteration += 1 / 3;
        }, 30);
    };

    useEffect(() => {
        if (animateOnLoad) {
            startAnimation();
        }
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <div
            className={className}
            onMouseEnter={startAnimation}
            style={{ display: 'inline-block', cursor: 'default' }}
        >
            {text}
        </div>
    );
};

export default HyperTextSimple;
