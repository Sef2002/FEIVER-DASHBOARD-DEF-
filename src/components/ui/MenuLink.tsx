import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Link } from 'react-router-dom';

interface MenuLinkProps {
  href: string;
  icon: keyof typeof LucideIcons;
  label: string;
  isActive?: boolean;
}

export const MenuLink = ({ href, icon, label, isActive = false }: MenuLinkProps) => {
  const Icon = LucideIcons[icon];

  return (
    <Link
      to={href}
      className={`group flex items-center px-4 py-3 text-white transition-opacity hover:opacity-80 ${
        isActive ? 'bg-white/10' : ''
      }`}
    >
      {Icon && <Icon size={20} className="mr-4" />}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};