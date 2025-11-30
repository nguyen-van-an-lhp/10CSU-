import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Introduction } from './pages/Introduction';
import { Login } from './pages/Login';
import { Activities } from './pages/Activities';
import { Career } from './pages/Career';
import { SchoolInfo } from './pages/SchoolInfo';
import { SimplePage } from './pages/SimplePage';
import { Results } from './pages/Results';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="intro" element={<Introduction />} />
              <Route path="login" element={<Login />} />
              <Route path="activities" element={<Activities />} />
              <Route path="school" element={<SchoolInfo />} />
              <Route path="career" element={<Career />} /> 
              <Route path="academics" element={<Results />} />
              
              <Route path="resources" element={<SimplePage title="Tài Nguyên Học Tập" type="academy" />} />
              <Route path="feedback" element={<SimplePage title="Gửi Phản Hồi" type="rule" />} />
              <Route path="report" element={<SimplePage title="Báo Cáo Ban Cán Sự" type="finance" />} />
            </Route>
          </Routes>
        </HashRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;