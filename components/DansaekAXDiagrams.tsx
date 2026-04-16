'use client';

import React from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────── shared helpers ─────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function VerticalArrow({ color = 'slate-500/30' }: { color?: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`h-8 w-px bg-${color}`} />
      <div
        className={`w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-${color}`}
      />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg md:text-xl font-bold text-white mb-6 text-center tracking-tight">
      {children}
    </h3>
  );
}

function Badge({
  label,
  variant = 'red',
}: {
  label: string;
  variant?: 'red' | 'amber';
}) {
  const cls =
    variant === 'red'
      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
      : 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  return (
    <span
      className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cls} whitespace-nowrap`}
    >
      {label}
    </span>
  );
}

/* ════════════════════════════════════════════════════════════════
   1. SiteNavigationMap
   ════════════════════════════════════════════════════════════════ */

const navSections: {
  title: string;
  border: string;
  items: string[];
  badge?: { label: string; variant: 'red' | 'amber' };
}[] = [
  {
    title: '메인 네비게이션',
    border: 'border-sky-500/40',
    items: [
      '스프링페스타',
      '생리팬티',
      '위생팬티',
      '주니어브라',
      '여성청결제',
      '아이템',
      '뷰티',
      '패밀리몰',
    ],
    badge: { label: '8개 항목', variant: 'red' },
  },
  {
    title: '메가메뉴',
    border: 'border-emerald-500/40',
    items: [
      '베스트',
      '위생/생리팬티',
      '브라',
      '팬티',
      '임산부',
      '주니어',
      '아이템',
      '선물하기',
      '이벤트',
    ],
    badge: { label: '9+33 소분류', variant: 'red' },
  },
  {
    title: '헤더 보조',
    border: 'border-indigo-500/40',
    items: ['브랜드', '리뷰', '장바구니'],
  },
  {
    title: '퀵링크',
    border: 'border-amber-500/40',
    items: ['카카오 선물하기', '이벤트/뉴스'],
  },
  {
    title: '푸터',
    border: 'border-slate-500/40',
    items: ['개인정보처리방침', '이용안내', '이용약관', 'SNS', '사업자정보'],
  },
];

export function SiteNavigationMap() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full my-10 p-6 md:p-10 bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden font-sans text-slate-200"
    >
      <SectionTitle>사이트 네비게이션 맵</SectionTitle>

      {/* HOME node */}
      <div className="flex flex-col items-center mb-2">
        <div className="bg-slate-800/80 border-2 border-purple-500/60 px-6 py-2 rounded-full shadow-lg">
          <span className="font-bold text-purple-300 text-sm tracking-wide">HOME</span>
        </div>
      </div>

      {/* Vertical connector from HOME */}
      <div className="flex flex-col items-center mb-2">
        <div className="h-10 w-px bg-slate-500/30" />
      </div>

      {/* Horizontal rail */}
      <div className="hidden lg:block h-px w-full bg-slate-500/30 mb-4" />

      {/* Section clusters */}
      <div className="flex flex-wrap justify-center gap-4">
        {navSections.map((section) => (
          <motion.div
            key={section.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`flex-shrink-0 w-[170px] bg-slate-900/60 ${section.border} border rounded-xl p-4 relative`}
          >
            {/* Vertical tick from rail */}
            <div className="hidden lg:block absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-slate-500/30" />

            <h4 className="text-xs font-bold text-slate-100 mb-3 text-center leading-snug">
              {section.title}
            </h4>

            {section.badge && (
              <div className="flex justify-center mb-2">
                <Badge label={section.badge.label} variant={section.badge.variant} />
              </div>
            )}

            <ul className="space-y-1">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="text-[11px] text-slate-400 bg-slate-800/60 rounded px-2 py-1 text-center truncate"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   2. PurchaseFlowDiagram
   ════════════════════════════════════════════════════════════════ */

export function PurchaseFlowDiagram() {
  const entryPoints = ['메인 네비', '메가메뉴', '프로모션 배너', '기획전', '검색'];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full my-10 p-6 md:p-10 bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden font-sans text-slate-200"
    >
      <SectionTitle>구매 플로우 다이어그램</SectionTitle>

      {/* Row 1 - Entry points */}
      <div className="flex flex-wrap justify-center gap-3 mb-2">
        {entryPoints.map((ep) => (
          <div
            key={ep}
            className="bg-sky-900/30 border border-sky-500/40 rounded-lg px-4 py-2 text-xs font-semibold text-sky-200 text-center"
          >
            {ep}
          </div>
        ))}
      </div>
      <div className="text-[10px] text-sky-400 text-center mb-1 font-mono">진입점</div>

      <VerticalArrow />

      {/* Row 2 - Category list */}
      <div className="flex justify-center my-4">
        <div className="relative bg-slate-800/70 border border-emerald-500/40 rounded-xl px-6 py-3 text-center">
          <span className="font-bold text-emerald-300 text-sm">카테고리 목록</span>
          <span className="block text-[10px] text-slate-400 mt-1">6개 정렬, 서브카테고리 필터</span>
        </div>
      </div>

      <VerticalArrow />

      {/* Row 3 - Product detail */}
      <div className="flex justify-center my-4">
        <div className="bg-slate-800/70 border border-amber-500/40 rounded-xl px-6 py-3 text-center">
          <span className="font-bold text-amber-300 text-sm">상품 상세</span>
          <span className="block text-[10px] text-slate-400 mt-1">옵션 선택 &rarr; 수량 조절</span>
        </div>
      </div>

      <VerticalArrow />

      {/* Row 4 - Three purchase branches */}
      <div className="flex flex-col lg:flex-row justify-center gap-4 mt-4">
        {/* Left - Cart path (green) */}
        <div className="flex-1 max-w-xs mx-auto">
          <div className="text-[10px] text-emerald-400 text-center font-mono mb-2">장바구니 경로</div>
          {['장바구니 담기', '장바구니 관리', '주문서작성/결제', '주문완료'].map((step, i) => (
            <React.Fragment key={step}>
              <div
                className={`bg-emerald-900/20 border border-emerald-500/30 rounded-lg px-4 py-2 text-xs text-emerald-200 text-center relative ${
                  step === '주문서작성/결제' ? 'ring-2 ring-rose-500/60 ring-offset-1 ring-offset-[#0a0f1a]' : ''
                }`}
              >
                {step}
                {step === '주문서작성/결제' && (
                  <span className="absolute -right-2 -top-2">
                    <Badge label="이탈 리스크" variant="red" />
                  </span>
                )}
              </div>
              {i < 3 && (
                <div className="flex justify-center">
                  <div className="h-4 w-px bg-emerald-500/30" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Center - Direct purchase (blue) */}
        <div className="flex-1 max-w-xs mx-auto">
          <div className="text-[10px] text-sky-400 text-center font-mono mb-2">바로구매 경로</div>
          {['바로 구매', '주문서작성/결제', '주문완료'].map((step, i) => (
            <React.Fragment key={step}>
              <div
                className={`bg-sky-900/20 border border-sky-500/30 rounded-lg px-4 py-2 text-xs text-sky-200 text-center relative ${
                  step === '주문서작성/결제' ? 'ring-2 ring-rose-500/60 ring-offset-1 ring-offset-[#0a0f1a]' : ''
                }`}
              >
                {step}
              </div>
              {i < 2 && (
                <div className="flex justify-center">
                  <div className="h-4 w-px bg-sky-500/30" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Right - Naver Pay (purple) */}
        <div className="flex-1 max-w-xs mx-auto">
          <div className="text-[10px] text-purple-400 text-center font-mono mb-2">네이버페이 경로</div>
          {['네이버페이', '외부 PG 결제', '주문완료'].map((step, i) => (
            <React.Fragment key={step}>
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg px-4 py-2 text-xs text-purple-200 text-center">
                {step}
              </div>
              {i < 2 && (
                <div className="flex justify-center">
                  <div className="h-4 w-px bg-purple-500/30" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   3. CheckoutFlowDiagram
   ════════════════════════════════════════════════════════════════ */

export function CheckoutFlowDiagram() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full my-10 p-6 md:p-10 bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden font-sans text-slate-200"
    >
      <SectionTitle>결제 플로우 비교</SectionTitle>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left - Cart path */}
        <div className="flex-1 bg-slate-900/50 border border-emerald-500/30 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50" />
          <h4 className="text-emerald-400 font-bold text-sm mb-4 flex items-center gap-2">
            장바구니 경로
          </h4>

          <div className="flex items-center gap-2 mb-2">
            <Badge label="3단계 + 장바구니 관리 복잡도" variant="amber" />
          </div>

          {/* Step 01 */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-3 mb-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-emerald-400/60">01</span>
              <span className="font-bold text-sm text-slate-200">장바구니</span>
            </div>
            <div className="flex flex-wrap gap-1 pl-5">
              {['수량변경', '옵션변경', '쿠폰', '삭제'].map((f) => (
                <span
                  key={f}
                  className="text-[10px] bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="h-4 w-px bg-slate-500/30" />
          </div>

          {/* Step 02 */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-3 mb-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-emerald-400/60">02</span>
              <span className="font-bold text-sm text-slate-200">주문서작성/결제</span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="h-4 w-px bg-slate-500/30" />
          </div>

          {/* Step 03 */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-emerald-400/60">03</span>
              <span className="font-bold text-sm text-slate-200">주문완료</span>
            </div>
          </div>

          {/* Payment methods */}
          <div className="border-t border-slate-700 pt-3">
            <div className="text-[10px] text-slate-400 mb-2 font-mono">결제 수단</div>
            <div className="flex flex-wrap gap-2">
              {['무통장입금', '신용카드(KCP)', '네이버페이'].map((m) => (
                <span
                  key={m}
                  className="text-[10px] bg-slate-800 border border-slate-600 text-slate-300 px-2 py-1 rounded"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Direct purchase path */}
        <div className="flex-1 bg-slate-900/50 border border-sky-500/30 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-sky-500/50" />
          <h4 className="text-sky-400 font-bold text-sm mb-4 flex items-center gap-2">
            바로구매 경로
          </h4>

          <div className="text-[10px] text-sky-300/70 mb-4">
            상품상세에서 바로 결제로 진입 &mdash; 단계가 적어 이탈률 감소
          </div>

          {['상품상세', '주문서작성/결제', '주문완료'].map((step, i) => (
            <React.Fragment key={step}>
              <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-3 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-sky-400/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-bold text-sm text-slate-200">{step}</span>
                </div>
              </div>
              {i < 2 && (
                <div className="flex justify-center">
                  <div className="h-4 w-px bg-slate-500/30" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Bottom annotation - shipping policy */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-6 bg-amber-900/15 border border-amber-500/30 rounded-xl p-4"
      >
        <h4 className="text-amber-400 font-bold text-xs mb-2 flex items-center gap-2">
          배송비 정책
        </h4>
        <div className="flex flex-wrap gap-3 text-[11px] text-amber-200/80">
          <span className="bg-amber-900/30 px-3 py-1 rounded-full border border-amber-500/20">
            기본 3,000원
          </span>
          <span className="bg-amber-900/30 px-3 py-1 rounded-full border border-amber-500/20">
            50,000원 이상 무료
          </span>
          <span className="bg-amber-900/30 px-3 py-1 rounded-full border border-amber-500/20">
            도서산간 +5,000원
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   4. ProductDetailInteractionMap
   ════════════════════════════════════════════════════════════════ */

const pdpSections: {
  title: string;
  items: string[];
  border: string;
  badge?: { label: string; variant: 'red' | 'amber' };
  position: string;
}[] = [
  {
    title: '이미지 영역',
    items: ['14개 이미지', '썸네일 전환', '확대보기'],
    border: 'border-sky-500/40',
    position: 'col-span-2 lg:col-span-2',
  },
  {
    title: '상품 정보',
    items: ['가격/할인', '배송비', '마일리지', 'SNS 공유'],
    border: 'border-emerald-500/40',
    position: '',
  },
  {
    title: '옵션/구매',
    items: ['구성 선택 드롭다운', '추가상품', '장바구니/바로구매/네이버페이'],
    border: 'border-amber-500/40',
    badge: { label: '옵션 캐스케이딩', variant: 'red' },
    position: '',
  },
  {
    title: '탭 네비게이션',
    items: ['상품상세정보', '배송안내', '교환/반품', '상품후기', '상품문의'],
    border: 'border-indigo-500/40',
    position: '',
  },
  {
    title: '리뷰 시스템',
    items: ['평점 4.4', '리뷰 6,952건', '키/몸무게/사이즈 필터', '포토 모아보기'],
    border: 'border-purple-500/40',
    badge: { label: '복잡한 필터', variant: 'amber' },
    position: '',
  },
];

export function ProductDetailInteractionMap() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full my-10 p-6 md:p-10 bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden font-sans text-slate-200"
    >
      <SectionTitle>상품 상세 인터랙션 맵</SectionTitle>

      {/* Central node */}
      <div className="flex justify-center mb-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-500/50 rounded-2xl px-8 py-4 shadow-lg shadow-purple-900/20 text-center">
          <span className="font-bold text-purple-200 text-base">상품 상세 페이지</span>
        </div>
      </div>

      {/* Connector lines */}
      <div className="hidden lg:flex justify-center mb-2">
        <div className="h-6 w-px bg-slate-500/30" />
      </div>
      <div className="hidden lg:block h-px w-4/5 mx-auto bg-slate-500/30 mb-2" />

      {/* Top section (images) - full width */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`lg:col-span-2 bg-slate-900/60 ${pdpSections[0].border} border rounded-xl p-4 relative`}
        >
          <div className="hidden lg:block absolute -top-2 left-1/2 -translate-x-1/2 w-px h-2 bg-slate-500/30" />
          <h4 className="text-xs font-bold text-slate-100 mb-2">{pdpSections[0].title}</h4>
          <div className="flex flex-wrap gap-1">
            {pdpSections[0].items.map((item) => (
              <span
                key={item}
                className="text-[10px] bg-slate-800/60 text-slate-400 px-2 py-1 rounded"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Middle sections - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {pdpSections.slice(1, 3).map((section) => (
          <motion.div
            key={section.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className={`bg-slate-900/60 ${section.border} border rounded-xl p-4 relative`}
          >
            <div className="hidden lg:block absolute -top-2 left-1/2 -translate-x-1/2 w-px h-2 bg-slate-500/30" />
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-xs font-bold text-slate-100">{section.title}</h4>
              {section.badge && (
                <Badge label={section.badge.label} variant={section.badge.variant} />
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              {section.items.map((item) => (
                <span
                  key={item}
                  className="text-[10px] bg-slate-800/60 text-slate-400 px-2 py-1 rounded"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom sections - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {pdpSections.slice(3).map((section) => (
          <motion.div
            key={section.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={`bg-slate-900/60 ${section.border} border rounded-xl p-4 relative`}
          >
            <div className="hidden lg:block absolute -top-2 left-1/2 -translate-x-1/2 w-px h-2 bg-slate-500/30" />
            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-xs font-bold text-slate-100">{section.title}</h4>
              {section.badge && (
                <Badge label={section.badge.label} variant={section.badge.variant} />
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              {section.items.map((item) => (
                <span
                  key={item}
                  className="text-[10px] bg-slate-800/60 text-slate-400 px-2 py-1 rounded"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   5. ExternalIntegrationMap
   ════════════════════════════════════════════════════════════════ */

const integrationGroups: {
  title: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  nodes: string[];
}[] = [
  {
    title: '카카오',
    bgClass: 'bg-amber-900/20',
    borderClass: 'border-amber-500/40',
    textClass: 'text-amber-300',
    nodes: ['카카오 선물하기', '카카오 채널(5% 쿠폰)', '카카오톡 상담(해피톡)'],
  },
  {
    title: '네이버',
    bgClass: 'bg-emerald-900/20',
    borderClass: 'border-emerald-500/40',
    textClass: 'text-emerald-300',
    nodes: ['네이버페이 결제', '네이버페이 찜', '네이버 스마트스토어'],
  },
  {
    title: 'SNS',
    bgClass: 'bg-pink-900/20',
    borderClass: 'border-pink-500/40',
    textClass: 'text-pink-300',
    nodes: ['Instagram', 'YouTube', 'Facebook', 'Blog'],
  },
  {
    title: '고객지원',
    bgClass: 'bg-sky-900/20',
    borderClass: 'border-sky-500/40',
    textClass: 'text-sky-300',
    nodes: ['해피톡 채팅', '전화(070-8621-5160)', '이메일(help@dansaek.co)'],
  },
];

export function ExternalIntegrationMap() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full my-10 p-6 md:p-10 bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden font-sans text-slate-200"
    >
      <SectionTitle>외부 서비스 통합 맵</SectionTitle>

      {/* Overall badge */}
      <div className="flex justify-center mb-6">
        <Badge label="10+ 외부 터치포인트" variant="red" />
      </div>

      {/* Hub node */}
      <div className="flex justify-center mb-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-500/50 rounded-2xl px-8 py-4 shadow-lg shadow-purple-900/20 text-center">
          <span className="font-bold text-purple-200 text-base">dansaek.co</span>
        </div>
      </div>

      {/* Radial connectors (simplified vertical line) */}
      <div className="hidden lg:flex justify-center mb-2">
        <div className="h-6 w-px bg-slate-500/30" />
      </div>
      <div className="hidden lg:block h-px w-3/4 mx-auto bg-slate-500/30 mb-4" />

      {/* Spoke groups - 2x2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrationGroups.map((group) => (
          <motion.div
            key={group.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`${group.bgClass} ${group.borderClass} border rounded-xl p-4 relative`}
          >
            {/* Vertical connector tick */}
            <div className="hidden lg:block absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-slate-500/30" />

            <div className="flex items-center justify-between mb-3">
              <h4 className={`text-sm font-bold ${group.textClass}`}>{group.title}</h4>
              <span className="text-[10px] bg-slate-800/60 text-slate-400 px-2 py-0.5 rounded-full border border-slate-600/40">
                {group.nodes.length}개
              </span>
            </div>

            <div className="space-y-1.5">
              {group.nodes.map((node) => (
                <div
                  key={node}
                  className="bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-2 text-[11px] text-slate-300 flex items-center gap-2"
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${group.borderClass.replace('border-', 'bg-').replace('/40', '/60')}`} />
                  {node}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
