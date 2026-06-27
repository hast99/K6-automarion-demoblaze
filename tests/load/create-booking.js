import http from "k6/http";
import { check } from "k6";
export { handleSummary } from "../../reporter.js";

export const options = {
    vus: 10,
    duration: "30s",
};

export default function () {

    const payload = JSON.stringify({
        firstname: "Hafidh",
        lastname: "QA",
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-01-01",
            checkout: "2026-01-10",
        },
        additionalneeds: "Breakfast",
    });

    const params = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const res = http.post(
        "https://restful-booker.herokuapp.com/booking",
        payload,
        params
    );

    check(res, {
        "Create Booking Success": (r) =>
            r.status === 200,
    });
}