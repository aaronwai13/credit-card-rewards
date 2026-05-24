const STORAGE_KEY = "credit_card_rewards_v2";
// 已改名或刪除的舊正式優惠標題，migration 時清除
const DEPRECATED_OFFER_TITLES = new Set([
  "海外外幣 6%",
  "網上零售 5%",
  "本地餐飲及娛樂 1%",
  "網上旅遊/娛樂/訂閱 港幣 5.4%"
]);
const APP_VERSION = "v2026.05.24.2";
const MERCHANT_SUGGESTIONS = [
  ["Netflix", ["netflix"]],
  ["Spotify", ["spotify"]],
  ["Disney+", ["disney+", "disney"]],
  ["Apple TV+", ["apple tv", "apple tv+"]],
  ["Apple Music", ["apple music"]],
  ["App Store", ["app store"]],
  ["Google Play", ["google play"]],
  ["YouTube", ["youtube"]],
  ["Viu", ["viu"]],
  ["ViuTV", ["viutv"]],
  ["Now TV", ["now tv"]],
  ["MyTV Super", ["mytv super", "mytvsuper"]],
  ["JOOX", ["joox"]],
  ["KKBOX", ["kkbox"]],
  ["MOOV", ["moov"]],
  ["HMVOD", ["hmvod"]],
  ["HBO / HBO Max", ["hbo", "hbo max"]],
  ["Hulu", ["hulu"]],
  ["Paramount+", ["paramount+", "paramount"]],
  ["Amazon Prime", ["amazon prime"]],
  ["Youku（優酷）", ["youku", "優酷", "优酷"]],
  ["ChatGPT", ["chatgpt"]],
  ["Microsoft 365", ["microsoft", "microsoft 365"]],
  ["Adobe", ["adobe"]],
  ["Canva", ["canva"]],
  ["Grammarly", ["grammarly"]],
  ["Notion", ["notion"]],
  ["Zoom", ["zoom"]],
  ["Midjourney", ["midjourney"]],
  ["Perplexity", ["perplexity"]],
  ["DeepSeek", ["deepseek"]],
  ["Grok", ["grok"]],
  ["Kimi", ["kimi"]],
  ["Shopify", ["shopify"]],
  ["Shopline", ["shopline"]],
  ["Uber One", ["uber one"]],
  ["McDonald's（麥當勞）", ["mcdonald", "麥當勞", "麦当劳"]],
  ["Starbucks（星巴克）", ["starbucks", "星巴克"]],
  ["Pacific Coffee（太平洋咖啡）", ["pacific coffee", "太平洋咖啡"]],
  ["Dyson（戴森）", ["dyson", "戴森"]],
  ["Samsung（三星）", ["samsung", "三星"]],
  ["Sony（索尼）", ["sony", "索尼"]],
  ["Uniqlo（優衣庫）", ["uniqlo", "優衣庫", "优衣库"]],
  ["GU", ["gu"]],
  ["IKEA（宜家）", ["ikea", "宜家"]],
  ["Log-On", ["log-on", "log on"]],
  ["Lululemon", ["lululemon"]],
  ["Arc'teryx", ["arc'teryx", "arcteryx"]],
  ["Costco", ["costco"]],
  ["Amazon（亞馬遜）", ["amazon", "亞馬遜", "亚马逊"]],
  ["Booking.com", ["booking.com", "booking"]],
  ["Farfetch", ["farfetch"]],
  ["SSENSE", ["ssense"]],
  ["Harrods", ["harrods"]],
  ["Saks Fifth Avenue", ["saks fifth avenue", "saks"]],
  ["SOGO（崇光）", ["sogo", "崇光"]],
  ["King Power", ["king power"]],
  ["Suning（蘇寧）", ["suning", "蘇寧", "苏宁"]],
  ["MCL 戲院", ["mcl"]],
  ["百老匯院線", ["百老匯", "百老汇"]],
  ["英皇戲院", ["英皇"]],
  ["Cinema City（影藝）", ["cinema city", "影藝", "影艺"]],
  ["購票通", ["購票通", "购票通"]],
  ["HotdogTix", ["hotdogtix"]],
  ["KKTIX", ["kktix"]],
  ["撲飛", ["撲飛", "扑飞"]],
  ["Ticketflap", ["ticketflap"]],
  ["城市售票網", ["城市售票網", "城市售票网"]],
  ["迪士尼樂園", ["迪士尼", "disney"]],
  ["海洋公園", ["海洋公園", "海洋公园"]],
  ["POP MART", ["pop mart", "popmart"]],
  ["唐吉訶德 / Don Quijote", ["唐吉訶德", "唐吉诃德", "don quijote"]],
  ["松本清", ["松本清"]],
  ["阪急百貨", ["阪急"]],
  ["大丸百貨", ["大丸"]],
  ["三越百貨", ["三越"]],
  ["伊勢丹", ["伊勢丹", "伊势丹"]],
  ["Uber Eats", ["uber eats"]],
  ["Deliveroo", ["deliveroo"]],
  ["DoorDash", ["doordash", "door dash"]],
  ["Steam", ["steam"]],
  ["PlayStation", ["playstation", "sony playstation"]],
  ["Nintendo eShop", ["nintendo eshop", "nintendo e-shop"]],
  ["JR（Japan Railway）", ["jr", "japan railway"]],
  ["MRT", ["mrt", "mass rapid transit"]],
  ["Translink", ["translink"]],
  ["Transport for London（TfL）", ["tfl", "transport for london"]],
  ["中國鐵路（12306）", ["中國鐵路", "中国铁路", "12306"]],
  ["北京地鐵", ["北京地鐵", "北京地铁"]],
  ["上海地鐵", ["上海地鐵", "上海地铁"]],
  ["環島中港通", ["環島中港通", "环岛中港通"]],
];
const LOCATION_OPTIONS = ["香港", "澳門", "內地", "海外", "網上"];
const CURRENCY_TO_HKD = {
  HKD: 1,
  USD: 7.8,
  CNY: 1.08,
  JPY: 0.052,
  KRW: 0.0052,
  MOP: 0.97,
  THB: 0.21,
  TWD: 0.24
};
const CARD_DISPLAY_ORDER = [
  "BOC Chill Card",
  "HSBC 金卡",
  "PayMe 銀聯卡",
  "MMPOWER",
  "恒生多貨幣扣賬卡",
  "DBS Live Fresh",
  "AEON WAKUWAKU",
  "長城萬事達 YOU 卡",
  "中信i享銀聯卡",
  "中信萬事達扣賬卡",
  "農行萬事達白金卡",
  "工行星座Visa卡"
];
const MAINLAND_CARD_NAMES = new Set([
  "長城萬事達 YOU 卡",
  "中信i享銀聯卡",
  "中信萬事達扣賬卡",
  "農行萬事達白金卡",
  "工行星座Visa卡"
]);
const LEGACY_CARD_NAME_MAP = {
  "i享卡": "中信i享銀聯卡",
  "萬事達扣賬卡": "中信萬事達扣賬卡",
  "萬事達全球支付白金卡": "農行萬事達白金卡",
  "星座 Visa": "工行星座Visa卡"
};
const LEGACY_OFFER_TITLE_MAP = {
  [canonicalOfferKey("工行星座Visa卡", "香港 Apple Pay 滿 HK$50 返 US$2（3/4）")]: "香港 Apple Pay 滿 HK$50 返 US$2",
  [canonicalOfferKey("工行星座Visa卡", "境外 Apple Pay 交通 100%（0/15）")]: "境外 Apple Pay 交通 100%",
  [canonicalOfferKey("PayMe 銀聯卡", "NFC 港幣/人民幣/澳門幣 3%")]: "港幣/澳門幣/人民幣 3%",
  [canonicalOfferKey("PayMe 銀聯卡", "NFC 其他貨幣 10%")]: "其他貨幣 10%"
};
const CUSTOM_REWARD_OFFER_KEYS = new Set([
  canonicalOfferKey("長城萬事達 YOU 卡", "Apple Pay 首3筆 100%返現"),
  canonicalOfferKey("長城萬事達 YOU 卡", "Apple Pay 首2筆額外返 US$3 + US$2"),
  canonicalOfferKey("中信萬事達扣賬卡", "Apple Pay 首2筆額外返 US$3 + US$2"),
  canonicalOfferKey("農行萬事達白金卡", "Apple Pay 首3筆 100%返現"),
  canonicalOfferKey("農行萬事達白金卡", "Apple Pay 首2筆額外返 US$3 + US$2"),
  canonicalOfferKey("工行星座Visa卡", "香港 Apple Pay 滿 HK$50 返 US$2"),
  canonicalOfferKey("工行星座Visa卡", "境外 Apple Pay 交通 100%"),
  canonicalOfferKey("農行萬事達白金卡", "每月首筆境外線下返 US$1"),
]);

function canonicalOfferKey(cardName, title) {
  return `${cardName}::${title}`;
}

function getLinkedCardNameByOffer(offer, cardById) {
  return cardById[offer.cardId]?.name || "";
}

function findExistingCanonicalOffer(definition, existingOffers, cardById) {
  const key = canonicalOfferKey(definition.cardName, definition.title);
  return existingOffers.find((offer) => offer.canonicalKey === key)
    || existingOffers.find((offer) =>
      offer.title === definition.title && getLinkedCardNameByOffer(offer, cardById) === definition.cardName
    );
}

function isCanonicalOfferRule(card, offer, cardName, offerTitle) {
  return card.name === cardName
    && (offer.canonicalKey === canonicalOfferKey(cardName, offerTitle) || offer.title === offerTitle);
}

function getCanonicalRecommendationRule(card, offer) {
  const key = offer.canonicalKey || canonicalOfferKey(card.name, offer.title || "");
  return CANONICAL_RECOMMENDATION_RULES[key] || null;
}

const CANONICAL_CARD_DEFINITIONS = [
  {
    name: "BOC Chill Card",
    bank: "中銀",
    baseRate: 0.4,
    currency: "HKD",
    categories: {
      general: 1
    },
    locations: ["香港", "海外", "網上"],
    notes: ""
  },
  {
    name: "HSBC 金卡",
    bank: "匯豐",
    baseRate: 0.4,
    currency: "HKD",
    categories: {
      general: 1
    },
    locations: ["香港", "澳門", "內地", "海外"],
    notes: ""
  },
  {
    name: "MMPOWER",
    bank: "恒生",
    baseRate: 0.4,
    currency: "HKD",
    categories: {
      general: 1
    },
    locations: ["香港", "海外", "網上"],
    notes: ""
  },
  {
    name: "恒生多貨幣扣賬卡",
    bank: "恒生",
    baseRate: 0.4,
    currency: "HKD",
    categories: {
      general: 1
    },
    locations: ["香港", "海外"],
    notes: ""
  },
  {
    name: "AEON WAKUWAKU",
    bank: "AEON",
    baseRate: 0.4,
    currency: "HKD",
    categories: {
      general: 1
    },
    locations: ["香港", "海外", "網上"],
    notes: ""
  },
  {
    name: "DBS Live Fresh",
    bank: "DBS",
    baseRate: 0.4,
    currency: "HKD",
    categories: {
      general: 1
    },
    locations: ["香港", "海外", "網上"],
    notes: "海外註冊網上商戶以港幣 DCC 付款不適用。"
  },
  {
    name: "PayMe 銀聯卡",
    bank: "匯豐",
    baseRate: 0,
    currency: "HKD",
    categories: {
      general: 1
    },
    locations: ["香港", "澳門", "內地", "海外"],
    notes: ""
  },
  {
    name: "長城萬事達 YOU 卡",
    bank: "中行",
    baseRate: 0,
    currency: "CNY",
    categories: {
      general: 1
    },
    locations: ["香港", "澳門", "內地", "海外", "網上"],
    notes: ""
  },
  {
    name: "中信i享銀聯卡",
    bank: "中信",
    baseRate: 0,
    currency: "HKD",
    categories: {
      general: 1
    },
    locations: ["香港", "澳門", "海外"],
    notes: ""
  },
  {
    name: "中信萬事達扣賬卡",
    bank: "中信",
    baseRate: 0,
    currency: "CNY",
    categories: {
      general: 1
    },
    locations: ["香港", "澳門", "內地", "海外", "網上"],
    notes: ""
  },
  {
    name: "農行萬事達白金卡",
    bank: "農行",
    baseRate: 0,
    currency: "CNY",
    categories: {
      general: 1
    },
    locations: ["香港", "澳門", "海外", "網上"],
    notes: ""
  },
  {
    name: "工行星座Visa卡",
    bank: "工行",
    baseRate: 0,
    currency: "CNY",
    categories: {
      general: 1
    },
    locations: ["香港", "澳門", "海外", "網上"],
    notes: ""
  }
];

