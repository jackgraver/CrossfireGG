
export function hasSession(session: any) {
    return !!session && Object.keys(session).length > 0;
}