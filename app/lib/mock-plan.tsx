export const SLOTS = [
  "BREAKFAST",
  "MORNING_SNACK",
  "LUNCH",
  "AFTERNOON_SNACK",
  "DINNER",
] as const;
export type SlotKey = (typeof SLOTS)[number];

export const SLOT_LABELS: Record<SlotKey, string> = {
  BREAKFAST: "Breakfast",
  MORNING_SNACK: "Morning snack",
  LUNCH: "Lunch",
  AFTERNOON_SNACK: "Afternoon snack",
  DINNER: "Dinner",
};

export type MockMeal = {
  id: string;
  name: string;
  why: string;
  tags: string[];
  prep?: string;
};

// First item in each list is shown first. "Swap" moves to the next one.
export const MOCK_PLAN: Record<SlotKey, MockMeal[]> = {
  BREAKFAST: [
    {
      id: "b1",
      name: "Pap (ogi) with plain moi moi",
      why: "Beans are a plant source of protein and iron. This moi moi has no egg or fish.",
      tags: ["Protein", "Iron"],
      prep: "Make the moi moi without egg or fish.",
    },
    {
      id: "b2",
      name: "Boiled yam with ugu and tomato sauce",
      why: "Leafy greens add iron, and tomatoes add vitamin C.",
      tags: ["Vegetable", "Iron", "Vitamin C"],
    },
  ],
  MORNING_SNACK: [
    {
      id: "ms1",
      name: "Ripe pawpaw",
      why: "A cheap fruit with vitamin C and fibre.",
      tags: ["Fruit", "Vitamin C"],
      prep: "Choose fully ripe fruit only. Wash well and peel.",
    },
    {
      id: "ms2",
      name: "Orange or tangerine",
      why: "A good source of vitamin C. Eat it with an iron-rich meal.",
      tags: ["Fruit", "Vitamin C"],
    },
  ],
  LUNCH: [
    {
      id: "l1",
      name: "Stewed beans with boiled plantain and vegetables",
      why: "Beans are an affordable source of protein, iron and fibre.",
      tags: ["Protein", "Iron", "Fibre"],
      prep: "Cook beans until fully soft.",
    },
    {
      id: "l2",
      name: "Brown rice with stewed beans and steamed vegetables",
      why: "Beans and brown rice together give protein, iron and fibre.",
      tags: ["Protein", "Iron", "Fibre"],
    },
  ],
  AFTERNOON_SNACK: [
    {
      id: "as1",
      name: "Carrot and cucumber sticks",
      why: "A crunchy vegetable snack with fibre.",
      tags: ["Vegetable", "Fibre"],
      prep: "Wash well before eating.",
    },
    {
      id: "as2",
      name: "Watermelon slices",
      why: "A refreshing fruit snack that helps with fluids.",
      tags: ["Fruit"],
    },
  ],
  DINNER: [
    {
      id: "d1",
      name: "Yam and vegetable porridge",
      why: "A filling meal with leafy vegetables, made without fish or meat.",
      tags: ["Vegetable", "Fibre"],
    },
    {
      id: "d2",
      name: "Rice with tomato stew, grilled chicken and steamed vegetables",
      why: "Balanced meal with protein, vegetables and vitamin C from the tomato stew.",
      tags: ["Protein", "Vegetable", "Vitamin C"],
      prep: "Cook chicken thoroughly until no pink remains.",
    },
  ],
};

// Draft wording. Replace with reviewed content before launch.
export const MOCK_AVOID = {
  avoid: [
    "Alcohol, including locally brewed drinks.",
    "Raw or undercooked meat, fish and eggs.",
    "Milk that is not pasteurised or well boiled.",
    "Fruits and vegetables that have not been washed well.",
  ],
  limit: [
    "Caffeine from tea, coffee, cola and energy drinks.",
    "Large predatory fish that can be high in mercury.",
    "Herbal mixtures. Check with your clinician first.",
  ],
};
