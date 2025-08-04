const cache = async (req, res, next) => {
    try {
        const key = `logs:summary:${req.query.range || '24h'}`;
        const data = await req.app.locals.redisClient.get(key);
        if (data) {
            console.log("Cache hit for key:", key);
            return res.json(JSON.parse(data));
        }
        req.redisCacheKey = key;
        next();
    } catch (error) {
        console.error("Cache middleware error:", error);
        next(); // Proceed to next middleware if cache fails

    }
}
export default cache;