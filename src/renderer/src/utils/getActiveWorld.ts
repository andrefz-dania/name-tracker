export function getActiveWorld() {
    const result = JSON.parse(localStorage.getItem('activeWorld'))
    if (result.id) return result.id;
    else return 0
}