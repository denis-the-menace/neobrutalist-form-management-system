import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/user/login`,
        method: "POST",
        body: data,
      }),
    }),
    checkLogin: builder.query({
      query: (token) => ({
        url: `/user/check-login`,
        method: "POST",
        headers: { token },
      }),
    }),
    logout: builder.mutation({
      query: (token) => ({
        url: `/user/logout`,
        method: "POST",
        headers: { token },
      }),
    }),
    getUsers: builder.query({
      query: () => `/users`,
      providesTags: ["User"],
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        providesTags: (result, error, id) => [{ type: "User", id }],
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/update/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    addReader: builder.mutation({
      query: (data) => ({
        url: `/user/add-reader/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// TODO lazy
export const {
  useLoginMutation,
  useCheckLoginQuery,
  useLogoutMutation,
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useAddReaderMutation,
} = userApiSlice;
