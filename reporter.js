import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export function handleSummary(data) {
  return {
    //buatkan report dalam bentuk json, html, dan csv
    "reports/summary.html": htmlReport(data),
    "reports/summary.json": JSON.stringify(data),
    "reports/summary.csv": textSummary(data, { indent: " ", enableColors: true }),
  };
}