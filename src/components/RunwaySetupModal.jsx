import React, { useState } from 'react';
import { X, Calendar, DollarSign, TrendingDown, Wallet, Check } from 'lucide-react';

const RunwaySetupModal = ({ onClose, onComplete, initialExpense = 0, initialAsset = 0 }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        targetMonths: 6,
        currentAsset: initialAsset,
        monthlyIncome: 0,
        monthlyExpense: initialExpense
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: parseInt(String(value).replace(/,/g, ''), 10) || 0
        }));
    };

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
        else handleSubmit();
    };

    const handleSubmit = () => {
        onComplete(formData);
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 120,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
            <div style={{
                backgroundColor: '#fff', width: '100%', maxWidth: '360px',
                borderRadius: '24px', padding: '24px', animation: 'scaleUp 0.3s',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <div>
                        <div style={{ fontSize: '12px', color: '#008485', fontWeight: 'bold' }}>STEP {step} / 4</div>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '4px 0 0' }}>
                            {step === 1 && "언제까지 버텨야 하나요?"}
                            {step === 2 && "현재 모아둔 돈은 얼마인가요?"}
                            {step === 3 && "한 달 수입은 얼마인가요?"}
                            {step === 4 && "한 달 지출은 얼마인가요?"}
                        </h2>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', padding: '4px' }}>
                        <X size={24} color="#ccc" />
                    </button>
                </div>

                {/* Content */}
                <div style={{ marginBottom: '32px' }}>
                    {step === 1 && (
                        <div>
                            <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
                                목표 기간을 설정하면 생존 가능성을<br />검증해 드립니다.
                            </p>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {[3, 6, 12, 18, 24].map(months => (
                                    <button
                                        key={months}
                                        onClick={() => setFormData(prev => ({ ...prev, targetMonths: months }))}
                                        style={{
                                            padding: '12px 20px',
                                            borderRadius: '12px',
                                            border: formData.targetMonths === months ? '2px solid #008485' : '1px solid #eee',
                                            backgroundColor: formData.targetMonths === months ? '#E0F2F1' : '#fff',
                                            color: formData.targetMonths === months ? '#008485' : '#666',
                                            fontWeight: 'bold',
                                            flex: '1 1 30%'
                                        }}
                                    >
                                        {months}개월
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
                                통장 잔고, 비상금 등 운용 가능한<br />총 자산을 입력해주세요.
                            </p>
                            <div style={{ position: 'relative' }}>
                                <Wallet size={20} color="#999" style={{ position: 'absolute', top: '14px', left: '16px' }} />
                                <input
                                    type="text"
                                    value={formData.currentAsset.toLocaleString()}
                                    onChange={(e) => handleChange('currentAsset', e.target.value)}
                                    style={{
                                        width: '100%', padding: '14px 14px 14px 44px',
                                        fontSize: '18px', fontWeight: 'bold',
                                        borderRadius: '12px', border: '2px solid #008485', outline: 'none'
                                    }}
                                    autoFocus
                                />
                                <span style={{ position: 'absolute', top: '14px', right: '16px', color: '#999' }}>원</span>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
                                용돈, 알바비 등 정기적인 수입을 입력해주세요.
                            </p>
                            <div style={{ position: 'relative' }}>
                                <DollarSign size={20} color="#999" style={{ position: 'absolute', top: '14px', left: '16px' }} />
                                <input
                                    type="text"
                                    value={formData.monthlyIncome.toLocaleString()}
                                    onChange={(e) => handleChange('monthlyIncome', e.target.value)}
                                    style={{
                                        width: '100%', padding: '14px 14px 14px 44px',
                                        fontSize: '18px', fontWeight: 'bold',
                                        borderRadius: '12px', border: '2px solid #008485', outline: 'none'
                                    }}
                                    autoFocus
                                />
                                <span style={{ position: 'absolute', top: '14px', right: '16px', color: '#999' }}>원</span>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div>
                            <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
                                숨만 쉬어도 나가는 월 평균 지출액입니다.
                            </p>
                            <div style={{ position: 'relative' }}>
                                <TrendingDown size={20} color="#999" style={{ position: 'absolute', top: '14px', left: '16px' }} />
                                <input
                                    type="text"
                                    value={formData.monthlyExpense.toLocaleString()}
                                    onChange={(e) => handleChange('monthlyExpense', e.target.value)}
                                    style={{
                                        width: '100%', padding: '14px 14px 14px 44px',
                                        fontSize: '18px', fontWeight: 'bold',
                                        borderRadius: '12px', border: '2px solid #E60028', outline: 'none', color: '#E60028'
                                    }}
                                    autoFocus
                                />
                                <span style={{ position: 'absolute', top: '14px', right: '16px', color: '#999' }}>원</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Button */}
                <button
                    onClick={handleNext}
                    style={{
                        width: '100%', padding: '16px', borderRadius: '16px',
                        backgroundColor: '#008485', color: 'white', border: 'none',
                        fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                    }}
                >
                    {step === 4 ? '진단 시작하기' : '다음'}
                    {step === 4 ? <Check size={18} /> : <div />}
                </button>

                <style>{`
          @keyframes scaleUp { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        `}</style>
            </div>
        </div>
    );
};

export default RunwaySetupModal;
