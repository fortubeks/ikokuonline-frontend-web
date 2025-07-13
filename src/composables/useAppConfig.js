export function useAppConfig() {
    const appUrl = import.meta.env.VITE_APP_BASE_URL;
    return { appUrl };
}
