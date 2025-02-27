import { AssetHistoryDuration, AssetHistoryIntervals } from '@/typings/models';
import { getTimestamp } from './business';

/**
 * Configuration object for asset history durations and their respective settings.
 * Defines time ranges and intervals for fetching asset history data.
 * Each property represents a different time duration option.
 */
export const ASSET_HISTORY_DURATION_CONFIG = {
  day: {
    id: AssetHistoryDuration.day,
    label: AssetHistoryDuration.day,
    interval: AssetHistoryIntervals.M1, // 1 minute interval for data points
    duration: {
      start: Date.now() - 24 * 3600 * 1000, //timestamp of yesterday
      end: Date.now()
    }
  },
  week: {
    id: AssetHistoryDuration.week,
    label: AssetHistoryDuration.week,
    interval: AssetHistoryIntervals.M30, // 30 minutes interval for data points
    duration: {
      start: Date.now() - 7 * 24 * 3600 * 1000, //timestamp of a week ago
      end: Date.now()
    }
  },
  month: {
    id: AssetHistoryDuration.month,
    label: AssetHistoryDuration.month,
    interval: AssetHistoryIntervals.H2, // 2 hours interval for data points
    duration: {
      start: getTimestamp('month', 1), //timestamp of a month ago
      end: Date.now()
    }
  },
  threeMonths: {
    id: AssetHistoryDuration.threeMonths,
    label: AssetHistoryDuration.threeMonths,
    interval: AssetHistoryIntervals.H6,
    duration: {
      start: getTimestamp('month', 3), //timestamp of 3 months ago
      end: Date.now()
    }
  },
  sixMonths: {
    id: AssetHistoryDuration.sixMonths,
    label: AssetHistoryDuration.sixMonths,
    interval: AssetHistoryIntervals.D1,
    duration: {
      start: getTimestamp('month', 6), //timestamp of 6 months ago
      end: Date.now()
    }
  },
  year: {
    id: AssetHistoryDuration.year,
    label: AssetHistoryDuration.year,
    interval: AssetHistoryIntervals.D1,
    duration: {
      start: getTimestamp('year', 1), //timestamp of a year agp
      end: Date.now()
    }
  },
  all: {
    id: AssetHistoryDuration.all,
    label: AssetHistoryDuration.all,
    interval: AssetHistoryIntervals.D1,
    duration: {
      start: getTimestamp('year', 10), //timestamp of 10 years ago - limited by CoinCap API
      end: Date.now()
    }
  }
};
