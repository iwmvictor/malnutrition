import { IUser } from "../types";
import {
  ILoginFormData,
  IResetPassword,
  IResetPasswordRequest,
  IUpdatePasswordFormData,
  ISignUp,
} from "../types/auth.d";
import { AuthState } from "../types/common.d";
import api from "./api";

export const login = async (formData: ILoginFormData): Promise<IUser> => {
  const { data } = await api.post("/auth/signin", formData);
  return {
    token: data.data.token,
    roles: data.data.roles || [],
    firstName: data.data.firstName,
    lastName: data.data.lastName,
    email: data.data.email,
    id: data.data.id,
    photo: data.data.photo,
    phoneNumber: data.data.phoneNumber || undefined,
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
