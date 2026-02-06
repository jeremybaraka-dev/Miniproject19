import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import CoolMode from './magicui/CoolMode';

const MobileBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #e5e5f7;
  background-image: radial-gradient(#444cf7 10%, transparent 10%),
                      radial-gradient(#444cf7 10%, transparent 10%);
  background-size: 100px 100px;
  background-position: 0 0, 50px 50px;
  opacity: 0.15; /* Subtle opacity to not overpowere text */
  pointer-events: none;
`;

const ParticleInteractionSection = () => {
    const devRef = useRef(null);
    const orgRef = useRef(null);
    const [hoverState, setHoverState] = useState('default'); // 'default', 'code', 'org'
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section style={{
            position: 'relative',
            minHeight: '100vh',
            width: '100vw',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        }}>
            {/* Background: Mobile Pattern vs Desktop SVG */}
            {isMobile ? (
                <MobileBackground />
            ) : (
                <img
                    src="/kl.svg"
                    alt=""
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        pointerEvents: 'none'
                    }}
                />
            )}

            <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                width: '100%',
                maxWidth: '1200px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: isMobile ? '40px' : '80px',
                flexWrap: 'wrap',
                padding: isMobile ? '40px 24px' : '40px'
            }}>
                {/* Developer Card */}
                <div
                    ref={devRef}
                    onMouseEnter={() => setHoverState('code')}
                    onMouseLeave={() => setHoverState('default')}
                    style={{
                        flex: '1 1 400px',
                        textAlign: 'center',
                        padding: isMobile ? '40px 20px' : '80px 40px',
                        cursor: 'default'
                    }}
                >
                    <div style={{
                        marginBottom: '20px',
                        display: 'inline-block',
                        padding: '6px 14px',
                        background: '#f8f9fa',
                        borderRadius: '16px',
                        fontSize: '11px',
                        color: '#5f6368',
                        fontWeight: 500,
                        border: '1px solid #e8eaed'
                    }}>
                        Available at no charge
                    </div>
                    <h3 style={{
                        fontSize: isMobile ? '2.25rem' : '3rem',
                        fontWeight: 400,
                        lineHeight: 1.1,
                        marginBottom: '32px',
                        color: '#202124'
                    }}>
                        For developers<br />
                        <span style={{ color: '#5f6368' }}>Achieve new heights</span>
                    </h3>
                    <CoolMode>
                        <button style={{
                            background: '#202124',
                            color: 'white',
                            border: 'none',
                            padding: isMobile ? '16px 32px' : '14px 36px',
                            borderRadius: '30px',
                            fontSize: '16px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                        }}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Download
                        </button>
                    </CoolMode>
                </div>

                {/* Organization Card */}
                <div
                    ref={orgRef}
                    onMouseEnter={() => setHoverState('org')}
                    onMouseLeave={() => setHoverState('default')}
                    style={{
                        flex: '1 1 400px',
                        textAlign: 'center',
                        padding: isMobile ? '40px 20px' : '80px 40px',
                        cursor: 'default'
                    }}
                >
                    <div style={{
                        marginBottom: '20px',
                        display: 'inline-block',
                        padding: '6px 14px',
                        background: '#f8f9fa',
                        borderRadius: '16px',
                        fontSize: '11px',
                        color: '#5f6368',
                        fontWeight: 500,
                        border: '1px solid #e8eaed'
                    }}>
                        Coming soon
                    </div>
                    <h3 style={{
                        fontSize: isMobile ? '2.25rem' : '3rem',
                        fontWeight: 400,
                        lineHeight: 1.1,
                        marginBottom: '32px',
                        color: '#202124'
                    }}>
                        For organizations<br />
                        <span style={{ color: '#5f6368' }}>Level up your entire team</span>
                    </h3>
                    <CoolMode>
                        <button style={{
                            background: '#f1f3f4',
                            color: '#202124',
                            border: 'none',
                            padding: isMobile ? '16px 32px' : '14px 36px',
                            borderRadius: '30px',
                            fontSize: '16px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                        }}
                            onMouseOver={(e) => e.target.style.background = '#e8eaed'}
                            onMouseOut={(e) => e.target.style.background = '#f1f3f4'}
                        >
                            Notify me
                        </button>
                    </CoolMode>
                </div>
            </div>
        </section>
    );
};

export default ParticleInteractionSection;
