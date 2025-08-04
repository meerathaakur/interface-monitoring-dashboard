import Log from "../models/Log.model.js";
import { getDateRange } from "../utils/helper.js";

export const getPaginationLogs = async (req, res) => {
    const {
        page = 1,
        limit = 10,
        status,
        interfaceName,
        from,
        to
    } = req.query;
    const query = {}

    if (status) query.status = status;
    if (interfaceName) query.interfaceName = interfaceName;
    if (from && to) query.timestamp = { $gte: new Date(from), $lte: new Date(to) }

    try {
        const logs = await Log.find(query)
            .sort({ timestamp: -1 })
            .skip((parseInt(page) - 1) * parseInt(limit))
            .limit(parseInt(limit))
            .lean();

        const totalLogs = await Log.countDocuments(query)
        console.log("Fetched logs:", logs.length, "Total logs:", totalLogs);
        res.json({ logs, totalLogs, page: parseInt(page), limit: parseInt(limit) });
    } catch (error) {
        console.error("Error fetching logs:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getSummaryLogs = async (req, res) => {
    const { range = '24h' } = req.query;
    const dateFilter = getDateRange(range);

    try {
        const stats = await Log.aggregate([
            { $match: { timestamp: { $lte: dateFilter } } },
            { $group: { _id: "$status", count: { $sum: 1 } } },
        ])

        // console.log(stats)
        const key = req.redisCacheKey;
        if (key) {
            await req.app.locals.redisClient.setEx(key, 3600, JSON.stringify(stats))
        }
        res.json(stats);
    } catch (error) {
        console.error("Error fetching summary logs:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

export const getTimelineLogs = async (req, res) => {
    try {
        const { range = '24h' } = req.query;
        const dateFilter = getDateRange(range);

        const timelineData = await Log.aggregate([
            {
                $match: {
                    timestamp: { $gte: dateFilter },
                    status: { $in: ['Success', 'Failed'] }
                }
            },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                        status: "$status"
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: "$_id.date",
                    successCount: {
                        $sum: { $cond: [{ $eq: ["$_id.status", "Success"] }, "$count", 0] }
                    },
                    failureCount: {
                        $sum: { $cond: [{ $eq: ["$_id.status", "Failed"] }, "$count", 0] }
                    }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json(timelineData.map(item => ({
            date: item._id,
            successCount: item.successCount,
            failureCount: item.failureCount
        })));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}