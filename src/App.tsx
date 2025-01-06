import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import MainContent from "./components/layout/MainContent";
import ProductPage from "./components/layout/ProductPage";
import TopSellers from "./components/layout/TopSellers";
import PopularBlogs from "./components/layout/PopularBlogs";
export default function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />

        <div className="rounded w-full flex justify-between flex-wrap">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>

          <div>
            <TopSellers />
            <PopularBlogs />
          </div>
          
        </div>
      </div>
    </Router>
  );
}
