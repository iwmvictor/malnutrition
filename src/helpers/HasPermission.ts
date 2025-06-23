import { Permission } from "../constants/permissions";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";

type ExtendedPermission = Permission | "MINISTRY" | "DISTRICT" | "SECTOR" | "CELL" | "VILLAGE" | "PARENT";

export const HasPermission = (
  permissions: ExtendedPermission[],
  superAdmin: boolean = false,
  force: boolean = false,
): boolean => {
  const authCtx = useContext(AuthContext);

  if (!authCtx) return false;

  const hasADMIN = authCtx?.permissionsGroups?.includes("ADMIN") || false;

  const hasPermission = permissions.some((permission) =>
    (authCtx?.permissions as string[] || []).includes(permission),
  );

  if (force) return hasPermission;
  if (superAdmin) return hasADMIN;

  return hasADMIN ? true : hasPermission;
};
