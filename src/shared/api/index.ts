import { ofetch } from "ofetch";
import { useUserStore } from "../store/useUserStore";

const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

export class ApiError extends Error {
  response: Response;
  status: number;

  constructor(response: Response) {
    super(response.statusText);
    this.response = response;
    this.status = response.status;
  }
}

export const apiFetch = ofetch.create({
  baseURL: BASE_URL,
  async onResponseError({ response }) {
    throw new ApiError(response);
  },
});

const getToken = () => useUserStore.getState().accessToken;

export const userFetch = ofetch.create({
  baseURL: BASE_URL,
  async onRequest({ options }) {
    options.headers.set("Authorization", "Bearer " + getToken());
  },
  async onResponseError({ response }) {
    if (response.status === 401) {
      window.location.href = "/login";
      return;
    }

    throw new ApiError(response);
  },
});

interface TokenResponse {
  token: string;
}

export const getTokenForUser = async (userId: number) => {
  return await apiFetch<TokenResponse>("/token", {
    method: "GET",
    params: { user_id: userId },
  });
};

export const getQRCode = async (userId: number) => {
  if (!userId) {
    throw new Error("User ID is not available");
  }
  
  return await apiFetch(`/qr`, {
    method: "GET",
    params: { 
      patient_id: userId,
      token: "123"
    }
  });
};