
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  headers: {
   Accept: "application/json",
   "Content-Type": "application/json",
  },
  timeout: 15000,
})


// عند انتهاء الصلاحية أو توكن غير صالح
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const isLoginRequest = error.config?.url?.includes("/auth/login");

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