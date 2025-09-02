
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL ,
  headers: {
    Authorization: `Bearer 1918c3356c6e81e872282e4f6583f4eedad3be601d321275d462f0a31c7350ab5280a779c9e601378a3d00ce2dbf09ca0722a58c5c8c3030226bda18e1f0705375469aba75d31d0274f2e5339eadbdd741221a443f2ec344c8b17624b77f6d926e646f5534faba00ad94df9fd457affe063dc696360c9fd0074474c4abd4fada`,
  },
});


export default axiosInstance;
