/**
 * @author: @dorianbaffier
 * @description: Background Paths
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { motion } from "framer-motion";
import { memo, useMemo } from "react";

// Path generation function
function generateAestheticPath(index, position, type) {
    const baseAmplitude =
        type === "primary" ? 150 : type === "secondary" ? 100 : 60;
    const phase = index * 0.2;
    const points = [];
    const segments = type === "primary" ? 10 : type === "secondary" ? 8 : 6;

    const startX = 2400;
    const startY = 800;
    const endX = -2400;
    const endY = -800 + index * 25;

    for (let i = 0; i <= segments; i++) {
        const progress = i / segments;
        const eased = 1 - (1 - progress) ** 2;

        const baseX = startX + (endX - startX) * eased;
        const baseY = startY + (endY - startY) * eased;

        const amplitudeFactor = 1 - eased * 0.3;
        const wave1 =
            Math.sin(progress * Math.PI * 3 + phase) *
            (baseAmplitude * 0.7 * amplitudeFactor);
        const wave2 =
            Math.cos(progress * Math.PI * 4 + phase) *
            (baseAmplitude * 0.3 * amplitudeFactor);
        const wave3 =
            Math.sin(progress * Math.PI * 2 + phase) *
            (baseAmplitude * 0.2 * amplitudeFactor);

        points.push({
            x: baseX * position,
            y: baseY + wave1 + wave2 + wave3,
        });
    }

    const pathCommands = points.map((point, i) => {
        if (i === 0) return `M ${point.x} ${point.y}`;
        const prevPoint = points[i - 1];
        const tension = 0.4;
        const cp1x = prevPoint.x + (point.x - prevPoint.x) * tension;
        const cp1y = prevPoint.y;
        const cp2x = prevPoint.x + (point.x - prevPoint.x) * (1 - tension);
        const cp2y = point.y;
        return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
    });

    return pathCommands.join(" ");
}

const generateUniqueId = (prefix) =>
    `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

// Memoized FloatingPaths component
const FloatingPaths = memo(function FloatingPaths({ position, isMobile = false }) {
    // Increased number of paths while maintaining optimization
    const primaryPaths = useMemo(
        () =>
            Array.from({ length: isMobile ? 3 : 12 }, (_, i) => ({
                id: generateUniqueId("primary"),
                d: generateAestheticPath(i, position, "primary"),
                opacity: 0.30 + i * 0.03,
                width: 4 + i * 0.3,
                duration: 25,
                delay: 0,
            })),
        [position]
    );

    const secondaryPaths = useMemo(
        () =>
            Array.from({ length: isMobile ? 4 : 15 }, (_, i) => ({
                id: generateUniqueId("secondary"),
                d: generateAestheticPath(i, position, "secondary"),
                opacity: 0.25 + i * 0.025,
                width: 3 + i * 0.25,
                duration: 20,
                delay: 0,
            })),
        [position]
    );

    const accentPaths = useMemo(
        () =>
            Array.from({ length: isMobile ? 2 : 10 }, (_, i) => ({
                id: generateUniqueId("accent"),
                d: generateAestheticPath(i, position, "accent"),
                opacity: 0.20 + i * 0.015,
                width: 2 + i * 0.2,
                duration: 15,
                delay: 0,
            })),
        [position]
    );

    // Shared animation configuration
    const sharedAnimationProps = {
        opacity: 1,
        scale: 1,
        transition: {
            opacity: { duration: 1 },
            scale: { duration: 1 },
        },
    };

    return (
        <div style={{
            pointerEvents: 'none',
            position: 'absolute',
            inset: 0,
            overflow: 'hidden'
        }}>
            <svg
                style={{
                    height: '100%',
                    width: '100%',
                    color: 'rgba(0, 0, 0, 0.4)'
                }}
                fill="none"
                preserveAspectRatio="xMidYMid slice"
                viewBox="-2400 -800 4800 1600"
            >
                <title>Background Paths</title>
                <defs>
                    <linearGradient id="sharedGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                        <stop offset="0%" stopColor="rgba(147, 51, 234, 0.7)" />
                        <stop offset="50%" stopColor="rgba(236, 72, 153, 0.7)" />
                        <stop offset="100%" stopColor="rgba(59, 130, 246, 0.7)" />
                    </linearGradient>
                </defs>

                <g>
                    {primaryPaths.map((path) => (
                        <motion.path
                            animate={{
                                ...sharedAnimationProps,
                                y: [0, -15, 0],
                            }}
                            d={path.d}
                            initial={{ opacity: 0, scale: 0.8 }}
                            key={path.id}
                            stroke="url(#sharedGradient)"
                            strokeLinecap="round"
                            strokeWidth={path.width}
                            style={{ opacity: path.opacity }}
                            transition={{
                                ...sharedAnimationProps.transition,
                                y: {
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    repeatType: "reverse",
                                },
                            }}
                        />
                    ))}
                </g>

                <g style={{ opacity: 0.8 }}>
                    {secondaryPaths.map((path) => (
                        <motion.path
                            animate={{
                                ...sharedAnimationProps,
                                y: [0, -10, 0],
                            }}
                            d={path.d}
                            initial={{ opacity: 0, scale: 0.9 }}
                            key={path.id}
                            stroke="url(#sharedGradient)"
                            strokeLinecap="round"
                            strokeWidth={path.width}
                            style={{ opacity: path.opacity }}
                            transition={{
                                ...sharedAnimationProps.transition,
                                y: {
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    repeatType: "reverse",
                                },
                            }}
                        />
                    ))}
                </g>

                <g style={{ opacity: 0.6 }}>
                    {accentPaths.map((path) => (
                        <motion.path
                            animate={{
                                ...sharedAnimationProps,
                                y: [0, -5, 0],
                            }}
                            d={path.d}
                            initial={{ opacity: 0, scale: 0.95 }}
                            key={path.id}
                            stroke="url(#sharedGradient)"
                            strokeLinecap="round"
                            strokeWidth={path.width}
                            style={{ opacity: path.opacity }}
                            transition={{
                                ...sharedAnimationProps.transition,
                                y: {
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    repeatType: "reverse",
                                },
                            }}
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
});

export default FloatingPaths;
