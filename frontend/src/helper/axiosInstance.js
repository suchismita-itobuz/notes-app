import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/notes",
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          
            return null;
        }

      

        const res = await axios.get("http://localhost:4000/notes/generateNewToken", {
            headers: { Authorization: `Bearer ${refreshToken}` },
        });

        if (res.status === 200) {
            const newAccessToken = res.data.data.token;
            const newRefreshToken = res.data.data.rtoken
          

            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("refreshToken",newRefreshToken)
            return {newAccessToken,newRefreshToken};
        }
    } catch (error) {
       
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; 
        return null;
    }
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        

        const originalRequest = error.config;

        if (error.response?.status === 403 && error.response.data?.message === "Token has expired") {
            if (originalRequest._retry) {
              
                return Promise.reject(error);
            }

            originalRequest._retry = true;
           

            const newTokens = await refreshAccessToken();

            if (newTokens?.newAccessToken) {
               
                originalRequest.headers["Authorization"] = `Bearer ${newTokens.newAccessToken}`;
                return axiosInstance(originalRequest); 
            }
        } 
        else if (error.response?.status === 401) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
        } 
        else if (error.response?.status === 404 && error.response.data?.message === "Token wasn't present in headers") {
            window.location.href = "/not-found";
        }

        return Promise.reject(error);
    }
);

export { axiosInstance };
