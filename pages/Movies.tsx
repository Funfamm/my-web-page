import React, { useState } from 'react';
import { MOCK_MOVIES, GENRES } from '../constants';
import { Search, Play, Filter } from 'lucide-react';

export const Movies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  const filteredMovies = MOCK_MOVIES.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || movie.genre.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="page-container pb-20">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 lg:mb-12 gap-6">
            <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary mb-2">
                    CATALOG
                </h1>
                <p className="text-brand-muted text-sm sm:text-base">Explore the boundaries of digital storytelling.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {/* Search */}
                <div className="relative group w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-primary transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search titles..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-field pl-10"
                    />
                </div>
                {/* Genre Filter */}
                <div className="relative w-full sm:w-48">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" size={18} />
                    <select 
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="input-field pl-10 appearance-none cursor-pointer hover:bg-brand-surface transition-colors"
                    >
                        <option value="All">All Genres</option>
                        {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredMovies.map(movie => (
                <div key={movie.id} className="glass-panel rounded-xl overflow-hidden hover:border-brand-primary/40 transition-all duration-500 group flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/10">
                    <div className="relative aspect-[16/9] overflow-hidden">
                        <img 
                            src={movie.thumbnailUrl} 
                            alt={movie.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <button className="bg-brand-primary text-black rounded-full p-4 hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,240,255,0.6)]">
                                <Play fill="black" className="ml-1" />
                            </button>
                        </div>
                        <span className="absolute top-2 right-2 bg-black/70 backdrop-blur text-xs font-mono text-brand-primary border border-brand-primary/30 px-2 py-1 rounded">
                            {movie.resolutionTag}
                        </span>
                    </div>
                    <div className="p-4 sm:p-5 flex flex-col flex-grow">
                        <div className="mb-2">
                            <h3 className="font-bold text-lg leading-tight text-brand-text group-hover:text-brand-primary transition-colors">{movie.title}</h3>
                        </div>
                        <p className="text-brand-muted text-sm line-clamp-2 mb-4 flex-grow">{movie.description}</p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {movie.genre.map(g => (
                                <span key={g} className="text-[10px] uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-300">
                                    {g}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        {filteredMovies.length === 0 && (
            <div className="text-center py-20 sm:py-32 text-gray-500 glass-panel rounded-2xl border-dashed mx-4 sm:mx-0">
                <p className="text-lg sm:text-xl">No titles found in the mainframe.</p>
                <button onClick={() => {setSearchTerm(''); setSelectedGenre('All');}} className="text-brand-primary mt-2 hover:underline">
                    Reset Filters
                </button>
            </div>
        )}
    </div>
  );
};