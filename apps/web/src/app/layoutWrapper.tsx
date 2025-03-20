import '../styles.css';
import { useEffect } from 'react';
import { Header } from './components/header';

export default ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Toggle dark mode
  useEffect(() => {
    // toggleDarkMode();
  }, []);
  

  return (
    <html lang="en">
      <body>
        <div className="bg-background-500 text-text-500 flex flex-col min-h-screen">
          <Header />
          <main className="container mx-auto p-4 flex-grow">
            {children}
          </main>
          <footer className="p-4 text-center ">
            <p>&copy; Serverless Studio 2025</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
