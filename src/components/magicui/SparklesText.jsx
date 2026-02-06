import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const SparklesText = ({
    children,
    className = '',
    colors = { first: '#9E7AFF', second: '#FE8BBB' },
    sparklesCount = 10,
    ...props
}) => {
    const sparkles = useMemo(() => {
        return Array.from({ length: sparklesCount }).map((_, index) => ({
            id: index,
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            delay: Math.random() * 2,
            duration: 1 + Math.random() * 2,
            scale: 0.3 + Math.random() * 0.7
        }));
    }, [sparklesCount]);

    return (
        <span
            style={{
                position: 'relative',
                display: 'inline-block',
                ...props.style
            }}
            className={className}
            {...props}
        >
            {/* Sparkles */}
            {sparkles.map((sparkle) => (
                <motion.svg
                    key={sparkle.id}
                    style={{
                        position: 'absolute',
                        left: sparkle.x,
                        top: sparkle.y,
                        pointerEvents: 'none',
                        width: '20px',
                        height: '20px',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, sparkle.scale, 0],
                    }}
                    transition={{
                        duration: sparkle.duration,
                        repeat: Infinity,
                        delay: sparkle.delay,
                        ease: "easeInOut"
                    }}
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M12 0L14.09 8.26L22 6.27L15.82 12L22 17.73L14.09 15.74L12 24L9.91 15.74L2 17.73L8.18 12L2 6.27L9.91 8.26L12 0Z"
                        fill={`url(#gradient-${sparkle.id})`}
                    />
                    <defs>
                        <linearGradient
                            id={`gradient-${sparkle.id}`}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor={colors.first} />
                            <stop offset="100%" stopColor={colors.second} />
                        </linearGradient>
                    </defs>
                </motion.svg>
            ))}

            {/* Text Content */}
            <span style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </span>
        </span>
    );
};

export default SparklesText;
