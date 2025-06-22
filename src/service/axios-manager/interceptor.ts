import { AxiosError, AxiosInstance } from 'axios';

export const InterceptorErrorHandler = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      const { response } = error;

      if (response) {
        console.log('response', response);
      }

      return Promise.reject(error);
    }
  );
};

export const InterceptorRemoveParamsNull = (instance: AxiosInstance) => {
  instance.interceptors.request.use(config => {
    if (config.params) {
      config.params = Object.fromEntries(
        Object.entries(config.params).filter(
          ([_, value]) => value !== null && value !== undefined && value !== ''
        )
      );
    }

    return config;
  });
};
