import { DateTime } from "luxon";

export const today = {
  id: "1",
  title: "Today",
  created: DateTime.now().toISO(),
};

export const thisWeek = {
  id: "2",
  title: "This Week",
  created: DateTime.now().minus({ days: 5 }).toISO(),
};

export const thisMonth = {
  id: "3",
  title: "This month",
  created: DateTime.now().minus({ week: 3 }).toISO(),
};
