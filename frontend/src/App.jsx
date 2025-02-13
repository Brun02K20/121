import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";

import { useEffect, useState } from "react";

import { Entry } from "./pages/Entry";
import { GeneralTable } from "./pages/GeneralTable";

function App() {
  const [respuestas, setRespuestas] = useState([]);

  useEffect(() => {
    console.log(respuestas);
  }, [respuestas]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Entry setRespuestas={setRespuestas} />} />
          <Route path="/table" element={<GeneralTable tabla={respuestas} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
