export function capitalizeFirst(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeAll(string:string) {
    return string.split(' ').map(capitalizeFirst).join(' ');
}

export function decapitalizeAll(string:string) {
    return string.toLowerCase();
}