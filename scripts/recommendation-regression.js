const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
let code = html.match(/<script>([\s\S]*)<\/script>/)[1];
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
global.window = { scrollTo() {}, addEventListener() {} };
global.localStorage = { getItem() { return null; }, setItem() {} };
global.crypto = { randomUUID() { return `id-${Math.random().toString(16).slice(2)}`; } };
global.structuredClone = (value) => JSON.parse(JSON.stringify(value));

eval(code);

function runScenario(description, amount, currency, chillMonthlyQualified = false) {
  const scenario = { description, amount, currency, date: "2026-04-21" };
  Object.assign(scenario, inferScenarioFromText(description));
  scenario.currencyBucket = inferCurrencyBucket(currency, scenario.locations, description);
  scenario.flags = { chillMonthlyQualified };

  return state.cards
    .map((card) => evaluateCard(card, scenario, false))
    .sort((left, right) => right.totalRewardAmount - left.totalRewardAmount);
}

const cases = [
  {
    description: "廣州餐廳食飯",
    amount: 300,
    currency: "CNY",
    expectedCard: "BOC Chill Card",
    expectedOffer: "海外簽賬 4%"
  },
  {
    description: "喺 App Store 買 app",
    amount: 120,
    currency: "HKD",
    chillMonthlyQualified: true,
    expectedCard: "BOC Chill Card",
    expectedOffer: "指定商戶 8%"
  },
  {
    description: "喺 Netflix 訂閱",
    amount: 300,
    currency: "HKD",
    chillMonthlyQualified: true,
    expectedCard: "BOC Chill Card",
    expectedOffer: "指定商戶 8%"
  },
  {
    description: "12306 買高鐵飛",
    amount: 400,
    currency: "CNY",
    expectedCard: "恒生多貨幣扣賬卡",
    expectedOffer: "指定海外交通 20%"
  },
  {
    description: "環島中港通買飛",
    amount: 400,
    currency: "CNY",
    expectedCard: "恒生多貨幣扣賬卡",
    expectedOffer: "指定海外交通 20%"
  },
  {
    description: "香港網上買衫",
    amount: 500,
    currency: "HKD",
    expectedCard: "MMPOWER",
    expectedOffer: "網上服飾 8%"
  },
  {
    description: "日本買嘢",
    amount: 8000,
    currency: "JPY",
    expectedCard: "BOC Chill Card",
    expectedOffer: "海外簽賬 4%"
  },
  {
    description: "買三星電視",
    amount: 3000,
    currency: "HKD",
    chillMonthlyQualified: true,
    expectedCard: "BOC Chill Card",
    expectedOffer: "指定商戶 8%"
  },
  {
    description: "買索尼耳機",
    amount: 1500,
    currency: "HKD",
    chillMonthlyQualified: true,
    expectedCard: "BOC Chill Card",
    expectedOffer: "指定商戶 8%"
  },
  {
    description: "去 Starbucks 買咖啡",
    amount: 100,
    currency: "HKD",
    chillMonthlyQualified: true,
    expectedCard: "BOC Chill Card",
    expectedOffer: "指定商戶 8%"
  },
  {
    description: "廣州買手機",
    amount: 3000,
    currency: "HKD",
    expectedCard: "BOC Chill Card",
    expectedOffer: ""
  }
];

const failures = [];

cases.forEach((testCase) => {
  const ranked = runScenario(
    testCase.description,
    testCase.amount,
    testCase.currency,
    Boolean(testCase.chillMonthlyQualified)
  );
  const best = ranked[0];
  const bestOffer = best.offerTitles[0] || "";
  const offerMatched = testCase.expectedOffer === "" ? bestOffer === "" : bestOffer.includes(testCase.expectedOffer);
  const cardMatched = best.card.name === testCase.expectedCard;

  if (!cardMatched || !offerMatched) {
    failures.push({
      ...testCase,
      actualCard: best.card.name,
      actualOffer: bestOffer
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
