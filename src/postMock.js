import { DateTime } from 'luxon';

export const today = {
  id: '1',
  title: 'Today',
  created: DateTime.now().toISO(),
  markdown: '',
  html: '',
};

export const thisWeek = {
  id: '2',
  title: 'This Week',
  created: DateTime.now().minus({ days: 5 }).toISO(),
  markdown: '',
  html: '',
};

export const thisMonth = {
  id: '3',
  title: 'This month',
  created: DateTime.now().minus({ week: 3 }).toISO(),
  markdown: '',
  html: '',
};
