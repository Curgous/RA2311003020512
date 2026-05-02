import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import Log from "../logging middleware/logging_middleware.js";

const weights = {
    placement: 3,
    result: 2,
    event: 1
};
async function getTopN(n, token) {
    try {
        const res = await axios.get(process.env.notifications, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = res.data.notifications || [];

        const scored = data.map(noti => {
            const type = noti.Type.toLowerCase();
            const weight = weights[type] || 0;
            const time = new Date(noti.Timestamp).getTime();
            return {
                ...noti,
                score: weight * 1e12 + time
            };
        });

        scored.sort((a, b) => b.score - a.score);

        return scored.slice(0, n);
    } catch (err) {
        await Log("backend", "error", "notification", err.message || "fetch failed");
        return [];
    }
}

(async () => {
    const tk = process.env.TOKEN;
    const result = await getTopN(5, tk);
    console.log(result);
})();