import { BrowserRouter, Routes, Route } from "react-router-dom";
import Character from "./routes/Character";
import Characters from "./routes/Characters";

interface IRouterProps {}

function Router({}: IRouterProps) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/:characterId" element={<Character />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