const CANONICAL_OFFER_DEFINITIONS = [
  {
    cardName: "BOC Chill Card",
    title: "海外簽賬 4%",
    category: "general",
    tags: ["overseas"],
    bonusRate: 3.6,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    locations: ["澳門", "內地", "海外", "網上"],
    notes: "合資格海外簽賬（於海外商戶不論實體或網上以外幣交易及支付）可享 4% 現金回贈；以港幣支付的外幣簽賬不包括在內。"
  },
  {
    cardName: "BOC Chill Card",
    title: "網上簽賬 4%",
    category: "general",
    tags: ["online"],
    bonusRate: 3.6,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    locations: ["香港", "澳門", "內地", "海外", "網上"],
    notes: "合資格網上簽賬（於網上完成之零售簽賬，簽賬地點及貨幣種類不限）可享 4% 現金回贈；電子錢包簽賬不算。"
  },
  {
    cardName: "BOC Chill Card",
    title: "指定商戶 8%",
    category: "general",
    tags: ["merchant", "subscription", "shopping", "dining", "entertainment"],
    bonusRate: 7.6,
    minSpend: 1000,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    locations: ["香港", "澳門", "內地", "海外", "網上"],
    notes: "每月累積合資格簽賬（本地或海外實體商戶以實體卡或 Apple Pay 支付）滿 HK$1,000，Chill 商戶簽賬可享 8% 現金回贈：全港戲院、Apple TV、App Store、Disney+、Netflix、Spotify、McDonald's、Pacific Coffee、Starbucks、Dyson、Samsung、Sony、Uniqlo、GU、IKEA、LOG-ON。",
    requiresKeywords: ["戲院", "睇戲", "電影", "cinema", "apple tv", "app store", "disney+", "netflix", "spotify", "mcdonald", "麥當勞", "pacific coffee", "starbucks", "星巴克", "dyson", "samsung", "sony", "uniqlo", "優衣庫", "gu", "ikea", "log-on", "log on"]
  },
  {
    cardName: "HSBC 金卡",
    title: "澳門/內地/海外 2.4%",
    category: "general",
    tags: ["overseas"],
    bonusRate: 2.0,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    locations: ["澳門", "內地", "海外"],
    notes: "賞世界：澳門、內地及海外合資格簽賬可享 2.4% 回贈；香港簽賬及港幣交易不包括在內。較適合實體簽賬，網上簽賬不建議預設按 2.4% 計。"
  },
  {
    cardName: "MMPOWER",
    title: "指定商戶 8%",
    category: "general",
    tags: ["merchant", "shopping"],
    bonusRate: 7.6,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    locations: ["香港", "網上"],
    notes: "合資格指定商戶簽賬指於指定商戶（Amazon、GU、lululemon、淘寶及 Uniqlo）在網上或香港實體銷售點（不包括百貨公司專櫃及特賣場）所作的合資格零售簽賬，高達 8% +FUN Dollars。",
    requiresKeywords: ["amazon", "gu", "lululemon", "淘寶", "taobao", "uniqlo", "優衣庫"]
  },
  {
    cardName: "MMPOWER",
    title: "網上娛樂 8%",
    category: "general",
    tags: ["online", "entertainment", "subscription"],
    bonusRate: 7.6,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    locations: ["網上", "香港"],
    notes: "串流平台：Apple TV / Music、Disney+、HBO Max、HMVOD、JOOX、KKBOX、MOOV、Netflix、Spotify、Viu 及 YouTube。\n本港戲院：百老匯院線、影藝戲院、Cinema City 院線、英皇戲院、星達院線（前嘉禾院線）及 MCL 戲院。\n票務平台：購票通、HotdogTIX、KKTIX、撲飛、Ticketflap 及城市售票網。\n本港主題樂園：香港迪士尼樂園及香港海洋公園。\n以上簽賬高達 8% +FUN Dollars。",
    requiresKeywords: ["apple tv", "apple music", "disney+", "hbo max", "hmvod", "joox", "kkbox", "moov", "netflix", "spotify", "viu", "youtube", "百老匯", "影藝", "cinema city", "英皇", "星達", "mcl", "購票通", "hotdogtix", "kktix", "撲飛", "ticketflap", "城市售票網", "迪士尼", "海洋公園", "睇戲", "電影"]
  },
  {
    cardName: "MMPOWER",
    title: "網上服飾 8%",
    category: "clothing",
    tags: ["online", "shopping"],
    bonusRate: 7.6,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    locations: ["網上"],
    notes: "由恒生、Mastercard Asia / Pacific (Hong Kong) Limited 或相關收單銀行根據商戶編號界定為服飾類別之合資格零售簽賬高達 8% +FUN Dollars。",
  },
  {
    cardName: "MMPOWER",
    title: "網上簽賬 5%",
    category: "general",
    tags: ["online"],
    bonusRate: 4.6,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    locations: ["網上"],
    notes: "除網上服飾及網上娛樂以外的其他網上簽賬高達 5% +FUN Dollars。"
  },
  {
    cardName: "MMPOWER",
    title: "海外實體外幣簽賬 4%",
    category: "general",
    tags: ["overseas"],
    bonusRate: 3.6,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    locations: ["澳門", "內地", "海外"],
    notes: "合資格外幣簽賬指於香港以外國家或地區的實體店以外幣進行的合資格零售簽賬。以港幣進行的交易不屬此類別。"
  },
  {
    cardName: "恒生多貨幣扣賬卡",
    title: "指定海外商戶 15%",
    category: "general",
    tags: ["overseas", "merchant"],
    bonusRate: 14.6,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    locations: ["海外"],
    notes: "於指定海外商戶作合資格交易可享 15% 現金回贈，只可於每個指定商戶享現金回贈一次。\n【日本】松本清、唐吉訶德、阪急／阪神百貨、大丸松坂屋、樂天免稅店東京銀座店、三越伊勢丹、三井 Outlet Park 爵士之夢長島、三井 Outlet Park 木更津。\n【英國】Harrods。\n【加拿大】Lululemon。\n【澳洲】Coles、Woolworths。\n【泰國】曼谷 Emporium、Paragon Department Stores。",
    requiresKeywords: ["松本清", "唐吉訶德", "阪急", "阪神", "大丸", "松坂屋", "樂天免稅", "三越", "伊勢丹", "三井", "harrods", "lululemon", "coles", "woolworths", "emporium", "paragon"]
  },
  {
    cardName: "恒生多貨幣扣賬卡",
    title: "指定海外交通 20%",
    category: "general",
    tags: ["overseas", "transport"],
    bonusRate: 19.6,
    minSpend: 0,
    cap: 120,
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    locations: ["內地", "海外", "網上"],
    notes: "於指定海外交通作合資格交易可享 20% 現金回贈（上限 HK$120）。\n【澳洲】Transport for NSW TrainLink、Translink。\n【加拿大】Go Transit。\n【內地】中國鐵路 12306、北京地鐵、Go 巴出行、上海地鐵、上海磁浮、環島中港通。\n【日本】Japan Railway。\n【泰國】Mass Rapid Transit Authority of Thailand。\n【英國】Lothian Buses、Transport for Greater Manchester、Transport for London。\n部分指定商戶網站/網上交易亦適用。",
    requiresKeywords: ["translink", "trainlink", "go transit", "中國鐵路", "北京地鐵", "go巴出行", "上海地鐵", "上海磁浮", "環島中港通", "japan railway", "jr", "mass rapid transit", "mrt", "lothian buses", "transport for greater manchester", "transport for london", "tfl"]
  },
  {
    cardName: "恒生多貨幣扣賬卡",
    title: "指定本地商戶 20%",
    category: "general",
    tags: ["merchant", "shopping", "entertainment"],
    bonusRate: 19.6,
    minSpend: 0,
    cap: 120,
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    locations: ["香港", "網上"],
    notes: "於指定本地商戶作合資格交易可享 20% 現金回贈（上限 HK$120）。優惠只適用於指定商戶之香港零售分店及指定網站：POP MART（popmart.com/hk）、MCL 戲院（mclcinema.com）、百老匯院線（cinema.com.hk/tc）、英皇戲院（emperorcinemas.com/zh）；唐吉訶德及松本清只限香港零售分店。",
    requiresKeywords: ["pop mart", "popmart", "唐吉訶德", "松本清", "mcl", "百老匯", "英皇", "睇戲", "電影"]
  },
  {
    cardName: "AEON WAKUWAKU",
    title: "App Store 迎新 HK$50",
    category: "general",
    tags: ["welcome"],
    bonusRate: 0,
    minSpend: 0,
    cap: 50,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    locations: ["網上"],
    notes: "✅（待返）發卡後 60 日內於 App Store 作任何簽賬消費可享 HK$50 回贈。"
  },
  {
    cardName: "AEON WAKUWAKU",
    title: "網上簽賬 6%",
    category: "general",
    tags: ["online"],
    bonusRate: 5.6,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    locations: ["網上"],
    notes: "於網上以港幣或外幣完成簽賬可享 6% 回贈；以電子錢包之簽賬不算。"
  },
  {
    cardName: "AEON WAKUWAKU",
    title: "日本簽賬 3%",
    category: "general",
    tags: ["overseas"],
    bonusRate: 2.6,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    locations: ["海外"],
    notes: "於日本以日圓完成簽賬可享 3% 回贈。",
    requiresKeywords: ["日本", "japan", "日幣", "日圓", "yen", "jpy"]
  },
  {
    cardName: "AEON WAKUWAKU",
    title: "本地餐飲 1%",
    category: "dining",
    tags: ["dining"],
    bonusRate: 0.6,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    locations: ["香港"],
    notes: "於香港之酒樓、餐廳、快餐店及酒店餐飲以港幣完成簽賬可享 1% 回贈。"
  },
  {
    cardName: "DBS Live Fresh",
    title: "網上旅遊/娛樂/訂閱 外幣 6%",
    category: "general",
    tags: ["travel", "entertainment", "subscription", "online", "overseas"],
    bonusRate: 5.6,
    minSpend: 300,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    locations: ["網上", "海外"],
    notes: "合資格網上旅遊商戶、娛樂及指定服務訂閱以外幣簽賬可享 6% 回贈；單一淨簽賬須滿 HK$300，DCC 不適用。",
    requiresKeywords: ["訂閱", "subscription", "app store", "disney+", "google play", "joox", "kkbox", "moov", "netflix", "now tv", "spotify", "youtube", "apple tv", "apple music", "viu", "adobe", "amazon prime", "canva", "chatgpt", "copy.ai", "deepseek", "elevenlabs", "grammarly", "grok", "hbo", "hulu", "jasper", "kimi", "manus", "microsoft", "midjourney", "mytv super", "notion", "otter.ai", "paramount+", "perplexity", "poe", "shopify", "shopline", "soundraw", "synthesia", "uber one", "viutv", "writesonic", "youku", "zoom"]
  },
  {
    cardName: "DBS Live Fresh",
    title: "網上旅遊/娛樂/訂閱 港幣 5%",
    category: "general",
    tags: ["travel", "entertainment", "subscription", "online"],
    bonusRate: 4.6,
    minSpend: 300,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    locations: ["網上"],
    notes: "合資格網上旅遊商戶、娛樂及指定服務訂閱以港幣簽賬可享 5% 回贈；單一淨簽賬須滿 HK$300，DCC 不適用。",
    requiresKeywords: ["訂閱", "subscription", "app store", "disney+", "google play", "joox", "kkbox", "moov", "netflix", "now tv", "spotify", "youtube", "apple tv", "apple music", "viu", "adobe", "amazon prime", "canva", "chatgpt", "copy.ai", "deepseek", "elevenlabs", "grammarly", "grok", "hbo", "hulu", "jasper", "kimi", "manus", "microsoft", "midjourney", "mytv super", "notion", "otter.ai", "paramount+", "perplexity", "poe", "shopify", "shopline", "soundraw", "synthesia", "uber one", "viutv", "writesonic", "youku", "zoom"]
  },
  {
    cardName: "DBS Live Fresh",
    title: "合資格網上外幣 1%",
    category: "general",
    tags: ["online", "overseas"],
    bonusRate: 0.6,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    locations: ["網上", "海外"],
    notes: "合資格網上外幣簽賬可享 1% 回贈。"
  },
  {
    cardName: "DBS Live Fresh",
    title: "迎新 HK$500",
    category: "general",
    tags: ["welcome"],
    bonusRate: 0,
    minSpend: 5000,
    cap: 500,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    locations: ["香港", "網上", "海外"],
    notes: "✅（待返）發卡 3 個月內累積合資格簽賬滿 HK$5,000 可享 HK$500 現金回贈；最遲於完成要求後 6 個月回贈。"
  },
  {
    cardName: "DBS Live Fresh",
    title: "迎新 HK$100",
    category: "general",
    tags: ["welcome", "subscription"],
    bonusRate: 0,
    minSpend: 0,
    cap: 100,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    locations: ["網上"],
    notes: "✅（待返）發卡 4 個月內於任何兩個月（3 月 + 4 月）於指定合資格訂閱服務各簽賬任何金額一次可享 HK$100 現金回贈；最遲於完成要求後 6 個月回贈。",
    requiresKeywords: ["訂閱", "subscription", "app store", "disney+", "google play", "joox", "kkbox", "moov", "netflix", "now tv", "spotify", "youtube", "apple tv", "apple music", "viu", "adobe", "amazon prime", "canva", "chatgpt", "copy.ai", "deepseek", "elevenlabs", "grammarly", "grok", "hbo", "hulu", "jasper", "kimi", "manus", "microsoft", "midjourney", "mytv super", "notion", "otter.ai", "paramount+", "perplexity", "poe", "shopify", "shopline", "soundraw", "synthesia", "uber one", "viutv", "writesonic", "youku", "zoom"]
  },
  {
    cardName: "PayMe 銀聯卡",
    title: "港幣/澳門幣/人民幣 3%",
    category: "general",
    tags: ["nfc"],
    bonusRate: 3,
    minSpend: 0,
    cap: 200,
    startDate: "2026-04-23",
    endDate: "2026-06-23",
    locations: ["香港", "澳門", "內地", "海外"],
    displayCap: 200,
    displayCurrency: "HKD",
    notes: "於香港、中國內地及全球各地，以 PayMe 銀聯卡經 NFC 免觸支付，港幣、人民幣或澳門幣付款可享累積交易金額 3% 回贈。每個推廣階段兩項優惠合共最高 HK$200，兩個階段合共最高 HK$400；第一階段 2026-04-23 至 2026-05-22，第二階段 2026-05-23 至 2026-06-23。"
  },
  {
    cardName: "PayMe 銀聯卡",
    title: "其他貨幣 10%",
    category: "general",
    tags: ["nfc", "overseas"],
    bonusRate: 10,
    minSpend: 0,
    cap: 200,
    startDate: "2026-04-23",
    endDate: "2026-06-23",
    locations: ["海外"],
    displayCap: 200,
    displayCurrency: "HKD",
    notes: "以 PayMe 銀聯卡經 NFC 免觸支付，以其他貨幣付款可享累積交易金額 10% 回贈。每個推廣階段兩項優惠合共最高 HK$200，兩個階段合共最高 HK$400；第一階段 2026-04-23 至 2026-05-22，第二階段 2026-05-23 至 2026-06-23。"
  },
  {
    cardName: "長城萬事達 YOU 卡",
    title: "Apple Pay 首3筆 100%返現",
    category: "general",
    tags: ["applepay"],
    bonusRate: 0,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    locations: ["香港", "澳門", "海外"],
    usageUsed: 0,
    usageTotal: 3,
    notes: "Apple Pay 首三筆消費 100% 返現，每筆最高返 US$5。"
  },
  {
    cardName: "長城萬事達 YOU 卡",
    title: "Apple Pay 首2筆額外返 US$3 + US$2",
    category: "general",
    tags: ["applepay"],
    bonusRate: 0,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    locations: ["香港", "澳門", "海外"],
    usageUsed: 0,
    usageTotal: 2,
    notes: "Apple Pay 首筆消費可獲 US$3 返現，第二筆消費可獲 US$2 返現。疊加上面 100% 返現後，第一筆最高 US$8、第二筆最高 US$7、第三筆最高 US$5。"
  },
  {
    cardName: "中信i享銀聯卡",
    title: "香港線下滿 HK$200 減 HK$20",
    category: "general",
    tags: ["shopping", "dining", "entertainment", "transport"],
    bonusRate: 0,
    minSpend: 200,
    cap: 20,
    currency: "HKD",
    startDate: "2026-01-01",
    endDate: "2026-05-31",
    locations: ["香港"],
    usageUsed: 0,
    usageTotal: 10,
    notes: "在香港線下消費滿 HK$200 可享 HK$20 立減，每用戶每天可享 1 次，累計最高可享 HK$200。"
  },
  {
    cardName: "中信i享銀聯卡",
    title: "境外線下隨機立減最高 30%",
    category: "general",
    tags: ["overseas"],
    bonusRate: 0,
    minSpend: 200,
    cap: 200,
    currency: "CNY",
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    locations: ["香港", "澳門", "海外"],
    notes: "在香港、澳門、新加坡、日本、韓國通過銀聯清算網絡的合資格境外線下交易，單筆交易金額滿 200 元可享實時隨機立減，最高 30%，每月每卡最高可享 200 元實時立減。"
  },
  {
    cardName: "中信萬事達扣賬卡",
    title: "Apple Pay 首2筆額外返 US$3 + US$2",
    category: "general",
    tags: ["applepay"],
    bonusRate: 0,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    locations: ["香港", "澳門", "海外"],
    usageUsed: 0,
    usageTotal: 2,
    notes: "Apple Pay 首筆消費可獲 US$3 返現，第二筆消費可獲 US$2 返現。"
  },
  {
    cardName: "農行萬事達白金卡",
    title: "每月首筆境外線下返 US$1",
    category: "general",
    tags: ["overseas"],
    bonusRate: 0,
    minSpend: 0,
    cap: 0,
    usageUsed: 0,
    usageTotal: 1,
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    locations: ["香港", "澳門", "海外"],
    notes: "每月首筆境外線下消費返 US$1。"
  },
  {
    cardName: "農行萬事達白金卡",
    title: "境外簽賬 1%",
    category: "general",
    tags: ["overseas"],
    bonusRate: 1,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    locations: ["香港", "澳門", "海外", "網上"],
    notes: "境外線上／線下消費筆筆返現 1%，每月返現金額不設上限。"
  },
  {
    cardName: "農行萬事達白金卡",
    title: "境外線下簽賬 3%",
    category: "general",
    tags: ["overseas"],
    bonusRate: 3,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    locations: ["香港", "澳門", "海外"],
    notes: "境外線下消費筆筆返現 3%，每季度返現上限 US$30，先消費先得，滿額即止。"
  },
  {
    cardName: "農行萬事達白金卡",
    title: "境外精選商戶 10%",
    category: "general",
    tags: ["merchant", "shopping", "travel", "dining", "transport", "entertainment", "subscription"],
    bonusRate: 10,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    locations: ["香港", "海外", "網上"],
    notes: "境外精選商戶消費筆筆返 10%，每季度返現上限 US$30，先消費先得，滿額即止。\n購物：COSTCO、IKEA、ARC'TERYX、LULULEMON、Saks Fifth Avenue、HARRODS、SOGO、KING POWER、SUNING、FARFETCH、SSENSE。\n出行：BOOKING.COM。\n外賣：UBER EATS、DELIVEROO、DOOR DASH。\n交通：UBER。\n娛樂：STEAM、NETFLIX、SPOTIFY、Sony PlayStation、Nintendo eShop。",
    requiresKeywords: ["costco", "ikea", "arc'teryx", "arcteryx", "lululemon", "saks fifth avenue", "harrods", "sogo", "king power", "suning", "farfetch", "ssense", "booking.com", "booking", "uber eats", "deliveroo", "door dash", "doordash", "uber", "steam", "netflix", "spotify", "sony playstation", "playstation", "nintendo eshop", "nintendo e-shop", "nintendo eshop"]
  },
  {
    cardName: "農行萬事達白金卡",
    title: "Apple Pay 首3筆 100%返現",
    category: "general",
    tags: ["applepay"],
    bonusRate: 0,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-06-30",
    locations: ["香港", "澳門", "海外"],
    usageUsed: 0,
    usageTotal: 3,
    notes: "Apple Pay 首三筆消費 100% 返現，每筆最高返 US$2。"
  },
  {
    cardName: "農行萬事達白金卡",
    title: "Apple Pay 首2筆額外返 US$3 + US$2",
    category: "general",
    tags: ["applepay"],
    bonusRate: 0,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    locations: ["香港", "澳門", "海外"],
    usageUsed: 0,
    usageTotal: 2,
    notes: "Apple Pay 首筆消費可獲 US$3 返現，第二筆消費可獲 US$2 返現。疊加上面 100% 返現後，第一筆最高 US$5、第二筆最高 US$4、第三筆最高 US$2。"
  },
  {
    cardName: "工行星座Visa卡",
    title: "香港 Apple Pay 滿 HK$50 返 US$2",
    category: "general",
    tags: ["applepay"],
    bonusRate: 0,
    minSpend: 50,
    cap: 0,
    currency: "HKD",
    displayCap: 8,
    displayCurrency: "USD",
    startDate: "2026-01-01",
    endDate: "2026-05-31",
    locations: ["香港"],
    usageUsed: 3,
    usageTotal: 4,
    notes: "在香港線下商戶以 Apple Pay 單筆消費滿 HK$50 可獲 US$2 返現，活動期間最多可返現 4 筆。"
  },
  {
    cardName: "工行星座Visa卡",
    title: "境外實體交通 10%",
    category: "transport",
    tags: ["overseas", "transport"],
    bonusRate: 10,
    minSpend: 0,
    cap: 0,
    displayCap: 30,
    displayCurrency: "USD",
    startDate: "2026-01-01",
    endDate: "2026-09-30",
    dateNote: "按季度上限",
    locations: ["香港", "澳門", "海外"],
    notes: "境外拍實體卡乘坐公共交通筆筆 10% 優惠獎勵，單日最高返 US$2，每季度累計最多可獲得 US$30 優惠獎勵。"
  },
  {
    cardName: "工行星座Visa卡",
    title: "境外 Apple Pay 交通 100%",
    category: "transport",
    tags: ["overseas", "transport", "applepay"],
    bonusRate: 0,
    minSpend: 0,
    cap: 0,
    displayCap: 15,
    displayCurrency: "USD",
    startDate: "2026-01-01",
    endDate: "2026-09-30",
    dateNote: "按季度上限",
    locations: ["香港", "澳門", "海外"],
    usageMode: "amount",
    usageUsed: 0,
    usageTotal: 15,
    usageCurrency: "USD",
    notes: "境外 Apple Pay 乘坐公共交通筆筆 100% 優惠獎勵，單日最高返 US$3，每季度累計最多可獲得 US$15 優惠獎勵。"
  },
  {
    cardName: "工行星座Visa卡",
    title: "境外線下匯率優惠最高 10%",
    category: "general",
    tags: ["overseas"],
    bonusRate: 0,
    minSpend: 0,
    cap: 0,
    displayCap: 25,
    displayCurrency: "USD",
    startDate: "2026-01-01",
    endDate: "2026-09-30",
    locations: ["香港", "澳門", "海外"],
    notes: "境外線下消費可享筆筆隨機匯率優惠，每筆最高 10% 匯率優惠獎勵，每月最多 US$25。"
  },
  {
    cardName: "工行星座Visa卡",
    title: "每滿 3 筆返 US$3",
    category: "general",
    tags: ["overseas"],
    bonusRate: 0,
    minSpend: 3,
    cap: 6,
    currency: "USD",
    displayMinSpend: "3筆 × US$3",
    startDate: "2026-01-01",
    endDate: "2026-09-30",
    locations: ["香港", "澳門", "海外", "網上"],
    notes: "每累計完成 3 筆單筆金額不低於等值 US$3 的合資格交易，即有機會獲得 US$3 返現獎勵；活動期間累計最高可獲得 US$6 返現獎勵。"
  },
  {
    cardName: "工行星座Visa卡",
    title: "境外簽賬 1%",
    category: "general",
    tags: ["overseas"],
    bonusRate: 1,
    minSpend: 0,
    cap: 0,
    startDate: "2026-01-01",
    endDate: "2026-10-31",
    locations: ["香港", "澳門", "海外", "網上"],
    notes: "境外線上／線下消費可享筆筆 1% 返現，返現金額不設上限。"
  }
];

