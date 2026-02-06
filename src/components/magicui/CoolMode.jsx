import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Google Brand Colors + variations for richness
const PARTICLE_COLORS = [
    "#4285F4", // Blue
    "#EA4335", // Red
    "#FBBC05", // Yellow
    "#34A853", // Green
    "#FF6D01", // Orange
    "#46BDC6", // Cyan
];

const generateParticles = (count, startX, startY) => {
    return Array.from({ length: count }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 150 + 50; // Random speed 50-200
        const distance = velocity * 0.5; // Distance to travel

        return {
            id: Math.random().toString(36).substr(2, 9),
            x: startX,
            y: startY,
            targetX: startX + Math.cos(angle) * distance,
            targetY: startY + Math.sin(angle) * distance,
            color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
            size: Math.random() * 8 + 4, // 4-12px
            duration: Math.random() * 0.5 + 0.4, // 0.4 - 0.9s
        };
    });
};

export const CoolMode = ({ children, particleCount = 20 }) => {
    const [particles, setParticles] = useState([]);

    const handleClick = (e) => {
        // Prevent blocking existing click handlers
        // But we need the coordinates
        const rect = e.currentTarget.getBoundingClientRect();
        // Calculate center of the element for the explosion source, or use click pos
        // Using click pos is more "interactive"
        const x = e.clientX;
        const y = e.clientY;

        const newParticles = generateParticles(particleCount, x, y);
        setParticles((prev) => [...prev, ...newParticles]);
    };

    // Cleanup logic handled by AnimatePresence's onExitComplete somewhat, 
    // but better to auto-remove from state to keep it clean? 
    // Actually, for simplicity with AnimatePresence, we can just fire-and-forget 
    // IF we manage them. 
    // Let's use a timeout to clear old particles?
    // Or just render them and let them handle their own exit?
    // To properly use AnimatePresence, we need to remove them from the array.

    // Simpler approach: 
    // Just add them. Each particle component calls 'onComplete' to remove itself? 
    // No, React state update from child is okay.

    return (
        <div
            onClick={handleClick}
            style={{ display: 'inline-block', position: 'relative' }} // Changed to relative to contain children, but particles fixed
        >
            {children}

            {/* Render particles in a portal or fixed overlay typically. 
                For simplicity, we'll render them fixed here. */}
            <PortalParticles particles={particles} setParticles={setParticles} />
        </div>
    );
};

// Portal-ish component to render fixed particles
const PortalParticles = ({ particles, setParticles }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 9999,
            overflow: 'hidden'
        }}>
            <AnimatePresence>
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ x: p.x, y: p.y, scale: 0, opacity: 1 }}
                        animate={{
                            x: p.targetX,
                            y: p.targetY,
                            scale: 1,
                            opacity: 0
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: p.duration, ease: "easeOut" }}
                        onAnimationComplete={() => {
                            setParticles(prev => prev.filter(item => item.id !== p.id));
                        }}
                        style={{
                            position: 'absolute',
                            width: p.size,
                            height: p.size,
                            backgroundColor: p.color,
                            borderRadius: '50%',
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default CoolMode;
