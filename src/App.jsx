import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorElement, Products, SingleProduct } from "./pages";
import { QueryClient, QueryClientProvider } from "react-query";

import { loader as singleProductLoader } from "./pages/SingleProduct";
import { loader as ProductsLoader } from "./pages/Products";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Products />,
    errorElement: <ErrorElement />,
    loader: ProductsLoader(queryClient),
  },
  {
    path: "/:id",
    element: <SingleProduct />,
    errorElement: <ErrorElement />,
    loader: singleProductLoader(queryClient),
  },
]);
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
