import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet/>
      </main>
      <Footer />
    </div>
  );
}