# Folder Structure

這是這一個部落格程式碼的資料夾結構

## Structure

```text
blog/
├── .gitignore
├── instructions/
│   ├── common-instructions.md
│   └── folder-structure.md
├── Features/
│   ├── Document
│   ├── Issue
│   ├── Plan
│   └── Review
├── public/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 資料夾路徑說明

| 資料夾/檔案 | 說明 |
| ----------- | ----------- |
| .gitignore | Git 忽略檔案 |
| instructions/ | 存放提供給Agent閱讀的文件 |
| public/ | 公開資源 |
| src/ | 存放程式碼 |
| Features/ | 存放專案需求說明文件、實作計畫、實作議題與審查意見說明的資料 |
| index.html | HTML 入口檔案 |
| package.json | 專案設定檔 |
| tsconfig.json | TypeScript 設定檔 |
| vite.config.ts | Vite 設定檔 |
| README.md | 專案說明文件 |

## Source資料夾說明
`src`主要儲存專案程式碼與相關使用到的資源，如圖片、圖示、字型等。

| 資料夾/檔案 | 說明 |
| `assets/` | 存放靜態資源，如圖片、圖示、字型 |
| `components/` | 存放可重複使用的元件 |
| `pages/` | 存放頁面元件 |
| `routes/` | 存放路由相關檔案 |
| `styles/` | 存放樣式檔案 |
| `types/` | 存放 TypeScript 型別定義 |
| `utils/` | 存放工具函式 |
| `App.tsx` | React 主元件 |
| `index.css` | 全域樣式檔案 |
| `main.tsx` | 專案進入點 |


### Component架構說明
`componets`主要存放可重複使用的元件，這些元件通常是 UI 元件，如按鈕、表單、導航列等，並且可以在不同頁面中重複使用，並且每一個元件包含自己的程式、樣式與測試檔案。

每個元件通常會有以下結構：

```text
components/
├── ComponentName/
│   ├── ComponentName.tsx
│   ├── ComponentName.css
│   └── ComponentName.test.tsx
```

### Page架構說明
`pages`主要存放頁面元件，這些元件通常對應到應用程式中的不同頁面，每個頁面元件可以包含自己的程式、樣式與測試檔案。

每個頁面元件通常會有以下結構：

```text
pages/
├──PageName/
    ├── PageName.tsx
    ├── PageName.css
    └── PageName.test.tsx
```


## Features

`Features`資料夾主要存放專案需求說明文件、實作計畫、實作議題與審查意見說明的資料，每個子資料夾對應到不同的功能模組。

每個子資料夾通常會有以下結構：

```text
Features/
├── Document/
│   ├── 01-Requirement.md
│   └── 02-Design.md
├── Issue/
│   ├── 01-Requirement.md
│   └── 02-Design.md
├── Plan/
│   ├── 01-Requirement.md
│   └── 02-Design.md
└── Review/
    ├── 01-Requirement.md
    └── 02-Design.md
```