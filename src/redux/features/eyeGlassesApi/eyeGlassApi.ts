import { baseApi } from "../../api/baseApi";

const eyeGlassesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEyeGlass: builder.query({
      query: () => ({
        url: "/eyeglass/get-all-eyeglass",
        method: "GET",
      }),
    }),
    addEyeGlass: builder.mutation({
      query: (productData) => ({
        url: "/eyeglass/add-product",
        method: "POST",
        body: productData,
      }),
    }),
  }),
});

export const { useGetAllEyeGlassQuery,useAddEyeGlassMutation } = eyeGlassesApi;
