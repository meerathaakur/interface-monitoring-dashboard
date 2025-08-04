// utils/dateUtils.js
export const getDateRange = (range) => {
    const now = new Date();
    switch (range) {
        case '1h':
            return new Date(now.getTime() - 1 * 60 * 60 * 1000);
        case '6h':
            return new Date(now.getTime() - 6 * 60 * 60 * 1000);
        case '12h':
            return new Date(now.getTime() - 12 * 60 * 60 * 1000);
        case '24h':
            return new Date(now.getTime() - 24 * 60 * 60 * 1000);
        case '7d':
            return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        case '30d':
            return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        default:
            return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }
};
