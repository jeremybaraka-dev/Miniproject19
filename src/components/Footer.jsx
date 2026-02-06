import React, { useState, useEffect } from 'react';
import VideoText from './magicui/VideoText';
import ComicText from './magicui/ComicText';
import AnimatedGradientText from './magicui/AnimatedGradientText';
import HyperText from './magicui/HyperText';
import FooterParticles from './FooterParticles';

const Footer = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <footer style={{
            background: '#ffffff',
            color: '#202124',
            padding: isMobile ? '60px 20px 30px 20px' : '120px 40px 40px 40px',
            fontFamily: '"Google Sans", "Product Sans", Inter, sans-serif',
            position: 'relative',
            zIndex: 10,
            borderRadius: isMobile ? '40px 40px 0 0' : '80px 80px 0 0',
            marginTop: isMobile ? '60px' : '120px',
            overflow: 'hidden'
        }}>
            <FooterParticles />
            <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Top Section */}
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: isMobile ? '60px' : '80px',
                    flexWrap: 'wrap',
                    gap: isMobile ? '30px' : '40px'
                }}>
                    {/* Headline */}
                    <div style={{
                        marginBottom: 0,
                        fontSize: isMobile ? '2.5rem' : '3.5rem',
                        fontWeight: 600,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1,
                        color: '#202124'
                    }}>
                        <HyperText>Experience liftoff</HyperText>
                    </div>

                    {/* Links Columns */}
                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: isMobile ? '30px' : '80px',
                        width: isMobile ? '100%' : 'auto'
                    }}>
                        {/* Product Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <h4 style={{ fontSize: '1.25rem', margin: '0 0 8px 0', fontWeight: 500, color: '#202124' }}>Product</h4>
                            <a href="#" style={{ color: '#5f6368', textDecoration: 'none', fontSize: '1.1rem' }}>Download</a>
                            <a href="#" style={{ color: '#5f6368', textDecoration: 'none', fontSize: '1.1rem' }}>Product</a>
                            <a href="#" style={{ color: '#5f6368', textDecoration: 'none', fontSize: '1.1rem' }}>Docs</a>
                            <a href="#" style={{ color: '#5f6368', textDecoration: 'none', fontSize: '1.1rem' }}>Changelog</a>
                        </div>
                        {/* Resources Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <h4 style={{ fontSize: '1.25rem', margin: '0 0 8px 0', fontWeight: 500, color: '#202124' }}>Resources</h4>
                            <a href="#" style={{ color: '#5f6368', textDecoration: 'none', fontSize: '1.1rem' }}>Blog</a>
                            <a href="#" style={{ color: '#5f6368', textDecoration: 'none', fontSize: '1.1rem' }}>Pricing</a>
                            <a href="#" style={{ color: '#5f6368', textDecoration: 'none', fontSize: '1.1rem' }}>Use Cases</a>
                        </div>
                    </div>
                </div>

                {/* Massive Branding */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: isMobile ? '60px' : '120px',
                    marginTop: isMobile ? '20px' : '40px'
                }}>
                    <VideoText
                        src="https://cdn.magicui.design/ocean-small.webm"
                        overlayColor="#ffffff"
                        textColor="#000000"
                        mixBlendMode="screen"
                    >
                        <h1 style={{
                            fontSize: isMobile ? 'clamp(3rem, 18vw, 18vw)' : '18vw',
                            lineHeight: 0.8,
                            fontWeight: 500,
                            letterSpacing: '-0.04em',
                            margin: 0,
                            color: '#000000'
                        }}>
                            Singularity
                        </h1>
                    </VideoText>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'flex-start' : 'flex-end',
                    borderTop: 'none',
                    paddingTop: '20px',
                    flexWrap: 'wrap',
                    gap: isMobile ? '24px' : '20px'
                }}>
                    {/* Logo Area */}
                    <div style={{ fontSize: '1.5rem', fontWeight: 500, color: '#5f6368' }}>
                        Singularity
                    </div>

                    {/* Bottom Links */}
                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: isMobile ? '16px' : '32px'
                    }}>
                        <a href="#" style={{ color: '#5f6368', textDecoration: 'none', fontSize: '0.95rem' }}>About Singularity</a>
                        <a href="#" style={{ color: '#5f6368', textDecoration: 'none', fontSize: '0.95rem' }}>Singularity Products</a>
                        <a href="#" style={{ color: '#5f6368', textDecoration: 'none', fontSize: '0.95rem' }}>Privacy</a>
                        <a href="#" style={{ color: '#5f6368', textDecoration: 'none', fontSize: '0.95rem' }}>Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
