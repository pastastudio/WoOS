import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears,
} from 'date-fns';

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = MINUTES_IN_HOUR * 24;
const MINUTES_IN_MONTH = MINUTES_IN_DAY * 30;
const MINUTES_IN_YEAR = MINUTES_IN_MONTH * 12;

/**
 * Formats a relative time string based on the value, unit, and whether it's in the future.
 * @param value The numeric value of the time unit.
 * @param unit The unit of time (e.g., "second", "minute").
 * @param isFuture A boolean indicating if the time is in the future.
 * @returns A formatted relative time string.
 */
const formatRelative = (value: number, unit: string, isFuture: boolean) => {
  const pluralizedUnit = value === 1 ? unit : `${unit}s`;
  return isFuture
    ? `in ${value} ${pluralizedUnit}`
    : `${value} ${pluralizedUnit} ago`;
};

/**
 * Compares the given date with the current date and returns a human-readable relative time string.
 * @param after The date to compare with the current date.
 * @returns A string representing the relative time difference (e.g., "5 minutes ago", "in 2 hours").
 */
export const getDateCompare = (after: Date) => {
  const currDate = new Date();
  const isFuture = after.getTime() > currDate.getTime();
  const compareInMinutes = Math.abs(differenceInMinutes(currDate, after));

  if (compareInMinutes < 1) {
    return formatRelative(
      Math.abs(differenceInSeconds(currDate, after)),
      'second',
      isFuture,
    );
  }
  if (compareInMinutes < MINUTES_IN_HOUR) {
    return formatRelative(compareInMinutes, 'minute', isFuture);
  }
  if (compareInMinutes < MINUTES_IN_DAY) {
    return formatRelative(
      Math.abs(differenceInHours(currDate, after)),
      'hour',
      isFuture,
    );
  }
  if (compareInMinutes < MINUTES_IN_MONTH) {
    return formatRelative(
      Math.abs(differenceInDays(currDate, after)),
      'day',
      isFuture,
    );
  }
  if (compareInMinutes < MINUTES_IN_YEAR) {
    return formatRelative(
      Math.abs(differenceInMonths(currDate, after)),
      'month',
      isFuture,
    );
  }
  return formatRelative(
    Math.abs(differenceInYears(currDate, after)),
    'year',
    isFuture,
  );
};

/**
 * Gets the current year as a number.
 * @returns The current year.
 */
export const getCurrentYear = () => {
  return new Date().getFullYear();
};
