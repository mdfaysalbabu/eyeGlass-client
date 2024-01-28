import { baseApi } from "../../api/baseApi";

const eyeGlassApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEyeGlass: builder.query({
      query: ({
        material,
        shape,
        lens,
        brand,
        gender,
        color,
        minPrice,
        maxPrice,
        searchTerm,
      }) => {
        const params = new URLSearchParams();
        if (material) {
          params.append("frameMaterial", material);
        }
        if (shape) {
          params.append("frameShape", shape);
        }
        if (lens) {
          params.append("lensType", lens);
        }
        if (brand) {
          params.append("brand", brand);
        }
        if (gender) {
          params.append("gender", gender);
        }
        if (color) {
          params.append("color", color);
        }
        if (minPrice) {
          params.append("minPrice", minPrice);
        }
        if (maxPrice) {
          params.append("maxPrice", maxPrice);
        }

        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }

        return {
          url: `/eyeglass/get-all-products`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["all-glasses"],
    }),
    getEyeGlass: builder.query({
      query: (id: string) => ({
        url: `/eyeglass/get-single-product/${id}`,
        method: "GET",
      }),
      providesTags: ["all-glasses"],
    }),
    addEyeGlass: builder.mutation({
      query: (productData) => ({
        url: "/eyeglass/add-product",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["all-glasses"],
    }),
    updateEyeGlass: builder.mutation({
      query: ({ productData, id }) => {
        return {
          url: `/eyeglass/update-product/${id}`,
          method: "PUT",
          body: productData,
        };
      },
      invalidatesTags: ["all-glasses"],
    }),
    deleteEyeGlass: builder.mutation({
      query: (id) => {
        return {
          url: `/eyeglass/delete-product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["all-glasses"],
    }),
    sellEyeGlass: builder.mutation({
      query: (sellData) => {
        return {
          url: `/eyeglass/create-sales`,
          method: "POST",
          body: sellData,
        };
      },
      invalidatesTags: ["all-glasses"],
    }),
  }),
});

export const {
  useGetAllEyeGlassQuery,
  useAddEyeGlassMutation,
  useGetEyeGlassQuery,
  useUpdateEyeGlassMutation,
  useDeleteEyeGlassMutation,
  useSellEyeGlassMutation,
} = eyeGlassApi;
