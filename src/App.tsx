import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Teachers from './components/Teachers';
import Invoices from './components/Invoices';
import FeeStructure from './components/FeeStructure';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onPageChange={setCurrentPage} />;
      case 'students':
        return <Students />;
      case 'teachers':
        return <Teachers />;
      case 'invoices':
        return <Invoices />;
      case 'fees':
        return <FeeStructure />;
      default:
        return <Dashboard onPageChange={setCurrentPage} />;
    }
  };

  return (
    <AppProvider>
      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderCurrentPage()}
      </Layout>
    </AppProvider>
  );
}

export default App;