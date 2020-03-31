import { isNumber } from './isNumber';

export function isHourValid(string) {
    const hour = string.split(":");
    if((hour[0] >= 0 && hour[0] <= 23 && isNumber(hour[0])) &&
       (hour[1] >= 0 && hour[1] <= 59 && isNumber(hour[1]))){
        return true;
    } 
    else {
        return false;
    }
}