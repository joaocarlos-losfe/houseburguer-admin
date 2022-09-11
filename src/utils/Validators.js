export function validPhone (phone) {
    var regex = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$'); 
    return regex.test(phone);
}

export function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}