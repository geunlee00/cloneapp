import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, FileText, ChevronRight } from 'lucide-react';

const ProductSimulationModal = ({ product, onClose, onComplete }) => {
    const [step, setStep] = useState('info'); // info, terms, processing, complete
    const [agreements, setAgreements] = useState({
        all: false,
        term1: false,
        term2: false,
        term3: false
    });

    const handleAgreeAll = () => {
        const newState = !agreements.all;
        setAgreements({
            all: newState,
            term1: newState,
            term2: newState,
            term3: newState
        });
    };

    const handleAgree = (key) => {
        setAgreements(prev => {
            const newPrev = { ...prev, [key]: !prev[key] };
            const allChecked = newPrev.term1 && newPrev.term2 && newPrev.term3;
            return { ...newPrev, all: allChecked };
        });
    };

    const startSimulation = () => {
        setStep('processing');
        setTimeout(() => {
            setStep('complete');
        }, 2000);
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 110, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '450px', borderRadius: '24px 24px 0 0', padding: '24px', animation: 'slideUp 0.3s', maxHeight: '90vh', overflowY: 'auto' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
                        {step === 'complete' ? '가입 완료' : '상품 가입'}
                    </h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', padding: '4px' }}><X size={24} color="#333" /></button>
                </div>

                {/* content */}
                {step === 'info' && (
                    <div style={{ animation: 'fadeIn 0.3s' }}>
                        <div style={{ textAlign: 'center', margin: '20px 0 30px' }}>
                            <div style={{ fontSize: '40px', marginBottom: '10px' }}>{product.icon}</div>
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>{product.title}</h3>
                            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5' }}>{product.desc}</p>
                        </div>

                        <div style={{ backgroundColor: '#F5F5F5', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ color: '#666', fontSize: '14px' }}>적용 금리</span>
                                <span style={{ fontWeight: 'bold', color: '#008485', fontSize: '16px' }}>최대 연 5.0%</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ color: '#666', fontSize: '14px' }}>가입 기간</span>
                                <span style={{ fontWeight: 'bold', color: '#333' }}>1년 / 2년</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#666', fontSize: '14px' }}>가입 금액</span>
                                <span style={{ fontWeight: 'bold', color: '#333' }}>1만원 ~ 50만원</span>
                            </div>
                        </div>

                        <button onClick={() => setStep('terms')} style={{ width: '100%', padding: '16px', borderRadius: '16px', backgroundColor: '#008485', color: 'white', border: 'none', fontSize: '16px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0, 132, 133, 0.3)' }}>
                            신청하기
                        </button>
                    </div>
                )}

                {step === 'terms' && (
                    <div style={{ animation: 'fadeIn 0.3s' }}>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>
                            약관에 동의해주세요
                        </div>

                        <div onClick={handleAgreeAll} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '1px solid #E5E8EB', borderRadius: '12px', marginBottom: '20px', cursor: 'pointer', backgroundColor: agreements.all ? '#E0F2F1' : 'white' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: agreements.all ? 'none' : '2px solid #ddd', backgroundColor: agreements.all ? '#008485' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {agreements.all && <Check size={16} color="white" />}
                            </div>
                            <span style={{ fontWeight: 'bold', fontSize: '15px' }}>전체 동의하기</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '30px' }}>
                            <TermItem label="[필수] 예금거래기본약관" checked={agreements.term1} onClick={() => handleAgree('term1')} />
                            <TermItem label="[필수] 상품설명서 확인" checked={agreements.term2} onClick={() => handleAgree('term2')} />
                            <TermItem label="[필수] 개인정보 수집 및 이용 동의" checked={agreements.term3} onClick={() => handleAgree('term3')} />
                        </div>

                        <button disabled={!agreements.all} onClick={startSimulation} style={{ width: '100%', padding: '16px', borderRadius: '16px', backgroundColor: agreements.all ? '#008485' : '#ccc', color: 'white', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: agreements.all ? 'pointer' : 'not-allowed' }}>
                            동의하고 가입하기
                        </button>
                    </div>
                )}

                {step === 'processing' && (
                    <div style={{ padding: '40px 0', textAlign: 'center', animation: 'fadeIn 0.3s' }}>
                        <div className="spinner" style={{ width: '50px', height: '50px', border: '5px solid #E0F2F1', borderTop: '5px solid #008485', borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 1s linear infinite' }}></div>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>상품 가입 진행 중입니다...</div>
                        <div style={{ fontSize: '13px', color: '#888', marginTop: '8px' }}>잠시만 기다려주세요</div>
                        <style>{`
                 @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
              `}</style>
                    </div>
                )}

                {step === 'complete' && (
                    <div style={{ textAlign: 'center', animation: 'fadeIn 0.3s' }}>
                        <div style={{ width: '80px', height: '80px', backgroundColor: '#E0F2F1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
                            <ShieldCheck size={40} color="#008485" />
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>가입이 완료되었습니다!</h3>
                        <p style={{ color: '#666', fontSize: '14px', marginBottom: '30px' }}>
                            성공적인 자산 증식의 첫걸음,<br />축하드립니다!
                        </p>

                        <div style={{ backgroundColor: '#FFF8E1', padding: '16px', borderRadius: '12px', marginBottom: '24px', textAlign: 'left', border: '1px solid #FFECB3' }}>
                            <div style={{ fontSize: '12px', color: '#F57C00', fontWeight: 'bold', marginBottom: '4px' }}>🎁 보너스 리워드</div>
                            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>건빵 +300개 지급 완료</div>
                        </div>

                        <button onClick={() => onComplete(product)} style={{ width: '100%', padding: '16px', borderRadius: '16px', backgroundColor: '#008485', color: 'white', border: 'none', fontSize: '16px', fontWeight: 'bold' }}>
                            확인
                        </button>

                        <style>{`
                 @keyframes popIn { 0% { transform: scale(0); } 70% { transform: scale(1.2); } 100% { transform: scale(1); } }
              `}</style>
                    </div>
                )}

            </div>
        </div>
    );
};

const TermItem = ({ label, checked, onClick }) => (
    <div onClick={onClick} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Check size={18} color={checked ? '#008485' : '#ccc'} />
            <span style={{ fontSize: '14px', color: checked ? '#333' : '#666' }}>{label}</span>
        </div>
        <ChevronRight size={16} color="#ccc" />
    </div>
);

export default ProductSimulationModal;
