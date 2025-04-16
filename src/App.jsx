import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import './styles/global.css';
import './styles/variables.css';
import './utils/axiosConfig';

const App = () => {
  useEffect(() => {
    // Font Awesome veya diğer CDN kaynaklarını yükle
    const loadExternalResources = async () => {
      const fontAwesome = document.createElement('link');
      fontAwesome.rel = 'stylesheet';
      fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
      document.head.appendChild(fontAwesome);
    };

    loadExternalResources();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <ErrorBoundary>
          <AuthProvider>
            <Router>
              <div className="app">
                <Navbar />
                <main className="main-content">
                  <AppRoutes />
                </main>
                <Footer />
              </div>
            </Router>
          </AuthProvider>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
};

export default App;