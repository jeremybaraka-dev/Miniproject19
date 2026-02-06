import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ScrollVideoSection from './components/ScrollVideoSection';
import FeatureWaveSection from './components/FeatureWaveSection';
import ParticleInteractionSection from './components/ParticleInteractionSection';
import VideoCarouselSection from './components/VideoCarouselSection';
import Navbar from './components/Navbar';
import ScrollIndicator from './components/ScrollIndicator';
import Footer from './components/Footer';
import Loader from './components/Loader';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500); // 2.5 seconds to let the animation play

        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{ position: 'relative', width: '100vw', minHeight: '300vh' }}>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Navbar />
                    <ScrollIndicator />
                    <HeroSection />
                    <ScrollVideoSection />
                    <FeatureWaveSection />
                    <ParticleInteractionSection />
                    <VideoCarouselSection />
                    <Footer />
                </>
            )}
        </div>
    );
}

export default App;
