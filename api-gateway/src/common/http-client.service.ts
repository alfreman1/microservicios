import axios, { AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import CircuitBreaker from 'opossum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpClientService {
  private breaker: CircuitBreaker;

  constructor() {
    axiosRetry(axios, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (error) =>
        axiosRetry.isNetworkOrIdempotentRequestError(error) ||
        (error.response?.status ?? 0) >= 500,
    });

    this.breaker = new CircuitBreaker(
      (config: AxiosRequestConfig) => axios.request(config),
      {
        timeout: 4000,
        errorThresholdPercentage: 50,
        volumeThreshold: 5,
        resetTimeout: 10000,
      }
    );
  }

  async request<T = any>(config: AxiosRequestConfig): Promise<T> {
    const res = await this.breaker.fire(config);
    return (res as any).data as T;
  }
}
