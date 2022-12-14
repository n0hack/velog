import axios from 'axios';

const client = axios.create();

// API 주소
// client.defaults.baseURL =
//   process.env.NODE_ENV === 'production'
//     ? 'Production 서버 API 주소'
//     : 'http://localhost:4000';

// 헤더 설정
// client.defaults.headers.common["Authorization"] = "Bearer a1b2c3d4";

// 인터셉터 설정
client.interceptors.response.use(
  (response) => {
    // 요청 성공 시 작업
    return response;
  },
  (error) => {
    // 요청 실패 시 작업
    return Promise.reject(error);
  },
);

export default client;
