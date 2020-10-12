import { formatDateString } from './formatDateString';

export function returnDateFormatted(date) {
    const string = date.toString();
    const dateString = string.split("T");
    return formatDateString(dateString[0]);
}