const CATEGORY_LABELS = {
  general: "購物",
  online: "網上",
  dining: "餐飲",
  entertainment: "娛樂",
  shopping: "購物",
  clothing: "服飾",
  transport: "交通",
  travel: "旅遊",
  subscription: "訂閱",
  overseas: "海外",
  applepay: "Apple Pay",
  merchant: "指定商戶"
};

const CATEGORY_FILTER_ORDER = [
  "shopping",
  "dining",
  "entertainment",
  "travel",
  "transport",
  "subscription"
];

const SCENARIO_CATEGORY_OPTIONS = [
  "shopping",
  "dining",
  "entertainment",
  "travel",
  "transport",
  "subscription"
];

const CANONICAL_RECOMMENDATION_RULES = {
  [canonicalOfferKey("BOC Chill Card", "海外簽賬 4%")]: {
    group: "boc-chill-primary",
    channel: "either",
    regions: ["澳門", "內地", "海外"],
    currency: "foreign"
  },
  [canonicalOfferKey("BOC Chill Card", "網上簽賬 4%")]: {
    group: "boc-chill-primary",
    channel: "online",
    regions: "any",
    currency: "any"
  },
  [canonicalOfferKey("BOC Chill Card", "指定商戶 8%")]: {
    group: "boc-chill-primary",
    channel: "either",
    regions: "mixed",
    currency: "any",
    merchantMode: "chill-merchant",
    minSpendType: "monthlyQualified",
    titleSuffix: "monthlyQualified"
  },
  [canonicalOfferKey("HSBC 金卡", "澳門/內地/海外 2.4%")]: {
    group: null,
    channel: "offline",
    regions: ["澳門", "內地", "海外"],
    currency: "foreign"
  },
  [canonicalOfferKey("MMPOWER", "指定商戶 8%")]: {
    group: "mmpower-primary",
    channel: "either",
    regions: "mixed",
    currency: "any",
    merchantMode: "mmpower-merchant"
  },
  [canonicalOfferKey("MMPOWER", "網上娛樂 8%")]: {
    group: "mmpower-primary",
    channel: "online",
    regions: "any",
    currency: "any",
    merchantMode: "listed"
  },
  [canonicalOfferKey("MMPOWER", "網上服飾 8%")]: {
    group: "mmpower-primary",
    channel: "online",
    regions: "any",
    currency: "any",
    merchantMode: "listed"
  },
  [canonicalOfferKey("MMPOWER", "網上簽賬 5%")]: {
    group: "mmpower-primary",
    channel: "online",
    regions: "any",
    currency: "any",
    excludeWhenMatchedGroups: ["mmpower-merchant", "mmpower-entertainment", "mmpower-fashion"]
  },
  [canonicalOfferKey("MMPOWER", "海外實體外幣簽賬 4%")]: {
    group: "mmpower-primary",
    channel: "offline",
    regions: ["澳門", "內地", "海外"],
    currency: "foreign"
  },
  [canonicalOfferKey("恒生多貨幣扣賬卡", "指定海外商戶 15%")]: {
    group: null,
    channel: "offline",
    regions: ["海外"],
    currency: "any",
    merchantMode: "listed"
  },
  [canonicalOfferKey("恒生多貨幣扣賬卡", "指定海外交通 20%")]: {
    group: null,
    channel: "either",
    regions: ["內地", "海外"],
    currency: "any",
    merchantMode: "listed",
    categoryAnyOf: ["transport"]
  },
  [canonicalOfferKey("恒生多貨幣扣賬卡", "指定本地商戶 20%")]: {
    group: null,
    channel: "either",
    regions: ["香港"],
    currency: "any",
    merchantMode: "listed"
  },
  [canonicalOfferKey("AEON WAKUWAKU", "網上簽賬 6%")]: {
    group: null,
    channel: "online",
    regions: "any",
    currency: "any"
  },
  [canonicalOfferKey("AEON WAKUWAKU", "日本簽賬 3%")]: {
    group: null,
    channel: "either",
    regions: ["海外"],
    currency: "JPY",
    requireTags: ["japan"]
  },
  [canonicalOfferKey("AEON WAKUWAKU", "本地餐飲 1%")]: {
    group: null,
    channel: "either",
    regions: ["香港"],
    currency: "HKD",
    categoryAnyOf: ["dining"]
  },
  [canonicalOfferKey("DBS Live Fresh", "網上旅遊/娛樂/訂閱 外幣 6%")]: {
    group: "dbs-live-fresh-online",
    channel: "online",
    regions: "any",
    currency: "foreign",
    categoryAnyOf: ["travel", "entertainment", "subscription"],
    merchantMode: "listed-or-category",
    minSpendType: "single",
    payoutTiming: "instant"
  },
  [canonicalOfferKey("DBS Live Fresh", "網上旅遊/娛樂/訂閱 港幣 5%")]: {
    group: "dbs-live-fresh-online",
    channel: "online",
    regions: "any",
    currency: "HKD",
    categoryAnyOf: ["travel", "entertainment", "subscription"],
    merchantMode: "listed-or-category",
    minSpendType: "single",
    payoutTiming: "instant"
  },
  [canonicalOfferKey("DBS Live Fresh", "合資格網上外幣 1%")]: {
    group: "dbs-live-fresh-online",
    channel: "online",
    regions: ["澳門", "內地", "海外"],
    currency: "foreign",
    payoutTiming: "instant"
  },
  [canonicalOfferKey("中信i享銀聯卡", "香港線下滿 HK$200 減 HK$20")]: {
    group: null,
    channel: "offline",
    regions: ["香港"],
    currency: "HKD"
  },
  [canonicalOfferKey("PayMe 銀聯卡", "港幣/澳門幣/人民幣 3%")]: {
    group: "payme-nfc",
    channel: "offline",
    regions: ["香港", "澳門", "內地", "海外"],
    currencyAnyOf: ["HKD", "CNY", "MOP"]
  },
  [canonicalOfferKey("PayMe 銀聯卡", "其他貨幣 10%")]: {
    group: "payme-nfc",
    channel: "offline",
    regions: ["海外"],
    currency: "foreign",
    excludeCurrencies: ["HKD", "CNY", "MOP"]
  },
  [canonicalOfferKey("長城萬事達 YOU 卡", "Apple Pay 首3筆 100%返現")]: {
    group: null,
    channel: "either",
    regions: ["香港", "澳門", "海外"],
    currency: "any",
    paymentMethod: "applepay"
  },
  [canonicalOfferKey("長城萬事達 YOU 卡", "Apple Pay 首2筆額外返 US$3 + US$2")]: {
    group: null,
    channel: "either",
    regions: ["香港", "澳門", "海外"],
    currency: "any",
    paymentMethod: "applepay"
  },
  [canonicalOfferKey("中信萬事達扣賬卡", "Apple Pay 首2筆額外返 US$3 + US$2")]: {
    group: null,
    channel: "either",
    regions: ["香港", "澳門", "海外"],
    currency: "any",
    paymentMethod: "applepay"
  },
  [canonicalOfferKey("農行萬事達白金卡", "每月首筆境外線下返 US$1")]: {
    group: null,
    channel: "offline",
    regions: ["香港", "澳門", "海外"],
    currency: "any"
  },
  [canonicalOfferKey("農行萬事達白金卡", "境外簽賬 1%")]: {
    group: "abc-global-overseas",
    channel: "either",
    regions: ["香港", "澳門", "海外"],
    currency: "any"
  },
  [canonicalOfferKey("農行萬事達白金卡", "境外線下簽賬 3%")]: {
    group: "abc-global-overseas",
    channel: "offline",
    regions: ["香港", "澳門", "海外"],
    currency: "any"
  },
  [canonicalOfferKey("農行萬事達白金卡", "境外精選商戶 10%")]: {
    group: "abc-global-overseas",
    channel: "either",
    regions: "any",
    currency: "any",
    merchantMode: "listed"
  },
  [canonicalOfferKey("農行萬事達白金卡", "Apple Pay 首3筆 100%返現")]: {
    group: null,
    channel: "either",
    regions: ["香港", "澳門", "海外"],
    currency: "any",
    paymentMethod: "applepay"
  },
  [canonicalOfferKey("農行萬事達白金卡", "Apple Pay 首2筆額外返 US$3 + US$2")]: {
    group: null,
    channel: "either",
    regions: ["香港", "澳門", "海外"],
    currency: "any",
    paymentMethod: "applepay"
  },
  [canonicalOfferKey("工行星座Visa卡", "香港 Apple Pay 滿 HK$50 返 US$2")]: {
    group: null,
    channel: "offline",
    regions: ["香港"],
    currency: "HKD",
    paymentMethod: "applepay"
  },
  [canonicalOfferKey("工行星座Visa卡", "境外實體交通 10%")]: {
    group: "icbc-overseas-primary",
    channel: "offline",
    regions: ["香港", "澳門", "海外"],
    currency: "any",
    categoryAnyOf: ["transport"]
  },
  [canonicalOfferKey("工行星座Visa卡", "境外 Apple Pay 交通 100%")]: {
    group: "icbc-overseas-primary",
    channel: "offline",
    regions: ["香港", "澳門", "海外"],
    currency: "any",
    paymentMethod: "applepay",
    categoryAnyOf: ["transport"]
  },
  [canonicalOfferKey("工行星座Visa卡", "境外簽賬 1%")]: {
    group: "icbc-overseas-primary",
    channel: "either",
    regions: ["香港", "澳門", "海外"],
    currency: "any"
  }
};

const DEFAULT_STATE = {
  cards: [],
  offers: [],
  settings: {
    chillMonthlyQualified: false
  }
};

let state = loadData();
const uiState = {
  editingOfferId: null,
  recommendResultScope: "",
  latestRecommendationRenderData: null
};

function updateHkdHint() {
  const currency = document.getElementById("recommend-currency").value;
  const amount = parseFloat(document.getElementById("recommend-amount").value);
  const hint = document.getElementById("recommend-hkd-hint");
  if (currency !== "HKD" && amount > 0) {
    const hkd = convertCurrencyAmount(amount, currency, "HKD");
    hint.textContent = `≈ HK$${hkd.toFixed(2)}`;
    hint.style.display = "";
  } else {
    hint.style.display = "none";
  }
}

function applyExchangeRates(rates) {
  const map = { USD: "usd", CNY: "cny", JPY: "jpy", KRW: "krw", MOP: "mop", THB: "thb", TWD: "twd" };
  for (const [code, key] of Object.entries(map)) {
    const perHkd = rates[key];
    if (perHkd && perHkd > 0) CURRENCY_TO_HKD[code] = 1 / perHkd;
  }
}

