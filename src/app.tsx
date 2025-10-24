import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <Navbar />
          <Suspense>{props.children}</Suspense>
          <Footer />
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
