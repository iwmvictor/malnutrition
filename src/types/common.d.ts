export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: IRoles[];
  password: string;
  createdAt: Date;
  phoneNumber: string;
  updatedAt: Date;
  otp: string | null;
  otpExpiresAt: Date | null;
  photo: string;
  role: string;
}

export interface IUserRequest
  extends Omit<
  IUser,
    "id" 
  > {
  id?: string;
}
export interface IPermission {
  id: string;
  label: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IRoles {
  id: string;
  userId: string;
  role: string;
}

export type UserPermission = Pick<IPermission, "id" | "label">;

export interface IUserWithPermissions extends IUser {
  permissions: UserPermission[];
  roles: IRole[];
}

export interface AuthState extends Pick<IUser, "name" | "email" | "phone"> {
  token: string;
  roles: string[];
}

export interface IRoute {
  path: string;
  element: ComponentType<unknown>;
  allowedPermissionGroup?: PermissionGroup;
  allowedPermissions?: Permission[];
  superAdmin?: boolean;
}

export interface IPermissionsGroup {
  group: string;
  permissions: string[];
}

export type IUUID = string;

export interface IPaged<T> {
  data: T;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface IUsersResponse {
  data: IUser[];
  totalItems: number;
}
