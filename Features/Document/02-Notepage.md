# Note Page

## I. 需求簡介
這一個頁面主要用來記錄我自己的技術學習筆記，方便日後回顧與整理，筆記使用`Notion`進行管理，會遷入連結可以開起新分頁進行閱讀。
[NotePage設計圖](https://www.figma.com/design/3LXxmVBy76aR39EqOrNGdY/self-website?node-id=38-28&t=8miLDWwK0UUntCfG-4)

## II. 需求說明

### 2-1. Note Component
`Note Component`主要分成`分類圖片`、`標題`、`HashTag`、`摘要`以及`連結`五個部分。
-[Note Component Prototype](https://www.figma.com/design/3LXxmVBy76aR39EqOrNGdY/self-website?node-id=42-35&t=8miLDWwK0UUntCfG-4)

#### 2-1-1. 業務邏輯說明
- 定義的Interface，請參閱下方程式碼以及說明:
    - `categoryImage`: 分類圖片的選擇，`Component`會根據選擇文字顯示對應的圖片，圖片來源都是從`asserts/icons`中取得。
    - `title`: 筆記標題
    - `hashTags`: 筆記的標籤陣列
    - `summary`: 筆記摘要
    - `link`: 筆記連結
```typescript
interface Note {
  categoryImage: string;
  title: string;
  hashTags: string[];
  summary: string;
  link: string;
}
```
- 點擊`Note Component`區塊內的任意位置，會導向對應的筆記連結。
- `categoryImage`應可以在`Component`中讓開發者後續可以自行擴充選項及對應圖片。初始資料可以先參考下方設定:
```typescript
{
    typescript: 'typescript.png',
    python: 'python.png',
    agent: 'software-agent.png'
}
```


### 2-2. Note Page

`Note Page`主要用來展示所有的筆記，會將每一個筆記資料渲染成對應的`Note Component`，並且提供分類篩選與搜尋功能，方便使用者快速找到所需的筆記。

#### 2-2-1. 業務邏輯說明
- `Page`管理時，應該使用對應的`Interface List`，並且讓開發者可以方便地新增、修改或刪除筆記資料，重新部署後即可以生效，減少`tsx`排版的修改。
- 當使用者於`查詢輸入框`中輸入關鍵字時，會即時從`title`或`hashTags`中進行比對，並更新顯示的筆記列表。
    - 自動回到第一頁，確保使用者看到最新的篩選或搜尋結果。
- 每頁顯示數量以20筆為限，行數為5筆，列數為4筆，超過的部分顯示在下一頁。
- 使用者點擊上下頁按鈕時，會切換到對應的頁面，顯示該頁的筆記列表。
  - 當在第一頁時，上一頁按鈕應該被禁用，避免使用者點擊無效。
  - 當在最後一頁時，下一頁按鈕應該被禁用，避免使用者點擊無效。
- 分頁按鈕應該提供明確的頁碼顯示(頁數/總頁數)，讓使用者可以清楚知道目前所在的頁面以及總頁數。