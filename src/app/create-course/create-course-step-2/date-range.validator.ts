import { SchemaPath, validateTree } from '@angular/forms/signals';

export function dateRange(
  startPath: SchemaPath<Date | null>,
  endPath: SchemaPath<Date | null>,
  message = 'Start date must be before the end date.',
) {
  validateTree(startPath, ({ value, valueOf }) => {
    const start = value();
    const end = valueOf(endPath);
    if (start && end && start >= end) {
      return { kind: 'dateRange', message };
    }
  });
}
