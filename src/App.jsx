import { lazy, Suspense } from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';
import { TravelBagProvider } from './contexts/TravelBagContext';
import ProtectedRoute from './pages/ProtectedRoute';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import SpinnerFullPage from './components/SpinnerFullPage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Login from './pages/Login';

const Homepage = lazy(() => import('./pages/Homepage'));
const TravelBag = lazy(() => import('./pages/TravelBag'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

function App() {
  return (
    <div>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<Homepage />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route
                  path="bagpack"
                  element={(
                    <TravelBagProvider>
                      <TravelBag />
                    </TravelBagProvider>
                  )}
                />
                <Route path="login" element={<Login />} />
                <Route
                  path="app"
                  element={(
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  )}
                >
                  <Route index element={<Navigate replace to="cities" />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
