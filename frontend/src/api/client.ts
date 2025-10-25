import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'http://192.168.45.37:8000/apis/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});

// ===== Request Interceptor =====
// 모든 요청 전에 자동으로 실행됨
apiClient.interceptors.request.use(
(config) => {
    // localStorage에서 토큰 가져오기
    const token = localStorage.getItem('accessToken');

    // 토큰이 있으면 Authorization 헤더에 추가
    if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
},
(error) => {
    // 요청 에러 처리
    return Promise.reject(error);
}
);

// ===== Response Interceptor =====
// 모든 응답을 받은 후 자동으로 실행됨
apiClient.interceptors.response.use(
(response) => {
    // 성공 응답은 그대로 반환
    return response;
},
(error) => {
    // 401 에러 (인증 실패) 처리
    if (error.response?.status === 401) {
    // 토큰 삭제
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // 로그인 페이지로 리다이렉트
    window.location.href = '/login';
    }

    return Promise.reject(error);
}
);

export default apiClient;