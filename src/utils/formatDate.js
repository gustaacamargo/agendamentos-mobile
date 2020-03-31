import { isNumber } from './isNumber';

export function formatDate(string) {
    const dateInitial = string.split("/");
    if((dateInitial[1] >= 1 && dateInitial[1] <= 12 && isNumber(dateInitial[1])) &&
       (dateInitial[0] >= 1 && dateInitial[0] <= 31 && isNumber(dateInitial[0])) &&
       (dateInitial[2] >= 1 && dateInitial[2] <= 3000 && isNumber(dateInitial[2]))){
        return dateInitial[2]+"-"+dateInitial[1]+"-"+dateInitial[0];
    } 
    else {
        return false;         
    }
}