import React, { useState } from 'react';
import { ShieldCheck, Check, X } from 'lucide-react';

const MyDataConsentModal = ({ onClose, onConfirm }) => {
    const [agreed, setAgreed] = useState(false);

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn 0.2s'
        }}>
            <div style={{
                backgroundColor: 'white',
                width: '90%', maxWidth: '360px',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                animation: 'slideUp 0.3s'
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#333' }}>마이데이터 연동</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                        <X size={24} color="#999" />
                    </button>
                </div>

                {/* Content */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{
                        width: '60px', height: '60px', backgroundColor: '#E0F2F1', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
                    }}>
                        <ShieldCheck size={32} color="#008485" />
                    </div>
                    <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                        흩어진 자산을 한 번에 불러올까요?
                    </p>
                    <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>
                        은행, 증권, 보험 등 타 금융기관의 자산 정보를<br />
                        안전하게 연결하여 분석 정확도를 높입니다.
                    </p>
                </div>

                {/* Terms Box */}
                <div
                    onClick={() => setAgreed(!agreed)}
                    style={{
                        backgroundColor: '#F9F9F9', borderRadius: '12px', padding: '16px',
                        marginBottom: '24px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '12px',
                        border: agreed ? '1px solid #008485' : '1px solid #eee',
                        transition: 'all 0.2s'
                    }}
                >
                    <div style={{
                        width: '20px', height: '20px', borderRadius: '50%',
                        border: agreed ? 'none' : '2px solid #ccc',
                        backgroundColor: agreed ? '#008485' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {agreed && <Check size={14} color="white" />}
                    </div>
                    <span style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>[필수] 가계부 데이터 전송 요구 및 동의</span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={onClose}
                        style={{
                            flex: 1, padding: '14px', borderRadius: '12px',
                            backgroundColor: '#f0f0f0', color: '#666',
                            border: 'none', fontWeight: 'bold', cursor: 'pointer'
                        }}
                    >
                        취소
                    </button>
                    <button
                        onClick={agreed ? onConfirm : undefined}
                        style={{
                            flex: 2, padding: '14px', borderRadius: '12px',
                            backgroundColor: agreed ? '#008485' : '#ccc',
                            color: 'white', border: 'none', fontWeight: 'bold',
                            cursor: agreed ? 'pointer' : 'not-allowed',
                            transition: 'background 0.3s'
                        }}
                    >
                        동의하고 연결하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyDataConsentModal;
