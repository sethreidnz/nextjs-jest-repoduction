import { format as dateFnsFormat } from 'date-fns';
import { enGB } from 'date-fns/locale';

const locales: { [key: string]: Locale } = { enGB };
const defaultFormat = 'PP';

export const formatDate = (date: Date, formatStr = defaultFormat): string => {
  return dateFnsFormat(date, formatStr, {
    locale: locales.enGB, // default to enGB for now
  });
};

export const generateDateBetween = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};
