import { Menu } from 'lucide-react';

interface MainContentProps {
  children: React.ReactNode;
  toggleSidebar: () => void;
}

const MainContent = ({ children, toggleSidebar }: MainContentProps) => {
  return (
    <main className="relative flex-1 overflow-y-auto bg-white">
      {/* Mobile header */}
      <div className="sticky top-0 z-10 flex h-16 items-center border-b border-gray-200 bg-white px-4 lg:hidden">
        <button
          onClick={toggleSidebar}
          className="mr-4 rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-semibold">Fevier</h1>
      </div>

      {/* Main content */}
      <div className="p-6 md:p-10 lg:p-12">{children}</div>
    </main>
  );
};

export default MainContent;