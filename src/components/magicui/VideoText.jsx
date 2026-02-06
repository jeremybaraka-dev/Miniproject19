import React from 'react';

export const VideoText = ({
    src,
    children,
    className = "",
    overlayColor = "#ffffff",
    textColor = "#000000",
    mixBlendMode = "screen"
}) => {
    return (
        <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }} className={className}>
            {/* Layer 1: The Video (Background) */}
            <video
                src={src}
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0
                }}
            />

            {/* Layer 2: The Mask (Foreground) */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                backgroundColor: overlayColor,
                color: textColor,
                mixBlendMode: mixBlendMode,
                display: 'inline-block', // Ensure it wraps content tightly
                width: '100%',
                height: '100%'
            }}>
                {children}
            </div>
        </div>
    );
};

export default VideoText;
