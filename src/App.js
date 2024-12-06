import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DocumentProvider } from "./context/DocumentContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import DocumentEditor from './components/Documents/DocumentEditor';
import DocumentViewer from './components/Documents/DocumentViewer';

const App = () => {
    return(
        <AuthProvider>
            <DocumentProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/documents/new" element={<DocumentEditor />} />
                        <Route path="/documents/:id/edit" element={<DocumentEditor />} />
                        <Route path="/documents/:id" element={<DocumentViewer />} />
                    </Routes>
                </Router>
            </DocumentProvider>
        </AuthProvider>
    );
}

export default App;