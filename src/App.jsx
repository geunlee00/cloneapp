
import React, { useState } from 'react';
import gunbbangImg from './assets/images/gunbbang.png';
import {
  User,
  Wallet,
  Bell,
  MoreHorizontal,
  Home,
  Percent,
  PieChart,
  TrendingUp,
  Menu,
  Search,
  ChevronLeft,
  Target,
  CheckCircle,
  Award,
  Shield,
  Crosshair,
  Lock,
  Settings,
  Ticket,
  Sparkles
} from 'lucide-react';

import militaryPxImg from './assets/images/military_px.png';
import militaryAdminImg from './assets/images/military_admin.png';
import militaryBarracksImg from './assets/images/military_barracks.png';
import blueFolderImg from './assets/images/blue_folder.png';
import backgroundImg from './assets/images/background.png';
import soldierImg from './assets/images/solider.png';
import soldierDischargeImg from './assets/images/solider_discharge.png';
import societyImg from './assets/images/society.png';
import fantasyWorldMapImg from './assets/images/fantasy_world_map.png';
import societyWorldMapImg from './assets/images/society_world_map.png';

function App() {
  // ... existing code ...

  // ... inside MilitaryLoungePage ...

  // ... existing code ...

  // ... inside MilitaryLoungePage ...

  const [currentView, setCurrentView] = useState('home');

  // Lifted state for User Profile
  const [userProfile, setUserProfile] = useState({
    branch: '',
    rank: '',
    goalAmount: '',
    futurePlan: ''
  });

  if (currentView === 'report') {
    return <RankReport onBack={() => setCurrentView('home')} onSituation={() => setCurrentView('situation')} />;
  }

  if (currentView === 'situation') {
    return <SituationPage onComplete={() => setCurrentView('report')} />;
  }

  if (currentView === 'lounge') {
    return <MilitaryLoungePage
      onBack={() => setCurrentView('home')}
      onSoldierClick={() => {
        if (userProfile && userProfile.goalAmount) {
          setCurrentView('assetDetail');
        } else {
          setCurrentView('profileSetup');
        }
      }}
    />;
  }

  if (currentView === 'profileSetup') {
    return (
      <ProfileSetupPage
        onBack={() => setCurrentView('lounge')}
        onComplete={(newProfile) => {
          setUserProfile(newProfile);
          setCurrentView('financialMOS');
        }}
      />
    );
  }

  if (currentView === 'financialMOS') {
    return <FinancialMOSPage onBack={() => setCurrentView('lounge')} onAssetDetail={() => setCurrentView('assetDetail')} />;
  }

  if (currentView === 'assetDetail') {
    return <AssetDetailPage onBack={() => setCurrentView('financialMOS')} userProfile={userProfile} onQuestClick={() => setCurrentView('financialMOS')} />;
  }

  if (currentView === 'survival') {
    return <SurvivalRunwayPage onBack={() => setCurrentView('home')} userProfile={userProfile} />;
  }


  return (
    <div className="app-container">
      <Header />
      <div className="content-scroll">
        <PromoBanner />
        <MainAccount />

        {/* Survival Runway Card (Home Dashboard) */}
        <QuickCards
          onRankClick={() => setCurrentView('report')}
          onLoungeClick={() => setCurrentView('lounge')}
          onRunwayClick={() => {
            if (userProfile && userProfile.goalAmount) {
              setCurrentView('survival');
            } else {
              setCurrentView('survival');
            }
          }}
        />
        <MarketingBanner />
      </div>
      <BottomNav />
      <FloatingButton />
    </div>
  );
}

