import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches // Cek preferred theme pada browser untuk initial theme
  ) {
    return true;
  }
  return false;
};

// Simpan ke local storage
if (localStorage.getItem("darkMode") === null) {
  localStorage.setItem("darkMode", JSON.stringify(getInitialTheme()));
}

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: JSON.parse(localStorage.getItem("darkMode")),
  },
  reducers: {
    switchTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },
  },
});

export const { switchTheme } = themeSlice.actions;
export default themeSlice.reducer;
