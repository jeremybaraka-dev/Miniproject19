import React from "react";
import { motion } from "framer-motion";

const LightRays = ({
    className,
    style,
    count = 20,
    color = "#ffffff",
    opacity = 0.5,
    speed = 3,
}) => {
    // Generate rays with random properties
    const rays = Array.from({ length: count }).map((_, i) => ({
        id: i,
        width: Math.random() * 100 + 50 + "px", // varying widths
        height: Math.random() * 50 + 50 + "%", // varying lengths
        left: Math.random() * 100 + "%", // random position
        delay: Math.random() * 2,
        duration: speed + Math.random() * 2,
        angle: Math.random() * 10 - 5, // Slight angle
    }));

    return (
        <div
            className={className}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                pointerEvents: "none",
                background: 'transparent',
                ...style,
            }}
        >
            {rays.map((ray) => (
                <motion.div
                    key={ray.id}
                    style={{
                        position: "absolute",
                        top: -100, // Start slightly above
                        left: ray.left,
                        width: ray.width,
                        height: "150%", // Extend beyond container
                        background: `linear-gradient(180deg, ${color} 0%, transparent 80%)`,
                        opacity: 0,
                        transformOrigin: "top center",
                        filter: "blur(20px)",
                        transform: `rotate(${ray.angle}deg)`,
                    }}
                    animate={{
                        opacity: [0, opacity, 0],
                        // y: [0, 100], // Move down slightly?
                        // Rays usually shimmer or pulse
                        scaleY: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: ray.duration,
                        repeat: Infinity,
                        delay: ray.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

export default LightRays;
