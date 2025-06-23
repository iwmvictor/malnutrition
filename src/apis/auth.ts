import {
  ILoginFormData,
  IResetPassword,
  IResetPasswordRequest,
  IUpdatePasswordFormData,
  ISignUp,
} from "../types/auth.d";
import { AuthState } from "../types/common.d";
import api from "./api";

export const login = async (formData: ILoginFormData): Promise<AuthState> => {
  const { data } = await api.post("/auth/signin", formData);
  localStorage.setItem("userData", JSON.stringify(data.data));
  return {
    ...data,
    token: data.data.token,
    roles: data.data.roles || [],
    user: {
      id: data.data.id,
      firstName: data.data.firstName,
      lastName: data.data.lastName,
      email: data.data.email,
      photo: data.data.photo,
    },
  };
};

export const requestPasswordReset = async (data: IUpdatePasswordFormData) => {
  const response = await api.put("/auth/request-password-reset", data);
  return response.data;
};

export const resetPasswordRequest = async (data: IResetPasswordRequest) => {
  const response = await api.post("/auth/reset-password-request", data);
  return response.data;
};

export const resetPassword = async (data: IResetPassword) => {
  const response = await api.post("/auth/reset-password", data);
  return response.data;
};

export const signup = async (formData: ISignUp): Promise<AuthState> => {
  const { data } = await api.post("/auth/signup", formData);
  return data;
};

export const updatePassword = async (data: IUpdatePasswordFormData) => {
  const response = await api.put("/auth/update-password", data);
  return response.data;
};
