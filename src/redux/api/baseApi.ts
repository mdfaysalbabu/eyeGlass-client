import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://eye-glass-management-backend.vercel.app/api",
  credentials: "include",
});
// done work
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["all-glasses", "sale"],
  endpoints: () => ({}),
});
