import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSales: builder.query({
      query: ({ query, userInfo }) => {
        console.log(query);
        const params = new URLSearchParams();
        if (query) {
          params.append("filterBy", query);
        }
        return {
          url: `/sales/get-all-sales/${userInfo.email}/${userInfo.role}`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["sale"],
    }),
    getSale: builder.query({
      query: (id: string) => ({
        url: `/sales/get-sale/${id}`,
        method: "GET",
      }),
      providesTags: ["sale"],
    }),
  }),
});

export const { useGetAllSalesQuery, useGetSaleQuery } = salesApi;
