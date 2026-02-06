import React, { useId } from "react";

export const StripedPattern = ({
    width = 40,
    height = 40,
    x = 0,
    y = 0,
    strokeWidth = 1,
    strokeDasharray = "0",
    className,
    style,
    ...props
}) => {
    const id = useId();

    return (
        <svg
            aria-hidden="true"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                fill: 'none',
                stroke: '#e5e7eb', // Neutral-200 equivalent
                ...style
            }}
            className={className}
            {...props}
        >
            <defs>
                <pattern
                    id={id}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    patternContentUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                    patternTransform="rotate(-45)"
                >
                    <line
                        x1="0"
                        y1={0}
                        x2={0}
                        y2={height}
                        strokeWidth={strokeWidth}
                        strokeDasharray={strokeDasharray}
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
        </svg>
    );
};

export default StripedPattern;
