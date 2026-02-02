import React, { useState, useEffect } from 'react';
import { CreditCard, TrendingUp, LayoutDashboard } from 'lucide-react';

const BANNERS = [
    {
        id: 1,
        title: "AI Card Strategist",
        subtitle: "소비 패턴 정밀 분석",
        icon: <CreditCard size={24} color="#fff" />,
        color: "#475C7A", // Muted Navy
        tag: "Beta"
    },
    {
        id: 2,
        title: "Career Investor",
        subtitle: "내 몸값을 올리는 법",
        icon: <TrendingUp size={24} color="#fff" />,
        color: "#685D79", // Muted Purple-Grey
        tag: "Pro"
    },
    {
        id: 3,
        title: "Asset Dashboard",
        subtitle: "흩어진 자산 모아보기",
        icon: <LayoutDashboard size={24} color="#fff" />,
        color: "#008485", // Hana Teal (Brand Color)
        tag: "New"
    }
];

const BannerCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
        }, 5000); // Slower cycle (5s)

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', borderRadius: '16px', overflow: 'hidden', height: '140px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            {/* Slides */}
            <div style={{
                display: 'flex',
                width: `${BANNERS.length * 100}%`,
                transform: `translateX(-${currentIndex * (100 / BANNERS.length)}%)`,
                transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                height: '100%'
            }}>
                {BANNERS.map((banner) => (
                    <div key={banner.id} style={{
                        width: `${100 / BANNERS.length}%`,
                        height: '100%',
                        background: banner.color,
                        padding: '0 24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        boxSizing: 'border-box'
                    }}>
                        <div style={{ color: 'white', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                <span style={{ fontSize: '11px', backgroundColor: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: '4px', backdropFilter: 'blur(4px)' }}>
                                    {banner.tag}
                                </span>
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0, lineHeight: '1.3' }}>{banner.title}</h3>
                            <p style={{ fontSize: '13px', opacity: 0.9, margin: 0 }}>{banner.subtitle}</p>
                        </div>
                        <div style={{
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            width: '64px', height: '64px', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '1px solid rgba(255,255,255,0.15)'
                        }}>
                            {React.cloneElement(banner.icon, { size: 32 })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Basic Dots */}
            <div style={{
                position: 'absolute', bottom: '16px', left: '24px',
                display: 'flex', gap: '6px'
            }}>
                {BANNERS.map((_, idx) => (
                    <div
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        style={{
                            width: idx === currentIndex ? '16px' : '6px',
                            height: '6px',
                            borderRadius: '3px',
                            backgroundColor: 'white',
                            opacity: idx === currentIndex ? 1 : 0.3,
                            transition: 'all 0.3s',
                            cursor: 'pointer'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerCarousel;
