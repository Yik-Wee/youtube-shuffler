export function toQuery(search: string) {
    const start: number = search.indexOf('=') + 1;
    const end: number | undefined = search.indexOf('&') + 1 || undefined;
    const q: string = search.substring(start, end ? end - 1 : undefined);
    return decodeURI(q).trim();
}