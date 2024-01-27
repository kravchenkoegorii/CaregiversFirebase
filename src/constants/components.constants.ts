import { Needings } from "../abstracts/enums";

export const DEFAULT_PER_PAGE = 10;

export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50, 100];

export const REQUEST_CHOICES = [
  { id: Needings.TAKE_SHOWER, name: "Take a shower" },
  { id: Needings.SUPERVISE_SHOWER, name: "Supervise a shower" },
  { id: Needings.COOK_MEAL, name: "Cook a meal" },
  { id: Needings.GO_WALK, name: "Go for a walk" }
];
