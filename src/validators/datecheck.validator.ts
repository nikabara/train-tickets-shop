import { AbstractControl, ValidatorFn } from "@angular/forms";

// Returns null if given data is earlier than present time else true
export function dateCheckValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const dateNow = new Date();
        const selectedDate = new Date(control.value);

        dateNow.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        return selectedDate < dateNow ? { futureDate: true } : null;
    }
}