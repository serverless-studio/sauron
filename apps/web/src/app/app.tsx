import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorSuppressionDashboard from './pages/ErrorSuppressionDashboard';
import NotFound from './pages/NotFound';
import LayoutWrapper from './layoutWrapper';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<ErrorSuppressionDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LayoutWrapper>
      </BrowserRouter>
  </QueryClientProvider>
);

export default App;
