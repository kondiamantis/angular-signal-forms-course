import { validate , SchemaPath} from "@angular/forms/signals";

export function passwordStrength(
    path: SchemaPath<string>,
    options?: {message?: string}
) {
    validate(path, ({value}) =>{
        const password = value();
        if(!password) return null;
        const valid = /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)
        return valid ? null: {
          kind: 'passwordStrength',
          message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        }
      })
}

