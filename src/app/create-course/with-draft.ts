import { assertInInjectionContext, effect, WritableSignal } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';

export function withDraft<T>(form: FieldTree<T>, model: WritableSignal<T>, key: string) {
  assertInInjectionContext(withDraft);
  const saved = localStorage.getItem(key);
  if (saved) {
    model.set(JSON.parse(saved));
  }

  effect(() => {
    if (form().dirty()) {
      localStorage.setItem(key, JSON.stringify(model()));
    }
  });
}
