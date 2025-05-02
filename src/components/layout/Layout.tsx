import { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
      <MainContent toggleSidebar={toggleSidebar}>{children}</MainContent>
    </div>
  );
};

export default Layout;