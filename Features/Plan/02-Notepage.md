# NotePage Implementation Plan

## I. Requirement Information

- Feature Name： [02-Notepage.md](../Document/02-Notepage.md)
- Requirement Type：New Requirement
- Plan Date：2026-11-20
- Scenario：需求文件第 2-1-1、2-2-1 節
- Design Reference： [NotePage](https://www.figma.com/design/3LXxmVBy76aR39EqOrNGdY/self-website?node-id=38-28)、[Note Component](https://www.figma.com/design/3LXxmVBy76aR39EqOrNGdY/self-website?node-id=42-35)
- Plan Status：設計自審完成，可依 Automatic 流程交付 Programmer Agent。

## II. Requirement Summary

擴充現有 `/notes` 佔位頁，從可隨程式部署的 TypeScript 筆記清單產生卡片。卡片顯示分類圖片、標題、標籤、摘要，整張可操作並在新分頁開啟對應 Notion 連結。頁面從同一搜尋框即時比對標題、標籤與分類，查詢變更後回到第 1 頁。分頁以每頁 20 筆為上限，桌面依參考圖排成 4 欄、最多 5 列，並顯示當前頁與總頁數。首批正式資料使用空清單，後續由開發者填入。

初始首頁計畫以佔位頁提供導覽目的地。此次新增筆記資料與列表行為，沿用 `App` 的 pathname、`popstate` 與既有 `SiteHeader`。Figma 頁面參考圖已確認包含單一搜尋框、4 欄 × 5 列及上一頁、頁碼、下一頁。卡片參考圖的圖示、文字均為視覺例示，需求文件定義的分類圖片對照表才是初始資產依據。

## III. Requirement List

| Task ID | Component Name | Plan Type | Plan Date | Implementation Status | Development Date | Code Review Date |
| --- | --- | --- | --- | --- | --- | --- |
| TASK-001 | Note 資料型別及清單 | ADD | 2026-11-20 | DONE | 2026-11-20 | 2026-11-20 |
| TASK-002 | Note 卡片 | ADD | 2026-11-20 | DONE | 2026-11-20 | 2026-11-20 |
| TASK-003 | NotePage 搜尋、分類及分頁 | MODIFY | 2026-11-20 | DONE | 2026-11-20 | 2026-11-20 |

## IV. Technical Stack

- React 18、TypeScript 5.6、Vite 5、CSS。沿用現有 Jest、React Testing Library、user-event。
- 既有路由採 History API。資料隨前端建置，Notion 由瀏覽器連結開啟。現有架構可支援已確認需求，無 API、資料庫、套件、部署配置或資料遷移變更。
- 需求及既有程式使用 `src/asserts/icons`。資料夾規範的圖例為 `src/assets`，本功能會引用前者已存在的圖片路徑。已確認三張圖片均位於該路徑，其中 Python 與 TypeScript 圖片目前是工作區檔案。
- 共用指令引用的 React 與 TypeScript code standards 檔案未在 `instructions/` 找到。設計沿用現有 TSX、型別及樣式組織，測試策略依專案 unit-test 技能。

## V. Implementation Steps

### TASK-001 Note 資料型別及清單

- 路徑及對象：新增 `src/types/note.ts` 匯出 `Note`，以及 `src/pages/NotePage/notes.ts` 匯出唯讀 `Note` 清單。頁面專用資料與頁面同目錄。
- 目前行為：佔位頁沒有筆記資料。
- 預期行為：接受需求中的 `categoryImage`、`title`、`hashTags`、`summary`、`link` 五個欄位及原始型別。開發者只需編輯清單即可新增、修改或移除筆記，變更隨下一次建置部署生效。
- 實作：沿用首頁型別化集合驅動 UI 的方式，列表依資料順序顯示。正式清單初始值為空陣列，功能案例使用測試 fixture。
- 錯誤處理：TypeScript 檢查必要欄位與型別，新增資料時檢查分類對照及可用的 Notion 連結。外部連結的可閱讀性以實際瀏覽器驗收。
- 驗證：正式建置通過型別檢查。頁面測試依可控清單確認增刪資料時顯示的卡片跟著更新。

### TASK-002 Note 卡片

- 路徑及對象：新增 `src/components/Note/Note.tsx`、`Note.css`、`Note.test.tsx`，卡片接收一筆 `Note`。
- 目前行為：專案已有 `SkillCard` 示範型別化內容、圖片與標籤呈現。
- 預期行為：按照卡片參考圖呈現圖示、標題、標籤和摘要。以涵蓋整張卡片的原生連結接收點擊及鍵盤焦點，將 `href` 設為資料的 `link`，以 `target="_blank"` 和 `rel="noopener noreferrer"` 開啟。用標題標示連結名稱。
- 實作：在元件內維護靜態匯入對照，由 `typescript`、`python`、`agent` 依序引用 `typescript.png`、`python.png`、`software-agent.png`。後續新增分類時擴充同一張對照表。卡片項目應使用同頁範圍內穩定且唯一的資料鍵。
- 錯誤處理：對照查無圖示時，避免產生破裂圖片，保留卡片內容及連結。此為防止內容維護失誤影響瀏覽的技術處理。
- 驗證：檢查各分類映射結果不同、內容與輸入一致，卡片只有一個連結且覆蓋內容，連結目的地、新分頁屬性與鍵盤操作符合要求。測試連結使用 fixture，瀏覽器驗收使用 PM 確認的實際連結。

### TASK-003 NotePage 搜尋、分類及分頁

- 路徑及對象：更新 `src/pages/NotePage/NotePage.tsx`、`NotePage.css`、`NotePage.test.tsx`。現有 `src/App.test.tsx` 保留 `/notes` 導覽、當前頁及歷史紀錄回歸驗證。
- 目前行為：`NotePage` 只顯示主標題及佔位文字，既有頁面測試驗證佔位文字。
- 預期行為：`NotePage` 持有查詢與當前頁狀態。對查詢去除首尾空白並忽略大小寫，對標題、任一標籤、分類鍵 `categoryImage` 做部分比對，任一欄位命中即納入結果。空白查詢顯示完整清單。先依查詢篩選，再根據結果筆數計算總頁數，最後擷取最多 20 筆並渲染卡片。輸入更新時同時將頁碼設為 1。第一頁禁用上一頁、最後一頁禁用下一頁，並在控制區顯示當前頁／總頁。
- 實作：維持單一搜尋輸入與列表的原生可存取語意。保留可辨識的頁面主標題及共享導覽。桌面依設計圖使用 4 欄，每列放 4 筆，窄畫面允許縮減欄數以避免水平溢位，每頁上限仍為 20 筆。使用可用的瀏覽器原生按鈕及 `disabled` 狀態。
- 錯誤處理：分頁資料來自同一份當前搜尋結果，避免顯示超出範圍的頁面。零筆時以文字區分清單尚無筆記與查無相符結果，隱藏分頁控制。資料由本地清單讀取。
- 驗證：用 React Testing Library 操作公開 UI，使用受控資料清單驗證篩選與實際渲染的卡片。建置後以瀏覽器對照 Figma 桌面版、檢查窄螢幕與真實 `/notes` 導覽。

| Case ID | Requirement | Given / When | Expected |
| --- | --- | --- | --- |
| NOTE-CARD-01 | 2-1-1 | 傳入有已知分類圖示的筆記 | 顯示對應圖示、標題、標籤與摘要，整卡連至指定 URL 並另開分頁 |
| NOTES-DATA-01 | 2-2-1 | 對受控清單增刪資料 | 對應卡片增加或移除 |
| NOTES-SEARCH-01 | 2-2、2-2-1 與 PM 確認 | 輸入分別只出現在標題、標籤、分類鍵或摘要的詞，並涵蓋大小寫與首尾空白 | 標題、標籤、分類鍵各自可讓卡片入選，僅摘要符合時不入選，清空查詢恢復完整集合 |
| NOTES-EMPTY-01 | PM 確認及邊界處理 | 清單為空或有清單但查無相符結果 | 顯示對應提示，無卡片且無分頁控制 |
| NOTES-PAGE-01 | 2-2-1 | 20 筆、21 筆及 41 筆的清單 | 頁碼及卡片數量正確，雙向換頁順序正確，首末的對應按鈕禁用 |
| NOTES-PAGE-02 | 2-2-1 | 停留第二頁後修改搜尋 | 立即回到結果的第一頁，依篩選後筆數顯示總頁數 |
| NOTES-NAV-01 | 既有導覽 | 由首頁進入 `/notes`、直接進入及觸發歷史事件 | 正確頁面、主標題及當前導覽狀態 |

單元測試沿用既有圖片及 CSS 替身，連結目的地用受控 fixture 驗證。交付時執行 `npm test` 與 `npm run build`，並用測試資料在瀏覽器驗證版面、整卡焦點與新分頁行為。正式資料為空，實際 Notion 文章瀏覽權限於資料填入後驗證。

## VI. Review Status

- [x] Implementation Plan 自審完成並可交付
- [ ] Development 完成
- [ ] Code Review 通過

## VII. PM 確認與設計決策

PM 於 2026-11-20 確認搜尋框同時比對分類，初版以空清單交付，由開發者後續填入。設計沿用 `Note` 既有的分類鍵 `categoryImage`，並在第 V 節定義搜尋正規化、無結果呈現及窄畫面欄數調整。

## VIII. Programmer Agent 交付

工作類型為新功能實作。依序執行 TASK-001、TASK-002、TASK-003，提交測試案例、建置與瀏覽器驗證結果。各任務實作完成後在 Requirement List 填寫開發日期並標記 `DEVELOPED DONE`，交 Code Review Agent。
