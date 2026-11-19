# Homepage Implementation Plan

## I. Requirement Information

Feature Name: `Features/Document/01-Homepage.md`  
Scenario: 無獨立情境文件  
Requirement Type: New Requirement  
Requirement Date: 2026-11-19

## II. Requirement Summary

建立個人部落格首頁，顯示網站 Header、關於我自我介紹及依資料自動產生的專長技能卡片。Header 提供首頁與學習筆記頁面導覽，當前頁面項目不可點擊並有底線，GitHub 連結另開新分頁。需求文件所列 NotePage 尚無頁面內容，因此本次提供可到達的基本佔位頁。

## III. Requirement List

| Task ID | Component Name | Plan Type | Plan Date | Implementation Status | Development Date | Code Review Date |
| --- | --- | --- | --- | --- | --- | --- |
| TASK-001 | SiteHeader and page navigation | ADD | 2026-11-19 | REVIEW FIX | 2026-11-19 | 2026-11-19 |
| TASK-002 | HomePage introduction and skills | ADD | 2026-11-19 | DONE | 2026-11-19 | 2026-11-19 |
| TASK-003 | NotePage destination placeholder | ADD | 2026-11-19 | REVIEW FIX | 2026-11-19 | 2026-11-19 |
| TASK-004 | Unit test infrastructure | ADD | 2026-11-19 | DONE | 2026-11-19 | 2026-11-19 |
| TASK-005 | Introduction and SkillCard unit tests | ADD | 2026-11-19 | DONE | 2026-11-19 | 2026-11-19 |
| TASK-006 | Header unit tests and App integration tests | ADD | 2026-11-19 | DONE | 2026-11-19 | 2026-11-19 |
| TASK-007 | HomePage and NotePage tests | ADD | 2026-11-19 | REVIEW FIX | 2026-11-19 | 2026-11-19 |
| TASK-008 | Image context menu restriction | ADD | 2026-11-19 | DONE | 2026-11-19 | 2026-11-19 |

## IV. Technical Stack

- Language: TypeScript
- Framework: React 18
- Build: Vite
- Routing: Native History API with `popstate`; no added dependency
- Assets: Existing files under `src/asserts`
- Backend/API/Database: None

## V. Implementation Steps

### TASK-001 SiteHeader and page navigation

```text
File: src/components/SiteHeader/SiteHeader.tsx, SiteHeader.css; src/App.tsx
Target: Shared header and route selection
Reuse: Existing React application entry point
Impact: Homepage and NotePage share navigation state
Current Behavior: App displays a static starter screen
Expected Behavior: Header shows Rich's Blog, 關於我, 學習筆記, and GitHub. Current page link is underlined and non-interactive. NotePage navigation updates URL to /notes and browser back/forward remains functional. GitHub opens in a new tab with safe rel attributes and existing GitHub icon.
Implementation: Keep route state in App, initialize from pathname, listen for popstate, and use links for navigation. Do not add a routing dependency.
Error Handling: Unknown path displays the homepage as fallback.
Testing: Build/type-check and manually verify links, current-page semantics, browser navigation, and external link attributes.
```

### TASK-002 HomePage introduction and skills

```text
File: src/pages/HomePage/HomePage.tsx, HomePage.css; src/components/Introduction/; src/components/SkillCard/; src/types/homepage.ts; src/asserts assets
Target: Data-driven profile and skills sections
Reuse: src/asserts/images/myself.jpg and existing skill icons
Current Behavior: No homepage content
Expected Behavior: Introduction component receives name, description, catchphrase, and avatar data. Render all skill cards by mapping a typed skill collection, including icon, name, tags, and optional description. Layout responds to narrow screens.
Implementation: Keep content data separate from presentational components. Use semantic headings, meaningful image alt text, and stable skill names as keys.
Error Handling: Optional skill description may be omitted without breaking the card.
Testing: Build/type-check and manually verify all five entries, text, images, and responsive layout.
```

### TASK-003 NotePage destination placeholder

