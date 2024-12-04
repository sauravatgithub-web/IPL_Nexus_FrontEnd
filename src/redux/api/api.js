import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../Assests/config.js";

const api = createApi({
    reducerPath: "api", 
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
    tagTypes: ["Product", "User"], 

    endpoints: (builder) => ({
        getProducts:builder.query({
            query: () => ({
                url: `products/getProducts`,
                credentials: "include",
            }),
            invalidatesTags: ["Product"],
        }),

        updateCart: builder.mutation({
            query: ({ userId, productId }) => ({
                url: "user/updateCart",
                method: "PUT",
                credentials: "include",
                body: { userId, productId },
            }),
            invalidatesTags: ["User"]
        })
    })
})

export default api;
export const { 
    useGetProductsQuery,
    useUpdateCartMutation,
} = api;