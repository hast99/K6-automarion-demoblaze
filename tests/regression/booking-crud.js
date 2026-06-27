import http from "k6/http";
import { check, sleep } from "k6";
export { handleSummary } from "../../reporter.js";

export const options = {
    vus: 5,
    iterations: 10,

    thresholds: {
        http_req_duration: ["p(95)<1500"],
        http_req_failed: ["rate<0.01"],
    },
};

const BASE_URL =
    "https://restful-booker.herokuapp.com";

export default function () {

    // CREATE TOKEN
    const auth = http.post(
        `${BASE_URL}/auth`,
        JSON.stringify({
            username: "admin",
            password: "password123",
        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    check(auth, {
        "Create Token Success": (r) =>
            r.status === 200,
    });

    const token = auth.json("token");

    // CREATE BOOKING
    const createBooking = http.post(
        `${BASE_URL}/booking`,
        JSON.stringify({
            firstname: "Hafidh",
            lastname: "QA",
            totalprice: 1000,
            depositpaid: true,
            bookingdates: {
                checkin: "2026-01-01",
                checkout: "2026-01-10",
            },
            additionalneeds: "Breakfast",
        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    check(createBooking, {
        "Create Booking Success": (r) =>
            r.status === 200,
    });

    const bookingId =
        createBooking.json("bookingid");

    // GET DETAIL
    const detail = http.get(
        `${BASE_URL}/booking/${bookingId}`
    );

    check(detail, {
        "Get Detail Success": (r) =>
            r.status === 200,
    });

    // UPDATE
    const update = http.put(
        `${BASE_URL}/booking/${bookingId}`,
        JSON.stringify({
            firstname: "Updated",
            lastname: "User",
            totalprice: 2000,
            depositpaid: true,
            bookingdates: {
                checkin: "2026-02-01",
                checkout: "2026-02-10",
            },
            additionalneeds: "Lunch",
        }),
        {
            headers: {
                "Content-Type": "application/json",
                Cookie: `token=${token}`,
            },
        }
    );

    check(update, {
        "Update Booking Success": (r) =>
            r.status === 200,
    });

    // DELETE
    const del = http.del(
        `${BASE_URL}/booking/${bookingId}`,
        null,
        {
            headers: {
                Cookie: `token=${token}`,
            },
        }
    );

    check(del, {
        "Delete Booking Success": (r) =>
            r.status === 201,
    });

    sleep(1);
}