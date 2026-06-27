import http from "k6/http";
import { check } from "k6";
export { handleSummary } from "../../reporter.js";

export const options = {
    vus: 20,
    duration: "30s",

    thresholds: {
        http_req_duration: ["p(95)<1000"],
    },
};

export default function () {
    const res = http.get(
        "https://restful-booker.herokuapp.com/booking"
    );

    check(res, {
        "Get Booking Success": (r) => r.status === 200,
    });
}