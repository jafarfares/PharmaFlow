
import axios from "axios";
import { getAccessToken } from "@/lib/axios/token";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  headers: {
   Accept: "application/json",
   "Content-Type": "application/json",
  },
  timeout: 15000,
})


// عند انتهاء الصلاحية أو توكن غير صالح
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getAccessToken();
    if (token) config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const requestUrl = error.config?.url ?? "";
    const isLoginRequest = requestUrl.includes("/auth/login");
    const isLogoutRequest = requestUrl.includes("/auth/logout");

    // Keep logout 401s in the mutation flow instead of redirecting from here.
    if (isLogoutRequest && error.response?.status === 401) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      typeof window !== "undefined" &&
      !isLoginRequest // مهم: كلمة مرور خاطئة تعيد 401 أيضًا، ولا نريد تحويلًا هنا
    ) {
      localStorage.removeItem("access_token");

      // نحافظ على اللغة من الرابط الحالي (/ar/... → ar)
      const locale = window.location.pathname.split("/")[1] || "ar";
      window.location.href = `/${locale}/login`;
    }

    return Promise.reject(error);
  }
);

export default api;
