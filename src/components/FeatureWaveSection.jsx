import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TextAnimate } from './magicui/TextAnimate';
import TextReveal from './magicui/TextReveal';
import FooterParticles from './FooterParticles';
import TypingText from './TypingText';

const icons = [
    'sparkle', 'arrow-up', 'box', 'git-branch', 'code', 'terminal', 'refresh', 'star', 'folder', 'pen-tool', 'chevron-left', 'arrow-right'
];

// Placeholder for the icons in the image
// Using CSS/SVG shapes for now to match the "clean" aesthetic without external assets
const IconPlaceholder = ({ type, isMobile }) => {
    return (
        <div style={{
            width: isMobile ? '60px' : '80px',
            height: isMobile ? '60px' : '80px',
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #f1f3f4',
            fontSize: isMobile ? '18px' : '24px',
            color: '#202124'
        }}>
            {/* Simple representation based on type */}
            {type === 'sparkle' && '✨'}
            {type === 'arrow-up' && '↑'}
            {type === 'box' && '❒'}
            {type === 'git-branch' && 'ᛘ'}
            {type === 'code' && '{ }'}
            {type === 'terminal' && '>_'}
            {type === 'refresh' && '↻'}
            {type === 'star' && '✦'}
            {type === 'folder' && '📁'}
            {type === 'pen-tool' && '✎'}
            {type === 'chevron-left' && '< >'}
            {type === 'arrow-right' && '→'}
        </div>
    );
};

const FeatureWaveSection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Text to type out
    const text = "Singularity is our agentic development platform, evolving the IDE into the only and the first one in this era.";

    return (
        <section style={{
            minHeight: isMobile ? 'auto' : '100vh',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Centered for the wave
            justifyContent: 'flex-start',
            position: 'relative',
            padding: isMobile ? '0px 0 40px 0' : '40px 0', // Removed top padding on mobile
            overflow: 'visible', // Allow sticky to work if needed, mostly handled by TextReveal height
            zIndex: 20
        }}>
            {/* Footer Particles (Google Dots) Background - desktop only */}
            {!isMobile && <FooterParticles isMobile={isMobile} />}
            {/* Waving Icons Container */}
            <div style={{
                display: 'flex',
                gap: isMobile ? '12px' : '24px',
                marginBottom: '0px',
                height: '200px',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
                padding: isMobile ? '0 12px' : '0',
                overflow: 'hidden'
            }}>
                {icons.map((icon, index) => {
                    // Normalize index to -1 to 1 for calculation
                    const normalized = (index / (icons.length - 1)) * 2 - 1;
                    // Base Arch: Hill shape
                    const yOffset = Math.pow(normalized, 2) * 80; // 80px drop at edges

                    return (
                        <motion.div
                            key={index}
                            initial={{ y: yOffset }}
                            animate={isMobile ? undefined : {
                                y: [yOffset - 30, yOffset + 30, yOffset - 30], // Increased amplitude (60px swing)
                            }}
                            transition={{
                                duration: 2.5, // Faster cycle for more energy
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.15, // Delay creates the "Left to Right" wave travel
                            }}
                        >
                            <IconPlaceholder type={icon} isMobile={isMobile} />
                        </motion.div>
                    );
                })}
            </div>

            {/* Magic UI Text Reveal - Replaced with TypingText on mobile */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                {isMobile ? (
                    <div style={{
                        marginTop: '16px',
                        padding: '0 24px',
                        fontSize: '16px', // "Senior Designer" choice: restrained, readable
                        fontWeight: 400, // Clean, not bold
                        textAlign: 'left',
                        color: '#202124',
                        lineHeight: 1.35, // Tight but comfortable
                        maxWidth: '32ch', // Editorial line length
                        marginLeft: '0', // Ensure alignment
                    }}>
                        <TextAnimate
                            text={text}
                            animation="blurInUp"
                            by="character"
                            duration={0.1} // reduced logic duration to make it faster per char
                        />
                    </div>
                ) : (
                    <TextReveal text={text} />
                )}
            </div>
        </section>
    );
};

export default FeatureWaveSection;
