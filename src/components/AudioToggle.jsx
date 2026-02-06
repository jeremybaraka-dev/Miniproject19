import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AudioToggle = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        // Initialize audio element
        audioRef.current = new Audio('/Singularity.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3; // Set volume to 30% for background music

        return () => {
            // Cleanup
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(err => {
                    console.log('Audio play failed:', err);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <motion.button
            onClick={toggleAudio}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
                position: 'relative',
                width: isMobile ? '40px' : '48px',
                height: isMobile ? '40px' : '48px',
                borderRadius: '50%',
                border: 'none',
                background: isPlaying
                    ? 'linear-gradient(135deg, #EA4335 0%, #FBBC05 50%, #34A853 100%)'
                    : '#f1f3f4',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: isPlaying
                    ? '0 4px 12px rgba(234, 67, 53, 0.3)'
                    : '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
        >
            {/* Animated background pulse when playing */}
            {isPlaying && (
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #EA4335 0%, #FBBC05 50%, #34A853 100%)',
                        opacity: 0.5
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.2, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            )}

            {/* Music Visualizer Bars */}
            <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px',
                height: '20px',
                zIndex: 1
            }}>
                {[0, 1, 2, 3].map((index) => (
                    <motion.div
                        key={index}
                        style={{
                            width: '3px',
                            borderRadius: '2px',
                            background: isPlaying ? '#ffffff' : '#5f6368',
                            transformOrigin: 'bottom'
                        }}
                        animate={isPlaying ? {
                            height: ['8px', '16px', '8px'],
                        } : {
                            height: '8px'
                        }}
                        transition={isPlaying ? {
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.1
                        } : {
                            duration: 0.3
                        }}
                    />
                ))}
            </div>

            {/* Tooltip */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'absolute',
                            bottom: '-40px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#202124',
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 500,
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                            zIndex: 1000
                        }}
                    >
                        {isPlaying ? 'Pause music' : 'Play music'}
                        <div style={{
                            position: 'absolute',
                            top: '-4px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '4px solid transparent',
                            borderRight: '4px solid transparent',
                            borderBottom: '4px solid #202124'
                        }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

export default AudioToggle;
