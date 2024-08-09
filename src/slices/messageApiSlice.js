import { apiSlice } from "./apiSlice";

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addMessage: builder.mutation({
      query: (data) => ({
        url: `/message/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Message"],
    }),
    getMessages: builder.query({
      query: () => `/messages`,
      providesTags: ["Message"],
    }),
    getMessage: builder.query({
      query: (id) => `/message/${id}`,
      providesTags: ["Message"],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/message/delete/${id}`,
        method: "POST",
        invalidatesTags: ["Message"],
      }),
    }),
    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/message/read/${id}`,
        method: "POST",
        invalidatesTags: ["Message"],
      }),
    }),
  }),
});

export const {
  useAddMessageMutation,
  useGetMessagesQuery,
  useGetMessageQuery,
  useDeleteMessageMutation,
  useMarkAsReadMutation,
} = messageApiSlice;
