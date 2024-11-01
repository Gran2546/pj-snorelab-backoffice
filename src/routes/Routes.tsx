import React, { createContext, useContext, useState, ReactNode } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie

// Pages
import Home from "../pages/home/Home";
import History from "../pages/history/History";
import User from "../pages/user/User";
import Records from "../pages/records/Records";
import Roles from "../pages/roles/Roles";
import Admins from "../pages/admins/Admins";

// Components
import VerticalTab from "../components/Vertical_tab";
import Header from "../components/Header";
import Logout from "../pages/logout/logout";

// Create an Auth Context
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a custom hook to use the Auth Context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Create a provider component
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check for a cookie named "authToken" to determine if the user is authenticated
    return !!Cookies.get("authToken");
  });

  const login = () => {
    Cookies.set("authToken", "yourAuthToken"); // Set your authentication token here
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("authToken"); // Remove the authentication token
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/" />; // Redirect to Home if not authenticated
};

const Index: React.FC = () => {
  const token = Cookies.get("authToken");
 
  return (
    <AuthProvider> 
      {token && <Header />}
      <div className="flex flex-1 flex-row">
        <Router>
          {token && <VerticalTab />} {/* Show VerticalTab only if authenticated */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/histories" element={<ProtectedRoute element={<History />} />} />
            <Route path="/users" element={<ProtectedRoute element={<User />} />} />
            <Route path="/music-records" element={<ProtectedRoute element={<Records />} />} />
            <Route path="/roles" element={<ProtectedRoute element={<Roles />} />} />
            <Route path="/admins" element={<ProtectedRoute element={<Admins />} />} />
            <Route path="/logout" element={<ProtectedRoute element={<Logout />} />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default Index;
