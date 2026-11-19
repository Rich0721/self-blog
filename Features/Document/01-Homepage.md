# HomePage

## I. 需求簡介
本頁面主要為我的部落格首頁，展示`自我介紹`與`專長技能`。
[首頁設計圖](https://www.figma.com/design/3LXxmVBy76aR39EqOrNGdY/self-website?node-id=5-2&t=sfVcIZkja6gTpFmW-4)

## II. 需求說明

### 2-1. Header
Header包含網站名稱、導航列與GitHub連結。
- [Header設計圖](https://www.figma.com/design/3LXxmVBy76aR39EqOrNGdY/self-website?node-id=5-3&t=sfVcIZkja6gTpFmW-4)

#### 2-1-1. 業務邏輯說明
- Header顯示的網站名稱為`Rich's Blog`。
- 導航列包含`關於我`、`學習筆記`與`GitHub`。
- `關於我`就是目前Homepage頁面，所以會呈現底線且無法點擊。
- `學習筆記`點擊後會導向學習筆記頁面，導向`NotePage`，切換過去該頁面時，導航列的`學習筆記`會呈現底線且無法點擊。
- `GitHub`點擊後額外開啟新的分頁，導向我的GitHub個人頁面，並且使用icon顯示。
    - icon: 使用`asserts/icons/github.png`。
    - link: `https://github.com/Rich0721`


### 2-2. Instruction
`自我介紹`區塊主要展示個人簡介，包含姓名、簡介與個人相片。
- [自我介紹設計圖](https://www.figma.com/design/3LXxmVBy76aR39EqOrNGdY/self-website?node-id=5-10&t=sfVcIZkja6gTpFmW-4)

#### 2-2-1. 業務邏輯說明
- `自我介紹區塊`的Interface須包含以下欄位
    - `name`: `Hi, I'm Rich`
    - `description`: `目前任職於 NEC HK，專注於影像辨識、系統開發與架構設計。曾服務於友達光電與玉山銀行，具備製造業影像演算法開發及金融系統自動化的實務經驗。近期致力於研究 AI Multi-Agent 協同開發框架，探索如何建立涵蓋系統設計、開發、程式碼審查與自動化測試的可驗證開發流程。這裡記錄我的技術研究、實作經驗與學習歷程。`
    - `catchphrase`: `Build. Verify. Improve.`
    - `avatar`: `asserts/images/myself.jpg`
- 相關內容以Component呈現，後續只需要調整對應欄位資料，相關`Page`重新部署後即可更新。

### 2-3. 專長技能
`專長技能`主要展示個人的技術能力與專長領域。
- [專長Component](https://www.figma.com/design/3LXxmVBy76aR39EqOrNGdY/self-website?node-id=5-38&t=sfVcIZkja6gTpFmW-4)
- [專長技能設計圖](https://www.figma.com/design/3LXxmVBy76aR39EqOrNGdY/self-website?node-id=5-22&t=sfVcIZkja6gTpFmW-4)

#### 2-3-1. 業務邏輯說明
- `專長技能區塊`的Interface須包含以下欄位
    - `icon`: 技能圖示
    - `name`: 技能名稱
    - `tag`: 技能標籤，用於分類技能領域，以List呈現
    - `description`: 技能描述，可選填，用於補充說明技能的特點或應用場景。
- 相關內容以Component呈現，後續只需要調整對應欄位資料，相關`Page`重新部署後即可更新。
- 技能區塊須根據`技能數量`的變數顯示，後續維護只需要更新技能資料，頁面會自動調整顯示的區塊數量，無須手動修改頁面結構，例如:原本有五個技能，頁面會顯示五個技能區塊；若新增或刪除技能，頁面會自動調整顯示的區塊數量。

#### 2-3-2. 技能資料
```json
[
    {
        "icon": "asserts/icons/backend.png",
        "name": "後端開發",
        "tag": ["FastAPI", "Spring Boot"],
        "description": "開發後端應用程式並使用Restful API與資料庫進行整合"
    },
    {
        "icon": "asserts/icons/frontend.png",
        "name": "前端開發",
        "tag": ["React", "Vue3", "TypeScript"],
        "description": "開發前端應用程式並與後端API進行整合，使用Figma MCP進行UI/UX設計與原型製作"
    },
    {
        "icon": "asserts/icons/database.png",
        "name": "資料庫管理",
        "tag": ["PostgreSQL"],
        "description": "關聯性資料庫的設計與管理，確保資料的完整性與效能"
    },
    {
        "icon": "asserts/icons/docker.png",
        "name": "容器化與部署",
        "tag": ["Docker"],
        "description": "建立容器化開發與部署環境，應用於Side Project 與 NEC 專案中，打造可攜式的系統。"
    },
    {
        "icon": "asserts/icons/software-agent.png",
        "name": "AI Multi-Agent 協同開發",
        "tag": ["Agents", "MCP", "Skill", "Instructions"],
        "description": "研究並打造具備不同職責的 AI Agent，透過角色分工與協作機制，整合需求分析、系統設計、程式開發、程式碼審查與自動化測試流程。"
    }
]
```

## III. 其他說明
- 圖片皆無法讓使用者在線上點擊右鍵保存。