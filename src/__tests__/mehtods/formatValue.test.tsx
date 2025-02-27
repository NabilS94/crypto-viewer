import { formatValue } from '@/utils/business';
import { describe, expect, it } from 'vitest';

describe('formatValue', () => {
  it('should format large numbers correctly', () => {
    expect(formatValue(1000, '$0.00a')).toBe('$1.00k');
    expect(formatValue(1000000, '$0.00a')).toBe('$1.00m');
  });

  it('should format small numbers with fixed decimals', () => {
    expect(formatValue(0.123456, '$0.00a', 4)).toBe('0.1235');
  });

  it("should return 'N/A' for undefined values", () => {
    expect(formatValue(undefined, '$0.00a')).toBe('N/A');
  });
});
