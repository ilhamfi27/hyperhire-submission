import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../hooks';

interface MenuState {
  list: any[];
}

const initialState: MenuState = {
  list: [],
};

const pageSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
});

const {} = pageSlice.actions;

export const useMenuStore = () => {
  const dispatch = useAppDispatch();
  const states = useAppSelector((state) => state.menu);
  return {
    ...states,
  };
};

export default pageSlice.reducer;
