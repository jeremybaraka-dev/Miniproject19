import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollIndicator = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const { scrollYProgress } = useScroll();

    // Smooth spring animation for the progress
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Hide indicator when at the bottom
    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setIsVisible(latest < 0.99);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);


    const scrollToSection = (percentage) => {
        const targetPosition = document.documentElement.scrollHeight * percentage;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    };

    // Hide on mobile
    if (isMobile) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            style={{
                position: 'fixed',
                right: '32px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 50,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                pointerEvents: isVisible ? 'auto' : 'none'
            }}
        >
            {/* Progress Bar */}
            <div style={{
                position: 'relative',
                width: '2px',
                height: '200px',
                background: 'rgba(95, 99, 104, 0.2)',
                borderRadius: '2px',
                overflow: 'hidden'
            }}>
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(180deg, #EA4335 0%, #FBBC05 50%, #34A853 100%)',
                        transformOrigin: 'top',
                        scaleY,
                        borderRadius: '2px'
                    }}
                />
            </div>

            {/* Section Dots */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '0',
            }}>
                {[
                    { label: 'Home', position: 0 },
                    { label: 'Video', position: 0.33 },
                    { label: 'Features', position: 0.66 },
                    { label: 'Footer', position: 0.95 }
                ].map((section, index) => (
                    <ScrollDot
                        key={index}
                        label={section.label}
                        onClick={() => scrollToSection(section.position)}
                        scrollProgress={scrollYProgress}
                        sectionPosition={section.position}
                    />
                ))}
            </div>

            {/* Scroll Down Hint (only shows at top) */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{
                    opacity: scrollYProgress.get() < 0.1 ? 1 : 0,
                    y: [0, 8, 0]
                }}
                transition={{
                    opacity: { duration: 0.3 },
                    y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{
                    position: 'absolute',
                    bottom: '-60px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    pointerEvents: 'none'
                }}
            >
                <span style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: '#5f6368',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed'
                }}>
                    Scroll
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </motion.div>
        </motion.div>
    );
};

const ScrollDot = ({ label, onClick, scrollProgress, sectionPosition }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollProgress.on('change', (latest) => {
            // Mark as active if we're within 0.15 of this section
            const distance = Math.abs(latest - sectionPosition);
            setIsActive(distance < 0.15);
        });
        return () => unsubscribe();
    }, [scrollProgress, sectionPosition]);

    return (
        <div
            style={{
                position: 'relative',
                cursor: 'pointer'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <motion.div
                animate={{
                    scale: isActive ? 1.4 : 1,
                    backgroundColor: isActive ? '#EA4335' : isHovered ? '#5f6368' : 'rgba(95, 99, 104, 0.4)'
                }}
                transition={{ duration: 0.2 }}
                style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    border: isActive ? '2px solid rgba(234, 67, 53, 0.3)' : 'none'
                }}
            />

            {/* Label tooltip */}
            {isHovered && (
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'absolute',
                        right: '20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: '#202124',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    {label}
                    <div style={{
                        position: 'absolute',
                        right: '-4px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 0,
                        height: 0,
                        borderTop: '4px solid transparent',
                        borderBottom: '4px solid transparent',
                        borderLeft: '4px solid #202124'
                    }} />
                </motion.div>
            )}
        </div>
    );
};

export default ScrollIndicator;
