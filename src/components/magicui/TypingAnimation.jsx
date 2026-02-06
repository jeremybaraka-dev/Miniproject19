import React, { useState, useEffect, useRef } from 'react';

export const TypingAnimation = ({
    words = [],
    children,
    startOnView = false,
    blinkCursor = true,
    pauseDelay = 2000,
    typeSpeed = 100,
    deleteSpeed = 50,
    loop = false,
    className = '',
    style = {}
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [hasStarted, setHasStarted] = useState(!startOnView);
    const elementRef = useRef(null);

    // Use words array if provided, otherwise use children as single text
    const textArray = words.length > 0 ? words : [typeof children === 'string' ? children : ''];
    const currentWord = textArray[currentWordIndex];

    // Intersection Observer for startOnView
    useEffect(() => {
        if (!startOnView) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [startOnView, hasStarted]);

    // Typing animation logic
    useEffect(() => {
        if (!hasStarted) return;

        let timeout;

        if (isPaused) {
            timeout = setTimeout(() => {
                setIsPaused(false);
                if (words.length > 1) {
                    setIsDeleting(true);
                }
            }, pauseDelay);
        } else if (isDeleting) {
            if (displayedText.length === 0) {
                setIsDeleting(false);
                setCurrentWordIndex((prev) => {
                    const next = prev + 1;
                    if (next >= textArray.length) {
                        if (loop) {
                            return 0;
                        } else {
                            setIsTyping(false);
                            return prev;
                        }
                    }
                    return next;
                });
            } else {
                timeout = setTimeout(() => {
                    setDisplayedText(currentWord.substring(0, displayedText.length - 1));
                }, deleteSpeed);
            }
        } else if (isTyping) {
            if (displayedText.length === currentWord.length) {
                if (words.length > 1 || loop) {
                    setIsPaused(true);
                } else {
                    setIsTyping(false);
                }
            } else {
                timeout = setTimeout(() => {
                    setDisplayedText(currentWord.substring(0, displayedText.length + 1));
                }, typeSpeed);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayedText, currentWordIndex, isTyping, isDeleting, isPaused, hasStarted, currentWord, words.length, loop, pauseDelay, typeSpeed, deleteSpeed, textArray.length]);

    return (
        <span ref={elementRef} className={className} style={style}>
            {displayedText}
            {blinkCursor && (
                <span
                    style={{
                        animation: 'blink 1s step-end infinite',
                        marginLeft: '2px'
                    }}
                >
                    |
                </span>
            )}
            <style>{`
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `}</style>
        </span>
    );
};

export default TypingAnimation;
