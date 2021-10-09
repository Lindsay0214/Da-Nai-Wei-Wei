# 大奶微微 Da-Nai-Wei-Wei

#### 大奶微微，你訂飲料の大平台。

↳ [專案連結點這](https://main.d318dyc2vbskcy.amplifyapp.com/)

## 專案簡介

#### 線上訂飲料的平台，依據當前位置搜尋附近店家，讓消費者可以選擇喜好的口味與尺寸線上訂購想喝的飲料，幫消費者省去現場等待的時間。
大杯奶茶，微糖微冰，年輕世代多將過長但高頻率使用的語詞簡寫（大安森林公園 → 安森, 國父紀念館 → 國館等），大奶微微屬於詼諧式簡寫，目的為抓住以年輕世代為主力消費的客群。 此為前端原始碼，採用 React 框架開發。

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

## 目錄結構說明
```
├── config                      
|   └── config.json
├── controllers                      
│   ├── adminController.js                
│   ├── orderController.js       
│   ├── orderItemController.js 
│   ├── paymentController.js
│   ├── productController.js
│   ├── productDetailController.js
│   ├── productHistoryController.js
|   └── userController.js
├── middlewares 
|   ├── error
|   |   ├── errorHandler.js
|   |   └── errors.js
│   ├── auth.js
|   └── checkPermission.js
├── migrations 
├── models                      
│   ├── index.js                
│   ├── order_item.js       
│   ├── order.js 
│   ├── product_detail.js
│   ├── product_history.js
│   ├── product.js
|   └── user.js
├── routes                      
|   └── index.js
├── seeders                      
├── .eslintrc.js
├── .prettierrc.js
├── index.js
├── package-lock.json
├── package.json
├── README.md
├── settings.json
└── yarn.lock

```

## 版本
目前版本 v1
- 載入時若無開位置權限，則會提供預設位置附近飲料店家，若欲查看附近店家還需開設位置權限唷！
- 若有「找不到使用者」情形，還需請您至瀏覽器設置處將「跨域追蹤」權限開啟

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

| Name     | email（帳號)     | password | 權限      |
| -------- | --------------- | -------- | -------- |
| Admin    | admin@gmail.com | Admin000 | 最高權限  |
| 迷客夏     | 1002@gmail.com  | 0        | 店家     |
| 測試帳號 | testcount@gmail.com | Aa000000 | 使用者   |
* 為了良好測試體驗，請使用功能時斟酌增減測試


## 專案規劃文件

- [API](https://hackmd.io/ccYzRWXWTVmfORPKYCABzQ)
- [資料庫結構](https://dbdiagram.io/d/6129ec6d825b5b0146e89ae8)
- [wireframe](https://www.figma.com/file/3pgHaXjJKKaDGzJWC0AjnI/Beverage-Wireframe?node-id=0%3A1)

## 專案前端

大奶微微訂購飲料平台前端，採用 React 進行開發。

↳ [前端專案連結點這](https://github.com/Lindsay0214/Da-Nai-Wei-Wei-front-end)
