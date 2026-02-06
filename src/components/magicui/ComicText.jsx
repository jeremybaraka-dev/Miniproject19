import React from "react";
import { motion } from "framer-motion";

export const ComicText = ({ children, className = "", fontSize = "2rem" }) => {
    const characters = typeof children === "string" ? children.split("") : [];

    return (
        <div
            className={className}
            style={{
                fontSize: typeof fontSize === "number" ? `${fontSize}rem` : fontSize,
                display: "inline-block",
                fontWeight: "900",
                fontFamily: '"Comic Sans MS", "Chalkboard SE", "Comic Neue", sans-serif',
                textTransform: "uppercase",
                color: "#ffffff", // Default fill
                WebkitTextStroke: "2px #000000", // Comic outline
                textShadow: "4px 4px 0px #000000", // 3D Block shadow
            }}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    style={{ display: "inline-block", minWidth: char === " " ? "0.5em" : "auto" }}
                    initial={{ y: 0, scale: 1 }}
                    whileHover={{
                        y: -10,
                        scale: 1.2,
                        rotate: Math.random() * 10 - 5,
                        transition: { type: "spring", stiffness: 300 }
                    }}
                    animate={{
                        y: [0, -5, 0],
                        scale: [1, 1.05, 1],
                        rotate: [0, Math.random() * 4 - 2, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: index * 0.1, // Stagger effect
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </div>
    );
};

export default ComicText;
