import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from '../../api/authAPI';

// ===== State 타입 정의 =====
interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;  // API 호출 중인지
    error: string | null;  // 에러 메시지
}
const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: !!localStorage.getItem('accessToken'),
    loading: false,
    error: null,
};

// ===== Async Thunk (비동기 액션) =====
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: authAPI.LoginRequest, { rejectWithValue }) => {
        try {
            const response = await authAPI.login(credentials);

            localStorage.setItem('accessToken', response.access_token);
            localStorage.setItem('refreshToken', response.refresh_token);

            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (data: authAPI.RegisterRequest, { rejectWithValue }) => {
        try {
            const response = await authAPI.register(data);

            localStorage.setItem('accessToken', response.access_token);
            localStorage.setItem('refreshToken', response.refresh_token);

            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async () => {
      // 토큰 삭제
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // 동기 액션 (필요시 추가)
    },
    extraReducers: (builder) => {
        // ===== 로그인 =====
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.accessToken = action.payload.access_token;
            state.refreshToken = action.payload.refresh_token;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // ===== 회원가입 =====
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.accessToken = action.payload.access_token;
            state.refreshToken = action.payload.refresh_token;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // ===== 로그아웃 =====
        .addCase(logoutUser.fulfilled, (state) => {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
            state.error = null;
        });
    },
});

export default authSlice.reducer;
