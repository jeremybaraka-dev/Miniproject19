import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConfettiFireworks from './magicui/ConfettiFireworks';
import AudioToggle from './AudioToggle';

const Navbar = () => {
    const [hoveredNav, setHoveredNav] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    return (
        <nav style={{
            position: 'fixed',
            top: isMobile ? '16px' : 0,
            left: isMobile ? '16px' : 0,
            width: isMobile ? 'calc(100% - 32px)' : '100%',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            background: isMobile ? 'linear-gradient(135deg, rgba(255, 210, 230, 0.5), rgba(255, 230, 245, 0.1))' : 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)', // Safari support
            borderRadius: isMobile ? '24px' : '0',
            boxShadow: isMobile ? '0 8px 32px 0 rgba(31, 38, 135, 0.15)' : '0 1px 0 rgba(0,0,0,0.05)',
            border: isMobile ? '1px solid rgba(255, 255, 255, 0.4)' : 'none',
            borderBottom: isMobile ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease'
        }}
            onMouseLeave={() => !isMobile && setHoveredNav(null)}
        >
            <div style={{
                width: '100%',
                maxWidth: '1280px',
                padding: isMobile ? '0 16px' : '0 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative'
            }}>
                {/* Left: Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '8px', cursor: 'pointer', zIndex: 101 }}>
                    <img
                        src="/logo.png"
                        alt="Singularity Logo"
                        style={{ height: isMobile ? '40px' : '54px', width: 'auto' }}
                    />
                    <span style={{
                        fontFamily: '"Google Sans", "Inter", sans-serif',
                        fontWeight: 500,
                        fontSize: isMobile ? '1.1rem' : '1.25rem',
                        color: '#202124'
                    }}>
                        Singularity
                    </span>
                </div>

                {/* Desktop Navigation */}
                {!isMobile && (
                    <>
                        {/* Center: Nav Links */}
                        <div style={{ display: 'flex', gap: '32px', alignItems: 'center', height: '64px' }}>
                            <NavLink text="Product" />
                            <NavLink
                                text="Use Cases"
                                hasDropdown
                                isHovered={hoveredNav === 'Use Cases'}
                                onMouseEnter={() => setHoveredNav('Use Cases')}
                            />
                            <NavLink text="Pricing" />
                            <NavLink text="Blog" />
                            <NavLink
                                text="Resources"
                                hasDropdown
                                isHovered={hoveredNav === 'Resources'}
                                onMouseEnter={() => setHoveredNav('Resources')}
                            />
                        </div>

                        {/* Right: CTA and Audio Toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <AudioToggle />
                            <ConfettiFireworks>
                                <button style={{
                                    background: '#202124',
                                    color: '#ffffff',
                                    padding: '10px 24px',
                                    borderRadius: '9999px',
                                    border: 'none',
                                    fontSize: '0.95rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontFamily: 'inherit'
                                }}>
                                    Download
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                </button>
                            </ConfettiFireworks>
                        </div>
                    </>
                )}

                {/* Mobile: Audio Toggle and Hamburger */}
                {isMobile && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 101 }}>
                        <AudioToggle />
                        <HamburgerMenu
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </div>
                )}
            </div>

            {/* Desktop Dropdown Container */}
            {!isMobile && (
                <AnimatePresence>
                    {hoveredNav && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            style={{
                                position: 'absolute',
                                top: '64px',
                                left: 0,
                                width: '100vw',
                                display: 'flex',
                                justifyContent: 'center',
                                zIndex: 90,
                                paddingTop: '8px',
                                pointerEvents: 'none'
                            }}
                            onMouseEnter={() => setHoveredNav(hoveredNav)}
                            onMouseLeave={() => setHoveredNav(null)}
                        >
                            <div style={{
                                background: 'white',
                                borderRadius: '16px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                padding: '32px',
                                width: '100%',
                                maxWidth: '900px',
                                pointerEvents: 'auto',
                                display: 'flex',
                                gap: '60px'
                            }}>
                                {hoveredNav === 'Use Cases' && <UseCasesContent />}
                                {hoveredNav === 'Resources' && <ResourcesContent />}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobile && isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{
                            position: 'fixed',
                            top: '64px',
                            left: 0,
                            width: '100vw',
                            height: 'calc(100vh - 64px)',
                            background: 'white',
                            zIndex: 99,
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            padding: '24px',
                            boxSizing: 'border-box'
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {/* Navigation Links */}
                            <MobileNavLink text="Product" onClick={() => setIsMobileMenuOpen(false)} />
                            <MobileNavLink text="Use Cases" onClick={() => setIsMobileMenuOpen(false)} />
                            <MobileNavLink text="Pricing" onClick={() => setIsMobileMenuOpen(false)} />
                            <MobileNavLink text="Blog" onClick={() => setIsMobileMenuOpen(false)} />
                            <MobileNavLink text="Resources" onClick={() => setIsMobileMenuOpen(false)} />

                            {/* Download Button */}
                            <ConfettiFireworks>
                                <button style={{
                                    background: '#202124',
                                    color: '#ffffff',
                                    padding: '16px 24px',
                                    borderRadius: '9999px',
                                    border: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    fontFamily: 'inherit',
                                    marginTop: '16px',
                                    width: '100%'
                                }}>
                                    Download
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                </button>
                            </ConfettiFireworks>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const HamburgerMenu = ({ isOpen, onClick }) => (
    <button
        onClick={onClick}
        style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            justifyContent: 'center',
            alignItems: 'center',
            width: '32px',
            height: '32px'
        }}
    >
        <motion.span
            animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 8 : 0
            }}
            style={{
                display: 'block',
                width: '24px',
                height: '2px',
                background: '#202124',
                borderRadius: '2px',
                transformOrigin: 'center'
            }}
        />
        <motion.span
            animate={{
                opacity: isOpen ? 0 : 1
            }}
            style={{
                display: 'block',
                width: '24px',
                height: '2px',
                background: '#202124',
                borderRadius: '2px'
            }}
        />
        <motion.span
            animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -8 : 0
            }}
            style={{
                display: 'block',
                width: '24px',
                height: '2px',
                background: '#202124',
                borderRadius: '2px',
                transformOrigin: 'center'
            }}
        />
    </button>
);

