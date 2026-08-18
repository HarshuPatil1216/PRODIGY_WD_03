import React from 'react';
import { Category } from '../types';
import { useStore } from '../context/StoreContext';
import { 
  Apple, 
  Croissant, 
  Milk, 
  PackageCheck, 
  CookingPot, 
  Palette, 
  Grid 
} from 'lucide-react';

const categories: { name: Category; icon: React.ReactNode }[] = [
  { name: 'All', icon: <Grid className="w-4 h-4" /> },
  { name: 'Fresh Produce', icon: <Apple className="w-4 h-4" /> },
  { name: 'Bakery & Breads', icon: <Croissant className="w-4 h-4" /> },
  { name: 'Dairy & Eggs', icon: <Milk className="w-4 h-4" /> },
  { name: 'Local Pantry', icon: <PackageCheck className="w-4 h-4" /> },
  { name: 'Honey & Preserves', icon: <CookingPot className="w-4 h-4" /> },
  { name: 'Artisan Crafts', icon: <Palette className="w-4 h-4" /> }
];

export const CategoryNav: React.FC = () => {
  const { filters, setFilters, products } = useStore();

  const getCategoryCount = (catName: Category) => {
    if (catName === 'All') return products.length;
    return products.filter((p) => p.category === catName).length;
  };

  return (
    <nav id="category-navigation" className="bg-white border-b border-amber-200/50 shadow-xs py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {categories.map((cat) => {
          const isSelected = filters.category === cat.name;
          const count = getCategoryCount(cat.name);

          return (
            <button
              key={cat.name}
              id={`cat-chip-${cat.name.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setFilters((prev) => ({ ...prev, category: cat.name }))}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-600/20 font-semibold scale-[1.02]'
                  : 'bg-amber-50/80 text-slate-700 hover:bg-amber-100 hover:text-emerald-800'
              }`}
            >
              <span className={isSelected ? 'text-white' : 'text-emerald-600'}>
                {cat.icon}
              </span>
              <span>{cat.name}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isSelected
                    ? 'bg-emerald-700 text-emerald-100'
                    : 'bg-amber-200/60 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
