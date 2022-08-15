import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import "./App.scss";

import Home from "src/pages/Home";
import Layouts from "src/components/layouts";

const ErrorFallback = () => {
  return <div>Error</div>;
};

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Layouts>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layouts>
    </ErrorBoundary>
  );
}

export default App;
