const pptxgen = require("pptxgenjs");

// ── 슬라이드 데이터 (원본에서 추출) ─────────────────────────────────────────
const data = {
  docType: "애널리스트 리포트",
  date: "2026. 5. 14.",
  depth: "상세 분석 (섹션별 + 인사이트)",
  source: "Lux Research - Voice_of_Industry_Unmet_needs_in_hea - May 12, 2026 (client confidential).pdf",
  headMsg: "전기 대형트럭 도입의 핵심 장벽은 초기비용보다 그리드 접근성과 운영 통합의 시스템 과제",
  numbers: [
    { label: "독일 내 배전사업자 수", value: "800개 이상" },
    { label: "그리드 연결 허가 소요기간", value: "12~24개월" },
    { label: "물류업체 계약 기간", value: "연단위 (1년 기준)" },
  ],
  insights: [
    {
      title: "비용보다 예측가능성 부재가 실질적 장벽",
      body: "전기트럭 TCO는 특정 조건에서 경쟁력 있으나, 실제 운영에서는 조건 보장 불가능. 배터리 성능저하·잔존가치·충전비용 변동성에 대한 가시성 부족으로 ROI 예측 불가능이 도입 지연의 핵심 원인",
      importance: "high"
    },
    {
      title: "그리드 접근성이 스케일업의 최대 병목",
      body: "독일만 800개 이상 배전사업자 존재, 표준화된 프로세스 부재. 허가까지 12~24개월 소요. 고출력 충전 가능 여부·연결 시점·비용 사전 파악 불가능해 투자계획 수립 곤란",
      importance: "high"
    },
    {
      title: "운영모델 재설계 필수, 디젤 대체 불가",
      body: "전기트럭은 1:1 디젤 대체 불가능. 노선·충전·자산관리 전면 재설계 필요하며, 현재 단거리/거점 중심 운영으로 제한됨. 디젤 대비 유연성 부족으로 수요변동 대응력 저하",
      importance: "normal"
    },
    {
      title: "대형 자본력 보유 사업자 중심 초기 시장 형성",
      body: "리스크 흡수 가능한 대형 운영사가 초기 전기화 주도 전망. 일부 사업자는 'Electric Transport as a Service' 통합 모델 시도 예상. 단, 고정노선 외 확장 시 자본집약도 상승",
      importance: "normal"
    },
  ],
  numbers_table: [
    ["독일 내 배전사업자 수", "800개 이상"],
    ["그리드 연결 허가 소요기간", "12~24개월"],
    ["물류업체 계약 기간", "연단위 (1년 기준)"],
    ["운영 제약 조건", "3~4개 이상 승인기관 협의 필요"],
  ],
  risks: [
    { level: "medium", text: "그리드 연결 지연 및 비용 불확실성으로 충전인프라 투자 지연 → 전기트럭 보급 정체" },
    { level: "high",   text: "물류계약 단기화 지속 시 장기 자산투자 회수 불가능 → 사업성 악화" },
    { level: "medium", text: "배터리 성능저하·잔존가치 예측 실패 시 TCO 악화로 전기화 신뢰도 하락" },
    { level: "medium", text: "유럽 공공충전 정책이 그리드·운영 통합 미해결로 스케일업 한계 노출 가능성" },
  ],
  actions: [
    "전기트럭 도입 시 물류계약 장기화(5년 이상) 및 노선 안정성 확보 전략 수립 필요",
    "충전인프라 구축 전 그리드 연결 가능성·비용·일정 사전 확인 프로세스 정립",
    "배터리 2차전지 기업은 성능저하 예측모델, 잔존가치 보증 등 예측가능성 제고 솔루션 개발 검토",
    "유틸리티와의 사전 협의 및 표준화된 그리드 접근 프로세스 구축 참여 고려",
    "단거리 거점 중심 초기 시장에서 검증 후 장거리·복합노선 확장 로드맵 수립",
  ],
  keywords: "전기 대형트럭, 전기차 충전인프라, 그리드 연결, TCO, 배터리 성능저하, 잔존가치, 물류 운영모델, 유틸리티, 배전사업자",
};

