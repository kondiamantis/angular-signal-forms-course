import { HasUnsavedChanges } from "./has-unsaved-changed.model";
import { CanDeactivateFn } from "@angular/router";

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (component) => {
    if (component.hasUnsavedChanges()) {
        return confirm('You have unsaved changes. Are you sure you want to leave?');
    }
    return true;
}