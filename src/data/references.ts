/**
 * 參考連結資料
 * 
 * 如何新增連結：
 * 1. 在 references 陣列中新增一個物件
 * 2. 填入以下欄位：
 *    - title: 連結標題（必填）
 *    - url: 連結網址（必填）
 *    - description: 連結描述（選填）
 *    - category: 分類標籤（選填，例如：'學術論文'、'官方網站'、'新聞報導' 等）
 * 
 * 範例：
 * {
 *   title: '芝山岩維基百科',
 *   url: 'https://zh.wikipedia.org/zh-tw/%E8%8A%9D%E5%B1%B1%E5%B2%A9',
 *   description: '芝山岩的詳細介紹與歷史背景',
 *   category: '百科全書'
 * }
 */

export interface Reference {
  title: string;
  url: string;
  description?: string;
  category?: string;
}

export const references: Reference[] = [
  {
    title: '芝山岩維基百科',
    url: 'https://zh.wikipedia.org/zh-tw/%E8%8A%9D%E5%B1%B1%E5%B2%A9',
    description: '芝山岩的詳細介紹與歷史背景',
    category: '百科全書'
  },
  {
    title: '學務官僚遭難之碑',
    url: 'https://tm.ncl.edu.tw/article?u=005_001_0000359091&n=3&d=%7B%22query_words%22:%22%E5%AD%B8%E5%8B%99%E5%AE%98%E5%83%9A%E9%81%AD%E9%9B%A3%E4%B9%8B%E7%A2%91%22,%22page%22:%221%22,%22page_limit%22:%2210%22,%22_hiding%22:0,%22_deleted%22:0,%22_hidingFromList%22:0%7D&query_words=%E5%AD%B8%E5%8B%99%E5%AE%98%E5%83%9A%E9%81%AD%E9%9B%A3%E4%B9%8B%E7%A2%91',
    description: '元旦日本首相伊藤博文所立「學務官僚遭難之碑」碑存芝山公園之內',
    category: '歷史文獻'
  },
  {
    title: '芝山岩事件紀念碑',
    url: 'https://nrch.culture.tw/nrch/zh-tw/nrchdata/809112',
    description: '芝山岩事件紀念碑相關資料',
    category: '文化資產'
  },
  {
    title: '芝山岩事件遇害六位日籍學務官員',
    url: 'https://nrch.culture.tw/nrch/zh-tw/nrchdata/809114',
    description: '六氏先生相關歷史資料',
    category: '歷史文獻'
  },
  {
    title: '芝山岩隘門資訊',
    url: 'https://nrch.culture.tw/nrch/zh-tw/nrchdata/833522',
    description: '芝山岩隘門文化資產資訊',
    category: '文化資產'
  },
  {
    title: '芝山古蹟查詢',
    url: 'https://nchdb.boch.gov.tw/assets/advanceSearch?query=%7B%22searchType%22:false,%22classifyCode%22:%5B%5D,%22search%22:%22%E8%8A%9D%E5%B1%B1%22%7D&sort=registerDate',
    description: '芝山岩相關古蹟查詢系統',
    category: '文化資產'
  },
  {
    title: '芝山岩文化資源',
    url: 'http://therock.slps.tp.edu.tw/chinese/menubar52.html',
    description: '芝山岩相關文化資源網站',
    category: '教育資源'
  }
];

