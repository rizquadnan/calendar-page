import axios from "axios";

export const fetcher = axios.create({
  baseURL:
    process.env.API_BASE_URL ||
    "https://interviewtest.free.beeceptor.com/calendar",
});
