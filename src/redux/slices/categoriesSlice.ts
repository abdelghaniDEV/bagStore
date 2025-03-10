import { getAllCategories } from "@/actions/categoriesActions";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const fetchCategories = createAsyncThunk(
  "categoriesSlice/fetchCategories",
  async () => {
    try {
      const response = await getAllCategories();
      return response; // Return the data directly
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; // Reject the thunk with error
    }
  }
);

const categoriesSlice = createSlice({
  initialState: [],
  name: "categoriesSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      console.log("Categories", action.payload);
      return (state = action.payload?.categories);
    });
  },
});

const {} = categoriesSlice.actions;
export default categoriesSlice.reducer;