const MobileNavLink = ({ text, onClick }) => (
    <div
        onClick={onClick}
        style={{
            fontSize: '1.25rem',
            fontWeight: 500,
            color: '#202124',
            padding: '12px 0',
            borderBottom: '1px solid #f1f3f4',
            cursor: 'pointer'
        }}
    >
        {text}
    </div>
);

const NavLink = ({ text, hasDropdown, isHovered, onMouseEnter }) => (
    <div
        style={{
            cursor: 'pointer',
            color: isHovered ? '#202124' : '#5f6368',
            fontSize: '1rem',
            fontWeight: isHovered ? 500 : 400,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'color 0.2s',
            height: '100%',
            position: 'relative'
        }}
        onMouseEnter={onMouseEnter}
    >
        {text}
        {hasDropdown && (
            <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{
                    opacity: 0.7,
                    transform: isHovered ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                }}
            >
                <polyline points="6 9 12 15 18 9" />
            </svg>
        )}
    </div>
);

const UseCasesContent = () => (
    <>
        <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 500, color: '#202124', marginBottom: '12px', lineHeight: 1.2 }}>
                Built for developers in the agent-first era
            </h3>
            <p style={{ fontSize: '1rem', color: '#5f6368', marginBottom: '24px', lineHeight: 1.5 }}>
                Explore how Singularity helps you build
            </p>
            <button style={{
                background: '#f1f3f4',
                color: '#202124',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '9999px',
                fontWeight: 500,
                cursor: 'pointer'
            }}>
                See overview
            </button>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <DropdownItem icon="hub" text="Professional" />
            <DropdownItem icon="code" text="Frontend" />
            <DropdownItem icon="layers" text="Fullstack" />
        </div>
    </>
);

const ResourcesContent = () => (
    <>
        <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 500, color: '#202124', marginBottom: '12px', lineHeight: 1.2 }}>
                Everything you need to <br /> stay up-to-date and get help
            </h3>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <DropdownItem text="Documentation" simple />
            <DropdownItem text="Changelog" simple />
            <DropdownItem text="Support" simple />
            <DropdownItem text="Press" simple />
            <DropdownItem text="Releases" simple />
        </div>
    </>
);

const DropdownItem = ({ icon, text, simple }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '1.1rem',
        color: '#202124',
        fontWeight: 500,
        cursor: 'pointer',
        padding: '8px 0',
        borderBottom: simple ? 'none' : '1px solid transparent'
    }}>
        {!simple && <div style={{ width: 24, height: 24, background: '#f1f3f4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 6, height: 6, background: '#5f6368', borderRadius: '50%' }}></div>
        </div>}
        <span style={{ flex: 1 }}>{text}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
        </svg>
    </div>
);

export default Navbar;
