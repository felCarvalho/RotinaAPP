import { api } from "../../api/api";

export function authenticateInterceptor() {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { status, config } = error.response;

      if (status === 401 && !config._retry) {
        config._retry = true;

        try {
          await api.get("/auth/refresh");
          return api.request(config);
        } catch (error) {
          window.location.href = "/auth/login";
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    },
  );
}
