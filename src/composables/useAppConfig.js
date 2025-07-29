export function useAppConfig() {
    const appUrl = import.meta.env.VITE_APP_RESOURCE_URL;
    return { appUrl };
}
