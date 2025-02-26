import { AssetHistoryDuration, AssetHistoryIntervals } from "@/typings/models";
import { getTimestamp } from "./business";

export const primaryColor = "#16e9d3";
export const backColor = "linear-gradient(to right, #1e2a54 0%, #050a1d 100%)";
export const secondaryColor =
  "linear-gradient(to right, #215cb4 0%, #215cb4 100%)";

export const ASSET_HISTORY_DURATION_CONFIG = {
  day: {
    id: AssetHistoryDuration.day,
    label: AssetHistoryDuration.day,
    interval: AssetHistoryIntervals.M1,
    duration: {
      start: Date.now() - 24 * 3600 * 1000, //timestamp of yesterday
      end: Date.now(), // timestamp of now
    },
  },
  week: {
    id: AssetHistoryDuration.week,
    label: AssetHistoryDuration.week,
    interval: AssetHistoryIntervals.M30,
    duration: {
      start: Date.now() - 7 * 24 * 3600 * 1000, //timestamp of a week ago
      end: Date.now(), // timestamp of now
    },
  },
  month: {
    id: AssetHistoryDuration.month,
    label: AssetHistoryDuration.month,
    interval: AssetHistoryIntervals.H2,
    duration: {
      start: getTimestamp("month", 1), //timestamp of a month ago
      end: Date.now(), // timestamp of now
    },
  },
  threeMonths: {
    id: AssetHistoryDuration.threeMonths,
    label: AssetHistoryDuration.threeMonths,
    interval: AssetHistoryIntervals.H6,
    duration: {
      start: getTimestamp("month", 3), //timestamp of 3 months ago
      end: Date.now(), // timestamp of now
    },
  },
  sixMonths: {
    id: AssetHistoryDuration.sixMonths,
    label: AssetHistoryDuration.sixMonths,
    interval: AssetHistoryIntervals.D1,
    duration: {
      start: getTimestamp("month", 6), //timestamp of 6 months ago
      end: Date.now(), // timestamp of now
    },
  },
  year: {
    id: AssetHistoryDuration.year,
    label: AssetHistoryDuration.year,
    interval: AssetHistoryIntervals.D1,
    duration: {
      start: getTimestamp("year", 1), //timestamp of a year agp
      end: Date.now(), // timestamp of now
    },
  },
  all: {
    id: AssetHistoryDuration.all,
    label: AssetHistoryDuration.all,
    interval: AssetHistoryIntervals.D1,
    duration: {
      start: getTimestamp("year", 10), //timestamp of 10 years ago - limited by API
      end: Date.now(), // timestamp of now
    },
  },
};