// ── 디자인 상수 ──────────────────────────────────────────────────────────────
const C = {
  navy:    "1B2A4A",
  navyDk:  "0F2238",
  teal:    "1B8A7A",
  tealLt:  "E8F5F3",
  tealMd:  "9FE1CB",
  amber:   "E8A000",
  red:     "C0392B",
  white:   "FFFFFF",
  gray50:  "F8F9FA",
  gray200: "E9ECEF",
  gray400: "ADB5BD",
  gray700: "495057",
  gray900: "212529",
};

// A4: 27.517cm x 19.05cm → inches (1cm = 0.3937in)
const W = 27.517 * 0.3937; // 10.834"
const H = 19.05  * 0.3937; // 7.5"

// 폰트
const KR = "맑은 고딕";
const EN = "Arial";

// 폰트 사이즈
const SZ = { title: 22, head: 16, body: 13, detail: 11 };

// 자간 (charSpacing: -0.7 = 0.7pt 좁게)
const SP = -0.7;

// 글자 윤곽선 (outline)
const outline = { color: "000000", size: 0.25, transparency: 90 };

// 헤더 바 높이 (2.26cm → inch)
const HDR_H = 2.26 * 0.3937; // 0.89"

// 헬퍼: 텍스트 옵션 공통
function t(fontSize, bold = false, color = C.gray900, extra = {}) {
  return { fontFace: KR, fontSize, bold, color, charSpacing: SP, outline, ...extra };
}
function te(fontSize, bold = false, color = C.gray900, extra = {}) {
  return { fontFace: EN, fontSize, bold, color, charSpacing: SP, outline, ...extra };
}

