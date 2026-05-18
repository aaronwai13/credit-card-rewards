const fs = require("fs");
const path = require("path");

let code = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
code = code.replace("let state = loadData();", "globalThis.state = loadData();");

const fakeEl = () => ({
  value: "",
  innerHTML: "",
  checked: false,
  classList: { add() {}, remove() {}, toggle() {} },
  addEventListener() {},
  focus() {}
});

const elements = new Map();
const get = (id) => {
  if (!elements.has(id)) elements.set(id, fakeEl());
  return elements.get(id);
};

global.document = { getElementById: get, querySelectorAll() { return []; } };
global.document.querySelector = () => ({ dataset: { regionScope: "" }, classList: { add() {}, remove() {} } });
global.window = { scrollTo() {}, addEventListener() {} };
global.localStorage = { getItem() { return null; }, setItem() {} };
global.crypto = { randomUUID() { return `id-${Math.random().toString(16).slice(2)}`; } };
global.structuredClone = (value) => JSON.parse(JSON.stringify(value));

eval(code);

function buildScenario({ region, channel, category, merchant, amount, currency, chillMonthlyQualified = false, date = "2026-04-21" }) {
  const locations = channel === "online" ? [region, "網上"] : [region];
  const scenarioTags = new Set();
  if (channel === "online") scenarioTags.add("online");
  if (region === "海外") scenarioTags.add("overseas");
  if (category !== "general") scenarioTags.add(category);

  const normalizedMerchant = (merchant || "").toLowerCase();
  let merchantTokens = [];
  if (merchant) {
    merchantTokens = collectMerchantTokens(normalizedMerchant);
    if (!merchantTokens.length) merchantTokens = [normalizedMerchant];
  }

  const scenario = {
    description: merchant || "",
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

  if (merchant) scenario.confirmedMerchant = normalizedMerchant;
  scenario.currencyBucket = inferCurrencyBucket(currency, locations, merchant || "");
  scenario.flags = { chillMonthlyQualified };
  return scenario;
}

function runScenario(params) {
  const scenario = buildScenario(params);
  const rateMode = params.rateMode || scenario.amount === null || scenario.amount <= 0;
  return state.cards
    .map((card) => evaluateCard(card, scenario, rateMode))
    .sort((left, right) => right.totalRewardAmount - left.totalRewardAmount);
}

const cases = [
  {
    region: "內地", channel: "offline", category: "dining",
    amount: 300, currency: "CNY",
    expectedCard: "BOC Chill Card",
    expectedOffer: "海外簽賬 4%"
  },
  {
    region: "香港", channel: "online", category: "subscription", merchant: "app store",
    amount: 120, currency: "HKD", chillMonthlyQualified: true,
    expectedCard: "長城萬事達 YOU 卡",
    expectedOffer: "Apple Pay 首3筆 100%返現"
  },
  {
    region: "香港", channel: "online", category: "subscription", merchant: "netflix",
    amount: 300, currency: "HKD", chillMonthlyQualified: true,
    expectedCard: "農行萬事達白金卡",
    expectedOffer: "境外精選商戶 10%"
  },
  {
    region: "內地", channel: "online", category: "transport", merchant: "12306",
    amount: 400, currency: "CNY",
    expectedCard: "恒生多貨幣扣賬卡",
    expectedOffer: "指定海外交通 20%"
  },
  {
    region: "內地", channel: "offline", category: "transport", merchant: "環島中港通",
    amount: 400, currency: "CNY",
    expectedCard: "恒生多貨幣扣賬卡",
    expectedOffer: "指定海外交通 20%"
  },
  {
    region: "香港", channel: "online", category: "shopping",
    amount: 500, currency: "HKD",
    expectedCard: "長城萬事達 YOU 卡",
    expectedOffer: "Apple Pay 首3筆 100%返現"
  },
  {
    region: "海外", channel: "offline", category: "general",
    amount: 8000, currency: "JPY",
    expectedCard: "長城萬事達 YOU 卡",
    expectedOffer: "Apple Pay 首3筆 100%返現"
  },
  {
    region: "香港", channel: "offline", category: "shopping", merchant: "三星",
    amount: 3000, currency: "HKD", chillMonthlyQualified: true,
    expectedCard: "BOC Chill Card",
    expectedOffer: "指定商戶 8%"
  },
  {
    region: "香港", channel: "offline", category: "shopping", merchant: "索尼",
    amount: 1500, currency: "HKD", chillMonthlyQualified: true,
    expectedCard: "BOC Chill Card",
    expectedOffer: "指定商戶 8%"
  },
  {
    region: "香港", channel: "offline", category: "dining", merchant: "starbucks",
    amount: 100, currency: "HKD", chillMonthlyQualified: true,
    expectedCard: "長城萬事達 YOU 卡",
    expectedOffer: "Apple Pay 首3筆 100%返現"
  },
  {
    region: "內地", channel: "offline", category: "shopping",
    amount: 3000, currency: "HKD",
    expectedCard: "BOC Chill Card",
    expectedOffer: ""
  },
  {
    region: "香港", channel: "offline", category: "general",
    amount: 250, currency: "HKD",
    expectedCard: "長城萬事達 YOU 卡",
    expectedOffer: "Apple Pay 首3筆 100%返現"
  },
  {
    region: "海外", channel: "online", category: "travel", merchant: "booking.com",
    amount: 2000, currency: "HKD",
    expectedCard: "農行萬事達白金卡",
    expectedOffer: "境外精選商戶 10%"
  },
  {
    region: "海外", channel: "offline", category: "transport",
    amount: 1000, currency: "JPY",
    expectedCard: "長城萬事達 YOU 卡",
    expectedOffer: "Apple Pay 首3筆 100%返現"
  },
  {
    region: "香港", channel: "offline", category: "dining",
    amount: 50, currency: "HKD",
    expectedCard: "長城萬事達 YOU 卡",
    expectedOffer: "Apple Pay 首3筆 100%返現"
  },
  {
    region: "香港", channel: "offline", category: "dining", merchant: "麥當勞",
    amount: 252.67, currency: "HKD",
    expectedAnyCard: "農行萬事達白金卡",
    expectedAnyOffer: "Apple Pay 首3筆 100%返現",
    expectedAnyMinReward: 46.5
  },
  {
    region: "海外", channel: "offline", category: "transport",
    amount: 20, currency: "JPY",
    expectedCard: "農行萬事達白金卡",
    expectedOffer: "境外線下簽賬 3%",
    expectedIncludedOffer: "Apple Pay 首3筆 100%返現"
  },
  {
    region: "香港", channel: "online", category: "subscription", merchant: "app store",
    amount: null, currency: "HKD", rateMode: true,
    expectedCard: "BOC Chill Card",
    expectedOffer: "網上簽賬 4%"
  },
  {
    region: "香港", channel: "offline", category: "dining",
    amount: 50, currency: "HKD",
    expectedCard: "長城萬事達 YOU 卡",
    expectedOffer: "Apple Pay 首3筆 100%返現"
  },
  {
    region: "香港", channel: "offline", category: "general",
    amount: 1000, currency: "HKD", date: "2026-04-24",
    expectedAnyCard: "PayMe 銀聯卡",
    expectedAnyOffer: "港幣/澳門幣/人民幣 3%"
  },
  {
    region: "海外", channel: "offline", category: "general",
    amount: 1000, currency: "THB", date: "2026-04-24",
    expectedAnyCard: "PayMe 銀聯卡",
    expectedAnyOffer: "其他貨幣 10%"
  }
];

const failures = [];

cases.forEach((testCase) => {
  const ranked = runScenario(testCase);
  const best = ranked[0];
  const bestOffer = best.offerTitles[0] || "";
  if (testCase.expectedAnyCard) {
    const matchedResult = ranked.find((result) =>
      result.card.name === testCase.expectedAnyCard
      && result.offerTitles.some((offerTitle) => offerTitle.includes(testCase.expectedAnyOffer))
    );
    if (!matchedResult || (testCase.expectedAnyMinReward && matchedResult.totalRewardAmount < testCase.expectedAnyMinReward)) {
      failures.push({
        ...testCase,
        actualTopCard: best.card.name,
        actualTopOffer: bestOffer,
        actualMatchedReward: matchedResult?.totalRewardAmount
      });
    }
    return;
  }
  const offerMatched = testCase.expectedOffer === "" ? bestOffer === "" : bestOffer.includes(testCase.expectedOffer);
  const cardMatched = best.card.name === testCase.expectedCard;
  const includedOfferMatched = !testCase.expectedIncludedOffer
    || best.offerTitles.some((offerTitle) => offerTitle.includes(testCase.expectedIncludedOffer));

  if (!cardMatched || !offerMatched || !includedOfferMatched) {
    failures.push({
      ...testCase,
      actualCard: best.card.name,
      actualOffer: bestOffer,
      actualOfferTitles: best.offerTitles
    });
  }
});

if (failures.length) {
  console.error("Recommendation regression failures:");
  failures.forEach((failure) => {
    console.error(JSON.stringify(failure, null, 2));
  });
  process.exit(1);
}

console.log(`Recommendation regression passed (${cases.length} cases)`);