function setFxRateStatus(ts) {
  const el = document.getElementById("fx-rate-status");
  if (!el) return;
  const source = `<a href="https://latest.currency-api.pages.dev/v1/currencies/hkd.json" target="_blank" rel="noopener" class="fx-source-link">匯率來源</a>`;
  if (!ts) {
    el.className = "field-hint fx-rate-status static";
    el.innerHTML = `靜態匯率 · ${source}`;
    return;
  }
  const rateDate = new Date(ts);
  const today = new Date();
  const isToday = rateDate.toDateString() === today.toDateString();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const isYesterday = rateDate.toDateString() === yesterday.toDateString();
  let label;
  if (isToday) {
    el.className = "field-hint fx-rate-status live";
    label = "實時匯率";
  } else if (isYesterday) {
    el.className = "field-hint fx-rate-status live";
    label = "匯率（昨日）";
  } else {
    el.className = "field-hint fx-rate-status static";
    const dateStr = rateDate.toLocaleDateString("zh-HK", { month: "numeric", day: "numeric" });
    label = `匯率（${dateStr}）`;
  }
  el.innerHTML = `${label} · ${source}`;
}

async function fetchLiveRates() {
  const CACHE_KEY = "ccr_fx_rates_v2";
  let cachedFetchTs = null;
  let cachedDataTs = null;
  let cachedRates = null;
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { fetchTs, dataTs, rates } = JSON.parse(cached);
      cachedFetchTs = fetchTs;
      cachedDataTs = dataTs ?? fetchTs;
      cachedRates = rates;
    }
  } catch {}
  if (cachedRates) {
    applyExchangeRates(cachedRates);
    updateHkdHint();
    setFxRateStatus(cachedDataTs);
  }
  // Re-fetch at most once per day (based on fetch time, not API data date)
  const cachedDay = cachedFetchTs && new Date(cachedFetchTs).toLocaleDateString("en-CA", { timeZone: "Asia/Hong_Kong" });
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Hong_Kong" });
  if (!cachedFetchTs || cachedDay !== today) {
    const URLS = [
      "https://latest.currency-api.pages.dev/v1/currencies/hkd.json",
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/hkd.json",
    ];
    for (const url of URLS) {
      try {
        const res = await fetch(url);
        if (!res.ok) continue;
        const data = await res.json();
        if (!data.hkd) continue;
        const fetchTs = Date.now();
        // dataTs reflects actual API data age for display; fetchTs controls daily re-fetch
        const dataTs = data.date ? new Date(data.date + "T12:00:00+08:00").getTime() : fetchTs;
        localStorage.setItem(CACHE_KEY, JSON.stringify({ fetchTs, dataTs, rates: data.hkd }));
        applyExchangeRates(data.hkd);
        updateHkdHint();
        setFxRateStatus(dataTs);
        return;
      } catch {}
    }
    if (!cachedRates) setFxRateStatus(null);
  }
}

bootstrap();

function bootstrap() {
  state.settings = {
    ...structuredClone(DEFAULT_STATE.settings),
    ...(state.settings || {})
  };
  state.cards = state.cards.map(normalizeCard);
  state.offers = state.offers.map(normalizeOffer);
  if (!state.cards.length) {
    state.cards = CANONICAL_CARD_DEFINITIONS.map((definition) => normalizeCard({
      id: crypto.randomUUID(),
      ...definition
    }));
  }
  migrateStoredData();
  seedDefaultOffers();
  renderOfferLocationCheckboxes();
  document.getElementById("recommend-date").value = todayString();
  bindEvents();
  renderAll();
  maybeRegisterServiceWorker();
  fetchLiveRates();
}

function bindEvents() {
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", () => switchPage(button.dataset.page));
  });

  document.getElementById("runRecommendationBtn").addEventListener("click", runRecommendation);
  document.getElementById("clearRecommendBtn").addEventListener("click", clearRecommendForm);

  document.getElementById("recommend-currency").addEventListener("change", updateHkdHint);
  document.getElementById("recommend-amount").addEventListener("input", updateHkdHint);
  document.getElementById("saveOfferBtn").addEventListener("click", saveOffer);
  document.getElementById("resetOfferFormBtn").addEventListener("click", () => resetOfferForm());
  document.getElementById("card-search").addEventListener("input", renderCards);
  document.querySelectorAll("#card-region-filter [data-region-scope]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("#card-region-filter [data-region-scope]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderCardFilters();
      renderCards();
    });
  });
  document.getElementById("card-bank-filter").addEventListener("change", renderCards);
  document.getElementById("card-category-filter").addEventListener("change", renderCards);
  document.getElementById("card-merchant-search").addEventListener("input", renderCards);
  document.getElementById("clearCardFiltersBtn").addEventListener("click", clearCardFilters);
  initMerchantAutocomplete("recommend-merchant", "merchant-suggestions");
  initMerchantAutocomplete("card-merchant-search", "card-merchant-suggestions");
}

function positionSuggestions(input, dropdown) {
  const rect = input.getBoundingClientRect();
  // visualViewport.height shrinks when keyboard opens on iOS; window.innerHeight does not
  const vvHeight = (window.visualViewport ? window.visualViewport.height : window.innerHeight);
  const spaceBelow = vvHeight - rect.bottom;
  const spaceAbove = rect.top;
  const maxH = 220;
  if (spaceBelow >= 80 || spaceBelow >= spaceAbove) {
    dropdown.style.top = "100%";
    dropdown.style.bottom = "auto";
    dropdown.style.maxHeight = Math.min(maxH, spaceBelow - 8) + "px";
  } else {
    dropdown.style.bottom = "100%";
    dropdown.style.top = "auto";
    dropdown.style.maxHeight = Math.min(maxH, spaceAbove - 8) + "px";
  }
}

function initMerchantAutocomplete(inputId, suggestionsId) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(suggestionsId);
  if (!input || !dropdown) return;

  const reposition = () => { if (!dropdown.hidden) positionSuggestions(input, dropdown); };
  window.addEventListener("resize", reposition, { passive: true });
  window.addEventListener("scroll", reposition, { passive: true });

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { dropdown.hidden = true; return; }
    const matches = MERCHANT_SUGGESTIONS.filter(([display, variants]) =>
      display.toLowerCase().includes(q) || variants.some((v) => v.includes(q))
    ).slice(0, 5);
    if (!matches.length) { dropdown.hidden = true; return; }
    dropdown.innerHTML = matches.map(([display]) =>
      `<div class="merchant-suggestion-item" onpointerdown="selectMerchantSuggestion(event,'${inputId}')">${escapeHtml(display)}</div>`
    ).join("");
    dropdown.hidden = false;
    positionSuggestions(input, dropdown);
  });

  input.addEventListener("blur", () => { setTimeout(() => { dropdown.hidden = true; }, 150); });
}

function selectMerchantSuggestion(event, inputId) {
  event.preventDefault();
  const input = document.getElementById(inputId || "recommend-merchant");
  const display = event.currentTarget.textContent;
  input.value = display.replace(/（[^）]*）/, "").trim();
  event.currentTarget.closest(".merchant-suggestions").hidden = true;
  input.blur();
  if (inputId === "card-merchant-search") renderCards();
  else updateHkdHint();
}

function switchPage(page) {
  document.querySelectorAll(".page").forEach((section) => {
    section.classList.toggle("active", section.id === `page-${page}`);
  });
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.page === page);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}


