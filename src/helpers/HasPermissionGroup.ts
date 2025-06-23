import { PermissionGroup } from "../constants/permissions";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";

export const HasPermissionGroup = (
  requiredGroup: PermissionGroup,
  superAdmin: boolean = false,
) => {
  const authCtx = useContext(AuthContext);
  const hasADMIN = authCtx?.permissionsGroups?.includes("ADMIN") || false;

  return superAdmin
    ? hasADMIN
    : hasADMIN || authCtx?.permissionsGroups?.includes(requiredGroup);
};