const RankReport = ({ onBack, onSituation }) => (
  <div className="app-container" style={{ backgroundColor: '#f5f6f8' }}>
    <div className="header sticky top-0 bg-white z-10" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ChevronLeft size={24} /></button>
        <h1 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>나의 금융 복무기록</h1>
      </div>
      <div style={{ backgroundColor: '#fef3c7', padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '700', color: '#b45309' }}>
        <img src={gunbbangImg} alt="건빵" style={{ width: '23px', height: 'auto' }} /> 240
      </div>
    </div>

    <div className="content-scroll" style={{ paddingBottom: '20px' }}>
      {/* Simulation Briefing Card */}
      <div onClick={onSituation} style={{ margin: '20px', backgroundColor: '#2e2e3e', borderRadius: '16px', padding: '20px', color: 'white', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#a5a5b5', marginBottom: '4px' }}>오늘의 상황실</div>
          <div style={{ fontSize: '16px', fontWeight: '700', lineHeight: '1.4' }}>
            📩 브리핑이 도착했습니다!<br />
            <span style={{ fontSize: '13px', fontWeight: '400', color: '#d1d5db' }}>(미확인 1건)</span>
          </div>
        </div>
        <div style={{ backgroundColor: '#ef4444', width: '12px', height: '12px', borderRadius: '50%', position: 'absolute', top: '16px', right: '16px' }}></div>
        <div style={{ fontSize: '24px' }}>👉</div>
      </div>

      {/* Rank Dashboard */}
      <div style={{ margin: '20px', backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ backgroundColor: '#e6f6f5', color: '#009490', padding: '8px', borderRadius: '8px', display: 'flex' }}>
              <Award size={24} color="#009490" />
            </span>
            <div>
              <div style={{ color: '#888', fontSize: '12px' }}>현재 금융 계급</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a' }}>상병 이근준</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#888' }}>D-214</div>
          </div>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '4px' }}>
            <span style={{ color: '#888' }}>다음 진급(병장)까지</span>
            <span style={{ fontWeight: '700', color: '#009490' }}>1,150,000원</span>
          </div>
          <div style={{ width: '100%', backgroundColor: '#f0f0f0', borderRadius: '10px', height: '10px' }}>
            <div style={{ width: '70%', backgroundColor: '#009490', height: '10px', borderRadius: '10px' }}></div>
          </div>
        </div>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
          🎉 상위 15%로 아주 잘하고 있어요!
        </p>
      </div>

      {/* Goal Simulator */}
      <div style={{ margin: '0 20px 20px', backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={20} color="#009490" /> 전역 전 2천만원
          </h3>
          <p style={{ fontSize: '14px', color: '#888', marginBottom: '16px' }}>목표 달성까지 85% 남았어요</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
            <span style={{ fontSize: '28px', fontWeight: '700' }}>2,850,000</span>
            <span style={{ color: '#888', marginBottom: '4px' }}>/ 20,000,000원</span>
          </div>
        </div>
        <div style={{ position: 'absolute', right: 0, bottom: 0, opacity: 0.1 }}>
          <Target size={120} />
        </div>
      </div>

      {/* Financial Specialty Training */}
      <div style={{ margin: '0 20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#333', marginBottom: '12px', paddingLeft: '4px' }}>금융 주특기 교육</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <TrainingItem
            type="생존"
            title="나의 방탄복(보험) 점검"
            desc="사회 나가기 전 필수 생존템"
            icon={<Shield size={20} color="#009490" />}
            status="active"
            reward="+건빵 50"
          />
          <TrainingItem
            type="전술"
            title="지원화기(ETF) 사격술"
            desc="적은 위험으로 제압하기"
            icon={<Crosshair size={20} color="#eab308" />}
            status="active"
            reward="+건빵 30"
          />
          <TrainingItem
            type="특수"
            title="폭파(파생상품) 교본"
            desc="⚠️ 위험! 병장부터 열람 가능"
            icon={<Lock size={20} color="#9ca3af" />}
            status="locked"
          />
        </div>
      </div>
    </div>
  </div>
);

const MilitaryLoungePage = ({ onBack, onSoldierClick }) => (
  <div className="app-container" style={{
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    overflow: 'hidden'
  }}>
    {/* Header */}
    <div className="header sticky top-0 z-10" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ChevronLeft size={24} color="#333" /></button>
      <h1 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#333' }}>밀리터리 라운지</h1>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Home size={24} color="#333" />
        <Menu size={24} color="#333" />
      </div>
    </div>

    {/* Content */}
    <div style={{ padding: '20px' }}>
      {/* Profile Section */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0 }}>이근준님</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Settings size={22} color="#555" />
          <div style={{ position: 'relative' }}>
            <Ticket size={22} color="#009490" />
            <span style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: '#ec4899', color: 'white', fontSize: '10px', borderRadius: '50%', width: '14px', height: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>0</span>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div style={{ backgroundColor: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(5px)', borderRadius: '20px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
        <img src={blueFolderImg} alt="입대정보" style={{ width: '48px', height: 'auto' }} />
        <div>
          <strong style={{ color: '#009490' }}>입대정보</strong>를 입력하고<br />
          전역까지 함께해요
        </div>
      </div>

      {/* 3D Map Area */}
      <div style={{ position: 'relative', height: '400px', marginTop: '20px' }}>
        {/* PX */}
        <div style={{ position: 'absolute', top: '80px', left: '20px', textAlign: 'center' }}>
          <img src={militaryPxImg} alt="PX" style={{ width: '80px', display: 'block', margin: '0 auto', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.2))' }} />
          <div style={{ marginTop: '4px', fontWeight: 'bold', fontSize: '14px', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>PX</div>
        </div>

        {/* Soldier */}
        <div onClick={onSoldierClick} style={{ position: 'absolute', top: '190px', left: '20px', textAlign: 'center', zIndex: 6, cursor: 'pointer' }}>
          <img src={soldierImg} alt="군인" style={{ width: '100px', display: 'block', filter: 'drop-shadow(0 5px 5px rgba(0,0,0,0.2))' }} />
          <div style={{ marginTop: '0px', fontWeight: 'bold', fontSize: '14px', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>충성!</div>
        </div>

        {/* Admin */}
        <div style={{ position: 'absolute', top: '40px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 5 }}>
          <img src={militaryAdminImg} alt="행정반" style={{ width: '100px', display: 'block', margin: '0 auto', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.2))' }} />
          <div style={{ marginTop: '4px', fontWeight: 'bold', fontSize: '14px', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>행정반</div>
        </div>

        {/* Barracks */}
        <div style={{ position: 'absolute', top: '120px', right: '20px', textAlign: 'center' }}>
          <img src={militaryBarracksImg} alt="생활관" style={{ width: '90px', display: 'block', margin: '0 auto', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.2))' }} />
          <div style={{ marginTop: '4px', fontWeight: 'bold', fontSize: '14px', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>생활관</div>
        </div>

        {/* Soccer Field Lines (Simple CSS representation) */}
        <div style={{ position: 'absolute', botom: '0', left: '20px', right: '20px', height: '100px', border: '2px solid rgba(255,255,255,0.7)', borderRadius: '10px', transform: 'perspective(500px) rotateX(40deg)', marginTop: '180px' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '2px solid rgba(255,255,255,0.7)' }}></div>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', borderLeft: '2px solid rgba(255,255,255,0.7)' }}></div>
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '30px', height: '30px', border: '2px solid rgba(255,255,255,0.7)', borderRadius: '50%', transform: 'translate(-50%, -50%)' }}></div>
          {/* Ball */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            <div style={{ position: 'absolute', top: '4px', left: '4px', width: '6px', height: '6px', backgroundColor: 'black', borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: '4px', right: '6px', width: '5px', height: '5px', backgroundColor: 'black', borderRadius: '50%' }}></div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Sheet Action */}
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white', padding: '20px', borderRadius: '24px 24px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 -4px 10px rgba(0,0,0,0.05)' }}>
      <span style={{ fontWeight: '700', fontSize: '15px' }}>나만의 일정을 설정해보세요</span>
      <button style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#eee', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>+</button>
    </div>
    <BottomNav />
  </div>
);

const SituationPage = ({ onComplete }) => {
  const [voted, setVoted] = useState(false);

  return (
    <div className="app-container" style={{ backgroundColor: '#2e2e3e', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="header" style={{ padding: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onComplete} style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>✕</button>
      </div>

      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <span style={{ backgroundColor: '#ef4444', color: 'white', fontSize: '12px', fontWeight: 'bold', padding: '4px 12px', borderRadius: '20px' }}>Live 투표 중</span>
        </div>

        <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'white', textAlign: 'center', marginBottom: '40px', lineHeight: '1.4' }}>
          전역하고 1억 받기<br />
          <span style={{ fontSize: '16px', fontWeight: '400', color: '#a5a5b5' }}>VS</span><br />
          지금 당장 휴가 15일?
        </h2>

        {!voted ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button onClick={() => setVoted(true)} style={{ padding: '20px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '20px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 0 #3730a3' }}>
              💰 1억 받기
            </button>
            <button onClick={() => setVoted(true)} style={{ padding: '20px', backgroundColor: '#ec4899', color: 'white', border: 'none', borderRadius: '20px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 0 #be185d' }}>
              ✈️ 휴가 가기
            </button>
          </div>
        ) : (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '24px', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>
                  <span>💰 1억</span>
                  <span>82%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '82%', height: '100%', backgroundColor: '#4f46e5' }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>
                  <span>✈️ 휴가</span>
                  <span>18%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '18%', height: '100%', backgroundColor: '#ec4899' }}></div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '30px', textAlign: 'center', animation: 'fadeIn 1s 0.5s backwards' }}>
              <div style={{ fontSize: '14px', color: '#a5a5b5', marginBottom: '8px' }}>내 금융 성향은?</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>"확실한 이익을 쫓는 전략가"</div>
              <div style={{ fontSize: '13px', color: '#888' }}>#채권형 ETF #안전마진확보</div>

              <button onClick={onComplete} style={{ marginTop: '30px', backgroundColor: 'white', color: '#333', border: 'none', padding: '12px 24px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>
                확인 완료 (+건빵 10개)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileSetupPage = ({ onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    branch: '',
    rank: '',
    goalAmount: '',
    futurePlan: ''
  });

  const branches = [
    { id: 'army', name: '육군', icon: '🎖️' },
    { id: 'navy', name: '해군', icon: '⚓' },
    { id: 'airforce', name: '공군', icon: '✈️' },
    { id: 'marine', name: '해병대', icon: '🦅' }
  ];

  const ranks = ['이병', '일병', '상병', '병장'];

  const plans = [
    { id: 'school', name: '복학', icon: '🎓' },
    { id: 'travel', name: '해외여행', icon: '✈️' },
    { id: 'car', name: '내 차 마련', icon: '🚗' },
    { id: 'home', name: '독립/자취', icon: '🏠' },
    { id: 'invest', name: '투자 종잣돈', icon: '💰' },
    { id: 'gift', name: '효도/선물', icon: '🎁' }
  ];

  const handleGoalChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setProfile({ ...profile, goalAmount: value });
  };

  const isGoalValid = () => {
    const amount = parseInt(profile.goalAmount || '0', 10);
    return amount >= 1000000 && amount <= 50000000;
  };

  const canProceed = () => {
    if (step === 1 && profile.branch && profile.rank && profile.enlistmentDate) return true;
    if (step === 2 && isGoalValid() && profile.monthlySpend) return true;
    if (step === 3 && profile.futurePlan) return true;
    return false;
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(profile);
  };

  return (
    <div className="app-container" style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      <div className="header sticky top-0 bg-white z-10" style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
        <button onClick={step === 1 ? onBack : () => setStep(step - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}>
          <ChevronLeft size={24} color="#333" />
        </button>
        <div style={{ flex: 1, height: '4px', backgroundColor: '#f0f0f0', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: `${(step / 3) * 100}%`, height: '100%', backgroundColor: '#009490', transition: 'width 0.3s' }}></div>
        </div>
        <div style={{ marginLeft: '12px', fontSize: '14px', fontWeight: 'bold', color: '#009490' }}>{step}/3</div>
      </div>

      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px', color: '#111', lineHeight: '1.4' }}>
          {step === 1 && <>소속 부대와<br />계급을 알려주세요</>}
          {step === 2 && <>전역까지<br />얼마를 모으시겠어요?</>}
          {step === 3 && <>전역 후<br />가장 하고 싶은 일은?</>}
        </h2>
        <p style={{ color: '#666', marginBottom: '40px' }}>
          {step === 1 && '맞춤형 금융 로드맵을 설계해 드립니다.'}
          {step === 2 && '최소 100만원부터 5,000만원까지 설정 가능해요.'}
          {step === 3 && '이근준님의 꿈을 응원합니다!'}
        </p>

        {/* Step 1: Branch & Rank */}
        {step === 1 && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '12px', color: '#333' }}>소속군</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {branches.map(b => (
                  <div key={b.id} onClick={() => setProfile({ ...profile, branch: b.id })}
                    style={{
                      padding: '16px', borderRadius: '12px', border: profile.branch === b.id ? '2px solid #009490' : '1px solid #eee',
                      backgroundColor: profile.branch === b.id ? '#E0F7FA' : 'white', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s'
                    }}>
                    <div style={{ fontSize: '24px', marginBottom: '4px' }}>{b.icon}</div>
                    <div style={{ fontSize: '14px', fontWeight: profile.branch === b.id ? 'bold' : 'normal', color: profile.branch === b.id ? '#009490' : '#666' }}>{b.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '12px', color: '#333' }}>계급</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {ranks.map(r => (
                  <button key={r} onClick={() => setProfile({ ...profile, rank: r })}
                    style={{
                      flex: 1, padding: '12px 0', borderRadius: '12px', border: 'none',
                      backgroundColor: profile.rank === r ? '#009490' : '#f5f5f5', color: profile.rank === r ? 'white' : '#666',
                      fontWeight: 'bold', cursor: 'pointer'
                    }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '30px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '12px', color: '#333' }}>입대일</label>
              <input
                type="date"
                value={profile.enlistmentDate || ''}
                onChange={(e) => setProfile({ ...profile, enlistmentDate: e.target.value })}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  color: '#333',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        )}

        {/* Step 2: Goal Amount */}
        {step === 2 && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <div style={{ position: 'relative', marginBottom: '10px' }}>
              <input type="text" value={profile.goalAmount ? parseInt(profile.goalAmount).toLocaleString() : ''}
                onChange={(e) => {
                  const val = e.target.value.replace(/,/g, '');
                  if (!isNaN(val) || val === '') setProfile({ ...profile, goalAmount: val });
                }}
                placeholder="20,000,000"
                style={{ width: '100%', fontSize: '32px', fontWeight: '800', border: 'none', borderBottom: '2px solid #009490', padding: '10px 0', outline: 'none', color: '#009490' }}
              />
              <span style={{ position: 'absolute', right: 0, bottom: '15px', fontSize: '20px', fontWeight: 'bold', color: '#333' }}>원</span>
            </div>

            {/* Validation Message */}
            {profile.goalAmount && (parseInt(profile.goalAmount) < 1000000 || parseInt(profile.goalAmount) > 50000000) && (
              <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px' }}>⚠️ 100만원 이상 5,000만원 이하로 설정해주세요.</div>
            )}

            {/* Slider UI */}
            <div style={{ marginTop: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '12px', marginBottom: '12px' }}>
                <span>100만원</span>
                <span>5,000만원</span>
              </div>
              <div style={{ position: 'relative', height: '24px', display: 'flex', alignItems: 'center' }}>
                <input
                  type="range"
                  min="1000000"
                  max="50000000"
                  step="1000000"
                  value={profile.goalAmount || 20000000}
                  onChange={(e) => setProfile({ ...profile, goalAmount: e.target.value })}
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '3px',
                    accentColor: '#009490',
                    cursor: 'pointer',
                    backgroundColor: '#eee'
                  }}
                />
              </div>
              <div style={{ textAlign: 'center', fontSize: '12px', color: '#666', marginTop: '8px' }}>
                좌우로 드래그하여 목표 금액을 설정하세요
              </div>
            </div>

            {/* Monthly Expenditure Input */}
            <div style={{ marginTop: '50px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '12px', color: '#333' }}>한 달 평균 지출액은?</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={profile.monthlySpend ? parseInt(profile.monthlySpend).toLocaleString() : ''}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    setProfile({ ...profile, monthlySpend: val });
                  }}
                  placeholder="150,000"
                  style={{ width: '100%', fontSize: '20px', fontWeight: 'bold', border: '1px solid #ddd', borderRadius: '12px', padding: '16px', outline: 'none', color: '#333' }}
                />
                <span style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', fontWeight: 'bold', color: '#888' }}>원</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Future Plan */}
        {step === 3 && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {plans.map(p => (
                <div key={p.id} onClick={() => setProfile({ ...profile, futurePlan: p.id })}
                  style={{
                    padding: '20px', borderRadius: '16px', border: profile.futurePlan === p.id ? '2px solid #009490' : '1px solid #eee',
                    backgroundColor: profile.futurePlan === p.id ? '#E0F7FA' : 'white', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
                  }}>
                  <div style={{ fontSize: '32px' }}>{p.icon}</div>
                  <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#333' }}>{p.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '20px' }}>
        <button onClick={handleNext} disabled={!canProceed()}
          style={{
            width: '100%', padding: '16px', borderRadius: '16px', border: 'none',
            backgroundColor: canProceed() ? '#009490' : '#E0E0E0', color: canProceed() ? 'white' : '#A0A0A0',
            fontSize: '16px', fontWeight: 'bold', cursor: canProceed() ? 'pointer' : 'not-allowed',
            boxShadow: canProceed() ? '0 4px 12px rgba(0,148,144,0.3)' : 'none'
          }}>
          {step === 3 ? '설정 완료' : '다음'}
        </button>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// NEW: Survival Runway Page
// ----------------------------------------------------------------------
const SurvivalRunwayPage = ({ onBack, userProfile }) => {
  const [policies, setPolicies] = useState({
    rent: false,
    learning: false
  });

  // Logic Reuse
  const currentAsset = 1250000;
  const monthlySpendVal = userProfile?.monthlySpend ? parseInt(String(userProfile.monthlySpend).replace(/,/g, ''), 10) : 0;
  // Default spend or user input
  const baseSpend = monthlySpendVal > 0 ? monthlySpendVal : 150000;

  // Calculate Savings from Policies
  let monthlySavings = 0;
  if (policies.rent) monthlySavings += 200000; // Youth Rent Support (~200k)
  if (policies.learning) monthlySavings += 300000; // Learning Card (avg training cost saved)

  // Effective Spend (Minimum 50k to prevent div by zero/infinite)
  const effectiveSpend = Math.max(baseSpend - monthlySavings, 50000);

  // Runway Calculation
  const runwayMonths = currentAsset / effectiveSpend;
  const runwayMonthsInt = Math.floor(runwayMonths);
  const runwayDays = Math.floor((runwayMonths - runwayMonthsInt) * 30);

  // Base Runway (for comparison)
  const baseRunwayMonths = currentAsset / baseSpend;
  const baseRunwayMonthsInt = Math.floor(baseRunwayMonths);

  // Extension Gain
  const gainedMonths = runwayMonthsInt - baseRunwayMonthsInt;

  // Status
  let status = "안전";
  let statusColor = "#4CAF50";

  if (runwayMonths < 3) { status = "🚨 위험"; statusColor = "#ff4d4f"; }
  else if (runwayMonths < 6) { status = "⚠️ 주의"; statusColor = "#faad14"; }

  const gaugePercent = Math.min((runwayMonths / 6) * 100, 100);

  const togglePolicy = (key) => {
    setPolicies(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="app-container" style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
      <div className="header sticky top-0 bg-white z-10" style={{ display: 'flex', alignItems: 'center', padding: '16px', borderBottom: '1px solid #eee' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}><ChevronLeft size={24} color="#333" /></button>
        {/* Animated Title for effect */}
        <h1 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#333', display: 'flex', alignItems: 'center', gap: '6px' }}>
          자금 생존기간 상세 {gainedMonths > 0 && <span style={{ fontSize: '12px', backgroundColor: '#e6f4ff', color: '#009490', padding: '2px 8px', borderRadius: '12px' }}>+{gainedMonths}개월 연장됨!</span>}
        </h1>
      </div>
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px', marginTop: '10px' }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>현재 자산으로 버틸 수 있는 기간</div>
          <div style={{ fontSize: '36px', fontWeight: '800', color: statusColor, transition: 'all 0.3s' }}>
            {runwayMonthsInt}개월 {runwayDays}일
          </div>

          {/* Dynamic Badge */}
          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', backgroundColor: `${statusColor}20`, color: statusColor, padding: '6px 16px', borderRadius: '20px' }}>
              상태: {status}
            </div>
            {monthlySavings > 0 && (
              <div style={{ fontSize: '14px', fontWeight: 'bold', backgroundColor: '#FFF3E0', color: '#F57C00', padding: '6px 16px', borderRadius: '20px' }}>
                월 {monthlySavings.toLocaleString()}원 절약 효과
              </div>
            )}
          </div>
        </div>

        <div style={{ backgroundColor: '#f9f9f9', padding: '24px', borderRadius: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', color: '#555' }}>보유 자산</span>
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{currentAsset.toLocaleString()}원</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', color: '#555' }}>예상 월 지출</span>
            <span style={{ fontSize: '16px', fontWeight: 'bold', color: monthlySavings > 0 ? '#009490' : '#333' }}>
              {effectiveSpend.toLocaleString()}원 {monthlySavings > 0 && <span style={{ fontSize: '12px', textDecoration: 'line-through', color: '#999' }}>({baseSpend.toLocaleString()})</span>}
            </span>
          </div>

          <div style={{ fontSize: '13px', color: '#888', lineHeight: '1.5' }}>
            * 입력하신 월 지출액에서 정책 지원금을 차감하여 계산했습니다.
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#333', textAlign: 'left' }}>🛡️ 생존 기간 늘리기 (정책 시뮬레이션)</h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {/* Policy 1: Rent Support */}
            <div onClick={() => togglePolicy('rent')} style={{
              border: policies.rent ? '2px solid #009490' : '1px solid #eee',
              backgroundColor: policies.rent ? '#E0F2F1' : 'white',
              borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <div style={{ fontSize: '24px' }}>🏠</div>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: policies.rent ? '#009490' : '#333' }}>청년월세지원 신청</div>
                <div style={{ fontSize: '12px', color: '#666' }}>월 20만원 임대료 지원 받기</div>
              </div>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: policies.rent ? '6px solid #009490' : '2px solid #ddd', boxSizing: 'border-box' }}></div>
            </div>

            {/* Policy 2: Learning Card */}
            <div onClick={() => togglePolicy('learning')} style={{
              border: policies.learning ? '2px solid #009490' : '1px solid #eee',
              backgroundColor: policies.learning ? '#E0F2F1' : 'white',
              borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <div style={{ fontSize: '24px' }}>💳</div>
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: policies.learning ? '#009490' : '#333' }}>내일배움카드 활용</div>
                <div style={{ fontSize: '12px', color: '#666' }}>학원/강의비 월 30만원 방어</div>
              </div>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: policies.learning ? '6px solid #009490' : '2px solid #ddd', boxSizing: 'border-box' }}></div>
            </div>
          </div>
          {/* Simulation Feedback */}
          {monthlySavings > 0 && (
            <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#FFF8E1', borderRadius: '12px', color: '#F57C00', fontSize: '13px', fontWeight: 'bold', animation: 'fadeIn 0.5s' }}>
              💡 정책 활용으로 생존 기간이 <span style={{ fontSize: '16px', textDecoration: 'underline' }}>{gainedMonths}개월</span> 늘어났어요!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FinancialMOSPage = ({ onBack, onAssetDetail }) => {
  const [currentStage, setCurrentStage] = useState(1);
  const [activeMission, setActiveMission] = useState(null);
  const [viewMode, setViewMode] = useState('map'); // 'board' or 'map'
  const [isSocietyMode, setIsSocietyMode] = useState(false);

  const missionMap = [
    { id: 1, title: '입대신고', desc: '하나은행 앱 설치 및 가입', reward: 50 },
    { id: 2, title: '보급품 수령', desc: '나라사랑카드 혜택 확인', reward: 30 },
    { id: 3, title: '적금 가입', desc: '장병내일준비적금 개설', reward: 100 },
    { id: 4, title: '청약 개설', desc: '주택청약종합저축 가입', reward: 50 },
    { id: 5, title: '자동이체', desc: '군 적금 자동이체 설정', reward: 30 },
    { id: 6, title: '마이데이터', desc: '흩어진 내 자산 한번에 모으기', reward: 50 },
    { id: 7, title: '신용관리', desc: '내 신용점수 조회하기', reward: 30 },
    { id: 8, title: '전역 준비', desc: '전역 후 자산플랜 설계', reward: 100 },
  ];

  const societyMissionMap = [
    { id: 1, title: '첫 월급', desc: '급여통장 쪼개기 & 예산 수립', reward: 50 },
    { id: 2, title: '소비 관리', desc: '신용카드 vs 체크카드 혜택 비교', reward: 30 },
    { id: 3, title: '비상금', desc: '하루만 맡겨도 이자쌓이는 파킹통장', reward: 50 },
    { id: 4, title: '본격 투자', desc: '나에게 맞는 펀드/ETF 찾기', reward: 100 },
    { id: 5, title: '세금 혜택', desc: '연말정산 미리보기 & 절세 꿀팁', reward: 50 },
    { id: 6, title: '내 집 마련', desc: '주택청약 1순위 조건 만들기', reward: 100 },
    { id: 7, title: '은퇴 준비', desc: '개인연금(IRP) 가입하고 세제혜택', reward: 100 },
    { id: 8, title: '경제적 자유', desc: '은퇴 후 자산 시뮬레이션', reward: 200 },
  ];

  const currentMissions = isSocietyMode ? societyMissionMap : missionMap;

  // Helper patterns
  const cardColors = ['#FFE4E1', '#FFFACD', '#E0FFFF', '#F0FFF0', '#F5F5DC', '#E6E6FA', '#FFE4B5', '#F0F8FF'];

  return (
    <div className="app-container" style={{ backgroundColor: isSocietyMode ? '#E8F5E9' : '#F0F9FF', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="header sticky top-0 bg-white z-10" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ChevronLeft size={24} color="#333" /></button>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#1F2937' }}>{isSocietyMode ? '사회인 금융 로드맵' : '금융 주특기 교육'}</h1>
            <span style={{ fontSize: '11px', color: isSocietyMode ? '#4CAF50' : '#009490', fontWeight: '600' }}>{isSocietyMode ? 'Society Financial Roadmap' : 'Financial Training Course'}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Toggle Switch */}
          <div onClick={() => setIsSocietyMode(!isSocietyMode)} style={{
            width: '74px', height: '28px', backgroundColor: isSocietyMode ? '#4CAF50' : '#E0E0E0',
            borderRadius: '20px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.3s',
            display: 'flex', alignItems: 'center', padding: '0 4px'
          }}>
            <div style={{
              width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%',
              position: 'absolute', left: isSocietyMode ? '48px' : '4px', transition: 'left 0.3s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}></div>
            <span style={{
              position: 'absolute', left: isSocietyMode ? '10px' : '28px',
              fontSize: '10px', fontWeight: 'bold', color: isSocietyMode ? 'white' : '#757575', pointerEvents: 'none'
            }}>
              {isSocietyMode ? '사회' : '현역'}
            </span>
          </div>

          <button onClick={() => setViewMode(viewMode === 'board' ? 'map' : 'board')} style={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '16px', padding: '4px 10px', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {viewMode === 'board' ? '🗺️ 지도' : '📋 보드'}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left: Asset Manager (Coach) */}
        <div style={{ width: '30%', backgroundColor: '#fff', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ backgroundColor: isSocietyMode ? '#4CAF50' : '#009490', color: 'white', fontSize: '11px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '12px', display: 'inline-block', marginBottom: '8px' }}>
              {isSocietyMode ? '금융 멘토' : '자산관리관'}
            </div>
            <div onClick={onAssetDetail} style={{ cursor: 'pointer', position: 'relative' }}>
              <img src={isSocietyMode ? societyImg : soldierImg} alt="Coach" style={{ width: '90px', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))' }} />
              <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fff', border: '1px solid #E5E7EB', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', color: isSocietyMode ? '#4CAF50' : '#009490', whiteSpace: 'nowrap', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                {isSocietyMode ? '멘토링' : '자산상세'} <ChevronLeft size={10} style={{ transform: 'rotate(180deg)' }} />
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: '#F3F4F6', borderRadius: '16px', padding: '16px', position: 'relative', width: '100%', fontSize: '13px', lineHeight: '1.5', color: '#4B5563', textAlign: 'center' }}>
            <div style={{ position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)', width: '10px', height: '10px', backgroundColor: '#F3F4F6', rotate: '45deg' }}></div>
            <span style={{ fontWeight: 'bold', color: '#111' }}>{currentStage + 1}단계</span> 훈련 중!<br />완주까지 파이팅!
          </div>
        </div>

        {/* Right: Content Area (Map or Board) */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', backgroundColor: '#87CEEB' }}>

          {/* MAP VIEW */}
          {viewMode === 'map' && (
            <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
              {/* Flip image to move City (if on left) to Right only for Fantasy Map. Society map is generated L->R */}
              <img src={isSocietyMode ? societyWorldMapImg : fantasyWorldMapImg} alt="World Map" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: isSocietyMode ? 'none' : 'scaleX(-1)' }} />

              {/* 3 Interactive Zones/Pins over the map */}
              {/* Zone 1: Left */}
              <div onClick={() => setViewMode('board')} style={{ position: 'absolute', top: isSocietyMode ? '50%' : '25%', left: '20%', transform: 'translate(-50%, -50%)', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ backgroundColor: isSocietyMode ? '#FF5722' : '#2962FF', color: 'white', padding: '8px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 4px 8px rgba(0,0,0,0.3)', marginBottom: '8px', whiteSpace: 'nowrap' }}>{isSocietyMode ? '커리어 시작/이직' : '미래설계/전역'}</div>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '50%', border: '2px solid white', margin: '0 auto', animation: 'pulse 2s infinite' }}></div>
              </div>

              {/* Zone 2: Center */}
              <div onClick={() => setViewMode('board')} style={{ position: 'absolute', top: isSocietyMode ? '35%' : '60%', left: '45%', transform: 'translate(-50%, -50%)', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ backgroundColor: isSocietyMode ? '#9C27B0' : '#FFA000', color: 'white', padding: '8px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 4px 8px rgba(0,0,0,0.3)', marginBottom: '8px', whiteSpace: 'nowrap' }}>{isSocietyMode ? '내 집 마련 플랜' : '자산형성/적금'}</div>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '50%', border: '2px solid white', margin: '0 auto', animation: 'pulse 2s infinite' }}></div>
              </div>

              {/* Zone 3: Right */}
              <div onClick={() => setViewMode('board')} style={{ position: 'absolute', top: isSocietyMode ? '20%' : '20%', right: '20%', transform: 'translate(50%, -50%)', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ backgroundColor: isSocietyMode ? '#3F51B5' : '#4CAF50', color: 'white', padding: '8px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 4px 8px rgba(0,0,0,0.3)', marginBottom: '8px', whiteSpace: 'nowrap' }}>{isSocietyMode ? '은퇴/경제적자유' : '입대/기초훈련'}</div>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '50%', border: '2px solid white', margin: '0 auto', animation: 'pulse 2s infinite' }}></div>
              </div>
            </div>
          )}

          {/* BOARD VIEW (Snake Layout) */}
          {viewMode === 'board' && (
            <div style={{ width: '100%', height: '100%', padding: '20px', overflowY: 'auto', boxSizing: 'border-box', backgroundImage: 'radial-gradient(#e0f2fe 20%, transparent 20%)', backgroundSize: '20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              <div style={{ width: '100%', maxWidth: '360px', paddingBottom: '40px' }}>
                {/* Render chunks of 4 (Snake) */}
                {Array.from({ length: Math.ceil(currentMissions.length / 4) }).map((_, rowIndex) => {
                  const rowItems = currentMissions.slice(rowIndex * 4, (rowIndex + 1) * 4);
                  const isReversed = rowIndex % 2 !== 0;
                  const displayItems = isReversed ? [...rowItems].reverse() : rowItems;

                  return (
                    <div key={rowIndex} style={{ position: 'relative', marginBottom: '40px' }}>
                      {/* Vertical Connector between rows */}
                      {rowIndex > 0 && (
                        <div style={{
                          position: 'absolute',
                          top: '-45px',
                          [rowIndex % 2 === 0 ? 'left' : 'right']: '12.5%', // Center of the end tile
                          width: '4px', height: '50px',
                          borderRight: '4px dashed white',
                          zIndex: 0
                        }} />
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {displayItems.map((mission, colIndex) => {
                          const originalIndex = currentMissions.indexOf(mission);
                          const isCurrent = originalIndex === currentStage; // 0-based active index
                          const isLocked = originalIndex > currentStage;
                          const isCompleted = originalIndex < currentStage;
                          const color = cardColors[originalIndex % cardColors.length];

                          return (
                            <div key={mission.id} style={{ width: '22%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                              {/* Horizontal Connector */}
                              {colIndex < displayItems.length - 1 && (
                                <div style={{
                                  position: 'absolute',
                                  top: '30px',
                                  [isReversed ? 'left' : 'right']: '-25%',
                                  width: '50%', height: '4px',
                                  borderTop: '4px dotted rgba(255,255,255,0.8)',
                                  zIndex: 0
                                }} />
                              )}

                              <div
                                onClick={() => isCurrent && setActiveMission(mission)}
                                style={{
                                  width: '60px', height: '60px',
                                  backgroundColor: isLocked ? '#E5E7EB' : color,
                                  borderRadius: '16px',
                                  boxShadow: isCurrent ? '0 0 0 4px #FFD700, 0 8px 16px rgba(0,0,0,0.2)' : '0 4px 0 rgba(0,0,0,0.1)',
                                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                  cursor: isCurrent ? 'pointer' : 'default',
                                  opacity: isLocked ? 0.7 : 1,
                                  transform: isCurrent ? 'scale(1.15)' : 'none',
                                  transition: 'all 0.2s',
                                  border: isCompleted ? '3px solid white' : 'none',
                                  zIndex: 1,
                                  position: 'relative'
                                }}>
                                <div style={{ fontSize: '20px', filter: isLocked ? 'grayscale(100%)' : 'none' }}>
                                  {originalIndex === 0 && '📱'} {originalIndex === 1 && '💳'} {originalIndex === 2 && '💰'}
                                  {originalIndex === 3 && '🏠'} {originalIndex === 4 && '🔄'} {originalIndex === 5 && '🧩'}
                                  {originalIndex === 6 && '🛡️'} {originalIndex === 7 && '🎓'}
                                </div>
                                <div style={{ fontSize: '8px', fontWeight: 'bold', color: '#555', marginTop: '2px' }}>STEP {originalIndex + 1}</div>

                                {isCompleted && <div style={{ position: 'absolute', top: -5, right: -5, backgroundColor: '#009490', borderRadius: '50%', padding: '2px' }}><CheckCircle size={12} color="white" /></div>}
                              </div>

                              <div style={{ marginTop: '8px', fontSize: '11px', fontWeight: 'bold', color: 'white', textShadow: '0 1px 2px rgba(0,0,0,0.3)', textAlign: 'center', lineHeight: '1.2', width: '120%', wordBreak: 'keep-all' }}>
                                {mission.title}
                              </div>

                              {isCurrent && (
                                <div style={{ position: 'absolute', top: -15, backgroundColor: '#FFD700', padding: '2px 6px', borderRadius: '8px', fontSize: '9px', fontWeight: 'bold', color: '#D35400', animation: 'bounce 1s infinite', zIndex: 10 }}>HERE!</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>


      {
        activeMission && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
            <div style={{ backgroundColor: 'white', width: '85%', maxWidth: '320px', padding: '24px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#E0F2F1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#009490' }}>
                <Shield size={24} />
              </div>
              <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '800', color: '#111' }}>{activeMission.title}</h3>
              <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: '1.5', margin: '0 0 24px' }}>{activeMission.desc}을(를)<br />진행하시겠습니까?</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setActiveMission(null)} style={{ flex: 1, padding: '14px', borderRadius: '14px', border: '1px solid #E5E7EB', background: 'white', color: '#4B5563', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>나중에</button>
                <button onClick={() => { setCurrentStage(s => s + 1); setActiveMission(null); }} style={{ flex: 1, padding: '14px', borderRadius: '14px', border: 'none', background: '#009490', color: 'white', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 6px rgba(0,148,144,0.3)', cursor: 'pointer' }}>확인</button>
              </div>
            </div>
          </div>
        )
      }
      <BottomNav />
    </div >
  );
};

const AssetDetailPage = ({ onBack, userProfile, onQuestClick }) => {
  const [isDischarged, setIsDischarged] = useState(false);
  const [showAiReport, setShowAiReport] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);

  const [showBubble, setShowBubble] = useState(true);

  // Set default goal if not provided (e.g. direct access or skipped)
  const goalAmount = userProfile?.goalAmount ? parseInt(userProfile.goalAmount, 10) : 20000000;
  const currentAsset = 1250000; // Fixed for now as requested
  const percent = Math.min((currentAsset / goalAmount) * 100, 100).toFixed(1);

  const disciplinedMessages = [
    "이번 휴가비,\n10만원만 아껴볼까요?",
    "PX 냉동 3번 참으면\n주식 1주 GET! 🍗",
    "군적금 만기되면\n여행 갈까요? ✈️"
  ];
  const societyMessages = [
    "오늘 택시 대신\n따릉이 어때요? 🚲",
    "커피 1잔 값,\n미니 펀드에 쏙! ☕",
    "배달비 2만원 절약\n이번주 도전? 🛵"
  ];

  const insightMessage = isDischarged
    ? societyMessages[Math.floor(Math.random() * societyMessages.length)]
    : disciplinedMessages[Math.floor(Math.random() * disciplinedMessages.length)];

  const handleAiDiagnosis = () => {
    setAiAnalyzing(true);
    setShowAiReport(false); // Reset
    setTimeout(() => {
      setAiAnalyzing(false);
      setShowAiReport(true);
    }, 2500); // 2.5s analysis simulation
  };

  return (
    <div className="app-container" style={{
      background: isDischarged ? 'linear-gradient(180deg, #E8F5E9 0%, #FFFFFF 50%)' : 'linear-gradient(180deg, #E0F7FA 0%, #FFFFFF 50%)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Circle */}
      <div style={{ position: 'absolute', top: '-10%', right: '-30%', width: '300px', height: '300px', borderRadius: '50%', background: isDischarged ? 'radial-gradient(circle, rgba(76, 175, 80, 0.1) 0%, rgba(255,255,255,0) 70%)' : 'radial-gradient(circle, rgba(0,148,144,0.1) 0%, rgba(255,255,255,0) 70%)', zIndex: 0 }}></div>
      <div className="header sticky top-0 bg-white z-10" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #eee' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}><ChevronLeft size={24} color="#333" /></button>
          <h1 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#333' }}>자산관리 상세</h1>
        </div>
        {/* Toggle Switch */}
        <div onClick={() => setIsDischarged(!isDischarged)} style={{
          width: '80px', height: '32px', backgroundColor: isDischarged ? '#4CAF50' : '#E0E0E0',
          borderRadius: '20px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.3s',
          display: 'flex', alignItems: 'center', padding: '0 4px'
        }}>
          <div style={{
            width: '24px', height: '24px', backgroundColor: 'white', borderRadius: '50%',
            position: 'absolute', left: isDischarged ? '52px' : '4px', transition: 'left 0.3s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}></div>
          <span style={{
            position: 'absolute', left: isDischarged ? '10px' : '34px',
            fontSize: '11px', fontWeight: 'bold', color: isDischarged ? 'white' : '#757575', pointerEvents: 'none'
          }}>
            {isDischarged ? '전역' : '현역'}
          </span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', marginTop: '30px', position: 'relative' }}>

        {/* Short-term Insight Bubble (Left of Character) */}
        {showBubble && (
          <div style={{ position: 'absolute', top: '100px', left: '20px', backgroundColor: 'white', padding: '12px 16px', borderRadius: '20px 20px 0 20px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', animation: 'bounceIn 0.8s', zIndex: 20, maxWidth: '140px' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', lineHeight: '1.4', color: '#333', whiteSpace: 'pre-line' }}>{insightMessage}</div>
            <button onClick={() => setShowBubble(false)} style={{ position: 'absolute', top: '-8px', right: '-8px', width: '20px', height: '20px', backgroundColor: '#ddd', borderRadius: '50%', border: 'none', color: '#666', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            <div style={{ position: 'absolute', bottom: '-8px', right: '0', width: '0', height: '0', borderLeft: '10px solid transparent', borderTop: '10px solid white' }}></div>
          </div>
        )}

        {/* Service D-Day Badge (Top Left) */}
        <div style={{ position: 'absolute', top: '10px', left: '20px' }}>
          <div style={{ backgroundColor: isDischarged ? '#4CAF50' : '#262626', color: 'white', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '800', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            {isDischarged ? '사회인 1일차' : 'D - 320'}
          </div>
        </div>
        {/* Soldier Character */}
        <div style={{ marginBottom: '40px', position: 'relative', marginTop: '80px' }}>
          <div style={{ position: 'absolute', top: -50, left: '50%', transform: 'translateX(-50%)', backgroundColor: isDischarged ? '#4CAF50' : '#009490', color: 'white', padding: '8px 20px', borderRadius: '24px', fontSize: '15px', fontWeight: 'bold', whiteSpace: 'nowrap', boxShadow: isDischarged ? '0 4px 12px rgba(76, 175, 80, 0.3)' : '0 4px 12px rgba(0,148,144,0.3)', zIndex: 5 }}>
            {isDischarged ? "축하합니다! 새로운 시작을 응원합니다!" : "\"이근준 상병님! 목돈 마련이 코앞입니다!\""}
            <div style={{ position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: isDischarged ? '6px solid #4CAF50' : '6px solid #009490' }}></div>
          </div>
          <img src={isDischarged ? soldierDischargeImg : soldierImg} alt="군인" style={{ width: '180px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))' }} />

          {/* Floating Quest Button (Next to Character) */}
          <div onClick={onQuestClick} style={{ position: 'absolute', top: '5%', right: '-100px', transform: 'translateY(-50%)', zIndex: 10, cursor: 'pointer', animation: 'float 2s ease-in-out infinite', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#FFD700', boxShadow: '0 4px 12px rgba(255, 215, 0, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid white' }}>
              <span style={{ fontSize: '28px' }}>🪙</span>
            </div>
            <div style={{ marginTop: '4px', backgroundColor: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold', color: '#333', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              보너스
            </div>
          </div>
        </div>

        {/* Percent Bars Container */}
        <div style={{ width: '100%', maxWidth: '320px' }}>

          {/* Bar 1: Asset Portfolio (Segmented) */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#111' }}>{isDischarged ? '전역 자산 포트폴리오' : '자산 포트폴리오'}</span>
            </div>
            {/* Segmented Bar */}
            <div style={{ height: '20px', backgroundColor: '#F3F4F6', borderRadius: '10px', overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: isDischarged ? '70%' : '60%', height: '100%', backgroundColor: isDischarged ? '#4CAF50' : '#009490' }}></div>
              <div style={{ width: isDischarged ? '20%' : '30%', height: '100%', backgroundColor: '#D97706' }}></div>
              <div style={{ width: '10%', height: '100%', backgroundColor: '#9CA3AF' }}></div>
            </div>
            {/* Legend */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px', fontSize: '11px', color: '#666' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#009490' }}></div>예적금 60%</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#D97706' }}></div>펀드 30%</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#9CA3AF' }}></div>기타 10%</div>
            </div>
          </div>

          {/* Bar 2: Total Asset Goal Progress */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '15px', fontWeight: 'bold', color: '#111' }}>
              <span>총 자산 달성률</span>
              <span style={{ color: isDischarged ? '#4CAF50' : '#009490' }}>{percent}%</span>
            </div>
            <div style={{ height: '14px', backgroundColor: '#E5E7EB', borderRadius: '7px', overflow: 'hidden' }}>
              <div style={{ width: `${percent}%`, height: '100%', backgroundColor: isDischarged ? '#4CAF50' : '#009490', borderRadius: '7px', transition: 'width 1s ease-in-out' }}></div>
            </div>
            <div style={{ marginTop: '6px', fontSize: '12px', color: '#6B7280', textAlign: 'right' }}>
              {currentAsset.toLocaleString()} / {goalAmount.toLocaleString()}원
            </div>
          </div>

          {/* Narasarang Account Card */}
          <div style={{ marginTop: '20px', backgroundColor: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#E0F7FA', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wallet size={20} color="#009490" />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>하나 나라사랑우대통장</div>
                <div style={{ fontSize: '12px', color: '#888' }}>123-***-******</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#009490' }}>{currentAsset.toLocaleString()}원</div>
            </div>
          </div>

          {/* Recent Transactions List */}
          <div style={{ marginTop: '12px', padding: '0 8px' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#666', marginBottom: '8px' }}>최근 거래내역</div>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              {[
                { date: '10.15', name: '충성마트(PX)', amount: -12500 },
                { date: '10.12', name: '코레일', amount: -34800 },
                { date: '10.08', name: 'GS25', amount: -4500 },
                { date: '10.05', name: '배달의민족', amount: -22000 },
                { date: '10.01', name: '올리브영', amount: -18900 },
              ].map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: index < 4 ? '1px solid #f5f5f5' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#888', width: '35px' }}>{item.date}</div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>{item.name}</div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
                    {item.amount.toLocaleString()}원
                  </div>
                </div>
              ))}
            </div>
          </div>



          {/* Floating Quest Button */}



          {/* New AI Diagnosis Button */}
          <div style={{ marginTop: '24px', padding: '0 8px' }}>
            <button
              onClick={handleAiDiagnosis}
              style={{
                width: '100%',
                backgroundColor: isDischarged ? '#4CAF50' : '#009490',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                padding: '16px',
                fontSize: '16px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s'
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Sparkles size={20} color="white" />
              <span>AI 자산 의무관에게 정밀 진단 받기</span>
            </button>
          </div>

          {/* AI Analysis Result Area (Conditional) */}
          {aiAnalyzing && (
            <div style={{ marginTop: '20px', padding: '20px', backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '16px', textAlign: 'center', backdropFilter: 'blur(4px)', border: '1px solid #E5E7EB', animation: 'fadeIn 0.5s' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: isDischarged ? '3px solid #4CAF50' : '3px solid #009490', borderRadius: '50%', margin: '0 auto 10px', animation: 'spin 1s linear infinite' }}></div>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#555' }}>AI가 자산 데이터를 분석 중입니다...</div>
            </div>
          )}

          {showAiReport && (
            <div style={{ marginTop: '20px', width: '100%', animation: 'slideUp 0.5s ease-out' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #f0f0f0', position: 'relative', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                  <div style={{ backgroundColor: isDischarged ? '#E8F5E9' : '#E0F7FA', padding: '6px', borderRadius: '50%' }}>
                    <Sparkles size={16} color={isDischarged ? '#4CAF50' : '#009490'} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#333' }}>AI HANA 진단 리포트</div>
                    <div style={{ fontSize: '10px', color: '#888' }}>{new Date().toLocaleDateString()} 기준</div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  {/* Score */}
                  <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '50%', border: '4px solid #f0f0f0' }}></div>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '50%', border: isDischarged ? '4px solid #4CAF50' : '4px solid #009490', borderRightColor: 'transparent', borderBottomColor: 'transparent', transform: 'rotate(-45deg)' }}></div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: '900', color: isDischarged ? '#4CAF50' : '#009490' }}>85</div>
                      <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#aaa' }}>점</div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{ flex: 1, marginLeft: '20px' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '600', marginBottom: '4px', color: '#555' }}>
                        <span>안정성</span>
                        <span>매우 높음</span>
                      </div>
                      <div style={{ height: '6px', backgroundColor: '#eee', borderRadius: '3px' }}>
                        <div style={{ width: '90%', height: '100%', backgroundColor: '#4CAF50', borderRadius: '3px' }}></div>
                      </div>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '600', marginBottom: '4px', color: '#555' }}>
                        <span>수익성</span>
                        <span>보통</span>
                      </div>
                      <div style={{ height: '6px', backgroundColor: '#eee', borderRadius: '3px' }}>
                        <div style={{ width: '50%', height: '100%', backgroundColor: '#FFC107', borderRadius: '3px' }}></div>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '600', marginBottom: '4px', color: '#555' }}>
                        <span>유동성</span>
                        <span>낮음</span>
                      </div>
                      <div style={{ height: '6px', backgroundColor: '#eee', borderRadius: '3px' }}>
                        <div style={{ width: '30%', height: '100%', backgroundColor: '#FF5722', borderRadius: '3px' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Comment */}
                <div style={{ backgroundColor: '#f9fafb', borderRadius: '12px', padding: '12px', fontSize: '12px', lineHeight: '1.6', color: '#444', animation: 'fadeIn 1s 0.5s backwards' }}>
                  <span style={{ fontSize: '16px', marginRight: '4px' }}>🤖</span>
                  {isDischarged
                    ? <span>이근준님의 소비 통제는 <b style={{ color: '#4CAF50' }}>상위 5%</b> 수준입니다! 훌륭해요. 이제는 파킹통장의 비중을 줄이고 <b style={{ color: '#4CAF50' }}>고수익 투자 상품(ETF)</b> 비중을 늘려 자산 증식 속도를 높여보세요.</span>
                    : <span>군 적금 납입이 매우 <b style={{ color: '#009490' }}>성실</b>하십니다! 안정적인 목돈 마련이 기대되네요. 다만 전역 후 즉시 사용할 <b style={{ color: '#009490' }}>비상금(유동성)</b>이 조금 부족하니 50만원 정도는 수시입출금 통장에 둬보세요.</span>
                  }
                </div>
              </div>
            </div>
          )}


        </div>
      </div>
      <BottomNav />
    </div >
  );
};

const TrainingItem = ({ type, title, desc, icon, status, reward }) => (
  <div style={{
    backgroundColor: status === 'locked' ? '#f3f4f6' : 'white',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: status === 'locked' ? 'none' : '0 1px 3px rgba(0,0,0,0.05)',
    opacity: status === 'locked' ? 0.8 : 1
  }}>
    <div style={{
      backgroundColor: status === 'locked' ? '#e5e7eb' : '#f0fdf4',
      padding: '10px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {icon}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '11px', fontWeight: '700', color: status === 'locked' ? '#9ca3af' : '#009490', marginBottom: '2px' }}>
        [{type} 주특기]
      </div>
      <div style={{ fontSize: '14px', fontWeight: '700', color: status === 'locked' ? '#6b7280' : '#333', marginBottom: '2px' }}>
        {title}
      </div>
      <div style={{ fontSize: '12px', color: '#888' }}>
        {desc}
      </div>
    </div>
    {status !== 'locked' && (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        {reward && (
          <span style={{ fontSize: '10px', fontWeight: '700', color: '#b45309', backgroundColor: '#fef3c7', padding: '2px 6px', borderRadius: '4px', marginBottom: '4px', whiteSpace: 'nowrap' }}>
            {reward}
          </span>
        )}
        <div style={{ color: '#ccc', textAlign: 'right' }}>›</div>
      </div>
    )}
  </div>
);

const MissionItem = ({ title, reward, done }) => (
  <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <CheckCircle size={20} color={done ? "#009490" : "#ddd"} />
      <span style={{ color: done ? '#aaa' : '#333', fontWeight: done ? '400' : '600', textDecoration: done ? 'line-through' : 'none' }}>
        {title}
      </span>
    </div>
    <span style={{ fontSize: '12px', fontWeight: '700', color: '#3b82f6', backgroundColor: '#eff6ff', padding: '4px 8px', borderRadius: '4px' }}>
      {reward}
    </span>
  </div>
);

const Header = () => (
  <header className="header">
    <div className="header-left">
      <User size={26} color="#333" />
      <button className="btn-all-accounts">전체계좌</button>
    </div>
    <div className="header-right">
      <div className="home-toggle">
        홈 <span style={{ color: '#ccc', margin: '0 4px' }}>|</span> 간편
      </div>
      <Wallet size={26} color="#333" />
      <Bell size={26} color="#333" />
    </div>
  </header>
);

const PromoBanner = () => (
  <div className="promo-banner">
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span>👩‍💼</span>
      <span>하나 나라사랑카드 & 통장 출시! 신규하고 경품받자!</span>
    </div>
    <span style={{ color: '#ccc' }}>›</span>
  </div>
);

const MainAccount = () => (
  <div className="account-card">
    <div className="account-header">
      <div>
        <div className="account-title">장병내일준비적금</div>
        <div className="account-number">
          입출금 <span style={{ textDecoration: 'underline' }}>287-910930-78307</span>
        </div>
      </div>
      <span className="tag-limit">우대금리</span>
    </div>

    <div className="account-balance">
      2,850,000원 <button className="btn-hide">숨김</button>
    </div>

    <div className="action-buttons">
      <button className="btn-action secondary">가져오기</button>
      <button className="btn-action primary">보내기</button>
      <button className="btn-more">
        <MoreHorizontal size={20} />
      </button>
    </div>

    <div className="account-message">
      ⓘ 이달의 납입 한도, 5만원 남았습니다!
    </div>
  </div>
);

const QuickCards = ({ onRankClick, onLoungeClick, onRunwayClick }) => (
  <div className="quick-cards-scroll">
    <div onClick={onRankClick}>
      <Card
        bgColor="#e6f6e6"
        icon="📊"
        title="나의 금융 계급"
        subtitle="상위 10% 도전"
        link="리포트 보기 >"
      />
    </div>
    <div onClick={onRunwayClick}>
      <Card
        bgColor="#fff0f5"
        icon="⏳"
        title="자금 생존 기간"
        subtitle="전역 후 버티기"
        link="시뮬레이션 >"
      />
    </div>
    <div onClick={onLoungeClick}>
      <Card
        bgColor="#e6f0fa"
        icon="⛺"
        title="밀리터리 라운지"
        subtitle="내 자산 관리"
        link="입장하기 >"
      />
    </div>
  </div>
);

const Card = ({ bgColor, icon, title, subtitle, link }) => (
  <div className="quick-card" style={{ backgroundColor: bgColor }}>
    <div>
      <div className="card-icon">{icon}</div>
      <div className="card-text">
        {title}<br />{subtitle}
      </div>
    </div>
    <div className="card-link">{link}</div>
  </div>
);

const MarketingBanner = () => (
  <div className="marketing-area">
    <div style={{ color: '#888', fontSize: '13px', marginBottom: '4px' }}>아이부자에서 전하는</div>
    <div style={{ fontSize: '18px', fontWeight: '700', color: '#333' }}>
      2026년 "용돈 리포트"<br />새해엔 에디션 출시!
    </div>
  </div>
);

const FloatingButton = () => (
  <div className="floating-btn-container">
    <button className="consult-btn">상담</button>
  </div>
);

const BottomNav = () => (
  <div className="bottom-nav-container">
    <div className="quick-links">
      <button className="quick-link-btn" style={{ backgroundColor: '#6a67ce', color: 'white' }}>
        <Search size={14} /> 검색
      </button>
      <button className="quick-link-btn" style={{ backgroundColor: '#f9f9f9', color: '#555', border: '1px solid #eee' }}>
        <span style={{ color: 'green' }}>❖</span> 지문인증 등록
      </button>
      <button className="quick-link-btn" style={{ backgroundColor: '#f9f9f9', color: '#555', border: '1px solid #eee' }}>
        <span style={{ color: 'blue' }}>₩</span> 전체계좌
      </button>
    </div>
    <div className="nav-tabs">
      <NavItem icon={<Home size={24} />} label="홈" active />
      <NavItem icon={<Percent size={24} />} label="상품" />
      <NavItem icon={<PieChart size={24} />} label="자산" />
      <NavItem icon={<TrendingUp size={24} />} label="주식" />
      <NavItem icon={<Menu size={24} />} label="메뉴" />
    </div>
  </div>
);

const NavItem = ({ icon, label, active }) => (
  <div className={`nav - item ${active ? 'active' : ''} `}>
    {icon}
    <span className="nav-label">{label}</span>
  </div>
);

export default App;
