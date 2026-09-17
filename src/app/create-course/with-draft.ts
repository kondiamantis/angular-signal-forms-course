import { FieldTree } from "@angular/forms/signals";
import { WritableSignal, effect, assertInInjectionContext } from "@angular/core";

/** Revive ISO / YYYY-MM-DD strings back to Date after JSON.parse. */
function reviveDraftValue(_key: string, value: unknown): unknown {
    if (typeof value !== 'string') return value;

    // Full ISO datetime from JSON.stringify(Date)
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? value : date;
    }

    // Plain date-only values (also valid for <input type="date">)
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const date = new Date(`${value}T00:00:00.000Z`);
        return Number.isNaN(date.getTime()) ? value : date;
    }

    return value;
}

export function withDraft<T>(form: FieldTree<T>, model: WritableSignal<T>, key: string) {

    assertInInjectionContext(withDraft);
    const saved = localStorage.getItem(key);
    if (saved) {
        model.set(JSON.parse(saved, reviveDraftValue));
    }

    effect(() => {
        const value = form().value();
        if (form().dirty()) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    })
}
