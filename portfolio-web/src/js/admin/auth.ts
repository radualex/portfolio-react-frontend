export const checkAdminAuth = async (): Promise<boolean> => {
    try {
        const response = await fetch('/admin/status', {
            credentials: 'same-origin',
            cache: 'no-store'
        });

        return response.ok;
    } catch {
        return false;
    }
};
