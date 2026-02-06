import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FooterParticles from './FooterParticles';
import SparklesText from './magicui/SparklesText';
import { LineShadowText } from './magicui/LineShadowText';

const ScrollVideoSection = () => {
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Animation:
    // 0-40%: Scale up from small to full width
    // 40-70%: Stay Full Screen
    // 70-100%: Scale down (optional, but keeps flow)

    // START small (0.5), visible background around it.
    // END at 1.0 (covers everything).
    // On mobile, we don't scale, we just keep it fixed.
    const scale = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], isMobile ? [0.65, 1, 1, 1] : [0.5, 1, 1, 0.5]);

    // Border Radius: Round when small, 0 when full screen
    // Fixed radius on mobile
    const borderRadius = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], isMobile ? ["20px", "16px", "16px", "16px"] : ["40px", "0px", "0px", "40px"]);

    return (
        <section
            ref={containerRef}
            style={{
                height: isMobile ? '60vh' : '250vh', // Minimal scroll distance on mobile
                position: 'relative',
                marginTop: isMobile ? '0' : '0',
                marginBottom: isMobile ? '0' : '0',
                padding: isMobile ? '0' : '0'
            }}
        >
            {/* Footer Particles (Google Dots) - desktop only for performance */}
            {!isMobile && <FooterParticles isMobile={isMobile} />}
            <div style={{
                position: isMobile ? 'sticky' : 'sticky',
                top: isMobile ? '20vh' : 0,
                height: isMobile ? 'auto' : '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center', // Center vertically
                justifyContent: 'center', // Center horizontally
                overflow: 'hidden',
                paddingLeft: '0', // Remove left padding to center
            }}>
                <motion.div
                    style={{
                        scale,
                        borderRadius,
                        width: isMobile ? '85%' : '100vw', // Reduced width on mobile
                        maxWidth: isMobile ? '400px' : 'none', // Max width for larger mobiles
                        height: isMobile ? 'auto' : '100vh',
                        aspectRatio: isMobile ? '16/9' : 'auto', // Force landscape on mobile
                        background: '#000', // The video container itself is dark
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        zIndex: 10 // Ensure it sits atop particles
                    }}
                >
                    {/* Content Container */}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#101010'
                    }}>
                        {/* Video Element */}
                        <div style={{
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover' // Ensures it fills the screen like the reference
                                }}
                            >
                                <source src="/antigravity-demo.webm" type="video/webm" />
                                Your browser does not support the video tag.
                            </video>

                            <div style={{
                                position: 'absolute',
                                bottom: '10%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                textAlign: 'center',
                                width: '100%',
                                zIndex: 2
                            }}>
                                <h2 style={{
                                    color: 'white',
                                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                                    fontWeight: 500,
                                    letterSpacing: '-0.02em'
                                }}>
                                    {isMobile ? (
                                        // Plain text on mobile for performance
                                        <>Build at the speed of <span style={{ fontStyle: 'italic' }}>thought</span>.</>
                                    ) : (
                                        // Animated text on desktop only
                                        <SparklesText
                                            colors={{ first: '#4285F4', second: '#FBBC05' }}
                                            sparklesCount={15}
                                            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                                        >
                                            Build at the speed of{" "}
                                            <LineShadowText className="italic" shadowColor="white">
                                                thought
                                            </LineShadowText>.
                                        </SparklesText>
                                    )}
                                </h2>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ScrollVideoSection;
