# 大奶微微 Da-Nai-Wei-Wei

#### 大奶微微，你訂飲料の大平台。

↳ [專案連結點這](https://test.d3v2d5gigfl1ab.amplifyapp.com/)

## 專案簡介

#### 線上訂飲料的平台，依據當前位置搜尋附近店家，讓消費者可以選擇喜好的口味與尺寸線上訂購想喝的飲料，幫消費者省去現場等待的時間。

此為後端原始碼，採用 Express 和 Sequelize 開發。

## 專案目標

Clone [你訂](https://order.nidin.shop/)部份功能的線上訂購飲料平台。

## 使用技術

- 框架
  - Express
- 資料庫
  - Sequelize
- 套件
  - `Express-session`：設置 session 實作登入機制
  - `bcrypt`：設置密碼加鹽
  - `dotenv`：設置環境變數
- API
  - Imgur API

## 如何本地端執行

0. 本地端要有 Express、Sequelize、Git、SQL 環境
1. 在此頁面下載壓縮檔或 clone 到本地（連同[前端](https://github.com/Lindsay0214/Da-Nai-Wei-Wei-front-end/edit/dev/README.md)專案）
2. `npm install` 安裝專案所需套件
3. `npx sequelize db:create` 建立資料庫
4. 使用 migrate 跟 seeder 建立資料與範例
```
npx sequelize db:migrate
npx sequelize db:seed:all
```
5. `npm start` 執行專案（連同前端專案一併操作）

以下提供測試用的帳號密碼：

| Name     | email           | password | 權限      |
| -------- | --------------- | -------- | -------- |
| Admin    | admin@gmail.com | Admin000 | 最高權限  |
| Shop     | 1002@gmail.com  | 0        | 店家     |
| Consumer | 00@gmail.com    | Aa000000 | 使用者   |


## 專案規劃文件

- [API](https://hackmd.io/ccYzRWXWTVmfORPKYCABzQ)
- [資料庫結構](https://dbdiagram.io/d/6129ec6d825b5b0146e89ae8)
- [wireframe](https://www.figma.com/file/3pgHaXjJKKaDGzJWC0AjnI/Beverage-Wireframe?node-id=0%3A1)

## 專案前端

大奶微微訂購飲料平台前端，採用 React 進行開發。

↳ [前端專案連結點這](https://github.com/Lindsay0214/Da-Nai-Wei-Wei-front-end)
