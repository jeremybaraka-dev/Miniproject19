import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CoolMode from './magicui/CoolMode';
import { TextAnimate } from './magicui/TextAnimate';
import BackgroundPaths from './BackgroundPaths';

const HeroSection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section style={{
            height: isMobile ? 'auto' : '100vh',
            minHeight: isMobile ? 'auto' : '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            textAlign: 'center',
            padding: isMobile ? '96px 20px 64px' : '0 20px',
            color: '#202124',
            overflow: 'hidden'
        }}>
            {/* Background Paths - optimized for mobile */}
            <BackgroundPaths position={1} isMobile={isMobile} />

            {/* Content wrapper */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: isMobile ? 'flex-start' : 'center',
                alignItems: isMobile ? 'flex-start' : 'center',
                height: '100%'
            }}>
                {/* Main Headline */}
                <div style={{
                    marginBottom: isMobile ? '32px' : '64px', // Reverting manual margin change
                    textAlign: isMobile ? 'left' : 'center',
                    maxWidth: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: isMobile ? 'flex-start' : 'center',
                    padding: isMobile ? '0' : '0 10px',
                    overflow: 'visible'
                }}>
                    <h1 style={{
                        fontFamily: '"Outfit", sans-serif',
                        fontSize: isMobile ? '11vw' : 'clamp(40px, 5vw, 80px)', // Reverted to clamp
                        fontWeight: 500,
                        letterSpacing: '-0.02em',
                        lineHeight: isMobile ? '1.1' : '1.1',
                        color: '#202124',
                        margin: 0,
                        textAlign: isMobile ? 'left' : 'center',
                        width: '100%'
                    }}>
                        {isMobile ? (
                            "Experience\nliftoff with the next\ngeneration IDE"
                        ) : (
                            // Desktop: TextAnimate with slideUp, as spans to avoid nested h1
                            <div className="flex flex-col items-center">
                                <TextAnimate animation="slideLeft" by="character" as="span">
                                    Experience liftoff with the
                                </TextAnimate>
                                <TextAnimate animation="slideLeft" by="character" delay={0.15} as="span">
                                    next-generation IDE
                                </TextAnimate>
                            </div>
                        )}
                    </h1>
                </div>

                {/* Buttons */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: isMobile ? '8px' : '16px',
                    alignItems: 'center',
                    justifyContent: isMobile ? 'flex-start' : 'center',
                    width: '100%',
                    padding: isMobile ? '0' : '0 16px'
                }}>
                    <CoolMode>
                        <GravityButton variant="primary" text="Download for Windows" icon="windows" isMobile={isMobile} />
                    </CoolMode>

                    <CoolMode>
                        <GravityButton variant="secondary" text="Explore use cases" isMobile={isMobile} />
                    </CoolMode>
                </div>
            </div >
        </section >
    );
};

const GravityButton = ({ variant, text, icon, isMobile }) => {
    const isPrimary = variant === 'primary';

    const baseStyle = {
        padding: isMobile ? '8px 16px' : 'clamp(14px, 3vw, 18px) clamp(24px, 5vw, 36px)',
        borderRadius: '9999px',
        fontSize: isMobile ? '0.75rem' : 'clamp(0.95rem, 2vw, 1.125rem)',
        fontWeight: 500,
        outline: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'inherit',
        width: 'auto',
        maxWidth: 'none',
        justifyContent: 'center',
        minHeight: isMobile ? '40px' : '44px',
        boxSizing: 'border-box'
    };

    const primaryStyle = {
        ...baseStyle,
        background: '#000000',
        color: '#ffffff',
    };

    const secondaryStyle = {
        ...baseStyle,
        background: '#f1f3f4',
        color: '#202124',
    };

    return (
        <motion.button
            style={isPrimary ? primaryStyle : secondaryStyle}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 17
            }}
        >
            {icon === 'windows' && (
                <svg width="20" height="20" viewBox="0 0 88 88" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 12.402L35.652 7.523V41.83H0V12.402ZM46.31 6.062L87.133 0V41.83H46.31V6.062ZM0 52.128H35.652V86.436L0 81.558V52.128ZM46.31 52.126H87.133V94L46.31 87.936V52.126Z" />
                </svg>
            )}
            {text}
        </motion.button>
    );
};

export default HeroSection;
