import type React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToHash from "@/components/ScrollToHash";
import ToastProvider from "@/components/Toast";
import Admin from "@/containers/Admin";
import Contact from "@/containers/Contact";
import Home from "@/containers/Home";
import StoreProvider from "@/store/StoreProvider";

/* StoreProvider sits outside ToastProvider: nothing in the store raises a toast. */
const App: React.FunctionComponent = () => (
  <StoreProvider>
    <ToastProvider>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        {/* No 404 design, so an unknown path goes home without a back-history entry. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ToastProvider>
  </StoreProvider>
);

export default App;
