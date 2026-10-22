import type { DailyRule } from "./types";

// These rules are data, not logic. Your nurse reviewer should read and
// approve this file. Change a number here and the generator follows.
export const DAILY_RULES: DailyRule[] = [
  {
    id: "iron",
    kind: "DAY_MIN",
    tag: "IRON",
    min: 1,
    message:
      "No iron-rich meal fit your choices today. Ask your clinician about iron.",
  },
  {
    id: "vitamin-c",
    kind: "DAY_MIN",
    tag: "VITAMIN_C",
    min: 1,
    message: "No vitamin C food fit your choices today.",
  },
  {
    id: "vitamin-a",
    kind: "DAY_MIN",
    tag: "VITAMIN_A",
    min: 1,
    message:
      "No vitamin A food fit your choices today. Ask your clinician how to get enough vitamin A from food.",
  },
  {
    id: "zinc",
    kind: "DAY_MIN",
    tag: "ZINC",
    min: 1,
    message: "No zinc-rich food fit your choices today. Ask your clinician about zinc.",
  },
  {
    id: "calcium",
    kind: "DAY_MIN",
    tag: "CALCIUM",
    min: 1,
    message:
      "No calcium-rich food fit your choices today. Ask your clinician how to get enough calcium.",
  },
  {
    id: "vegetable",
    kind: "DAY_MIN",
    tag: "VEGETABLE",
    min: 2,
    message: "We could not fit two vegetable servings into today's plan.",
  },
  {
    id: "fruit",
    kind: "DAY_MIN",
    tag: "FRUIT",
    min: 1,
    message: "We could not fit a fruit into today's plan.",
  },
  {
    id: "protein-main-meals",
    kind: "EACH_SLOT",
    tag: "PROTEIN",
    slots: ["BREAKFAST", "LUNCH", "DINNER"],
    message:
      "Some meals in this plan have little protein because of your choices.",
  },
];
