import { useMemo } from "react";
import axios from "axios";

const useAxiosAuth = (username: string, password: string) => {
    const axiosInstance = useMemo(() => {
        return axios.create({
            baseURL: "https://localhost:8080",
            withCredentials: false,
            auth: {
                username: username,
                password: password
            }
        });
    }, [username, password]);

    return axiosInstance;
};

export default useAxiosAuth;
