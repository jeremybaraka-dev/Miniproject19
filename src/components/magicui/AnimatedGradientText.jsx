import React from "react";
import { motion } from "framer-motion";

const AnimatedGradientText = ({
    children,
    className = "",
    speed = 2,
    colorFrom = "#4ade80",
    colorTo = "#06b6d4",
}) => {
    return (
        <motion.span
            className={className}
            style={{
                backgroundImage: `linear-gradient(to right, ${colorFrom}, ${colorTo}, ${colorFrom})`,
                backgroundSize: "200% auto",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                display: "inline-block",
            }}
            animate={{
                backgroundPosition: ["0% center", "-200% center"],
            }}
            transition={{
                duration: speed,
                ease: "linear",
                repeat: Infinity,
            }}
        >
            {children}
        </motion.span>
    );
};

export default AnimatedGradientText;
