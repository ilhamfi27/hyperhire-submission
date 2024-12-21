import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../hooks';
import { frontRequest } from '@/services/request/frontend';
import awaitToError from '@/shared/utils/await-to-error';
import { AxiosError, AxiosResponse } from 'axios';
import { User } from '../../../@types/user';

interface UserState {
  user: User | null;
  loading?: boolean;
  error?: string | null;
}

const initialState: UserState = {
  user:
    typeof window !== 'undefined'
      ? (() => {
          return JSON.parse(localStorage.getItem('user') ?? 'null');
        })()
      : null,
  loading: false,
  error: null,
};

const asyncRequests = {
  logout: createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    const [err, res] = await awaitToError<AxiosError, AxiosResponse>(
      frontRequest.get('/auth/login'),
    );
    if (err) {
      return thunkAPI.rejectWithValue(err);
    }
    return res.data;
  }),
  login: createAsyncThunk('auth/login', async (data: User, thunkAPI) => {
    const [err, res] = await awaitToError<AxiosError, AxiosResponse>(
      frontRequest.post('/auth/login', {
        username: data.username,
        password: data.password,
      }),
    );
    if (err) {
      return thunkAPI.rejectWithValue(err);
    }
    return res.data;
  }),
};

const pageSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncRequests.logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncRequests.logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        localStorage.removeItem('user');
      })
      .addCase(asyncRequests.logout.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch items';
      })
      .addCase(asyncRequests.login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncRequests.login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem(
          'user',
          JSON.stringify({
            username: action.payload.user.username,
            accessToken: action.payload.accessToken,
          }),
        );
      })
      .addCase(asyncRequests.login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to create item';
      });
  },
});

export const useAuthStore = () => {
  const dispatch = useAppDispatch();
  const states = useAppSelector((state) => state.auth);
  return {
    ...states,
    login: (data: User) => dispatch(asyncRequests.login(data)),
    logout: () => dispatch(asyncRequests.logout()),
  };
};

export default pageSlice.reducer;
