"use client"

import React from "react"

export function LineShadowText({
    children,
    className = "",
    shadowColor = "black",
    shadowOffset = 4,
    style = {}
}) {
    return (
        <span
            className={className}
            style={{
                display: "inline-block",
                position: "relative",
                ...style,
            }}
        >
            {/* Shadow layers */}
            {[...Array(shadowOffset)].map((_, i) => (
                <span
                    key={i}
                    style={{
                        position: "absolute",
                        left: `${i + 1}px`,
                        top: `${i + 1}px`,
                        color: shadowColor,
                        opacity: 0.1,
                        zIndex: -1,
                    }}
                    aria-hidden="true"
                >
                    {children}
                </span>
            ))}
            {/* Main text */}
            <span style={{ position: "relative", zIndex: 1 }}>
                {children}
            </span>
        </span>
    )
}
