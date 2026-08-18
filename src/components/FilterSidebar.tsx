import React from 'react';
import { useStore } from '../context/StoreContext';
import { Category } from '../types';
import { SlidersHorizontal, RotateCcw, Check, X, DollarSign } from 'lucide-react';

const availableFarms = [
  'All',
  'Green Valley Organic Orchard',
  'Old Mill Stoneground Bakery',
  'Sunny Acres Family Dairy',
  'Pine Hill Apiaries',
  'Meadowland Free Farms',
  'Verdant Grove Estate',
  'Apothecary & Co. Studio'
];

const availableTags = [
  'Organic',
  'Farm Fresh',
  'Vegan',
  'Gluten-Free',
  'Handcrafted',
  'Pasture-Raised',
  'Cold-Pressed',
  'No Preservatives'
];

export const FilterSidebar: React.FC = () => {
  const { filters, setFilters, resetFilters, isFilterSidebarOpen, setIsFilterSidebarOpen, products } = useStore();

  const handleTagToggle = (tag: string) => {
    setFilters((prev) => {
      const exists = prev.selectedTags.includes(tag);
      if (exists) {
        return { ...prev, selectedTags: prev.selectedTags.filter((t) => t !== tag) };
      } else {
        return { ...prev, selectedTags: [...prev.selectedTags, tag] };
      }
    });
  };

  const activeFiltersCount = 
    (filters.category !== 'All' ? 1 : 0) +
    (filters.priceRange[1] < 30 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.selectedFarm !== 'All' ? 1 : 0) +
    filters.selectedTags.length;

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-amber-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-emerald-700" />
          <h2 className="font-bold text-slate-800 text-base">Filter Catalog</h2>
          {activeFiltersCount > 0 && (
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            id="reset-filters-btn"
            onClick={resetFilters}
            className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All
          </button>
        )}
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <span>Max Price:</span>
          <span className="text-emerald-700 font-bold text-sm">${filters.priceRange[1]}</span>
        </div>
        <input
          id="price-range-slider"
          type="range"
          min={2}
          max={30}
          step={1}
          value={filters.priceRange[1]}
          onChange={(e) => setFilters((prev) => ({ ...prev, priceRange: [0, Number(e.target.value)] }))}
          className="w-full accent-emerald-600 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-500 font-medium">
          <span>$0</span>
          <span>$15</span>
          <span>$30+</span>
        </div>
      </div>

      {/* In Stock Only Toggle */}
      <div className="pt-2">
        <label id="in-stock-toggle-label" className="flex items-center justify-between p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 cursor-pointer hover:bg-amber-100/60 transition-colors">
          <span className="text-sm font-medium text-slate-800">In Stock Items Only</span>
          <input
            id="in-stock-checkbox"
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))}
            className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded-sm cursor-pointer"
          />
        </label>
      </div>

      {/* Farm Origin Filter */}
      <div className="space-y-2">
        <label id="farm-origin-label" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Local Farm / Producer
        </label>
        <select
          id="farm-select-dropdown"
          value={filters.selectedFarm}
          onChange={(e) => setFilters((prev) => ({ ...prev, selectedFarm: e.target.value }))}
          className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
        >
          {availableFarms.map((farm) => (
            <option key={farm} value={farm}>
              {farm}
            </option>
          ))}
        </select>
      </div>

      {/* Dietary & Special Badges */}
      <div className="space-y-2">
        <label id="special-tags-label" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
          Dietary & Specialty Tags
        </label>
        <div className="flex flex-wrap gap-1.5">
          {availableTags.map((tag) => {
            const isSelected = filters.selectedTags.includes(tag);
            return (
              <button
                key={tag}
                id={`tag-btn-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleTagToggle(tag)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                    : 'bg-white text-slate-700 border-amber-200 hover:border-emerald-400 hover:bg-amber-50'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-emerald-300" />}
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside id="desktop-filter-sidebar" className="hidden lg:block w-64 shrink-0 bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs h-fit sticky top-24">
        {content}
      </aside>

      {/* Mobile Drawer Filter */}
      {isFilterSidebarOpen && (
        <div id="mobile-filter-drawer-overlay" className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setIsFilterSidebarOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto z-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b">
                <h3 className="font-bold text-lg text-slate-900">Filter Products</h3>
                <button
                  id="close-mobile-filter-btn"
                  onClick={() => setIsFilterSidebarOpen(false)}
                  className="p-2 text-slate-500 hover:text-slate-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </div>
            <div className="pt-6 border-t mt-6">
              <button
                id="apply-mobile-filters-btn"
                onClick={() => setIsFilterSidebarOpen(false)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
