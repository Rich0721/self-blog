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
