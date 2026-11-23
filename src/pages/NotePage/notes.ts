import type { Note } from "../../types/note";

// 每篇筆記使用自己的 Notion 連結；標籤可寫成「#後端」。
export const notes: readonly Note[] = [
    {
        categoryImage: 'docker',
        title: 'I. Docker簡介與基礎應用',
        hashTags: ['#容器化與部署', '#Docker'],
        summary: '這篇筆記介紹了Docker的基本概念與應用方法。',
        link: 'https://cuddly-baron-1e5.notion.site/Docker-387b4b83d16680888d89ef42be160878'
    },
    {
        categoryImage: 'docker',
        title: 'II Docker 與 PostgreSQL',
        hashTags: ['#容器化與部署', '#Docker', '#PostgreSQL'],
        summary: '如何使用Docker部署PostgreSQL，並進入容器操作資料庫',
        link:'https://cuddly-baron-1e5.notion.site/II-Docker-PostgreSQL-41eb4b83d16680d2bc67db054778edb0'
    }
];
