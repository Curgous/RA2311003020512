import axios from "axios";
import Log from "../logging middleware/logging_middleware.js";
import dotenv from "dotenv";
dotenv.config();
async function solveStuff() {
    try {
        const tk = process.env.TOKEN;

        const depotsResponse = await axios.get(process.env.depots, {
            headers: {
                Authorization: `Bearer ${tk}`
            }
        }).then(response => {
            console.log("Depots fetched");
            return response;
        }).catch(err => console.log("Error fetching depots", err));
        const vehiclesResponse = await axios.get(process.env.vehicles, {
            headers: {
                Authorization: `Bearer ${tk}`
            }
        }).then(response => {
            console.log("Vehicles fetched");
            return response;
        }).catch(err => console.log("Error fetching vehicles", err));


        const depots = depotsResponse.data.depots || [];
        const vehikles = vehiclesResponse.data.vehicles || [];

        const Hours = depots.reduce((sum, d) => sum + (d.MechanicHours || 0), 0);

        const n1 = vehikles.length;
        const dl = Array.from({ length: n1 + 1 }, () => Array(Hours + 1).fill(0));

        for (let i = 1; i <= n1; i++) {
            const { Duration, Impact } = vehikles[i - 1];
            for (let w = 0; w <= Hours; w++) {
                if (Duration <= w) {
                    dl[i][w] = Math.max(dl[i - 1][w], dl[i - 1][w - Duration] + Impact);
                } else {
                    dl[i][w] = dl[i - 1][w];
                }
            }
        }

        let w = Hours;
        const selected = [];

        for (let i = n1; i > 0; i--) {
            if (dl[i][w] !== dl[i - 1][w]) {
                selected.push(vehikles[i - 1]);
                w -= vehikles[i - 1].Duration;
            }
        }
        return {
            totalImpact: dl[n1][Hours],
            finalTasks: selected.reverse()
        };
    } catch (err) {
        console.log(err);
        await Log("backend", "error", "solver", err.message);
        return null;
    }
}

(async () => {
    const res = await solveStuff();
    console.log(res);
})();