function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    return { ...structuredClone(DEFAULT_STATE), ...JSON.parse(raw) };
  } catch (error) {
    console.error(error);
    return structuredClone(DEFAULT_STATE);
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalizeCard(card) {
  return {
    id: card.id || crypto.randomUUID(),
    name: card.name || "未命名信用卡",
    bank: card.bank || "未分類",
    baseRate: Number(card.baseRate || 0),
    currency: card.currency || "HKD",
    notes: card.notes || "",
    tags: Array.isArray(card.tags) ? card.tags : []
  };
}

function normalizeOffer(offer) {
  const category = offer.category || "general";
  const title = offer.title || "未命名優惠";
  const notes = offer.notes || "";
  const tags = new Set(Array.isArray(offer.tags) ? offer.tags : []);

  if (category && category !== "general") {
    tags.add(category);
  }
  if ((offer.locations || []).includes("網上") || title.includes("網上") || notes.includes("網上")) {
    tags.add("online");
  }
  if ((offer.locations || []).some((location) => ["海外", "澳門", "內地"].includes(location)) || title.includes("海外") || notes.includes("海外") || notes.includes("外幣")) {
    tags.add("overseas");
  }
  if (title.includes("Apple Pay")) {
    tags.add("applepay");
  }
  if (title.includes("指定") || notes.includes("指定") || notes.includes("僅適用")) {
    tags.add("merchant");
  }
  if (title.includes("Netflix") || title.includes("Spotify") || title.includes("Disney+")
    || notes.includes("Netflix") || notes.includes("Spotify") || notes.includes("Disney+")
    || notes.includes("Apple TV") || notes.includes("App Store") || notes.includes("訂閱")) {
    tags.add("subscription");
  }
  if (title.includes("戲院") || notes.includes("戲院") || category === "entertainment" || notes.includes("娛樂")) {
    tags.add("entertainment");
  }
  if (title.includes("咖啡") || notes.includes("咖啡") || notes.includes("McDonald's") || notes.includes("Starbucks") || notes.includes("Pacific Coffee")) {
    tags.add("dining");
  }
  if (title.includes("Uniqlo") || title.includes("IKEA") || notes.includes("Uniqlo") || notes.includes("GU") || notes.includes("IKEA")
    || notes.includes("POP MART") || notes.includes("唐吉訶德") || notes.includes("松本清")) {
    tags.add("shopping");
  }

  return {
    id: offer.id || crypto.randomUUID(),
    cardId: offer.cardId || "",
    canonicalKey: offer.canonicalKey || "",
    title,
    category,
    bonusRate: Number(offer.bonusRate || 0),
    minSpend: Number(offer.minSpend || 0),
    cap: Number(offer.cap || 0),
    currency: offer.currency || "",
    displayMinSpend: offer.displayMinSpend || "",
    displayCap: Number(offer.displayCap || 0),
    displayCurrency: offer.displayCurrency || "",
    startDate: offer.startDate || todayString(),
    endDate: offer.endDate || todayString(),
    dateNote: offer.dateNote || "",
    locations: Array.isArray(offer.locations) ? offer.locations : [],
    usageMode: offer.usageMode || "count",
    usageUsed: Number(offer.usageUsed || 0),
    usageTotal: Number(offer.usageTotal || 0),
    usageCurrency: offer.usageCurrency || "",
    notes,
    tags: [...tags],
    requiresKeywords: Array.isArray(offer.requiresKeywords) ? offer.requiresKeywords : []
  };
}

function migrateStoredData() {
  const existingCards = (Array.isArray(state.cards) ? state.cards : [])
    .map((card) => ({
      ...card,
      name: LEGACY_CARD_NAME_MAP[card.name] || card.name
    }));
  const customCards = existingCards
    .filter((card) => !CANONICAL_CARD_DEFINITIONS.some((item) => item.name === card.name))
    .map((card) => ({
      id: card.id || crypto.randomUUID(),
      ...card
    }));

  const canonicalCards = CANONICAL_CARD_DEFINITIONS.map((definition) => {
    const existing = existingCards.find((card) => card.name === definition.name);
    return {
      id: existing?.id || crypto.randomUUID(),
      ...definition
    };
  });

  state.cards = [...canonicalCards, ...customCards].map(normalizeCard);

  const cardIdByName = Object.fromEntries(state.cards.map((card) => [card.name, card.id]));
  const canonicalCardNames = new Set(CANONICAL_CARD_DEFINITIONS.map((card) => card.name));
  const existingCardById = Object.fromEntries(existingCards.map((card) => [card.id, card]));
  const existingOffers = Array.isArray(state.offers) ? state.offers : [];
  existingOffers.forEach((offer) => {
    const linkedCard = existingCardById[offer.cardId];
    const cardName = linkedCard?.name || "";
    const legacyKey = canonicalOfferKey(cardName, offer.title || "");
    const nextTitle = LEGACY_OFFER_TITLE_MAP[legacyKey];
    if (nextTitle) {
      offer.title = nextTitle;
      offer.canonicalKey = canonicalOfferKey(cardName, nextTitle);
    }
  });
  const customOffers = existingOffers.filter((offer) => {
    // 已廢棄的正式優惠標題，清除
    if (DEPRECATED_OFFER_TITLES.has(offer.title)) return false;
    // 只保留自訂卡（非正式卡）的優惠；正式卡的優惠由 canonicalOffers 重建
    const linkedCard = existingCardById[offer.cardId];
    return !linkedCard || !canonicalCardNames.has(linkedCard.name);
  });

  const seenOfferIds = new Set();
  const canonicalOffers = CANONICAL_OFFER_DEFINITIONS.map((definition) => {
    const key = canonicalOfferKey(definition.cardName, definition.title);
    const existing = findExistingCanonicalOffer(definition, existingOffers, existingCardById);
    const existingDisplayCap = Number(existing?.displayCap || 0);
    const definitionDisplayCap = Number(definition.displayCap || 0);
    const existingUsageTotal = Number(existing?.usageTotal || 0);
    const definitionUsageTotal = Number(definition.usageTotal || 0);
    const existingId = existing?.id || "";
    const offerId = existingId && !seenOfferIds.has(existingId) ? existingId : crypto.randomUUID();
    seenOfferIds.add(offerId);
    return normalizeOffer({
      id: offerId,
      canonicalKey: key,
      cardId: cardIdByName[definition.cardName] || "",
      title: definition.title,
      category: definition.category,
      tags: definition.tags,
      bonusRate: definition.bonusRate,
      minSpend: definition.minSpend,
      cap: definition.cap,
      currency: existing?.currency || definition.currency,
      displayMinSpend: existing?.displayMinSpend || definition.displayMinSpend,
      displayCap: existingDisplayCap > 0 ? existingDisplayCap : definitionDisplayCap,
      displayCurrency: existing?.displayCurrency || definition.displayCurrency,
      startDate: definition.startDate,
      endDate: definition.endDate,
      dateNote: existing?.dateNote || definition.dateNote,
      locations: definition.locations,
      usageMode: definition.usageMode || existing?.usageMode,
      usageUsed: existing?.usageUsed ?? definition.usageUsed,
      usageTotal: existingUsageTotal > 0 ? existingUsageTotal : definitionUsageTotal,
      usageCurrency: existing?.usageCurrency || definition.usageCurrency,
      notes: definition.notes,
      requiresKeywords: definition.requiresKeywords
    });
  });

  state.offers = [...canonicalOffers, ...customOffers];
  saveData();
}

function seedDefaultOffers() {
  if (state.offers.length > 0) return;
  const cardIdByName = Object.fromEntries(state.cards.map((card) => [card.name, card.id]));
  state.offers = CANONICAL_OFFER_DEFINITIONS.map((definition) => normalizeOffer({
    id: crypto.randomUUID(),
    canonicalKey: canonicalOfferKey(definition.cardName, definition.title),
    cardId: cardIdByName[definition.cardName] || "",
    title: definition.title,
    category: definition.category,
    tags: definition.tags,
    bonusRate: definition.bonusRate,
    minSpend: definition.minSpend,
    cap: definition.cap,
    currency: definition.currency,
    displayMinSpend: definition.displayMinSpend,
    displayCap: definition.displayCap,
    displayCurrency: definition.displayCurrency,
    startDate: definition.startDate,
    endDate: definition.endDate,
    dateNote: definition.dateNote,
    locations: definition.locations,
    usageMode: definition.usageMode,
    usageUsed: definition.usageUsed,
    usageTotal: definition.usageTotal,
    usageCurrency: definition.usageCurrency,
    notes: definition.notes,
    requiresKeywords: definition.requiresKeywords
  }));
  saveData();
}

function renderAll() {
  renderCardFilters();
  renderCards();
}

function renderOfferLocationCheckboxes() {
  document.getElementById("offer-location-options").innerHTML = LOCATION_OPTIONS.map((location) => `
    <label class="check-chip">
      <input type="checkbox" name="offer-location" value="${location}">
      <span>${location}</span>
    </label>
  `).join("");
}

function openOfferComposer() {
  document.getElementById("offerComposer").classList.add("show");
  document.getElementById("offer-title").focus();
}

function closeOfferComposer() {
  document.getElementById("offerComposer").classList.remove("show");
}

function renderCards() {
  const query = document.getElementById("card-search").value.trim().toLowerCase();
  const merchantQuery = (document.getElementById("card-merchant-search")?.value || "").trim();
  const regionScope = getActiveCardRegionScope();
  const bankFilter = document.getElementById("card-bank-filter").value.trim();
  const categoryFilter = document.getElementById("card-category-filter").value.trim();
  const filtered = state.cards.filter((card) => {
    const haystack = [card.name, card.bank, card.notes].join(" ").toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesRegion = cardMatchesRegionScope(card, regionScope);
    const matchesBank = !bankFilter || card.bank === bankFilter;
    const cardCategories = new Set([
      ...((card.tags || []).filter(Boolean)),
      ...state.offers
        .filter((offer) => offer.cardId === card.id)
        .flatMap((offer) => [offer.category, ...(offer.tags || [])].filter(Boolean))
    ]);
    const matchesCategory = !categoryFilter || cardCategories.has(categoryFilter);
    if (merchantQuery) {
      const cardOffers = state.offers.filter((o) => o.cardId === card.id);
      if (!cardOffers.some((o) => cardOfferMatchesMerchantQuery(o, merchantQuery))) return false;
    }
    return matchesQuery && matchesRegion && matchesBank && matchesCategory;
  }).sort((left, right) => {
    const leftIndex = CARD_DISPLAY_ORDER.indexOf(left.name);
    const rightIndex = CARD_DISPLAY_ORDER.indexOf(right.name);
    if (leftIndex !== -1 && rightIndex !== -1 && leftIndex !== rightIndex) return leftIndex - rightIndex;
    if (leftIndex !== -1) return -1;
    if (rightIndex !== -1) return 1;
    return left.name.localeCompare(right.name, "zh-Hant");
  });

  const savedScrollY = window.scrollY;
  if (!filtered.length) {
    document.getElementById("cardsList").innerHTML = `<div class="empty-state">暫時未有可顯示的信用卡資料。</div>`;
    requestAnimationFrame(() => window.scrollTo(0, savedScrollY));
    return;
  }
  const expandedIds = new Set(
    [...document.querySelectorAll("#cardsList .list-card.expanded[data-card-id]")].map((el) => el.dataset.cardId)
  );
  document.getElementById("cardsList").innerHTML = filtered.map((card) => renderCardMarkup(card, merchantQuery)).join("");
  if (expandedIds.size) {
    document.querySelectorAll("#cardsList .list-card[data-card-id]").forEach((el) => {
      if (expandedIds.has(el.dataset.cardId)) el.classList.add("expanded");
    });
  }
  window.scrollTo({ top: savedScrollY, behavior: "instant" });
}

function renderCardMarkup(card, merchantQuery = "") {
  const isMainland = isMainlandCard(card);
  const cardOffers = state.offers
    .filter((offer) => offer.cardId === card.id)
    .sort((left, right) => {
      if (isMainland) {
        const leftDisplayOrder = getOfferDisplayOrder(card.name, left);
        const rightDisplayOrder = getOfferDisplayOrder(card.name, right);
        if (leftDisplayOrder !== rightDisplayOrder) return leftDisplayOrder - rightDisplayOrder;
      }
      const leftTotal = Number(left.bonusRate || 0) + Number(card.baseRate || 0);
      const rightTotal = Number(right.bonusRate || 0) + Number(card.baseRate || 0);
      if (rightTotal !== leftTotal) return rightTotal - leftTotal;
      if (Number(right.bonusRate || 0) !== Number(left.bonusRate || 0)) return Number(right.bonusRate || 0) - Number(left.bonusRate || 0);
      return left.title.localeCompare(right.title, "zh-Hant");
    });
  const strongestOffer = cardOffers.reduce((best, offer) => {
    if (!best || Number(offer.bonusRate || 0) > Number(best.bonusRate || 0)) return offer;
    return best;
  }, null);
  const highestRewardText = strongestOffer
    ? formatPercent(Number(strongestOffer.bonusRate || 0) + Number(card.baseRate || 0))
    : formatPercent(card.baseRate);
  const restrictionText = card.notes ? card.notes.trim() : "";
  const displayOffers = merchantQuery
    ? cardOffers.filter((offer) => cardOfferMatchesMerchantQuery(offer, merchantQuery))
    : cardOffers;
  const offerMarkup = displayOffers.length ? `
    <div class="details" style="margin-top:12px;">
      <div><strong>規則與優惠：</strong></div>
      <div class="offer-list">
        ${displayOffers.map((offer) => `
          <article class="offer-card${merchantQuery ? " merchant-match" : ""}">
            <div class="offer-card-header">
              <div class="offer-card-heading">
                <h4 class="offer-card-title">${escapeHtml(offer.title)}</h4>
              </div>
              <div class="offer-card-actions">
                <div class="offer-card-date">${escapeHtml(formatOfferDate(offer))}</div>
                <button class="tiny-btn" onclick="editOffer('${offer.id}')">編輯規則</button>
              </div>
            </div>
            ${/迎新/.test(`${offer.title || ""} ${offer.notes || ""}`) ? "" : `
              <div class="offer-card-meta">
                ${renderOfferLocationChip(offer, card.name)}
                ${offer.displayMinSpend
                  ? `<span class="chip chip-threshold">門檻 ${escapeHtml(offer.displayMinSpend)}</span>`
                  : Number(offer.minSpend || 0) > 0
                    ? `<span class="chip chip-threshold">門檻 ${escapeHtml(formatAmountByCurrency(offer.minSpend, offer.currency || card.currency))}</span>`
                    : ""}
                ${Number(offer.displayCap || offer.cap || 0) > 0 ? `<span class="chip chip-cap">上限 ${escapeHtml(formatAmountByCurrency(offer.displayCap || offer.cap, offer.displayCurrency || offer.currency || card.currency))}</span>` : ""}
                ${Number(offer.usageTotal || 0) > 0
                  ? `<button class="chip chip-status ${isOfferExhausted(offer) ? "is-complete" : ""}" type="button" onclick="cycleOfferUsage('${offer.id}')" aria-label="更新已用狀態：${escapeHtml(offer.title)}">已用 ${escapeHtml(formatUsageText(offer))}</button>`
                  : ""}
              </div>
            `}
            ${offer.notes ? `<div class="offer-card-note">${merchantQuery ? highlightMerchantInText(offer.notes, merchantQuery) : escapeHtml(offer.notes)}</div>` : ""}
            ${card.name === "BOC Chill Card" && offer.title === "指定商戶 8%" ? `
              <div class="offer-setting">
                <div class="check-grid">
                  <label class="check-chip">
                    <input type="checkbox" ${state.settings?.chillMonthlyQualified ? "checked" : ""} onchange="setChillMonthlyQualified(this.checked)">
                    <span>今月合資格簽賬已滿 HK$1,000</span>
                  </label>
                </div>
                <p class="field-hint">只影響呢個 8% 指定商戶判斷，推薦時計入。</p>
              </div>
            ` : ""}
          </article>
        `).join("")}
      </div>
    </div>
  ` : "";

  return `
    <article class="list-card${merchantQuery ? " expanded" : ""}" data-card-id="${escapeHtml(card.id)}">
      <div class="card-top" onclick="toggleListCard(this.closest('.list-card'))">
        <div>
          <h3 class="card-name">${escapeHtml(card.name)}</h3>
        </div>
        <span class="list-card-chevron">›</span>
      </div>
      <div class="list-card-body">
        <div class="details" style="margin-top:8px;">
          ${isMainland ? "" : `<div><strong>最高可達：</strong>${escapeHtml(highestRewardText)}</div>`}
          ${restrictionText ? `<div><strong>限制：</strong>${escapeHtml(restrictionText)}</div>` : ""}
        </div>
        ${offerMarkup}
      </div>
    </article>
  `;
}

function isMainlandCard(card) {
  return MAINLAND_CARD_NAMES.has(card?.name || "");
}

function getOfferDisplayOrder(cardName, offer) {
  const canonicalIndex = CANONICAL_OFFER_DEFINITIONS.findIndex((definition) =>
    definition.cardName === cardName && definition.title === offer.title
  );
  return canonicalIndex === -1 ? Number.MAX_SAFE_INTEGER : canonicalIndex;
}

function getActiveCardRegionScope() {
  return document.querySelector("#card-region-filter [data-region-scope].active")?.dataset.regionScope || "";
}

function cardMatchesRegionScope(card, regionScope) {
  return !regionScope
    || (regionScope === "hk" && !isMainlandCard(card))
    || (regionScope === "cn" && isMainlandCard(card));
}

function renderCardFilters() {
  const bankSelect = document.getElementById("card-bank-filter");
  const categorySelect = document.getElementById("card-category-filter");
  const currentBank = bankSelect.value;
  const currentCategory = categorySelect.value;
  const regionScope = getActiveCardRegionScope();
  const orderedCards = [...state.cards].sort((left, right) => {
    const leftIndex = CARD_DISPLAY_ORDER.indexOf(left.name);
    const rightIndex = CARD_DISPLAY_ORDER.indexOf(right.name);
    if (leftIndex !== -1 && rightIndex !== -1 && leftIndex !== rightIndex) return leftIndex - rightIndex;
    if (leftIndex !== -1) return -1;
    if (rightIndex !== -1) return 1;
    return left.name.localeCompare(right.name, "zh-Hant");
  }).filter((card) => cardMatchesRegionScope(card, regionScope));
  const banks = [...new Set(orderedCards.map((card) => card.bank).filter(Boolean))];
  const categories = CATEGORY_FILTER_ORDER.filter((category) => state.cards.some((card) => {
    const cardCategories = new Set([
      ...((card.tags || []).filter(Boolean)),
      ...state.offers
        .filter((offer) => offer.cardId === card.id)
        .flatMap((offer) => [offer.category, ...(offer.tags || [])].filter(Boolean))
    ]);
    return cardCategories.has(category);
  }));

  bankSelect.innerHTML = `<option value="">全部銀行</option>${banks.map((bank) => `<option value="${escapeHtml(bank)}">${escapeHtml(bank)}</option>`).join("")}`;
  categorySelect.innerHTML = `<option value="">全部類型</option>${categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(CATEGORY_LABELS[category] || category)}</option>`).join("")}`;
  bankSelect.value = banks.includes(currentBank) ? currentBank : "";
  categorySelect.value = categories.includes(currentCategory) ? currentCategory : "";
}

function clearCardFilters() {
  document.getElementById("card-search").value = "";
  document.getElementById("card-merchant-search").value = "";
  document.querySelectorAll("#card-region-filter [data-region-scope]").forEach((item) => item.classList.remove("active"));
  document.querySelector('#card-region-filter [data-region-scope=""]').classList.add("active");
  document.getElementById("card-bank-filter").value = "";
  document.getElementById("card-category-filter").value = "";
  renderCards();
}

function cardOfferMatchesMerchantQuery(offer, query) {
  if (!query) return false;
  const normalizedQuery = query.toLowerCase();
  const tokens = collectMerchantTokens(normalizedQuery);
  const keywords = Array.isArray(offer.requiresKeywords) ? offer.requiresKeywords.map((k) => k.toLowerCase()) : [];
  if (keywords.length) return keywords.some((k) => tokens.includes(k) || keywordMatchesDescription(k, normalizedQuery));
  return (offer.title || "").toLowerCase().includes(normalizedQuery);
}

function highlightMerchantInText(text, query) {
  if (!query || !text) return escapeHtml(text || "");
  const escaped = escapeHtml(text);
  const q = query.trim().toLowerCase();
  const terms = new Set([q]);
  collectMerchantTokens(q).forEach((t) => terms.add(t));
  MERCHANT_SUGGESTIONS.forEach(([, variants]) => {
    if (variants.some((v) => v.includes(q))) variants.forEach((v) => terms.add(v));
  });
  let result = escaped;
  for (const term of [...terms].filter((t) => t.length >= 2)) {
    const escapedTerm = escapeHtml(term).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result.replace(new RegExp(`(${escapedTerm})`, "gi"), '<mark class="merchant-hl">$1</mark>');
  }
  return result;
}

function saveOffer() {
  if (!uiState.editingOfferId) {
    showToast("請由優惠卡上的編輯規則按鈕進入。");
    return;
  }

  const offer = state.offers.find((item) => item.id === uiState.editingOfferId);
  if (!offer) return;

  const title = document.getElementById("offer-title").value.trim();
  const startDate = document.getElementById("offer-start-date").value;
  const endDate = document.getElementById("offer-end-date").value;
  const minSpend = Number(document.getElementById("offer-min-spend").value || 0);
  const cap = Number(document.getElementById("offer-cap").value || 0);

  if (!title || !startDate || !endDate) {
    showToast("請先填好優惠名稱和日期。");
    return;
  }

  if (endDate < startDate) {
    showToast("結束日期不可早過開始日期。");
    return;
  }

  Object.assign(offer, normalizeOffer({
    ...offer,
    title,
    startDate,
    endDate,
    locations: getCheckedValues("offer-location"),
    minSpend: Number.isNaN(minSpend) ? 0 : minSpend,
    cap: Number.isNaN(cap) ? 0 : cap,
    notes: document.getElementById("offer-notes").value.trim(),
    requiresKeywords: parseList(document.getElementById("offer-keywords").value)
  }));

  saveData();
  resetOfferForm(false);
  renderAll();
  showToast("優惠規則已更新。");
}

function resetOfferForm(announce = true) {
  ["offer-title", "offer-start-date", "offer-end-date", "offer-min-spend", "offer-cap", "offer-notes", "offer-keywords"].forEach((id) => {
    document.getElementById(id).value = "";
  });
  setCheckedValues("offer-location", []);
  uiState.editingOfferId = null;
  closeOfferComposer();
  if (announce) showToast("已收起規則表單。");
}

function editOffer(offerId) {
  const offer = state.offers.find((item) => item.id === offerId);
  if (!offer) return;
  uiState.editingOfferId = offerId;
  openOfferComposer();
  document.getElementById("offer-title").value = offer.title || "";
  document.getElementById("offer-start-date").value = offer.startDate || "";
  document.getElementById("offer-end-date").value = offer.endDate || "";
  document.getElementById("offer-min-spend").value = Number(offer.minSpend || 0) > 0 ? Number(offer.minSpend || 0) : "";
  document.getElementById("offer-cap").value = Number(offer.cap || 0) > 0 ? Number(offer.cap || 0) : "";
  document.getElementById("offer-notes").value = offer.notes || "";
  document.getElementById("offer-keywords").value = (offer.requiresKeywords || []).join(", ");
  setCheckedValues("offer-location", offer.locations || []);
  switchPage("cards");
}

function clearRecommendForm() {
  const defaultRegion = document.querySelector('input[name="recommend-region"][value="香港"]');
  if (defaultRegion) defaultRegion.checked = true;
  const defaultChannel = document.querySelector('input[name="recommend-channel"][value="offline"]');
  if (defaultChannel) defaultChannel.checked = true;
  const defaultCategory = document.querySelector('input[name="recommend-category"][value="general"]');
  if (defaultCategory) defaultCategory.checked = true;
  const merchantEl = document.getElementById("recommend-merchant");
  if (merchantEl) merchantEl.value = "";
  document.getElementById("recommend-amount").value = "";
  document.getElementById("recommend-currency").value = "HKD";
  document.getElementById("recommend-date").value = todayString();
  uiState.latestRecommendationRenderData = null;
  document.getElementById("recommendClarifications").innerHTML = "";
  document.getElementById("recommendationResults").innerHTML = "";
}

function setChillMonthlyQualified(checked) {
  state.settings.chillMonthlyQualified = Boolean(checked);
  saveData();
  if (uiState.latestRecommendationRenderData) runRecommendation();
}

function runRecommendation() {
  const region = document.querySelector('input[name="recommend-region"]:checked')?.value || "香港";
  const channel = document.querySelector('input[name="recommend-channel"]:checked')?.value || "offline";
  const category = document.querySelector('input[name="recommend-category"]:checked')?.value || "general";
  const merchantRaw = (document.getElementById("recommend-merchant")?.value || "").trim();
  const amountRaw = document.getElementById("recommend-amount").value;
  const amount = amountRaw === "" ? null : Number(amountRaw);
  const currency = document.getElementById("recommend-currency").value || "HKD";
  const date = document.getElementById("recommend-date").value;

  if (!date) {
    showToast("請先填好消費日期。");
    return;
  }

  const locations = channel === "online" ? [region, "網上"] : [region];
  const scenarioTags = new Set();
  if (channel === "online") scenarioTags.add("online");
  if (region === "海外") scenarioTags.add("overseas");
  if (category !== "general") scenarioTags.add(category);

  const normalizedMerchant = merchantRaw.toLowerCase();
  let merchantTokens = [];
  if (merchantRaw) {
    merchantTokens = collectMerchantTokens(normalizedMerchant);
    if (!merchantTokens.length) merchantTokens = [normalizedMerchant];
  }

  const scenario = {
    description: merchantRaw,
    amount,
    currency,
    date,
    location: region,
    locations,
    regions: [region],
    channel,
    channelExplicit: true,
    regionExplicit: true,
    category,
    normalizedDescription: normalizedMerchant,
    paymentMethod: "applepay",
    scenarioTags: [...scenarioTags],
    merchantTokens
  };

  if (merchantRaw) scenario.confirmedMerchant = normalizedMerchant;

  scenario.currencyBucket = inferCurrencyBucket(currency, locations, merchantRaw);
  scenario.flags = { chillMonthlyQualified: Boolean(state.settings?.chillMonthlyQualified) };

  document.getElementById("recommendClarifications").innerHTML = "";

  const rateMode = amount === null || amount <= 0;
  const results = state.cards.map((card) => evaluateCard(card, scenario, rateMode))
    .sort((a, b) => b.rankingScore - a.rankingScore);

  renderRecommendationResults(results, scenario, rateMode, currency);
}

function renderRecommendationResults(results, scenario, rateMode, currency) {
  uiState.latestRecommendationRenderData = { results, scenario, rateMode, currency };
  const merchantQuery = (document.getElementById("recommend-merchant")?.value || "").trim();

  if (!results.length) {
    document.getElementById("recommendationResults").innerHTML = `<div class="empty-state">還沒有信用卡資料，暫時無法推薦。</div>`;
    return;
  }

  const filtered = results.filter((result) =>
    !uiState.recommendResultScope
    || (uiState.recommendResultScope === "hk" && !isMainlandCard(result.card))
    || (uiState.recommendResultScope === "cn" && isMainlandCard(result.card))
  );

  const scopeControls = `
    <div class="segmented-toggle" style="margin-bottom:14px;">
      <button class="btn btn-secondary ${uiState.recommendResultScope === "" ? "active" : ""}" type="button" onclick="setRecommendationResultScope('')">全部</button>
      <button class="btn btn-secondary ${uiState.recommendResultScope === "hk" ? "active" : ""}" type="button" onclick="setRecommendationResultScope('hk')">香港卡</button>
      <button class="btn btn-secondary ${uiState.recommendResultScope === "cn" ? "active" : ""}" type="button" onclick="setRecommendationResultScope('cn')">大陸卡</button>
    </div>
  `;
  const amountRequiredNote = rateMode ? `
    <div class="empty-state" style="margin-bottom:14px;">Apple Pay 首幾筆返現、立減、固定金額優惠需要輸入金額先可以同百分比回贈比較。</div>
  ` : "";

  if (!filtered.length) {
    document.getElementById("recommendationResults").innerHTML = `
      ${scopeControls}
      ${amountRequiredNote}
      <div class="empty-state">呢個篩選下暫時冇結果。</div>
    `;
    return;
  }

  document.getElementById("recommendationResults").innerHTML = `
    ${scopeControls}
    ${amountRequiredNote}
    ${filtered.map((result) => {
      const globalIndex = results.findIndex((item) => item.card.id === result.card.id);
      return `
    <article class="result-card ${globalIndex === 0 ? "best" : ""}">
      <div class="result-rank">${globalIndex === 0 ? "最佳選擇" : "備選 " + (globalIndex + 1)}</div>
      <div class="result-header" onclick="toggleResultCard(this.closest('.result-card'))">
        <div>
          <h3 class="card-name">${escapeHtml(result.card.name)}</h3>
          <div class="meta">
            <span>${escapeHtml(result.card.bank)}</span>
            <span>${escapeHtml(CATEGORY_LABELS[scenario.category] || scenario.category)}</span>
            <span>${escapeHtml(formatScenarioLocations(scenario.locations))}</span>
            ${result.hasInstantPayout ? `<span>即時回贈</span>` : ""}
          </div>
        </div>
        <div style="display:flex;align-items:flex-start;gap:8px;">
          <div class="result-value">${rateMode ? formatPercent(result.bestRate) : formatCurrencyWithCode(result.totalRewardAmount, "HKD")}</div>
          <span class="result-chevron">›</span>
        </div>
      </div>
      <div class="result-body">
        <div class="breakdown">
          ${rateMode ? `
            <div><strong>最高回贈率：</strong>${formatPercent(result.bestRate)}</div>
            <div><strong>命中活動：</strong>${escapeHtml(result.offerTitles.length ? result.offerTitles.join(" / ") : "無")}</div>
            <div><strong>優惠處理：</strong>${escapeHtml(result.offerSelectionSummary)}</div>
          ` : `
            <div><strong>基礎回贈：</strong>${formatCurrencyWithCode(result.baseRewardAmount, "HKD")} (${formatPercent(result.baseRateApplied)})</div>
            <div><strong>活動加碼：</strong>${formatCurrencyWithCode(result.offerRewardAmount, "HKD")}</div>
            <div><strong>命中活動：</strong>${escapeHtml(result.offerTitles.length ? result.offerTitles.join(" / ") : "無")}</div>
            <div><strong>優惠處理：</strong>${escapeHtml(result.offerSelectionSummary)}</div>
          `}
          <div><strong>解析結果：</strong>${escapeHtml(scenario.description)} → ${escapeHtml(formatScenarioLocations(scenario.locations))} / ${escapeHtml(CATEGORY_LABELS[scenario.category] || scenario.category)}</div>
        </div>
        ${result.selectedOffers.length ? `
          <div class="result-offer-details">
            ${result.selectedOffers.map((offer) => `
              <div class="result-offer-detail">
                <div class="result-offer-detail-title">${merchantQuery ? highlightMerchantInText(formatRecommendationOfferTitle(result.card, offer), merchantQuery) : escapeHtml(formatRecommendationOfferTitle(result.card, offer))}</div>
                <div class="result-offer-detail-note">${merchantQuery ? highlightMerchantInText(offer.notes || "沒有補充說明", merchantQuery) : escapeHtml(offer.notes || "沒有補充說明")}</div>
              </div>
            `).join("")}
          </div>
        ` : ""}
        ${result.missedOfferReasons.length ? `
          <div class="result-missed-details">
            <div class="result-missed-title">未採用活動</div>
            ${result.missedOfferReasons.map((item) => `
              <div class="result-missed-item"><strong>${escapeHtml(item.title)}</strong>：${escapeHtml(item.reason)}</div>
            `).join("")}
          </div>
        ` : ""}
        <p class="result-note">${escapeHtml(result.explanation)}</p>
      </div>
    </article>
  `;
    }).join("")}
  `;
}

function toggleResultCard(article) {
  article.classList.toggle("expanded");
}

function toggleListCard(article) {
  article.classList.toggle("expanded");
}

function setRecommendationResultScope(scope) {
  uiState.recommendResultScope = scope;
  if (uiState.latestRecommendationRenderData) {
    renderRecommendationResults(
      uiState.latestRecommendationRenderData.results,
      uiState.latestRecommendationRenderData.scenario,
      uiState.latestRecommendationRenderData.rateMode,
      uiState.latestRecommendationRenderData.currency
    );
  }
}




function evaluateCard(card, scenario, rateMode) {
  const baseRateApplied = Number(card.baseRate || 0);
  const amount = scenario.amount || 0;
  const hkdAmount = convertCurrencyAmount(amount, scenario.currency, "HKD");
  const baseRewardAmount = hkdAmount * baseRateApplied / 100;

  const matchingOffers = state.offers.filter((offer) => {
    if (offer.cardId !== card.id) return false;
    if (shouldIgnoreOfferForRecommendation(offer)) return false;
    if (rateMode && isFixedValueOffer(offer)) return false;
    if (!isDateInRange(scenario.date, offer.startDate, offer.endDate)) return false;
    if (!isOfferMinSpendSatisfied(card, offer, hkdAmount, scenario, { ignoreAmount: rateMode })) return false;
    if (!offerScopeMatchesScenario(card, offer, scenario)) return false;
    if (!offerRuleMatchesScenario(card, offer, scenario)) return false;
    if (!merchantOfferMatchesScenario(offer, scenario)) return false;
    return true;
  });

  const {
    selectedOffers,
    skippedOffers,
    offerRewardAmount,
    offerSelectionSummary
  } = selectBestOfferCombination(card, scenario, matchingOffers, hkdAmount);

  const totalRewardAmount = baseRewardAmount + offerRewardAmount;

  const bestOfferRate = selectedOffers.reduce((max, offer) => Math.max(max, Number(offer.bonusRate || 0)), 0);
  const bestRate = baseRateApplied + bestOfferRate;
  const hasInstantPayout = selectedOffers.some((offer) => getCanonicalRecommendationRule(card, offer)?.payoutTiming === "instant");
  const missedOfferReasons = buildMissedOfferReasons(card, scenario, amount, rateMode, selectedOffers);
  const rankingScore = rateMode
    ? bestRate + getInstantPayoutRateBonus(hasInstantPayout)
    : totalRewardAmount + getInstantPayoutValueBonus(hasInstantPayout, amount);

  const explanationParts = [];
  explanationParts.push("基礎回贈按卡片基本回贈率計算");
  if (selectedOffers.length) {
    explanationParts.push("命中 " + selectedOffers.length + " 個已採用活動");
    if (skippedOffers.length) {
      explanationParts.push("同組優惠已自動擇優，不重複相加");
    }
    if (hasInstantPayout) {
      explanationParts.push("即時回贈於排序時有輕微加分");
    }
  } else {
    explanationParts.push("沒有命中可疊加活動");
  }

  return {
    card,
    baseRateApplied,
    baseRewardAmount,
    offerRewardAmount,
    totalRewardAmount,
    bestRate,
    hasInstantPayout,
    rankingScore,
    selectedOffers,
    offerTitles: selectedOffers.map((offer) => formatRecommendationOfferTitle(card, offer)),
    missedOfferReasons,
    offerSelectionSummary,
    explanation: explanationParts.join("；")
  };
}

function buildMissedOfferReasons(card, scenario, amount, rateMode, selectedOffers) {
  const selectedIds = new Set(selectedOffers.map((offer) => offer.id));
  return state.offers
    .filter((offer) => offer.cardId === card.id && !selectedIds.has(offer.id))
    .map((offer) => ({
      offer,
      reason: getOfferExclusionReason(card, offer, scenario, amount, rateMode)
    }))
    .filter((item) => item.reason)
    .sort((left, right) => getOfferDiagnosticPriority(right.offer) - getOfferDiagnosticPriority(left.offer))
    .slice(0, 2)
    .map((item) => ({
      title: item.offer.title,
      reason: item.reason
    }));
}

function getOfferDiagnosticPriority(offer) {
  if (hasCustomReward(offer) || isFixedValueOffer(offer)) return 1000 + Number(offer.cap || 0);
  return Number(offer.bonusRate || 0);
}

function getOfferExclusionReason(card, offer, scenario, amount, rateMode) {
  if (isOfferExhausted(offer)) return "使用次數或額度已用完";
  if (shouldIgnoreOfferForRecommendation(offer)) return "";
  if (rateMode && isFixedValueOffer(offer)) return "需要輸入金額先可以同百分比回贈比較";
  if (!isDateInRange(scenario.date, offer.startDate, offer.endDate)) return "不在活動期內";
  if (!isOfferMinSpendSatisfied(card, offer, amount, scenario, { ignoreAmount: rateMode })) {
    return getMinSpendExclusionReason(card, offer);
  }
  const scopeReason = getOfferScopeExclusionReason(card, offer, scenario);
  if (scopeReason) return scopeReason;
  const ruleReason = getOfferRuleExclusionReason(card, offer, scenario);
  if (ruleReason) return ruleReason;
  if (!merchantOfferMatchesScenario(offer, scenario)) return "商戶或關鍵字不符合指定名單";
  return "";
}

function getMinSpendExclusionReason(card, offer) {
  const rule = getCanonicalRecommendationRule(card, offer);
  if (rule?.minSpendType === "monthlyQualified") return "Chill 今月合資格簽賬未標記已滿 HK$1,000";
  return `未達門檻 ${formatAmountByCurrency(Number(offer.minSpend || 0), offer.currency || card.currency || "HKD")}`;
}

function getOfferScopeExclusionReason(card, offer, scenario) {
  const rule = getCanonicalRecommendationRule(card, offer);
  if (rule) {
    if (!ruleCategoryMatches(rule, scenario)) return "類別不符合活動要求";
    if (!ruleChannelMatches(rule, scenario)) return "交易方式不符合活動要求";
    if (!ruleRegionMatches(rule, scenario, card, offer)) return "地點不符合活動要求";
    if (!ruleCurrencyMatches(rule, scenario)) return "貨幣不符合活動要求";
    return "";
  }
  if (!categoryMatchesOffer(offer, scenario)) return "類別不符合活動要求";
  if ((offer.tags || []).includes("online") && scenario.channel !== "online") return "交易方式不符合活動要求";
  const offerRegions = (offer.locations || []).filter((location) => location !== "網上");
  if (offerRegions.length && !scenario.regions.some((region) => offerRegions.includes(region))) return "地點不符合活動要求";
  return "";
}

function getOfferRuleExclusionReason(card, offer, scenario) {
  const rule = getCanonicalRecommendationRule(card, offer);
  const scenarioTags = new Set(scenario.scenarioTags || []);
  if (rule) {
    if (rule.paymentMethod && scenario.paymentMethod !== rule.paymentMethod) return "付款方式不符合活動要求";
    if (rule.requireTags && !rule.requireTags.every((tag) => scenarioTags.has(tag))) return "場景標籤不符合活動要求";
    if (rule.excludeWhenMatchedGroups?.length && offerRuleMatchesScenario(card, offer, scenario) === false) {
      return "同組較高優先活動已命中";
    }
    return offerRuleMatchesScenario(card, offer, scenario) ? "" : "附加條件不符合活動要求";
  }
  return offerRuleMatchesScenario(card, offer, scenario) ? "" : "附加條件不符合活動要求";
}

function getInstantPayoutRateBonus(hasInstantPayout) {
  return hasInstantPayout ? 0.2 : 0;
}

function getInstantPayoutValueBonus(hasInstantPayout, amount) {
  if (!hasInstantPayout) return 0;
  return Math.max(2, (Number(amount || 0) * 0.003));
}

function isOfferMinSpendSatisfied(card, offer, amount, scenario, options = {}) {
  const rule = getCanonicalRecommendationRule(card, offer);
  if (rule?.minSpendType === "monthlyQualified") {
    return Boolean(scenario.flags?.chillMonthlyQualified);
  }
  if (options.ignoreAmount) return true;
  return amount >= Number(offer.minSpend || 0);
}

function formatRecommendationOfferTitle(card, offer) {
  const rule = getCanonicalRecommendationRule(card, offer);
  if (rule?.titleSuffix === "monthlyQualified") {
    return `${offer.title}（今月累積需達 HK$${formatNumber(offer.minSpend)}）`;
  }
  return offer.minSpend > 0 ? `${offer.title}（需達 HK$${formatNumber(offer.minSpend)}）` : offer.title;
}

function offerScopeMatchesScenario(card, offer, scenario) {
  const rule = getCanonicalRecommendationRule(card, offer);
  if (rule) {
    if (rule.merchantMode !== "listed-or-category" && !ruleCategoryMatches(rule, scenario)) return false;
    if (!ruleChannelMatches(rule, scenario)) return false;
    if (!ruleRegionMatches(rule, scenario, card, offer)) return false;
    if (!ruleCurrencyMatches(rule, scenario)) return false;
    return true;
  }
  if (!categoryMatchesOffer(offer, scenario)) return false;
  if ((offer.tags || []).includes("online") && scenario.channel !== "online") return false;
  const offerRegions = (offer.locations || []).filter((location) => location !== "網上");
  if (offerRegions.length && !scenario.regions.some((region) => offerRegions.includes(region))) return false;
  return true;
}

function ruleCategoryMatches(rule, scenario) {
  if (!rule.categoryAnyOf || !rule.categoryAnyOf.length) return true;
  return rule.categoryAnyOf.includes(scenario.category) || rule.categoryAnyOf.some((category) => (scenario.scenarioTags || []).includes(category));
}

function categoryMatchesOffer(offer, scenario) {
  if (offer.category === "general") return true;
  return offer.category === scenario.category;
}

function ruleChannelMatches(rule, scenario) {
  if (rule.channel === "either") return true;
  return scenario.channel === rule.channel;
}

function ruleRegionMatches(rule, scenario, card, offer) {
  const regions = Array.isArray(scenario.regions) && scenario.regions.length ? scenario.regions : ["香港"];
  if (rule.regions === "any") return true;
  if (rule.regions === "mixed") {
    if (rule.merchantMode === "chill-merchant") {
      return chillMerchantRegionMatches(scenario);
    }
    if (rule.merchantMode === "mmpower-merchant") {
      return scenario.channel === "online" || regions.includes("香港");
    }
  }
  if (Array.isArray(rule.regions)) {
    return regions.some((region) => rule.regions.includes(region));
  }
  return true;
}

function ruleCurrencyMatches(rule, scenario) {
  if (Array.isArray(rule.currencyAnyOf) && !rule.currencyAnyOf.includes(scenario.currency)) return false;
  if (Array.isArray(rule.excludeCurrencies) && rule.excludeCurrencies.includes(scenario.currency)) return false;
  if (!rule.currency || rule.currency === "any") return true;
  if (rule.currency === "foreign") return scenario.currencyBucket === "foreign";
  if (rule.currency === "HKD") return scenario.currency === "HKD";
  if (rule.currency === "JPY") return scenario.currency === "JPY";
  return true;
}

function selectBestOfferCombination(card, scenario, offers, amount) {
  if (!offers.length) {
    return {
      selectedOffers: [],
      skippedOffers: [],
      offerRewardAmount: 0,
      offerSelectionSummary: "沒有命中活動"
    };
  }

  const buckets = new Map();
  offers.forEach((offer) => {
    const key = getOfferSelectionKey(card, offer);
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(offer);
  });

  const selectedOffers = [];
  const skippedOffers = [];

  buckets.forEach((bucketOffers) => {
    const ranked = [...bucketOffers].sort((left, right) => {
      const valueDiff = calculateOfferRewardAmount(right, amount, "HKD") - calculateOfferRewardAmount(left, amount, "HKD");
      if (valueDiff !== 0) return valueDiff;
      return Number(right.bonusRate || 0) - Number(left.bonusRate || 0);
    });
    selectedOffers.push(ranked[0]);
    skippedOffers.push(...ranked.slice(1));
  });

  const offerRewardAmount = selectedOffers.reduce((sum, offer) => sum + calculateOfferRewardAmount(offer, amount, "HKD"), 0);
  return {
    selectedOffers,
    skippedOffers,
    offerRewardAmount,
    offerSelectionSummary: buildOfferSelectionSummary(selectedOffers, skippedOffers)
  };
}

function getOfferSelectionKey(card, offer) {
  const rule = getCanonicalRecommendationRule(card, offer);
  if (rule?.group) return `exclusive:${card.id}:${rule.group}`;
  if (isFixedValueOffer(offer)) return `stackable:${offer.id}`;
  if ((offer.tags || []).includes("applepay")) return `exclusive:${card.id}:applepay`;
  return `stackable:${offer.id}`;
}

function hasCustomReward(offer) {
  return CUSTOM_REWARD_OFFER_KEYS.has(offer.canonicalKey || "");
}

function isOfferExhausted(offer) {
  const total = Number(offer.usageTotal || 0);
  if (total <= 0) return false;
  return Number(offer.usageUsed || 0) >= total;
}

function getCustomRewardAmount(offer, amount, displayCurrency) {
  const key = offer.canonicalKey || "";
  const used = Number(offer.usageUsed || 0);
  const remaining = Math.max(0, Number(offer.usageTotal || 0) - used);
  if (remaining <= 0) return 0;
  const amountInUsd = convertCurrencyAmount(Number(amount || 0), displayCurrency, "USD");
  let rewardUsd = 0;

  if (key === canonicalOfferKey("長城萬事達 YOU 卡", "Apple Pay 首3筆 100%返現")) {
    rewardUsd = Math.min(amountInUsd, 5);
    return convertCurrencyAmount(rewardUsd, "USD", displayCurrency);
  }
  if (key === canonicalOfferKey("農行萬事達白金卡", "Apple Pay 首3筆 100%返現")) {
    rewardUsd = Math.min(amountInUsd, 2);
    return convertCurrencyAmount(rewardUsd, "USD", displayCurrency);
  }
  if (key === canonicalOfferKey("長城萬事達 YOU 卡", "Apple Pay 首2筆額外返 US$3 + US$2")
    || key === canonicalOfferKey("中信萬事達扣賬卡", "Apple Pay 首2筆額外返 US$3 + US$2")
    || key === canonicalOfferKey("農行萬事達白金卡", "Apple Pay 首2筆額外返 US$3 + US$2")) {
    rewardUsd = used === 0 ? 3 : used === 1 ? 2 : 0;
    return convertCurrencyAmount(rewardUsd, "USD", displayCurrency);
  }
  if (key === canonicalOfferKey("工行星座Visa卡", "香港 Apple Pay 滿 HK$50 返 US$2")) {
    rewardUsd = Number(amount || 0) >= 50 ? 2 : 0;
    return convertCurrencyAmount(rewardUsd, "USD", displayCurrency);
  }
  if (key === canonicalOfferKey("工行星座Visa卡", "境外 Apple Pay 交通 100%")) {
    rewardUsd = Math.min(amountInUsd, 3, remaining);
    return convertCurrencyAmount(rewardUsd, "USD", displayCurrency);
  }
  if (key === canonicalOfferKey("農行萬事達白金卡", "每月首筆境外線下返 US$1")) {
    return convertCurrencyAmount(1, "USD", displayCurrency);
  }
  return 0;
}

function calculateOfferRewardAmount(offer, amount, displayCurrency) {
  if (hasCustomReward(offer)) return getCustomRewardAmount(offer, amount, displayCurrency);
  const bonusRate = Number(offer.bonusRate || 0);
  const cap = Number(offer.cap || 0);
  if (bonusRate === 0 && cap > 0) return cap;
  const rawBonus = amount * bonusRate / 100;
  return cap > 0 ? Math.min(rawBonus, cap) : rawBonus;
}

function isFixedValueOffer(offer) {
  return hasCustomReward(offer) || (Number(offer.bonusRate || 0) === 0 && Number(offer.cap || 0) > 0);
}

function shouldIgnoreOfferForRecommendation(offer) {
  const title = offer.title || "";
  const notes = offer.notes || "";
  if (isOfferExhausted(offer)) return true;
  if (!hasCustomReward(offer) && Number(offer.bonusRate || 0) <= 0 && Number(offer.cap || 0) <= 0) return true;
  if (/迎新/.test(title) || /迎新/.test(notes)) return true;
  if (/抽盲盒|盲盒|隨機|随机|有機會|有机会|匯率優惠|汇率优惠/.test(title) || /抽盲盒|盲盒|隨機|随机|有機會|有机会|匯率優惠|汇率优惠/.test(notes)) return true;
  return false;
}

function buildOfferSelectionSummary(selectedOffers, skippedOffers) {
  if (!selectedOffers.length) return "沒有命中活動";
  if (!skippedOffers.length) return "全部命中活動已計入";
  return `已計入 ${selectedOffers.length} 個活動，並對 ${skippedOffers.length} 個互斥活動擇優`;
}

function merchantOfferMatchesScenario(offer, scenario) {
  const linkedCard = state.cards.find((card) => card.id === offer.cardId);
  const rule = linkedCard ? getCanonicalRecommendationRule(linkedCard, offer) : null;
  if (rule) {
    return rule.merchantMode ? ruleMerchantMatches(rule, offer, scenario) : true;
  }
  const keywords = Array.isArray(offer.requiresKeywords) ? offer.requiresKeywords : [];
  const isMerchant = (offer.tags || []).includes("merchant");
  if (!keywords.length && !isMerchant) return true;
  const merchantTokens = scenario.merchantTokens || [];
  const normalizedDescription = String(scenario.normalizedDescription || "").toLowerCase();
  const text = `${offer.title || ""} ${offer.notes || ""}`.toLowerCase();
  const fallbackKeywords = !keywords.length ? extractMerchantKeywords(text) : keywords.map((keyword) => keyword.toLowerCase());
  if (!fallbackKeywords.length) return false;
  return fallbackKeywords.some((keyword) => merchantTokens.includes(keyword) || keywordMatchesDescription(keyword, normalizedDescription));
}

function ruleMerchantMatches(rule, offer, scenario) {
  const merchantTokens = scenario.merchantTokens || [];
  const normalizedDescription = String(scenario.normalizedDescription || "").toLowerCase();
  const keywords = Array.isArray(offer.requiresKeywords) ? offer.requiresKeywords.map((keyword) => keyword.toLowerCase()) : [];

  if (rule.merchantMode === "listed") {
    return !keywords.length || keywords.some((keyword) => merchantTokens.includes(keyword) || keywordMatchesDescription(keyword, normalizedDescription));
  }
  if (rule.merchantMode === "listed-or-category") {
    const listedMatch = !keywords.length || keywords.some((keyword) => merchantTokens.includes(keyword) || keywordMatchesDescription(keyword, normalizedDescription));
    return listedMatch || ruleCategoryMatches(rule, scenario);
  }
  if (rule.merchantMode === "chill-merchant") {
    if (!keywords.length) return false;
    return keywords.some((keyword) => merchantTokens.includes(keyword) || keywordMatchesDescription(keyword, normalizedDescription));
  }
  if (rule.merchantMode === "mmpower-merchant") {
    if (!keywords.length) return false;
    return keywords.some((keyword) => merchantTokens.includes(keyword) || keywordMatchesDescription(keyword, normalizedDescription));
  }
  return true;
}

function offerRuleMatchesScenario(card, offer, scenario) {
  const rule = getCanonicalRecommendationRule(card, offer);
  const text = `${offer.title || ""} ${offer.notes || ""}`;
  const scenarioTags = new Set(scenario.scenarioTags || []);

  if (rule) {
    if (rule.paymentMethod && scenario.paymentMethod !== rule.paymentMethod) return false;
    if (rule.requireTags && !rule.requireTags.every((tag) => scenarioTags.has(tag))) return false;
    if (rule.excludeWhenMatchedGroups?.length) {
      const matchedExcluded = state.offers.some((candidate) => {
        if (candidate.cardId !== offer.cardId || candidate.id === offer.id) return false;
        const candidateRule = getCanonicalRecommendationRule(card, candidate);
        if (!candidateRule || !rule.excludeWhenMatchedGroups.includes(candidateRule.group)) return false;
        if (!isDateInRange(scenario.date, candidate.startDate, candidate.endDate)) return false;
        if (!offerScopeMatchesScenario(card, candidate, scenario)) return false;
        if (!offerRuleMatchesScenario(card, candidate, scenario)) return false;
        if (!merchantOfferMatchesScenario(candidate, scenario)) return false;
        return true;
      });
      if (matchedExcluded) return false;
    }
    return true;
  }

  if ((offer.tags || []).includes("applepay") && scenario.paymentMethod !== "applepay") return false;
  if (/港幣\/人民幣\/澳門幣/.test(text) && !["HKD", "CNY", "MOP"].includes(scenario.currency)) return false;
  if ((/其他貨幣/.test(text) || /外幣/.test(text)) && scenario.currencyBucket !== "foreign") return false;
  if (/實體店/.test(text) && scenario.channel === "online") return false;
  if (/網上旅遊\/娛樂\/訂閱/.test(text) && scenario.channel !== "online") return false;
  if (/網上旅遊\/娛樂\/訂閱/.test(text) && !["travel", "entertainment", "subscription"].some((tag) => scenarioTags.has(tag))) return false;
  if (/合資格網上外幣 1%/.test(text) && (scenario.channel !== "online" || scenario.currencyBucket !== "foreign")) return false;
  return true;
}

function isChillOnlineServiceScenario(scenario) {
  const normalizedDescription = String(scenario.normalizedDescription || "").toLowerCase();
  return ["app store", "apple tv", "netflix", "spotify", "disney+"].some((keyword) => normalizedDescription.includes(keyword));
}

function chillMerchantRegionMatches(scenario) {
  if (isChillOnlineServiceScenario(scenario)) return scenario.channel === "online";
  return (scenario.regions || []).includes("香港");
}

function extractMerchantKeywords(text) {
  const matches = text.match(/[A-Za-z0-9+&'.-]{2,}|[\u3400-\u9FFF]{2,}/gu) || [];
  const blocked = new Set(["apple", "pay", "指定", "商戶", "海外", "本地", "交通", "簽賬", "現金回贈", "可享", "上限", "合資格"]);
  return [...new Set(matches
    .map((keyword) => keyword.trim().toLowerCase())
    .filter((keyword) => keyword.length >= 2)
    .filter((keyword) => !/^\d/.test(keyword))
    .filter((keyword) => !blocked.has(keyword)))];
}

function keywordMatchesDescription(keyword, normalizedDescription) {
  if (!keyword || !normalizedDescription) return false;
  if (/[\u3400-\u9FFF]/u.test(keyword)) {
    return normalizedDescription.includes(keyword);
  }
  if (/^[a-z0-9+&'. -]+$/i.test(keyword)) {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, "i").test(normalizedDescription);
  }
  return normalizedDescription.includes(keyword);
}

function inferMerchantSignals(merchantTokens) {
  const regionMap = new Map([
    ["中國鐵路", "內地"],
    ["北京地鐵", "內地"],
    ["上海地鐵", "內地"],
    ["上海磁浮", "內地"],
    ["環島中港通", "內地"],
    ["go transit", "海外"],
    ["tfl", "海外"],
    ["translink", "海外"],
    ["trainlink", "海外"],
    ["jr", "海外"],
    ["harrods", "海外"],
    ["coles", "海外"],
    ["woolworths", "海外"],
    ["emporium", "海外"],
    ["paragon", "海外"],
    ["lululemon", "海外"],
    ["booking.com", "海外"],
    ["king power", "海外"],
    ["costco", "海外"],
    ["saks fifth avenue", "海外"],
    ["松本清", "海外"],
    ["唐吉訶德", "海外"],
    ["三越", "海外"],
    ["伊勢丹", "海外"],
    ["大丸", "海外"],
    ["松坂屋", "海外"],
    ["阪急", "海外"],
    ["阪神", "海外"],
    ["sogo", "香港"],
    ["suning", "香港"]
  ]);
  const categoryMap = new Map([
    ["中國鐵路", "transport"],
    ["北京地鐵", "transport"],
    ["上海地鐵", "transport"],
    ["上海磁浮", "transport"],
    ["環島中港通", "transport"],
    ["go transit", "transport"],
    ["tfl", "transport"],
    ["translink", "transport"],
    ["trainlink", "transport"],
    ["jr", "transport"],
    ["booking.com", "travel"],
    ["uber", "transport"],
    ["uber eats", "dining"],
    ["deliveroo", "dining"],
    ["doordash", "dining"],
    ["steam", "entertainment"],
    ["playstation", "entertainment"],
    ["nintendo eshop", "entertainment"],
    ["mcdonald", "dining"],
    ["pacific coffee", "dining"],
    ["starbucks", "dining"]
  ]);
  const japanTokens = new Set(["jr", "松本清", "唐吉訶德", "三越", "伊勢丹", "大丸", "松坂屋", "阪急", "阪神"]);
  const onlineOnlyTokens = new Set(["app store", "apple tv", "netflix", "spotify", "disney+", "booking.com", "farfetch", "ssense", "steam", "playstation", "nintendo eshop"]);
  const regions = [...new Set(merchantTokens.map((token) => regionMap.get(token)).filter(Boolean))];
  const category = merchantTokens.map((token) => categoryMap.get(token)).find(Boolean) || "";
  const japan = merchantTokens.some((token) => japanTokens.has(token));
  const forceOnline = merchantTokens.some((token) => onlineOnlyTokens.has(token));
  return { regions, category, japan, forceOnline, forceOffline: false };
}

function formatScenarioLocations(locations) {
  return (locations || []).join(" / ") || "香港";
}

function collectMerchantTokens(normalizedText) {
  const aliases = [
    ["app store", ["app store"]],
    ["apple tv", ["apple tv"]],
    ["netflix", ["netflix"]],
    ["spotify", ["spotify"]],
    ["disney+", ["disney+"]],
    ["mcdonald", ["mcdonald", "麥當勞", "麦当劳"]],
    ["pacific coffee", ["pacific coffee", "太平洋咖啡"]],
    ["starbucks", ["starbucks", "星巴克"]],
    ["dyson", ["dyson", "戴森"]],
    ["samsung", ["samsung", "三星"]],
    ["sony", ["sony", "索尼"]],
    ["uniqlo", ["uniqlo", "優衣庫", "优衣库"]],
    ["gu", [" gu ", "gu "]],
    ["ikea", ["ikea", "宜家"]],
    ["log-on", ["log-on", "log on"]],
    ["amazon", ["amazon", "亞馬遜", "亚马逊"]],
    ["lululemon", ["lululemon"]],
    ["costco", ["costco"]],
    ["arc'teryx", ["arc'teryx", "arcteryx"]],
    ["saks fifth avenue", ["saks fifth avenue"]],
    ["sogo", ["sogo"]],
    ["king power", ["king power"]],
    ["suning", ["suning"]],
    ["farfetch", ["farfetch"]],
    ["ssense", ["ssense"]],
    ["booking.com", ["booking.com", "booking"]],
    ["uber eats", ["uber eats"]],
    ["deliveroo", ["deliveroo"]],
    ["doordash", ["doordash", "door dash"]],
    ["uber", ["uber"]],
    ["steam", ["steam"]],
    ["playstation", ["playstation", "sony playstation"]],
    ["nintendo eshop", ["nintendo eshop", "nintendo e-shop"]],
    ["pop mart", ["pop mart", "popmart"]],
    ["唐吉訶德", ["唐吉訶德"]],
    ["松本清", ["松本清"]],
    ["mcl", ["mcl"]],
    ["百老匯", ["百老匯", "百老汇"]],
    ["英皇", ["英皇"]],
    ["jr", ["jr", "japan railway"]],
    ["translink", ["translink"]],
    ["trainlink", ["trainlink"]],
    ["go transit", ["go transit"]],
    ["中國鐵路", ["中國鐵路", "中国铁路", "12306"]],
    ["北京地鐵", ["北京地鐵", "北京地铁"]],
    ["上海地鐵", ["上海地鐵", "上海地铁"]],
    ["上海磁浮", ["上海磁浮"]],
    ["環島中港通", ["環島中港通", "环岛中港通"]],
    ["tfl", ["tfl", "transport for london"]]
  ];
  const tokens = [];
  aliases.forEach(([canonical, variants]) => {
    if (variants.some((variant) => keywordMatchesDescription(variant.trim().toLowerCase(), normalizedText))) {
      tokens.push(canonical);
    }
  });
  return [...new Set(tokens)];
}

function inferCurrencyBucket(currency, locations, description) {
  const normalized = description.toLowerCase();
  if (currency === "HKD") {
    if (normalized.includes("港幣")) return "HKD";
    if (normalized.includes("人民幣")) return "CNY";
    if (normalized.includes("澳門幣")) return "MOP";
  }
  if (currency === "HKD" && !normalized.includes("外幣") && !(locations || []).includes("海外")) return "HKD";
  return currency === "HKD" ? "foreign" : "foreign";
}

function formatOfferLocationLabel(offer, cardName = "") {
  if (cardName === "BOC Chill Card" && offer.title === "指定商戶 8%") {
    return { main: "指定商戶", sub: "實體或網上" };
  }
  if (cardName === "BOC Chill Card" && offer.title === "海外簽賬 4%") {
    return { main: "澳門 / 內地 / 海外", sub: "實體或網上" };
  }
  if (cardName === "BOC Chill Card" && offer.title === "網上簽賬 4%") {
    return { main: "不限地點", sub: "網上" };
  }
  if (cardName === "MMPOWER" && offer.title === "指定商戶 8%") {
    return { main: "指定商戶", sub: "實體或網上" };
  }
  if (cardName === "MMPOWER" && offer.title === "網上娛樂 8%") {
    return { main: "指定商戶", sub: "網上" };
  }
  if (cardName === "MMPOWER" && offer.title === "網上服飾 8%") {
    return { main: "不限地點", sub: "網上" };
  }
  if (cardName === "MMPOWER" && offer.title === "網上簽賬 5%") {
    return { main: "不限地點", sub: "網上" };
  }
  if (cardName === "MMPOWER" && offer.title === "海外實體外幣簽賬 4%") {
    return { main: "澳門 / 內地 / 海外", sub: "實體" };
  }
  if (cardName === "恒生多貨幣扣賬卡" && offer.title === "指定海外商戶 15%") {
    return { main: "海外", sub: "實體" };
  }
  if (cardName === "HSBC 金卡" && offer.title === "澳門/內地/海外 2.4%") {
    return { main: "澳門 / 內地 / 海外", sub: "實體" };
  }
  if (cardName === "恒生多貨幣扣賬卡" && offer.title === "指定本地商戶 20%") {
    return { main: "香港", sub: "實體或網上" };
  }
  if (cardName === "恒生多貨幣扣賬卡" && offer.title === "指定海外交通 20%") {
    return { main: "內地 / 海外", sub: "實體或網上" };
  }
  if (cardName === "AEON WAKUWAKU" && offer.title === "網上簽賬 6%") {
    return { main: "不限地點", sub: "網上" };
  }
  if (cardName === "AEON WAKUWAKU" && offer.title === "日本簽賬 3%") {
    return { main: "海外", sub: "實體或網上" };
  }
  if (cardName === "AEON WAKUWAKU" && offer.title === "本地餐飲 1%") {
    return { main: "香港", sub: "實體或網上" };
  }
  if (cardName === "DBS Live Fresh" && offer.title === "網上旅遊/娛樂/訂閱 外幣 6%") {
    return { main: "不限地點", sub: "網上" };
  }
  if (cardName === "DBS Live Fresh" && offer.title === "網上旅遊/娛樂/訂閱 港幣 5%") {
    return { main: "不限地點", sub: "網上" };
  }
  if (cardName === "DBS Live Fresh" && offer.title === "合資格網上外幣 1%") {
    return { main: "海外", sub: "網上" };
  }
  if (cardName === "PayMe 銀聯卡" && offer.title === "港幣/澳門幣/人民幣 3%") {
    return { main: "香港 / 澳門 / 內地", sub: "實體或網上" };
  }
  if (cardName === "PayMe 銀聯卡" && offer.title === "其他貨幣 10%") {
    return { main: "海外", sub: "實體或網上" };
  }
  if (cardName === "長城萬事達 YOU 卡" && offer.title === "Apple Pay 首3筆 100%返現") {
    return { main: "香港 / 澳門 / 海外", sub: "實體或網上" };
  }
  if (cardName === "長城萬事達 YOU 卡" && offer.title === "Apple Pay 首2筆額外返 US$3 + US$2") {
    return { main: "香港 / 澳門 / 海外", sub: "實體或網上" };
  }
  if (cardName === "中信i享銀聯卡" && offer.title === "香港線下滿 HK$200 減 HK$20") {
    return { main: "香港", sub: "實體" };
  }
  if (cardName === "中信i享銀聯卡" && offer.title === "境外線下隨機立減最高 30%") {
    return { main: "香港 / 海外", sub: "實體" };
  }
  if (cardName === "中信萬事達扣賬卡" && offer.title === "Apple Pay 首2筆額外返 US$3 + US$2") {
    return { main: "香港 / 澳門 / 海外", sub: "實體或網上" };
  }
  if (cardName === "農行萬事達白金卡" && offer.title === "每月首筆境外線下返 US$1") {
    return { main: "香港 / 澳門 / 海外", sub: "實體" };
  }
  if (cardName === "農行萬事達白金卡" && offer.title === "境外簽賬 1%") {
    return { main: "香港 / 澳門 / 海外", sub: "實體或網上" };
  }
  if (cardName === "農行萬事達白金卡" && offer.title === "境外線下簽賬 3%") {
    return { main: "香港 / 澳門 / 海外", sub: "實體" };
  }
  if (cardName === "農行萬事達白金卡" && offer.title === "境外精選商戶 10%") {
    return { main: "指定商戶", sub: "實體或網上" };
  }
  if (cardName === "農行萬事達白金卡" && offer.title === "Apple Pay 首3筆 100%返現") {
    return { main: "香港 / 澳門 / 海外", sub: "實體或網上" };
  }
  if (cardName === "農行萬事達白金卡" && offer.title === "Apple Pay 首2筆額外返 US$3 + US$2") {
    return { main: "香港 / 澳門 / 海外", sub: "實體或網上" };
  }
  if (cardName === "工行星座Visa卡" && offer.title === "香港 Apple Pay 滿 HK$50 返 US$2") {
    return { main: "香港", sub: "實體" };
  }
  if (cardName === "工行星座Visa卡" && offer.title === "境外實體交通 10%") {
    return { main: "香港 / 澳門 / 海外", sub: "實體" };
  }
  if (cardName === "工行星座Visa卡" && offer.title === "境外 Apple Pay 交通 100%") {
    return { main: "香港 / 澳門 / 海外", sub: "實體" };
  }
  if (cardName === "工行星座Visa卡" && offer.title === "境外線下匯率優惠最高 10%") {
    return { main: "香港 / 澳門 / 海外", sub: "實體" };
  }
  if (cardName === "工行星座Visa卡" && offer.title === "每滿 3 筆返 US$3") {
    return { main: "香港 / 澳門 / 海外", sub: "實體或網上" };
  }
  if (cardName === "工行星座Visa卡" && offer.title === "境外簽賬 1%") {
    return { main: "香港 / 澳門 / 海外", sub: "實體或網上" };
  }
  return { main: formatOfferLocations(offer.locations) };
}

function renderOfferLocationChip(offer, cardName = "") {
  const label = formatOfferLocationLabel(offer, cardName);
  if (Array.isArray(label.chips) && label.chips.length) {
    return label.chips.map((chip) => `<span class="chip">${escapeHtml(chip)}</span>`).join("");
  }
  if (label.sub) {
    return `<span class="chip">${escapeHtml(label.main)}</span><span class="chip">${escapeHtml(label.sub)}</span>`;
  }
  return `<span class="chip">${escapeHtml(label.main)}</span>`;
}

function formatOfferLocations(locations) {
  if (!Array.isArray(locations) || locations.length === 0) return "不限地點";
  const ordered = LOCATION_OPTIONS.filter((location) => locations.includes(location));
  if (ordered.length === LOCATION_OPTIONS.length) return "不限地點";
  if (ordered.length === 1 && ordered[0] === "網上") {
    return "不限地點 / 網上";
  }
  const withoutOnline = ordered.filter((location) => location !== "網上");
  if (ordered.length === 2 && ordered.includes("網上") && withoutOnline.length === 1) {
    return `${withoutOnline[0]} / 網上`;
  }
  if (ordered.includes("網上") && withoutOnline.length > 0) {
    return `${withoutOnline.join(" / ")} / 網上`;
  }
  return ordered.join(" / ");
}

function parseList(text) {
  return text.split(",").map((item) => item.trim()).filter(Boolean);
}

function getCheckedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
}

function setCheckedValues(name, values) {
  const allowed = new Set(values || []);
  document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
    input.checked = allowed.has(input.value);
  });
}

function formatPercent(value) {
  return formatNumber(value) + "%";
}

function formatNumber(value) {
  const number = Number(value || 0);
  return Number.isInteger(number) ? String(number) : number.toFixed(2).replace(/\.?0+$/, "");
}

function formatCurrency(value) {
  return "$" + Number(value || 0).toFixed(2);
}

function formatAmountByCurrency(value, currency) {
  const amount = formatNumber(value);
  const symbols = { HKD: "$", USD: "US$", CNY: "¥", JPY: "¥", KRW: "₩", MOP: "MOP$", THB: "฿", TWD: "NT$" };
  return (symbols[currency] || "$") + amount;
}

function formatCurrencyWithCode(value, currency) {
  const amount = Number(value || 0).toFixed(2);
  const symbols = { HKD: "HK$", USD: "US$", CNY: "¥", JPY: "¥", KRW: "₩", MOP: "MOP$", THB: "฿", TWD: "NT$" };
  return (symbols[currency] || currency + "$") + amount;
}

function convertCurrencyAmount(amount, fromCurrency, toCurrency) {
  if (!fromCurrency || !toCurrency || fromCurrency === toCurrency) return Number(amount || 0);
  const fromRate = CURRENCY_TO_HKD[fromCurrency];
  const toRate = CURRENCY_TO_HKD[toCurrency];
  if (!fromRate || !toRate) return Number(amount || 0);
  return Number(amount || 0) * fromRate / toRate;
}

function currencySymbol(currency) {
  const symbols = { HKD: "HK$", USD: "US$", CNY: "¥", JPY: "¥", KRW: "₩", MOP: "MOP$", THB: "฿", TWD: "NT$" };
  return symbols[currency] || "";
}

function formatOfferDate(offer) {
  const base = `${offer.startDate} 至 ${offer.endDate}`;
  return offer.dateNote ? `${base}（${offer.dateNote}）` : base;
}

function formatUsageText(offer) {
  if (offer.usageMode === "amount") {
    const currency = offer.usageCurrency || offer.currency || "";
    const prefix = currencySymbol(currency);
    return `${prefix}${formatNumber(offer.usageUsed || 0)}/${formatNumber(offer.usageTotal || 0)}`;
  }
  return `${Number(offer.usageUsed || 0)}/${Number(offer.usageTotal || 0)}`;
}

function cycleOfferUsage(offerId) {
  const offer = state.offers.find((item) => item.id === offerId);
  if (!offer || Number(offer.usageTotal || 0) <= 0) return;
  const total = Number(offer.usageTotal || 0);
  const current = Number(offer.usageUsed || 0);
  const step = offer.usageMode === "amount" ? getOfferUsageAmountStep(offer) : 1;
  offer.usageUsed = current >= total ? 0 : Math.min(total, current + step);
  saveData();
  renderCards();
}

function getOfferUsageAmountStep(offer) {
  if (offer.canonicalKey === canonicalOfferKey("工行星座Visa卡", "境外 Apple Pay 交通 100%")) {
    return 3;
  }
  return 1;
}

function isDateInRange(date, startDate, endDate) {
  return date >= startDate && date <= endDate;
}

function todayString() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function maybeRegisterServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  let refreshing = false;
  navigator.serviceWorker.register(`./sw.js?${APP_VERSION}`).then((reg) => {
    reg.addEventListener("updatefound", () => {
      const newWorker = reg.installing;
      newWorker.addEventListener("statechange", () => {
        if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
          newWorker.postMessage({ type: "SKIP_WAITING" });
        }
      });
    });
  }).catch((err) => console.error(err));
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });
}

document.getElementById("appVersion").textContent = APP_VERSION;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

window.editOffer = editOffer;
window.cycleOfferUsage = cycleOfferUsage;
window.setRecommendationResultScope = setRecommendationResultScope;
