"use client";

import confetti from "canvas-confetti";
import React from "react";

export function ConfettiFireworks({ children, className }) {
    const handleClick = () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) =>
            Math.random() * (max - min) + min;

        const interval = window.setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);
    };

    // We clone the child element to attach the onClick handler, 
    // or we wraps it. Wrapping is safer to avoid overriding existing onClick, 
    // but the prompt implies specific behavior. 
    // Let's wrapping it in a div that handles the click as requested in the example.
    // Actually, the example shows: 
    // <div className="relative"><Button onClick={handleClick}>Trigger</Button></div>
    // Since I am passing "children" which is likely the button, I should clone it or wrap it.
    // Cloning is better to preserve the button's appearance exactly.

    return (
        <div className={`relative ${className || ''}`} style={{ display: 'inline-block' }}>
            {React.Children.map(children, child => {
                return React.cloneElement(child, {
                    onClick: (e) => {
                        handleClick();
                        if (child.props.onClick) child.props.onClick(e);
                    }
                });
            })}
        </div>
    );
}

export default ConfettiFireworks;
