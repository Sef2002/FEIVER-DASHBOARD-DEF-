import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { MenuLink } from '../ui/MenuLink';
import Logo from '../ui/Logo';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar = ({ isOpen, toggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={toggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-[280px] flex-shrink-0 transform bg-black transition-transform duration-150 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo and mobile close button */}
          <div className="flex items-center justify-between px-6 py-6">
            <Link to="/">
              <Logo />
            </Link>
            <button
              onClick={toggle}
              className="text-white transition-opacity hover:opacity-75 lg:hidden"
              aria-label="Close sidebar"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-8 flex flex-col px-4">
            <MenuLink href="/agenda" icon="Calendar" label="Agenda" isActive={location.pathname === '/agenda'} />
            <MenuLink href="/cassa" icon="DollarSign" label="Cassa" isActive={location.pathname === '/cassa'} />
            <MenuLink href="/rubrica" icon="BookOpen" label="Rubrica" isActive={location.pathname === '/rubrica'} />
            <MenuLink href="/trattamenti" icon="Scissors" label="Trattamenti" isActive={location.pathname === '/trattamenti'} />
            <MenuLink href="/statistiche" icon="BarChart2" label="Statistiche" isActive={location.pathname === '/statistiche'} />
            <MenuLink href="/magazzino" icon="Package" label="Magazzino" isActive={location.pathname === '/magazzino'} />
            <MenuLink href="/staff" icon="Users" label="Staff" isActive={location.pathname === '/staff'} />
            <MenuLink href="/spese" icon="CreditCard" label="Spese" isActive={location.pathname === '/spese'} />
            <MenuLink href="/promozioni" icon="Gift" label="Promozioni" isActive={location.pathname === '/promozioni'} />
            
            {/* Separator */}
            <div className="my-6 h-px w-full bg-white/20"></div>
            
            <MenuLink href="/recensioni" icon="Star" label="Recensioni" isActive={location.pathname === '/recensioni'} />
            <MenuLink href="/logout" icon="LogOut" label="Logout" />
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;