```text
File: src/pages/NotePage/NotePage.tsx, NotePage.css
Target: Basic destination for the 学習筆記 navigation
Reuse: Shared SiteHeader from TASK-001
Current Behavior: No NotePage
Expected Behavior: /notes renders a minimal page titled 學習筆記, with that navigation item active.
Implementation: Provide a semantic placeholder without inventing note content or additional business behavior.
Testing: Build/type-check and manually verify direct navigation to /notes and back/forward behavior.
```

## VI. Review Status

- [x] Implementation complete
- [ ] Code review passed (production build passed; TASK-001 and TASK-003 browser verification pending)

## VII. Revised System Design and Test Plan — 2026-11-19

### TASK-008 Confirmed image interaction change

PM confirmation: 2026-11-19, acceptance is suppressing the context menu on website images. This does not promise complete download prevention.

Files: src/App.tsx, src/App.test.tsx. Reuse the App root and React contextmenu event delegation: preventDefault only when the event target is an HTMLImageElement. Apply across HomePage and NotePage through the shared App wrapper; preserve context menus for text and links outside images. No dependency or asset changes.

Tests: IMAGE-01 dispatch cancelable contextmenu on every rendered homepage image and assert dispatch reports cancellation. IMAGE-02 dispatch on non-image content and assert it is not canceled. Keep real page components. Run npm test and npm run build. PG sets DEVELOPED DONE after successful checks; reviewer resolves after reviewing event scope and regression results.

Requirement Change: 最新 common-instructions.md 明確要求 React / TypeScript Unit Test。原計畫缺少可執行測試，新增 TASK-004 至 TASK-007；原實作不因新增測試而視為已通過驗收。

### Existing System and Design

- App 擁有 pathname 對應的頁面狀態，SiteHeader 接收 currentPage 與 onNavigate；HomePage 組合 Introduction 和 SkillCard，使用型別化資料產生卡片。
- 沿用 React 18、TypeScript、Vite、既有元件與 src/asserts 資產。無 API、資料庫或後端變更。
- IntroductionData 的 name、description、catchphrase、avatar 必填；Skill 的 icon、name、tag 必填，description 可省略。技能數量由集合長度決定。
- 僅在需要測試資料變動時，允許新增 SkillList 元件，接收 readonly Skill[] 並 map 為 SkillCard。HomePage 使用同一元件；不為測試匯出私有函式。
- 不新增業務驗證、錯誤訊息或空資料提示。空技能集合只呈現零張卡片。
- 原計畫的 /notes 是既有技術選擇，NotePage 內容仍僅為佔位。Figma 視覺一致性尚未驗證，不能以 DOM 測試宣稱已符合設計圖。

### TASK-004 Unit test infrastructure

File: package.json, package-lock.json, jest.config.cjs, jest.setup.ts, tsconfig.test.json, tests/mocks/fileMock.cjs, tests/mocks/styleMock.cjs

選用 Jest、jest-environment-jsdom、ts-jest、@types/jest、@testing-library/react、@testing-library/jest-dom、@testing-library/user-event。共用規範以 Jest 為例，本方案採用它並維持 Vite 正式建置。PG 安裝時核對 Jest / ts-jest / TypeScript 相容版本並鎖定於 lockfile。

設定 jsdom、TSX transform、CSS 與圖片匯入映射，以及 jest-dom setup。測試檔與元件共置，測試型別設定與正式建置分離，避免 Jest 型別污染正式程式。新增 test（jest --runInBand）、test:watch、test:coverage 指令。不得以 passWithNoTests 掩蓋未發現案例，不自行設定覆蓋率百分比門檻。

驗收：npm test 能發現下列案例，輸出實際執行數；npm run build 仍通過。

### TASK-005 Introduction and SkillCard unit tests

File: src/components/Introduction/Introduction.test.tsx, src/components/SkillCard/SkillCard.test.tsx

| Case ID | Requirement | Given / When | Expected |
| --- | --- | --- | --- |
| INTRO-01 | 2-2-1 | 傳入完整介紹 fixture | heading 顯示指定 name，description 與 catchphrase 正確，圖片 src 和可存取名稱有效 |
| INTRO-02 | 2-2-1 資料維護 | rerender 替換所有介紹欄位 | 新內容與圖片更新，舊文字不殘留 |
| SKILL-01 | 2-3-1 | 傳入完整技能資料 | 名稱、icon src、所有 tags 與 description 正確 |
| SKILL-02 | description 可選 | 省略 description | 名稱與 tags 正常，沒有描述段落 |
| SKILL-03 | tag List | 傳入零個、一個、多個 tags | 對應 listitem 數量及文字正確，不發明空資料提示 |

