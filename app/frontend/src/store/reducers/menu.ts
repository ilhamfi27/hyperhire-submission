import {
  type PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../hooks';
import { MenusFormValues, MenuType } from '../../../@types/menu';
import { frontRequest } from '@/services/request/frontend';
import awaitToError from '@/shared/utils/await-to-error';
import { AxiosError, AxiosResponse } from 'axios';

interface MenuState {
  menus: MenuType[];
  detail: MenusFormValues;
  loading?: boolean;
  error?: string | null;
}

const initialState: MenuState = {
  menus: [],
  detail: {
    id: '',
    depth: 0,
    parentId: null,
    parentName: null,
    name: '',
    mustAddAfter: false,
  },
  loading: false,
  error: null,
};

const asyncRequests = {
  fetchMenus: createAsyncThunk('menus/fetch', async (_, thunkAPI) => {
    const [err, res] = await awaitToError<AxiosError, AxiosResponse>(
      frontRequest.get('/menus'),
    );
    if (err) {
      return thunkAPI.rejectWithValue(err);
    }
    return res.data;
  }),
  detailMenu: createAsyncThunk('menus/detail', async (id: string, thunkAPI) => {
    const [err, res] = await awaitToError<AxiosError, AxiosResponse>(
      frontRequest.get(`/menus/${id}`),
    );
    if (err) {
      return thunkAPI.rejectWithValue(err);
    }
    return res.data;
  }),
  createMenu: createAsyncThunk(
    'menus/create',
    async (data: MenusFormValues, thunkAPI) => {
      const [err, res] = await awaitToError<AxiosError, AxiosResponse>(
        frontRequest.post('/menus', {
          name: data.name,
          parentId: data.parentId,
        }),
      );
      if (err) {
        return thunkAPI.rejectWithValue(err);
      }
      return res.data;
    },
  ),
  putMenu: createAsyncThunk(
    'menus/put',
    async (data: MenusFormValues, thunkAPI) => {
      const [err, res] = await awaitToError<AxiosError, AxiosResponse>(
        frontRequest.put(`/menus/${data.id}`, {
          name: data.name,
        }),
      );
      if (err) {
        return thunkAPI.rejectWithValue(err);
      }
      return res.data;
    },
  ),
  deleteMenu: createAsyncThunk('menus/delete', async (id: string, thunkAPI) => {
    const [err, res] = await awaitToError<AxiosError, AxiosResponse>(
      frontRequest.delete(`/menus/${id}`),
    );
    if (err) {
      return thunkAPI.rejectWithValue(err);
    }
    return res.data;
  }),
};

const pageSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setDetail(state, action: PayloadAction<MenusFormValues>) {
      state.detail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncRequests.fetchMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncRequests.fetchMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = action.payload;
      })
      .addCase(asyncRequests.fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch items';
      })
      .addCase(asyncRequests.createMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncRequests.createMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menus.push(action.payload);
      })
      .addCase(asyncRequests.createMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to create item';
      })
      .addCase(asyncRequests.putMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncRequests.putMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = state.menus.map((menu) =>
          menu.id === action.payload.id ? action.payload : menu,
        );
      })
      .addCase(asyncRequests.putMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to update item';
      })
      .addCase(asyncRequests.deleteMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncRequests.deleteMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = state.menus.filter(
          (menu) => menu.id !== action.payload.id,
        );
      })
      .addCase(asyncRequests.deleteMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to delete item';
      })
      .addCase(asyncRequests.detailMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncRequests.detailMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })
      .addCase(asyncRequests.detailMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch item';
      });
  },
});

const { setDetail } = pageSlice.actions;

export const useMenuStore = () => {
  const dispatch = useAppDispatch();
  const states = useAppSelector((state) => state.menu);
  return {
    ...states,
    setDetail: (data: MenusFormValues) => dispatch(setDetail(data)),
    fetchMenus: () => dispatch(asyncRequests.fetchMenus()),
    detailMenu: (id: string) => dispatch(asyncRequests.detailMenu(id)),
    createMenu: (data: MenusFormValues) =>
      dispatch(asyncRequests.createMenu(data)),
    putMenu: (data: MenusFormValues) => dispatch(asyncRequests.putMenu(data)),
    deleteMenu: (id: string) => dispatch(asyncRequests.deleteMenu(id)),
  };
};

export default pageSlice.reducer;