// 글자수 제한 헬퍼
function truncate(str, max) {
  if (!str) return "";
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

// 푸터 공통
function addFooter(slide, page, total) {
  slide.addText("Battery Intel | Powered by Claude API | 내부 배포용", {
    x: 0.3, y: H - 0.28, w: W * 0.7, h: 0.22,
    ...t(SZ.detail, false, C.gray400), align: "left", margin: 0,
  });
  slide.addText(`${page} / ${total}`, {
    x: W - 0.7, y: H - 0.28, w: 0.5, h: 0.22,
    ...te(SZ.detail, false, C.gray400), align: "right", margin: 0,
  });
}

// 섹션 헤더 바 (업그레이드: 2줄 태그 + 포인트 라인)
function addSectionHeader(slide, sectionNum, sectionName, title) {
  slide.addShape("rect", { x: 0, y: 0, w: W, h: HDR_H, fill: { color: C.navy }, line: { color: C.navy } });
  // 태그 박스 (번호 + 이름 2줄)
  const tagW = 1.4, tagH = HDR_H * 0.82, tagY = (HDR_H - tagH) / 2;
  slide.addShape("rect", { x: 0.22, y: tagY, w: tagW, h: tagH,
    fill: { color: C.teal }, line: { color: C.teal } });
  slide.addText(sectionNum, {
    x: 0.22, y: tagY, w: tagW, h: tagH * 0.42,
    ...te(9, true, C.tealLt), align: "center", valign: "middle", margin: 0,
  });
  slide.addText(sectionName, {
    x: 0.22, y: tagY + tagH * 0.42, w: tagW, h: tagH * 0.58,
    ...t(11, true, C.white), align: "center", valign: "middle", margin: 0,
  });
  // 제목
  slide.addText(title, {
    x: 0.22 + tagW + 0.18, y: 0, w: W - tagW - 0.7, h: HDR_H,
    ...t(22, true, C.white), valign: "middle", margin: 0,
  });
}

// ── PPT 생성 ─────────────────────────────────────────────────────────────────
async function main() {
  const pres = new pptxgen();
  pres.defineLayout({ name: "A4_LAND", width: W, height: H });
  pres.layout = "A4_LAND";

  const TOTAL = 5;

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 1: 표지
  // ══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };

    // 왼쪽 사이드바
    s.addShape("rect", { x: 0, y: 0, w: 2.6, h: H, fill: { color: C.navy }, line: { color: C.navy } });
    s.addShape("rect", { x: 0, y: H * 0.72, w: 2.6, h: H * 0.28, fill: { color: C.navyDk }, line: { color: C.navyDk } });
    s.addShape("rect", { x: 2.55, y: 0, w: 0.08, h: H, fill: { color: C.teal }, line: { color: C.teal } });

    // 로고
    s.addText("BATTERY", { x: 0.18, y: 0.55, w: 2.2, h: 0.42, ...te(20, true, C.white), align: "left", margin: 0 });
    s.addText("INTEL",   { x: 0.18, y: 0.94, w: 2.2, h: 0.42, ...te(20, true, C.teal),  align: "left", margin: 0 });
    s.addShape("line",   { x: 0.18, y: 1.4,  w: 2.1, h: 0, line: { color: C.teal, width: 1 } });
    s.addText("전략기획 분석 도구 포털", { x: 0.18, y: 1.5, w: 2.2, h: 0.35,
      ...t(SZ.detail, false, C.gray900), align: "left", margin: 0 });
    // 사이드바 하단 버전 정보
    s.addShape("line", { x: 0.18, y: H * 0.73, w: 2.1, h: 0, line: { color: C.teal, width: 0.5 } });
    s.addText("Battery Intel v2.0", { x: 0.18, y: H * 0.74, w: 2.2, h: 0.3,
      ...te(SZ.detail - 1, false, "8BAFD4"), align: "left", margin: 0 });
    s.addText(data.date, { x: 0.18, y: H * 0.79, w: 2.2, h: 0.3,
      ...te(SZ.detail - 1, false, "5a7a9a"), align: "left", margin: 0 });

    // 오른쪽 콘텐츠 영역
    const cx = 2.9, cw = W - cx - 0.35;

    // 문서 유형 뱃지 (왼쪽 포인트 바 추가)
    s.addShape("rect", { x: cx, y: 0.65, w: 1.6, h: 0.32,
      fill: { color: C.tealLt }, line: { color: C.teal, width: 0.5 } });
    s.addShape("rect", { x: cx, y: 0.65, w: 0.05, h: 0.32,
      fill: { color: C.teal }, line: { color: C.teal } });
    s.addText("PDF 분석 보고서", { x: cx + 0.1, y: 0.65, w: 1.5, h: 0.32,
      ...t(SZ.detail, true, C.teal), align: "left", valign: "middle", margin: 0 });

    // 헤드 메시지 (최대 55자)
    s.addText(truncate(data.headMsg, 55), {
      x: cx, y: 1.1, w: cw, h: 1.2,
      ...t(24, true, C.navy), align: "left", valign: "top", margin: 0, wrap: true,
    });

    // 구분선
    s.addShape("line", { x: cx, y: 2.55, w: cw, h: 0, line: { color: C.gray200, width: 0.5 } });

    // 원문 정보
    s.addText(`원문 : ${truncate(data.source, 70)}`, {
      x: cx, y: 2.7, w: cw, h: 0.28,
      ...te(SZ.detail - 1, false, C.gray900), align: "left", margin: 0,
    });

    // 구분선
    s.addShape("line", { x: cx, y: 3.05, w: cw, h: 0, line: { color: C.gray200, width: 0.5 } });

    // 메타 카드 2개 (좌: 날짜/유형 | 우: 깊이/원문)
    const cardW = (cw - 0.15) / 2;
    const metaCards = [
      [["분석 일자", data.date], ["문서 유형", data.docType]],
      [["분석 깊이", data.depth], ["원문", truncate(data.source, 28)]],
    ];
    metaCards.forEach((rows, ci) => {
      const mcx = cx + ci * (cardW + 0.15);
      s.addShape("rect", { x: mcx, y: 3.2, w: cardW, h: 0.72,
        fill: { color: C.gray50 }, line: { color: C.gray200, width: 0.5 } });
      s.addShape("rect", { x: mcx, y: 3.2, w: 0.05, h: 0.72,
        fill: { color: C.teal }, line: { color: C.teal } });
      rows.forEach(([label, value], ri) => {
        const ry = 3.24 + ri * 0.34;
        s.addText(label, { x: mcx + 0.12, y: ry, w: cardW - 0.14, h: 0.16,
          ...t(SZ.detail - 2, false, C.gray700), align: "left", margin: 0 });
        s.addText(value, { x: mcx + 0.12, y: ry + 0.16, w: cardW - 0.14, h: 0.2,
          ...t(SZ.detail, true, C.navy), align: "left", margin: 0 });
      });
    });

    // 핵심 메시지 미리보기 박스
    s.addShape("rect", { x: cx, y: 4.06, w: cw, h: 0.78,
      fill: { color: "F0FAF8" }, line: { color: C.teal, width: 0.5 } });
    s.addShape("rect", { x: cx, y: 4.06, w: 0.05, h: 0.78,
      fill: { color: C.teal }, line: { color: C.teal } });
    s.addText("핵심 메시지", { x: cx + 0.12, y: 4.10, w: cw - 0.14, h: 0.2,
      ...t(SZ.detail - 1, true, C.teal), align: "left", margin: 0 });
    s.addText(truncate(data.headMsg, 80), { x: cx + 0.12, y: 4.30, w: cw - 0.14, h: 0.48,
      ...t(SZ.detail, false, C.navy), align: "left", valign: "top", margin: 0, wrap: true });

    // Powered by (teal 채움)
    s.addShape("rect", { x: cx, y: H - 0.62, w: 2.1, h: 0.34,
      fill: { color: C.teal }, line: { color: C.teal } });
    s.addText("Powered by Claude API", { x: cx, y: H - 0.62, w: 2.1, h: 0.34,
      ...te(SZ.detail, false, C.white), align: "center", valign: "middle", margin: 0 });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 2: 핵심 요약
  // ══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    addSectionHeader(s, "01", "핵심요약", "Executive Summary");

    const mx = 0.3, mw = W - 0.6;
    const S2Y = HDR_H + 0.12;

    // 헤드 메시지 박스 (최대 60자)
    s.addShape("rect", { x: mx, y: S2Y, w: mw, h: 0.72,
      fill: { color: C.tealLt }, line: { color: C.teal, width: 0.5 } });
    s.addText(truncate(data.headMsg, 60), {
      x: mx + 0.2, y: S2Y, w: mw - 0.4, h: 0.72,
      ...t(SZ.head, true, C.navy), valign: "middle", margin: 0, wrap: true,
    });

    // 수치 카드 3개 (좌우 대칭)
    const numY = S2Y + 0.84, numH = 0.95;
    const numW = (mw - 0.24) / 3;
    data.numbers.forEach((n, i) => {
      const nx = mx + i * (numW + 0.12);
      // 헤더
      s.addShape("rect", { x: nx, y: numY, w: numW, h: 0.32, fill: { color: C.navy }, line: { color: C.navy } });
      s.addText(truncate(n.label, 16), { x: nx, y: numY, w: numW, h: 0.32,
        ...t(SZ.detail, false, C.tealMd), align: "center", valign: "middle", margin: 0 });
      // 값
      s.addShape("rect", { x: nx, y: numY + 0.32, w: numW, h: numH - 0.32,
        fill: { color: C.white }, line: { color: C.gray200, width: 0.5 } });
      s.addText(truncate(n.value, 14), { x: nx, y: numY + 0.32, w: numW, h: numH - 0.32,
        ...t(SZ.head, true, C.teal), align: "center", valign: "middle", margin: 0 });
    });

    // 인사이트 카드 3개 (슬라이드2는 상위 3개)
    const cardY = S2Y + 1.74, cardH = (H - cardY - 0.38) / 3;
    data.insights.slice(0, 3).forEach((ins, i) => {
      const cy = cardY + i * (cardH + 0.07);
      const isHigh = ins.importance === "high";

      // 번호 박스
      s.addShape("rect", { x: mx, y: cy, w: 0.36, h: cardH,
        fill: { color: isHigh ? C.teal : C.navy }, line: { color: isHigh ? C.teal : C.navy } });
      s.addText(`${i + 1}`, { x: mx, y: cy, w: 0.36, h: cardH,
        ...te(SZ.body, true, C.white), align: "center", valign: "middle", margin: 0 });

      // 카드 배경
      s.addShape("rect", { x: mx + 0.36, y: cy, w: mw - 0.36, h: cardH,
        fill: { color: isHigh ? "F0FAF8" : C.gray50 },
        line: { color: isHigh ? C.teal : C.gray200, width: 0.5 } });

      // 제목 (최대 30자)
      s.addText(truncate(ins.title, 30), {
        x: mx + 0.48, y: cy + 0.06, w: mw - 0.6, h: 0.26,
        ...t(SZ.body, true, C.gray900), valign: "top", margin: 0,
      });
      // 바디 (최대 80자)
      s.addText(truncate(ins.body, 80), {
        x: mx + 0.48, y: cy + 0.32, w: mw - 0.6, h: cardH - 0.38,
        ...t(SZ.detail, false, C.gray700), valign: "top", margin: 0, wrap: true,
      });
    });

    addFooter(s, 2, TOTAL);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 3: 핵심 인사이트 전체
  // ══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    addSectionHeader(s, "02", "인사이트", "핵심 인사이트");

    const mx = 0.3, mw = W - 0.6;
    const startY = HDR_H + 0.12;
    const cardH = (H - startY - 0.38) / data.insights.length - 0.07;

    data.insights.forEach((ins, i) => {
      const cy = startY + i * (cardH + 0.07);
      const isHigh = ins.importance === "high";

      s.addShape("rect", { x: mx, y: cy, w: 0.42, h: cardH,
        fill: { color: isHigh ? C.teal : C.navy }, line: { color: isHigh ? C.teal : C.navy } });
      s.addText(`${i + 1}`, { x: mx, y: cy, w: 0.42, h: cardH,
        ...te(SZ.head, true, C.white), align: "center", valign: "middle", margin: 0 });

      s.addShape("rect", { x: mx + 0.42, y: cy, w: mw - 0.42, h: cardH,
        fill: { color: isHigh ? "F0FAF8" : C.gray50 },
        line: { color: isHigh ? C.teal : C.gray200, width: 0.5 } });

      if (isHigh) {
        s.addShape("rect", { x: W - 0.75, y: cy + 0.08, w: 0.52, h: 0.22,
          fill: { color: C.tealLt }, line: { color: C.teal, width: 0.5 } });
        s.addText("핵심", { x: W - 0.75, y: cy + 0.08, w: 0.52, h: 0.22,
          ...t(SZ.detail, false, C.teal), align: "center", valign: "middle", margin: 0 });
      }

      s.addText(ins.title, {
        x: mx + 0.55, y: cy + 0.07, w: mw - 1.2, h: 0.3,
        ...t(SZ.body, true, C.gray900), valign: "middle", margin: 0,
      });
      s.addText(truncate(ins.body, 120), {
        x: mx + 0.55, y: cy + 0.37, w: mw - 0.7, h: cardH - 0.44,
        ...t(SZ.detail, false, C.gray700), valign: "top", margin: 0, wrap: true,
      });
    });

    addFooter(s, 3, TOTAL);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 4: 주요 수치 + 리스크
  // ══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    addSectionHeader(s, "03", "데이터·리스크", "주요 수치 및 리스크 요인");

    const startY = HDR_H + 0.12;
    const contentH = H - startY - 0.38;
    const halfW = (W - 0.9) / 2;
    const lx = 0.3, rx = lx + halfW + 0.3;

    // ── 왼쪽: 수치 표 ──
    s.addShape("rect", { x: lx, y: startY, w: halfW, h: 0.36,
      fill: { color: C.navy }, line: { color: C.navy } });
    s.addText([
      { text: "항목", options: { ...t(SZ.detail, true, C.white) } },
    ], { x: lx, y: startY, w: halfW * 0.5, h: 0.36, align: "center", valign: "middle", margin: 0 });
    s.addText([
      { text: "수치 / 내용", options: { ...t(SZ.detail, true, C.white) } },
    ], { x: lx + halfW * 0.5, y: startY, w: halfW * 0.5, h: 0.36, align: "center", valign: "middle", margin: 0 });

    const rowH = (contentH - 0.36) / data.numbers_table.length;
    data.numbers_table.forEach(([label, value], i) => {
      const ry = startY + 0.36 + i * rowH;
      const bg = i % 2 === 0 ? C.white : C.gray50;
      s.addShape("rect", { x: lx, y: ry, w: halfW, h: rowH,
        fill: { color: bg }, line: { color: C.gray200, width: 0.5 } });
      s.addShape("line", { x: lx + halfW * 0.5, y: ry, w: 0, h: rowH,
        line: { color: C.gray200, width: 0.5 } });
      s.addText(truncate(label, 18), { x: lx + 0.1, y: ry, w: halfW * 0.5 - 0.1, h: rowH,
        ...t(SZ.detail, true, C.teal), valign: "middle", margin: 0 });
      s.addText(truncate(value, 18), { x: lx + halfW * 0.5 + 0.1, y: ry, w: halfW * 0.5 - 0.1, h: rowH,
        ...t(SZ.detail, true, C.navy), valign: "middle", margin: 0 });
    });

    // ── 오른쪽: 리스크 ──
    s.addShape("rect", { x: rx, y: startY, w: halfW, h: 0.36,
      fill: { color: C.navy }, line: { color: C.navy } });
    s.addText("리스크 요인", { x: rx + 0.1, y: startY, w: halfW - 0.1, h: 0.36,
      ...t(SZ.detail, true, C.white), valign: "middle", margin: 0 });

    const riskH = (contentH - 0.36) / data.risks.length;
    const riskColor = { high: C.red, medium: C.amber, low: "059669" };
    const riskLabel = { high: "높음", medium: "중간", low: "낮음" };

    data.risks.forEach((risk, i) => {
      const ry = startY + 0.36 + i * riskH;
      const bg = i % 2 === 0 ? C.white : C.gray50;
      s.addShape("rect", { x: rx, y: ry, w: halfW, h: riskH,
        fill: { color: bg }, line: { color: C.gray200, width: 0.5 } });

      const pillW = 0.52, pillH = 0.28;
      const pillY = ry + (riskH - pillH) / 2;
      s.addShape("rect", { x: rx + 0.1, y: pillY, w: pillW, h: pillH,
        fill: { color: riskColor[risk.level] || C.amber }, line: { color: riskColor[risk.level] || C.amber } });
      s.addText(riskLabel[risk.level] || risk.level, { x: rx + 0.1, y: pillY, w: pillW, h: pillH,
        ...t(SZ.detail, true, C.white), align: "center", valign: "middle", margin: 0 });

      s.addText(truncate(risk.text, 55), {
        x: rx + 0.72, y: ry + 0.06, w: halfW - 0.82, h: riskH - 0.12,
        ...t(SZ.detail, false, C.gray700), valign: "middle", margin: 0, wrap: true,
      });
    });

    addFooter(s, 4, TOTAL);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SLIDE 5: 액션 아이템
  // ══════════════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    addSectionHeader(s, "04", "액션아이템", "시사점 및 액션 아이템");

    const mx = 0.3, mw = W - 0.6;
    const startY = HDR_H + 0.12;
    // 액션 5개 + 키워드 박스 공간 배분
    const kwH = 0.75;
    const actionAreaH = H - startY - kwH - 0.52;
    const cardH = actionAreaH / data.actions.length - 0.08;

    data.actions.forEach((action, i) => {
      const cy = startY + i * (cardH + 0.08);
      s.addShape("rect", { x: mx, y: cy, w: 0.42, h: cardH,
        fill: { color: C.teal }, line: { color: C.teal } });
      s.addText("✓", { x: mx, y: cy, w: 0.42, h: cardH,
        ...te(SZ.body, true, C.white), align: "center", valign: "middle", margin: 0 });
      s.addShape("rect", { x: mx + 0.42, y: cy, w: mw - 0.42, h: cardH,
        fill: { color: C.gray50 }, line: { color: C.gray200, width: 0.5 } });
      s.addText(truncate(action, 65), {
        x: mx + 0.55, y: cy, w: mw - 0.65, h: cardH,
        ...t(SZ.body, false, C.gray900), valign: "middle", margin: 0, wrap: true,
      });
    });

    // 키워드 박스
    const kwY = H - kwH - 0.32;
    s.addShape("rect", { x: mx, y: kwY, w: mw, h: kwH,
      fill: { color: C.tealLt }, line: { color: C.teal, width: 0.5 } });
    s.addText("🔍 키워드 관련 내용", { x: mx + 0.15, y: kwY + 0.06, w: mw - 0.2, h: 0.26,
      ...t(SZ.detail, true, C.teal), valign: "top", margin: 0 });
    s.addText(truncate(data.keywords, 120), { x: mx + 0.15, y: kwY + 0.32, w: mw - 0.2, h: kwH - 0.38,
      ...t(SZ.detail, false, C.gray700), valign: "top", margin: 0, wrap: true });

    addFooter(s, 5, TOTAL);
  }

  await pres.writeFile({ fileName: "/home/claude/output_v2.pptx" });
  console.log("Done: output_v2.pptx");
}

main().catch(console.error);