使用本地 fixture，不發出網路請求；圖片以 module mapper 取得可辨識路徑，不用所有圖片都相同的固定值掩蓋錯誤匯入。

### TASK-006 Header unit tests and App integration tests

File: src/components/SiteHeader/SiteHeader.test.tsx, src/App.test.tsx

| Case ID | Requirement | Given / When | Expected |
| --- | --- | --- | --- |
| HEADER-01 | 2-1-1 | currentPage=home | Rich's Blog 可見，關於我有 aria-current=page 且不是可點擊連結，學習筆記為 /notes 連結 |
| HEADER-02 | 2-1-1 | currentPage=notes | 學習筆記為當前且不可點擊，關於我為首頁連結 |
| HEADER-03 | 2-1-1 | 點擊非當前導覽 | onNavigate 收到正確頁面且只一次 |
| HEADER-04 | GitHub | 查詢 GitHub 連結 | href 精確等於需求 URL，target=_blank，rel 含 noopener noreferrer，使用指定 icon |
| APP-01 | 頁面切換 | 從 / render 真實 App，點學習筆記再點關於我 | URL、main heading、當前導覽依序更新 |
| APP-02 | /notes 初始化 | render 前設定 history 為 /notes | NotePage 與當前導覽正確 |
| APP-03 | history 同步 | 設定 history 並 dispatch popstate | 顯示的頁面與當前導覽同步；不以此宣稱真實瀏覽器 back/forward 已通過 |

Header 單元測試以 callback spy 控制父層邊界；App 整合測試保留真實子元件。僅替換 jsdom 未實作的 scrollTo，案例後還原 URL、mock 與 DOM。使用 userEvent 並等待操作完成，不用固定 sleep。

### TASK-007 HomePage and NotePage tests

File: src/pages/HomePage/HomePage.test.tsx, src/pages/NotePage/NotePage.test.tsx; 如新增 SkillList，另建 src/components/SkillList/SkillList.tsx 與 SkillList.test.tsx

| Case ID | Requirement | Given / When | Expected |
| --- | --- | --- | --- |
| HOME-01 | 2-2、2-3 | render 真實 HomePage | 需求指定介紹文字及五個技能名稱、各自 tags / description 正確；在各 article 內斷言避免跨卡片誤判 |
| LIST-01 | 技能數量變動 | SkillList 傳入 0、1、5、6 筆可辨識 fixture | article 數量與名稱對應輸入；rerender 刪除項目後舊卡片消失 |
| NOTE-01 | 既有目的頁 | render NotePage | 學習筆記主標題與佔位內容可見 |

預期值獨立來自需求或 fixture，不從正式資料常數反推答案。不採大型 snapshot、私有方法斷言或純 className 斷言代替行為驗證。

### Browser Acceptance and Limits

瀏覽器檢查仍需：直接開啟及重新整理 /notes、實際上一頁/下一頁、當前項目底線、GitHub 新分頁，以及窄螢幕無溢位、圖片載入與 Figma 視覺比對。jsdom 不驗證 CSS 排版、真實圖片解碼或部署主機 SPA fallback。部署環境未指定，僅可報告實際驗證的本地環境。

### PG Handoff

工作類型：PLAN_UPDATE。依序執行 TASK-004 → TASK-005 → TASK-006 → TASK-007，先建立有效測試，再做必要的最小調整。只調整測試工具與本計畫授權的測試接縫；不更改需求文件、文案或新增筆記功能。

完成時提交各 Case ID、實際指令、通過/失敗/未執行與原因；測試與 build 通過後將新增任務設為 DEVELOPED DONE，交 Code Review。TASK-001 / TASK-003 僅在原 OPEN 驗證項目完成後交重新審查，不直接設為 DONE。目前新增任務皆尚未執行。
