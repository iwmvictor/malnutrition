import { Toaster } from "react-hot-toast";
import Providers from "./utils/Providers/Providers";
import { AppProvider } from "./context/AppContext";

const App = () => (
  <AppProvider>
    <Providers />
    <Toaster />
  </AppProvider>
);

export default App;
