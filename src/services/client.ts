import axios from "axios";
const client = axios.create({
  baseURL: "https://api.nbphuoc.xyz",
});

// client.interceptors.request.use(function (config) {
//   if (localStorage.user) {
//     const userStr = localStorage.getItem("user");
//     const userStorage = userStr ? JSON.parse(userStr) : null;
//     config.headers.Authorization = `Bearer ${userStorage?.tokens?.access?.token}`;
//   }
//   return config;
// });

// client.interceptors.response.use(
//   (response) => response,
//   async (err) => {
//     const { status } = err.response;
//     const originalReq = err.config;

//     if (originalReq.url !== PATH.LOGIN && err.response) {
//       if (
//         err.response.status === 401 &&
//         err.response?.data?.message === "Token not found"
//       ) {
//         localStorage.removeItem("user");
//         window.location.replace(PATH.LOGIN);
//         return Promise.reject();
//       }

//       if (
//         (err.response.status === 401 &&
//           err.response?.data?.message === "Please authenticate",
//         err.config && !err.config._retry)
//       ) {
//         originalReq._retry = true;
//         const userStr = localStorage.getItem("user");
//         const userStorage = userStr ? JSON.parse(userStr) : null;
//         const refreshToken = userStorage?.tokens?.refresh?.token;

//         // request to refresh token
//         try {
//           const res = await client.post(REFRESH_TOKEN_URL, {
//             refreshToken: refreshToken,
//           });

//           localStorage.setItem("user", JSON.stringify(res.data));
//           originalReq.headers[
//             "Authorization"
//           ] = `Bearer ${res.data?.tokens?.access?.token}`;
//           originalReq.headers["Device"] = "device";

//           return client(originalReq);
//         } catch (_error) {
//           return Promise.reject(_error);
//         }
//       }
//     }

//     switch (status) {
//       case 403:
//         localStorage.removeItem("user");
//         window.location.replace(PATH.LOGIN);
//         break;
//       default:
//         break;
//     }

//     return Promise.reject(err);
//   }
// );
export default client;
