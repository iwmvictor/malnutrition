import api from "./api";
import { IUser } from "../types/common";

export const getMyProfile = async (): Promise<IUser> => {
  const token = localStorage.getItem("authToken");
  console.log("tken", token)
  const { data } = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
