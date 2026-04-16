# 碌卡助手

一個零 build step 的單頁 PWA，用來整理不同信用卡的回贈規則、限時活動，並在輸入消費場景後推薦最適合刷的卡。

## 功能

- 信用卡資料庫：維護卡名、發卡行、基礎回贈、分類加成、適用地點與備註
- 活動資料庫：維護限時活動、門檻、上限、適用類別與地點
- 智能推薦：輸入消費地點、消費類別、金額後，計算各卡當前預計回贈價值並排序
- 本地保存：所有資料使用 `localStorage`

## Repo 結構

```text
.
├── README.md
├── apple-touch-icon.png
├── icon-192.png
├── icon.svg
├── index.html
├── manifest.json
└── sw.js
```

## Stack

- 原生 `HTML + CSS + JavaScript`
- 單頁靜態應用
- `localStorage`
- PWA: `manifest.json` + `sw.js`

## 說明

- 預設資料是示例卡和示例活動，後續可直接在應用內新增、修改、刪除
- 推薦結果按「當前消費場景下的預計回贈金額」排序
- 如果活動不符合地點、類別、金額門檻或已過期，不會計入推薦
