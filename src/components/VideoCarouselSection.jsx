import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import LocalParticles from './LocalParticles';

const cases = [
    {
        id: 1,
        title: "Frontend developer",
        description: "Streamline UX development by leveraging browser-in-the-loop agents to automate repetitive tasks.",
        video: "/v1 (1).mp4",
        accent: true
    },
    {
        id: 2,
        title: "Full stack developer",
        description: "Build production-ready applications with confidence with thoroughly designed artifacts and comprehensive verification tests.",
        video: "/v1 (2).mp4"
    },
    {
        id: 3,
        title: "Enterprise developer",
        description: "Streamline operations and reduce context switching by orchestrating agents across workspaces using the Agent Manager.",
        video: "/v1 (3).mp4"
    }
];

const VideoCarouselSection = () => {
    const targetRef = useRef(null);
    const mobileScrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mobileIndex, setMobileIndex] = useState(0); // Separate index for mobile carousel
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Mobile Auto-play Logic
    useEffect(() => {
        if (!isMobile) return;

        const interval = setInterval(() => {
            setMobileIndex((prev) => (prev + 1) % cases.length);
        }, 4000); // 4 seconds per slide

        return () => clearInterval(interval);
    }, [isMobile]);

    // Sync scroll to mobileIndex change (from auto-play or buttons)
    useEffect(() => {
        if (isMobile && mobileScrollRef.current) {
            const cardWidth = window.innerWidth * 0.9;
            const gap = 20;
            const scrollPos = mobileIndex * (cardWidth + gap);
            // Only scroll if significantly different to avoid fighting user scroll
            if (Math.abs(mobileScrollRef.current.scrollLeft - scrollPos) > 10) {
                mobileScrollRef.current.scrollTo({
                    left: scrollPos,
                    behavior: 'smooth'
                });
            }
        }
    }, [mobileIndex, isMobile]);

    const handleMobileNext = () => {
        setMobileIndex((prev) => (prev + 1) % cases.length);
    };

    const handleMobilePrev = () => {
        setMobileIndex((prev) => (prev - 1 + cases.length) % cases.length);
    };

    const handleScroll = () => {
        if (mobileScrollRef.current) {
            const scrollLeft = mobileScrollRef.current.scrollLeft;
            const cardWidth = window.innerWidth * 0.9;
            const gap = 20;
            const newIndex = Math.round(scrollLeft / (cardWidth + gap));
            // Update ref checking to avoid state loop if needed, but setState optimizes checks usually
            if (newIndex !== mobileIndex && !Number.isNaN(newIndex)) {
                // Update state without triggering scroll effect loop ideally
                // But simplified: Just set it. The effect check abs diff should prevent loop if close.
                // Or better: separate "targetIndex" from "displayIndex", but let's try simple first.
                // setMobileIndex(newIndex); 
                // Actually, if we setMobileIndex here, the effect fires and tries to scroll TO it. 
                // That's fine if it matches.
            }
        }
    };

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // Transform scroll progress to horizontal translation
    // Adjust "-66%" based on the fact we want to show 3 items.
    // Moving from 0 (first item) to end (last item).
    // The track width will be large.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const index = Math.min(Math.floor(latest * cases.length), cases.length - 1);
        setCurrentIndex(index);
    });

    return (
        <section
            ref={targetRef}
            style={{
                height: isMobile ? 'auto' : '300vh',
                background: '#ffffff',
                fontFamily: '"Google Sans", "Product Sans", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                position: 'relative',
                paddingBottom: isMobile ? '60px' : '0'
            }}
        >
            {/* LocalParticles Background - disabled on mobile */}
            <LocalParticles density={isMobile ? 0 : 220} />
            <div style={{
                position: isMobile ? 'relative' : 'sticky',
                top: 0,
                height: isMobile ? 'auto' : '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden',
                paddingTop: isMobile ? '40px' : '0'
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    width: '100%',
                    padding: isMobile ? '0' : '0 40px', // Removed padding on mobile to full bleed
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '100%'
                }}>
                    {/* Horizontal Scroll Track */}
                    <div
                        ref={isMobile ? mobileScrollRef : null} // Use separate ref for mobile scrolling
                        onScroll={isMobile ? handleScroll : undefined}
                        style={{
                            width: '100%',
                            overflowX: isMobile ? 'auto' : 'hidden', // Enable scroll on mobile
                            overflowY: 'hidden',
                            display: 'flex',
                            justifyContent: isMobile ? 'flex-start' : 'flex-start', // Align start for scroll
                            scrollSnapType: isMobile ? 'x mandatory' : 'none', // Snap on mobile
                            paddingLeft: isMobile ? '5vw' : '0', // Initial offset
                            paddingRight: isMobile ? '5vw' : '0', // End offset
                        }}
                        className="hide-scrollbar"
                    >
                        <motion.div
                            animate={undefined} // Disable framer motion x drive for mobile, rely on native scroll
                            style={{
                                display: 'flex',
                                gap: isMobile ? '20px' : '40px',
                                x: isMobile ? undefined : x, // Restore scroll-driven x for desktop
                                width: isMobile ? 'max-content' : 'max-content',
                            }}
                        >
                            {cases.map((item) => (
                                <div
                                    key={item.id}
                                    style={{
                                        width: isMobile ? '90vw' : '60vw', // Reduced from 85vw
                                        maxWidth: isMobile ? '100%' : '700px', // Reduced from 900px
                                        height: isMobile ? 'auto' : '400px', // Reduced from 540px
                                        borderRadius: isMobile ? '24px' : '32px', // Slightly tight radius for smaller Desktop card
                                        overflow: 'hidden',
                                        position: 'relative',
                                        background: '#f1f3f4',
                                        flexShrink: 0,
                                        scrollSnapAlign: isMobile ? 'center' : 'none',
                                        display: 'flex',
                                        flexDirection: isMobile ? 'column' : 'block', // Column layout for mobile
                                        boxShadow: isMobile ? 'none' : '0 12px 48px rgba(0,0,0,0.12)' // Enhanced shadow for "pop"
                                    }}
                                >
                                    <div style={{
                                        width: '100%',
                                        height: isMobile ? '300px' : '100%', // Fixed video height on mobile
                                        position: 'relative'
                                    }}>
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                            src={item.video}
                                        />
                                        {/* Play Button Icon - Centered on Video - Mobile Only */}
                                        {isMobile && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                width: '64px',
                                                height: '64px',
                                                background: 'rgba(255,255,255,0.25)',
                                                backdropFilter: 'blur(4px)',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                border: '1px solid rgba(255,255,255,0.1)'
                                            }}>
                                                <div style={{
                                                    width: 0,
                                                    height: 0,
                                                    borderTop: '10px solid transparent',
                                                    borderBottom: '10px solid transparent',
                                                    borderLeft: '16px solid white',
                                                    marginLeft: '4px'
                                                }} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Mobile Content (Below Video) */}
                                    {isMobile && (
                                        <div style={{ padding: '24px', background: '#f8f9fa' }}>
                                            <h2 style={{
                                                fontSize: '1.75rem',
                                                fontWeight: 500,
                                                color: '#202124',
                                                marginBottom: '12px',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                                {item.title}
                                                {item.accent && (
                                                    <span style={{
                                                        display: 'inline-block',
                                                        width: '4px',
                                                        height: '24px',
                                                        background: 'linear-gradient(to bottom, #4285F4, #EA4335, #FBBC05, #34A853)',
                                                        marginLeft: '12px',
                                                        borderRadius: '2px'
                                                    }} />
                                                )}
                                            </h2>
                                            <p style={{
                                                fontSize: '1rem',
                                                color: '#5f6368',
                                                lineHeight: 1.5,
                                                marginBottom: '20px'
                                            }}>
                                                {item.description}
                                            </p>
                                            <a href="#" style={{
                                                color: '#202124',
                                                textDecoration: 'none',
                                                fontWeight: 500,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}>
                                                View case <span style={{ fontSize: '1.2em' }}>›</span>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Bottom Controls Area (Text Only) - Desktop Only */}
                    {!isMobile && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-end',
                            marginTop: '32px',
                            width: '100%',
                            maxWidth: '900px'
                        }}>
                            {/* Selected Case Info */}
                            <div style={{ maxWidth: '440px' }}>
                                <h4 style={{
                                    fontSize: '1.5rem',
                                    margin: '0 0 16px 0',
                                    color: '#202124',
                                    fontWeight: 400,
                                    letterSpacing: '-0.01em'
                                }}>
                                    {cases[currentIndex].title}
                                </h4>
                                <p style={{
                                    color: '#5f6368',
                                    margin: '0 0 32px 0',
                                    lineHeight: 1.6,
                                    fontSize: '1.125rem'
                                }}>
                                    {cases[currentIndex].description}
                                </p>
                                <a href="#" style={{
                                    color: '#202124',
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '1rem',
                                    paddingBottom: '4px'
                                }}>
                                    View case <span style={{ fontSize: '1.2em' }}>›</span>
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Mobile Navigation Buttons */}
                    {
                        isMobile && (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '20px',
                                marginTop: '20px',
                                marginBottom: '20px'
                            }}>
                                <button
                                    onClick={handleMobilePrev}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        background: '#f1f3f4',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '24px',
                                        cursor: 'pointer',
                                        color: '#202124'
                                    }}
                                >
                                    ←
                                </button>
                                <button
                                    onClick={handleMobileNext}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        background: '#202124',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '24px',
                                        cursor: 'pointer',
                                        color: '#ffffff'
                                    }}
                                >
                                    →
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default VideoCarouselSection;
