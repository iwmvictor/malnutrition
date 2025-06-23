import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/tools/translations';
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';
import { login } from '../apis/auth';
import { ILoginFormData } from "../types/auth";
import { LoginSchema } from '../utils/schemas/auth.schema';
import { useSignIn } from "react-auth-kit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../components/common/form/Button";
import PasswordField from "../components/common/form/PasswordField";
import TextField from './common/form/TextField';

const LoginForm = () => {
  const { state } = useApp();
  const { t } = useTranslation(state.language);
  const signIn = useSignIn();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ILoginFormData>({
    resolver: zodResolver(LoginSchema),
  });
  const loginMutation = useMutation(login);

  const submitLoginData = async (data: ILoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess(response) {
        const { token, roles = [], ...authState } = response;
        signIn({
          token: token,
          expiresIn: 3600,
          authState: { ...authState, roles },
          tokenType: "JWT",
        });

        if (roles.length > 0) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-blue-900">
          {t("loginTitle")}
        </h2>
        <p className="text-sm text-center text-gray-500">{t("loginSubtitle")}</p>
        <form onSubmit={handleSubmit(submitLoginData)} className="space-y-6">
          <div>
            <TextField
              error={errors.email?.message}
              type="email"
              label={t("emailLabel")}
              onValueChage={(value: string) => setValue("email", value)}
              register={register("email")}
            />
          </div>
          <div>
            <PasswordField
              label={t("passwordLabel")}
              error={errors.password?.message}
              {...register("password", {
                onChange: (e) => {
                  setValue("password", e.target.value);
                },
              })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Link
              to="#"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              {t("forgotPassword")}
            </Link>
          </div>
          <div>
            <Button
              label={t("signInButton")}
              isLoading={loginMutation.isLoading}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            />
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;