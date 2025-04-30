import React from 'react';
import { Sparkles } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <Sparkles size={28} className="mr-2 text-white" />
      <span className="text-xl font-bold text-white">Fevier</span>
    </div>
  );
};

export default Logo;