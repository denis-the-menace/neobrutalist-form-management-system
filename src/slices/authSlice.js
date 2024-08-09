import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userApiSlice } from "./userApiSlice";

const initialState = {
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  userInfo: null,
  loading: false,
  error: null,
};

export const checkLoginStatus = createAsyncThunk(
  "auth/checkLoginStatus",
  async (token, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(
        userApiSlice.endpoints.checkLogin.initiate(token),
      ).unwrap();

      if (response.error) {
        localStorage.removeItem("token");
        return rejectWithValue(response.error);
      }
      return response;
    } catch (error) {
      localStorage.removeItem("token");
      return rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.data.token;
      state.userInfo = action.payload.data.user;
      localStorage.setItem("token", JSON.stringify(action.payload.data.token));
    },
    deleteCredentials: (state, action) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkLoginStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.data.user; // Update this based on the actual structure
      })
      .addCase(checkLoginStatus.rejected, (state) => {
        state.loading = false;
        state.token = null;
        state.userInfo = null;
      });
  },
});

export const { setCredentials, deleteCredentials } = authSlice.actions;

export default authSlice.reducer;
