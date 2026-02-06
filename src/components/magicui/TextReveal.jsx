import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const TextReveal = ({ text, className = "" }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const words = text.split(" ");

    return (
        <div ref={targetRef} className={className} style={{ position: "relative", height: "200vh" }}>
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    height: "50vh", // Reduced height to fit better in flow or 100vh? 
                    // Let's use flexible height or just centering. 
                    // The user example had it as a standalone demo. 
                    // I'll make it sticky to center the text while scrolling.
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <p
                    style={{
                        flexWrap: "wrap",
                        display: "flex",
                        fontSize: "clamp(2rem, 5vw, 4rem)",
                        fontWeight: "bold",
                        color: "rgba(0, 0, 0, 0.2)", // Base dimmed color
                        maxWidth: "800px",
                        textAlign: "left", // Per design? Reference had left aligned typing.
                        // Let's keep it center or left based on use case. 
                        // FeatureWaveSection was left aligned.
                        justifyContent: "flex-start",
                        lineHeight: 1.2
                    }}
                >
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + 1 / words.length;
                        return (
                            <Word key={i} progress={scrollYProgress} range={[start, end]}>
                                {word}
                            </Word>
                        );
                    })}
                </p>
            </div>
        </div>
    );
};

const Word = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
        <span style={{ position: "relative", marginRight: "12px", display: "inline-block" }}>
            <span style={{ position: "absolute", opacity: 0.2 }}>{children}</span>
            <motion.span style={{ opacity, color: "#202124" }}>{children}</motion.span>
        </span>
    );
};

export default TextReveal;
