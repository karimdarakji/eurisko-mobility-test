import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  accessToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUserDetails: (
      state,
      action: PayloadAction<{ username: string; accessToken: string }>
    ) => (state = action.payload),
    logout: () => initialState,
  },
});

export const { addUserDetails, logout } = userSlice.actions;
export default userSlice.reducer;
