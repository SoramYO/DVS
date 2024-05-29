import { RouterProvider } from "react-router-dom";
import { route } from "./routes/Routes";

function App() {
  return (
    <div>
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
