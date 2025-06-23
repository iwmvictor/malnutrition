import { AuthContext } from "@/contexts/Auth";
import { Permission } from "../constants/permissions";
import { useContext } from "react";

export const HasPermissions = (permissions: Permission[]) => {
  const authCtx = useContext(AuthContext);

  const hasADMIN = authCtx?.permissionsGroups?.includes("ADMIN") || false;
  const authCtxPermissions = new Set(authCtx?.permissions || []);

  return hasADMIN
    ? permissions
    : permissions.filter((permission) => authCtxPermissions.has(permission));
};
