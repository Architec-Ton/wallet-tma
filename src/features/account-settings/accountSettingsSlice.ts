// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import createSettingsButtons from '../../pages/account/settings-buttons.ts';

// const loadStateFromLocalStorage = (key) => {
//   try {
//     const serializedState = localStorage.getItem(key);
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (err) {
//     console.error('Error loading state from local storage', err);
//     return undefined;
//   }
// };

// const saveStateToLocalStorage = (key, state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem(key, serializedState);
//   } catch (err) {
//     console.error('Error saving state to local storage', err);
//   }
// };

// const SETTINGS_STORAGE_KEY = 'accountSettings';

// const initialState =
//   loadStateFromLocalStorage(SETTINGS_STORAGE_KEY) || createSettingsButtons();

// const accountSettingsSlice = createSlice({
//   name: 'accountSettings',
//   initialState,
//   reducers: {
//     updateSettingValue: (state, action) => {
//       const setting = state.find(
//         (setting: boolean) => setting.name === action.payload.name
//       );
//       if (setting) {
//         setting.settingValue = action.payload.settingValue;
//       }
//     //   saveStateToLocalStorage(SETTINGS_STORAGE_KEY, state);
//     },
//   },
// });

// export const { updateSettingValue } = accountSettingsSlice.actions;

// export default accountSettingsSlice.reducer;
