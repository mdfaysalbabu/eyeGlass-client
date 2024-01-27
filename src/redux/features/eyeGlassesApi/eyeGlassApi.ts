import { baseApi } from "../../api/baseApi";

const eyeGlassesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEyeGlass: builder.query({
      query: () => ({
        url: "/eyeglass/get-all-eyeglass",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllEyeGlassQuery } = eyeGlassesApi;
