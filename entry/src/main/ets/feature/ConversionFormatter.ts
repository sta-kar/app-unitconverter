const RESULT_MAX_LENGTH = 14;
const RESULT_MAX_PRECISION = 8;
const MIN_FIXED_ABSOLUTE_VALUE = 0.0001;

export function formatConversion(value: number): string {
  if (value === 0) {
    return '0';
  }

  if (Math.abs(value) >= MIN_FIXED_ABSOLUTE_VALUE) {
    for (let precision = RESULT_MAX_PRECISION; precision >= 0; precision--) {
      const rounded = Number(value.toFixed(precision));
      const result = rounded.toString();
      if (rounded !== 0 && result.length <= RESULT_MAX_LENGTH) {
        return result;
      }
    }
  }

  for (let precision = RESULT_MAX_PRECISION; precision >= 0; precision--) {
    const result = value.toExponential(precision).replace(/\.0+e/, 'e').replace(/(\.\d*?)0+e/, '$1e');
    if (result.length <= RESULT_MAX_LENGTH) {
      return result;
    }
  }

  return value.toExponential(0);
}
