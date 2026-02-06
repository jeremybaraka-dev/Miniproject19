import { motion } from "framer-motion";

export const TextAnimate = ({ text, children, className, as: Component = "h1", animation = "blurInUp", by = "word", duration = 0.5, ...props }) => {
    const item = {
        hidden: {
            opacity: 0,
            filter: animation === "blurInUp" ? "blur(10px)" : "blur(0px)",
            y: animation === "blurInUp" || animation === "slideUp" ? 20 : 0,
            x: animation === "slideLeft" ? 20 : 0,
        },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            x: 0,
            transition: {
                duration: duration,
            },
        },
    };

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
        }),
    };

    const finalContent = text || (typeof children === "string" ? children : "");

    if (!finalContent) return null;

    const lines = finalContent.split('\n');

    if (by === "character") {
        return (
            <Component className={className} {...props}>
                <motion.span
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{ display: "inline-block" }}
                >
                    {lines.map((line, lineIndex) => (
                        <span key={lineIndex} style={{ display: "block" }}>
                            {line.split(" ").map((word, wordIndex) => (
                                <span key={wordIndex} style={{ display: "inline-block", marginRight: "0.25em", whiteSpace: "nowrap" }}>
                                    {word.split("").map((char, charIndex) => (
                                        <motion.span
                                            variants={item}
                                            key={charIndex}
                                            style={{ display: "inline-block" }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </span>
                            ))}
                        </span>
                    ))}
                </motion.span>
            </Component>
        );
    }

    return (
        <Component className={className} {...props}>
            <motion.span
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ display: "inline-block" }}
            >
                {lines.map((line, lineIndex) => (
                    <span key={lineIndex} style={{ display: "block" }}>
                        {line.split(" ").map((word, index) => (
                            <motion.span
                                variants={item}
                                style={{ display: "inline-block", marginRight: "0.25em" }}
                                key={index}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </span>
                ))}
            </motion.span>
        </Component>
    );
};
