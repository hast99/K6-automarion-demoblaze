import http from "k6/http";
import { check } from "k6";
export { handleSummary } from "../../reporter.js";

export const options = {
    vus: 1,
    iterations: 1,
};

export default function () {
    const res = http.get(
        "https://restful-booker.herokuapp.com/ping"
    );

    check(res, {
        "Health Check Success": (r) =>
            r.status === 201 || r.status === 200,
    });
}