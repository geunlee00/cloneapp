import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, Label, ReferenceLine } from 'recharts';

const RunwayChart = ({ currentAsset, monthlyExpense, runwayMonths, baseRunwayMonths }) => {
    // Determine which dataset to use for referencing the "End Date" logic
    // If we have baseRunwayMonths, we want to show COMPARISON.
    const isComparison = baseRunwayMonths && runwayMonths !== baseRunwayMonths;

    // Calculate Dates
    const getTargetDate = (months) => {
        const d = new Date();
        d.setMonth(d.getMonth() + Math.floor(months));
        d.setDate(d.getDate() + Math.round((months % 1) * 30));
        return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
    };

    const dateString = getTargetDate(runwayMonths);

    // Data Generation
    // We need a unified X-Axis scale. The max months should be the larger of the two runways.
    const maxMonths = Math.max(runwayMonths, baseRunwayMonths || runwayMonths);

    // We want data points for: Start(0), BaseEnd(base), NewEnd(new). 
    // To draw smooth lines, we can just use 0 and Max.
    const data = [
        { name: '오늘', month: 0, currentAsset: currentAsset, baseAsset: currentAsset },
        // If comparison exists, we add intermediate points or just let Linear interpolation handle it? 
        // Linear is fine for burn down.
        {
            name: `${Math.floor(maxMonths)}개월 뒤`,
            month: maxMonths,
            currentAsset: runwayMonths >= maxMonths ? 0 : null, // Logic is tricky for AreaChart with different lengths
            baseAsset: baseRunwayMonths >= maxMonths ? 0 : null
        },
    ];

    // Better Data Approach: Generate points for every integer month to handle the "Zero" drop correctly
    const chartData = [];
    const steps = Math.ceil(maxMonths) + 1; // +1 buffer
    for (let i = 0; i <= steps; i++) {
        // Calculate remaining asset for "Current Strategy"
        let cur = currentAsset - (currentAsset / runwayMonths) * i;
        if (cur < 0) cur = 0;

        // Calculate remaining asset for "Base Strategy"
        let base = baseRunwayMonths ? (currentAsset - (currentAsset / baseRunwayMonths) * i) : cur;
        if (base < 0) base = 0;

        // Visual optimization: Don't show long flat lines at 0
        if (i > runwayMonths + 1 && i > baseRunwayMonths + 1) break;

        chartData.push({
            name: i === 0 ? '오늘' : `${i}개월`,
            month: i,
            currentAsset: Math.round(cur),
            baseAsset: Math.round(base)
        });
    }

    // Format Y-Axis ticks (e.g. 1250000 -> 125)
    const formatYAxis = (tickItem) => {
        return `${(tickItem / 10000).toLocaleString()}만`;
    };

    return (
        <div style={{ width: '100%', height: 300, backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#333', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        📉 자산 생존 곡선
                        <span style={{ fontSize: '10px', backgroundColor: '#e6f4ff', padding: '2px 6px', borderRadius: '4px', color: '#008485' }}>Live</span>
                    </h3>
                    <p style={{ fontSize: '11px', color: '#888', margin: '4px 0 0 0' }}>
                        {isComparison ? '지출 방어 효과가 그래프에 반영됩니다.' : '현재 소비 습관 예측입니다.'}
                    </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#999' }}>파산 예정일</div>
                    <div style={{ fontSize: '14px', color: '#E60028', fontWeight: 'bold' }}>{dateString}</div>
                    {isComparison && (
                        <div style={{ fontSize: '11px', color: '#008485', fontWeight: 'bold' }}>
                            (+{(runwayMonths - baseRunwayMonths).toFixed(1)}개월 연장됨)
                        </div>
                    )}
                </div>
            </div>

            <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#008485" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#008485" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="colorBase" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#888" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#888" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10, fill: '#aaa' }}
                        tickLine={false}
                        axisLine={false}
                        dy={8}
                        interval="preserveStartEnd"
                    />
                    <YAxis
                        tick={{ fontSize: 10, fill: '#aaa' }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={formatYAxis}
                    />
                    <Tooltip
                        formatter={(value, name) => [
                            `${value.toLocaleString()}원`,
                            name === 'currentAsset' ? '개선된 자산' : '기존 자산'
                        ]}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', fontSize: '12px' }}
                    />

                    {/* Base Strategy (Before) - Only show if comparison exists */}
                    {isComparison && (
                        <Area
                            type="monotone"
                            dataKey="baseAsset"
                            stroke="#888"
                            strokeDasharray="5 5"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorBase)"
                            name="baseAsset"
                        />
                    )}

                    {/* Current Strategy (After) */}
                    <Area
                        type="monotone"
                        dataKey="currentAsset"
                        stroke="#008485"
                        strokeWidth={3}
                        fillOpacity={isComparison ? 0.4 : 1}
                        fill="url(#colorCurrent)"
                        name="currentAsset"
                        animationDuration={1000}
                    />

                    {/* Crash Markers */}
                    {isComparison && (
                        <ReferenceDot x={Math.floor(baseRunwayMonths)} y={0} r={4} fill="#888" stroke="white" strokeWidth={2}>
                            <Label value="" />
                        </ReferenceDot>
                    )}

                    <ReferenceDot x={Math.floor(runwayMonths)} y={0} r={6} fill="#E60028" stroke="white" strokeWidth={2} isFront={true}>
                        <Label value="NEW" position="top" offset={10} fontSize={10} fill="#E60028" fontWeight="bold" />
                    </ReferenceDot>
                </AreaChart>
            </ResponsiveContainer>

            <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f5f5f5', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '14px' }}>💡</span>
                <span style={{ fontSize: '11px', color: '#666' }}>
                    {isComparison
                        ? <span>방어구 착용으로 생존 기간이 <b style={{ color: '#008485' }}>늘어났습니다!</b> 그래프 격차를 확인하세요.</span>
                        : <span>아래 <b>지출 방어 솔루션</b>을 선택하면 그래프가 실시간으로 변합니다.</span>
                    }
                </span>
            </div>
        </div>
    );
};

export default RunwayChart;
