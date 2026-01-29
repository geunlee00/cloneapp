import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, Label, ReferenceLine } from 'recharts';

const RunwayChart = ({ currentAsset = 0, netFlow = 0, targetMonths = 6, baseNetFlow = 0 }) => {
    // Safe Defaults
    const safeAsset = Number(currentAsset) || 0;
    const safeNetFlow = Number(netFlow) || 0;
    const safeTarget = Number(targetMonths) || 6;
    const safeBaseFlow = Number(baseNetFlow) || 0;

    // Generate Chart Data
    const chartData = [];
    const steps = safeTarget;
    let bankruptcyMonth = null;
    let baseBankruptcyMonth = null;

    // Calculate Bankruptcy Month (Float) directly
    if (safeNetFlow < 0) {
        const time = -safeAsset / safeNetFlow;
        if (time >= 0 && time <= steps) {
            bankruptcyMonth = time;
        } else if (time < 0 && safeAsset <= 0) {
            bankruptcyMonth = 0;
        }
    } else if (safeAsset <= 0) {
        bankruptcyMonth = 0;
    }

    for (let i = 0; i <= steps; i++) {
        // Calculate Projected Asset
        let cur = safeAsset + (safeNetFlow * i);
        let base = safeAsset + (safeBaseFlow * i);

        // Clamping for visualization
        if (cur < 0) cur = 0;
        if (base < 0) base = 0;

        chartData.push({
            name: i === 0 ? '오늘' : `${i}개월`,
            month: i,
            currentAsset: Math.round(cur),
            baseAsset: Math.round(base)
        });
    }

    // Determine Status
    // Safe if NetFlow >= 0 OR Assets never drop below 0 in target period
    const isSafe = safeNetFlow >= 0 || (safeAsset + (safeNetFlow * safeTarget)) > 0;
    const finalAsset = Math.max(0, safeAsset + (safeNetFlow * safeTarget));

    // Comparison Logic
    const isComparison = safeBaseFlow !== safeNetFlow;

    // Format Y-Axis
    const formatYAxis = (tickItem) => {
        return `${(tickItem / 10000).toLocaleString()}만`;
    };

    return (
        <div style={{ width: '100%', height: 320, backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#333', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        📊 목표 기간 생존 시뮬레이션
                        <span style={{ fontSize: '10px', backgroundColor: isSafe ? '#E6F4FF' : '#FFF0F0', padding: '2px 6px', borderRadius: '4px', color: isSafe ? '#008485' : '#E60028' }}>
                            {safeTarget}개월
                        </span>
                    </h3>
                    <p style={{ fontSize: '11px', color: '#888', margin: '4px 0 0 0' }}>
                        매달 {safeNetFlow >= 0 ? '+' : ''}{safeNetFlow.toLocaleString()}원 {safeNetFlow >= 0 ? '저축' : '감소'} 예상
                    </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#999' }}>예상 결과</div>
                    {isSafe ? (
                        <div style={{ fontSize: '14px', color: '#008485', fontWeight: 'bold' }}>🎉 생존 성공!</div>
                    ) : (
                        <div style={{ fontSize: '14px', color: '#E60028', fontWeight: 'bold' }}>🚨 {Number(bankruptcyMonth).toFixed(1)}개월 후 파산</div>
                    )}
                </div>
            </div>

            <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorSafe" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#008485" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#008485" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="colorDanger" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#E60028" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#E60028" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="colorBase" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#999" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#999" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="month"
                        type="number"
                        domain={[0, safeTarget]}
                        tick={{ fontSize: 10, fill: '#aaa' }}
                        tickLine={false}
                        axisLine={false}
                        dy={8}
                        tickFormatter={(val) => val === 0 ? '오늘' : `${val}개월`}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        tick={{ fontSize: 10, fill: '#aaa' }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={formatYAxis}
                    />
                    <Tooltip
                        labelFormatter={(val) => val === 0 ? '오늘' : `${val}개월`}
                        formatter={(value, name) => [
                            `${value.toLocaleString()}원`,
                            name === 'currentAsset' ? '예상 자산' : '기존 자산'
                        ]}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', fontSize: '12px' }}
                    />

                    {/* Base Line (Comparison) */}
                    {isComparison && (
                        <Area
                            type="monotone"
                            dataKey="baseAsset"
                            stroke="#999"
                            strokeDasharray="5 5"
                            strokeWidth={2}
                            fill="url(#colorBase)"
                            name="baseAsset"
                        />
                    )}

                    {/* Main Line */}
                    <Area
                        type="monotone"
                        dataKey="currentAsset"
                        stroke={isSafe ? "#008485" : "#E60028"}
                        strokeWidth={3}
                        fill={isSafe ? "url(#colorSafe)" : "url(#colorDanger)"}
                        name="currentAsset"
                        animationDuration={1000}
                    />

                    {/* Bankruptcy Marker (Safe Float Placement) */}
                    {!isSafe && bankruptcyMonth !== null && (
                        <ReferenceDot x={bankruptcyMonth} y={0} r={6} fill="#E60028" stroke="white" strokeWidth={2} isFront={true}>
                            <Label value="💥" position="top" offset={10} fontSize={16} />
                        </ReferenceDot>
                    )}

                    {/* Success Marker */}
                    {isSafe && (
                        <ReferenceDot x={safeTarget} y={finalAsset} r={6} fill="#008485" stroke="white" strokeWidth={2} isFront={true}>
                            <Label value="Goal!" position="top" offset={10} fontSize={12} fill="#008485" fontWeight="bold" />
                        </ReferenceDot>
                    )}
                </AreaChart>
            </ResponsiveContainer>

            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #f5f5f5', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '14px' }}>{isSafe ? '🌈' : '💡'}</span>
                <span style={{ fontSize: '11px', color: '#666' }}>
                    {isSafe
                        ? <span>목표 기간 종료 시 <b style={{ color: '#008485' }}>{finalAsset.toLocaleString()}원</b>이 남습니다! 훌륭해요.</span>
                        : <span>이대로라면 <b style={{ color: '#E60028' }}>{Math.abs(Math.floor(finalAsset - (netFlow * (targetMonths - bankruptcyMonth))))}원</b>이 부족합니다. 지출을 줄이세요!</span>
                    }
                </span>
            </div>
        </div>
    );
};

export default RunwayChart;
