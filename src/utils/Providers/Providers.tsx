import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RoutesProvider from "./RoutesProvider";
import { AuthProvider } from "react-auth-kit";

const Providers = () => {
  const clientQuery = new QueryClient();
  return (

      <QueryClientProvider client={clientQuery}>
        <AuthProvider authType='cookie' authName='_auth'>
          <RoutesProvider />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  );
};
export default Providers;
