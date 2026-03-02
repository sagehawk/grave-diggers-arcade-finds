
import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Gamepad2, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import CommunityGameCard from '../components/CommunityGameCard';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const genres = [
    'All', 'Action', 'Adventure', 'RPG', 'Strategy', 'Puzzle',
    'Simulation', 'Sports', 'Racing', 'Horror', 'Platformer',
    'Shooter', 'Fighting', 'Casual', 'Other'
];

const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'most-liked', label: 'Most Liked' },
    { value: 'most-viewed', label: 'Most Viewed' },
    { value: 'az', label: 'A-Z' },
    { value: 'za', label: 'Z-A' },
];

const CommunityGames: React.FC = () => {
    const [games, setGames] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All');
    const [sortBy, setSortBy] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchGames = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabase
                    .from('games')
                    .select('*')
                    .eq('status', 'published')
                    .order('createdAt', { ascending: false });

                if (error) throw error;
                setGames(data || []);
            } catch (error) {
                console.error('Error fetching community games:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGames();
    }, []);

    // Filter and sort games
    const filteredGames = games
        .filter((game) => {
            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesTitle = game.title?.toLowerCase().includes(query);
                const matchesTagline = game.tagline?.toLowerCase().includes(query);
                const matchesDesc = game.description?.toLowerCase().includes(query);
                if (!matchesTitle && !matchesTagline && !matchesDesc) return false;
            }
            // Genre filter
            if (selectedGenre !== 'All') {
                if (!game.genre || !game.genre.includes(selectedGenre)) return false;
            }
            return true;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case 'oldest':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case 'most-liked':
                    return (b.likes || 0) - (a.likes || 0);
                case 'most-viewed':
                    return (b.views || 0) - (a.views || 0);
                case 'az':
                    return a.title.localeCompare(b.title);
                case 'za':
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });

    return (
        <div className="min-h-screen bg-[#111111]">
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-ggrave-red/20 rounded-xl">
                            <Gamepad2 size={28} className="text-ggrave-red" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white font-pixel">
                                Community Games
                            </h1>
                            <p className="text-gray-400 text-sm mt-0.5">
                                Discover games uploaded by our community of indie developers
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <Input
                            placeholder="Search community games..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 h-10"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="bg-gray-900 border-gray-700 text-white w-[160px] h-10">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-gray-700">
                                {sortOptions.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setShowFilters(!showFilters)}
                            className={`border-gray-700 h-10 w-10 ${showFilters ? 'bg-ggrave-red/20 border-ggrave-red text-ggrave-red' : 'text-gray-400 hover:text-white'}`}
                        >
                            <SlidersHorizontal size={16} />
                        </Button>
                    </div>
                </div>

                {/* Genre filter chips */}
                {showFilters && (
                    <div className="flex flex-wrap gap-2 mb-6 p-4 bg-gray-900/50 border border-gray-800 rounded-lg animate-in slide-in-from-top-2 duration-200">
                        {genres.map((genre) => (
                            <button
                                key={genre}
                                onClick={() => setSelectedGenre(genre)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedGenre === genre
                                        ? 'bg-ggrave-red text-white shadow-lg shadow-ggrave-red/25'
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }`}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                )}

                {/* Results count */}
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-500">
                        {isLoading
                            ? 'Loading...'
                            : `${filteredGames.length} game${filteredGames.length !== 1 ? 's' : ''} found`}
                    </p>
                </div>

                {/* Games Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden animate-pulse">
                                <div className="aspect-video bg-gray-800" />
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-gray-800 rounded w-3/4" />
                                    <div className="h-3 bg-gray-800 rounded w-1/2" />
                                    <div className="flex gap-2">
                                        <div className="h-5 bg-gray-800 rounded-full w-12" />
                                        <div className="h-5 bg-gray-800 rounded-full w-12" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredGames.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filteredGames.map((game) => (
                            <CommunityGameCard key={game.id} game={game} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Gamepad2 size={48} className="mx-auto text-gray-700 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No games found</h3>
                        <p className="text-gray-500 mb-6">
                            {searchQuery || selectedGenre !== 'All'
                                ? 'Try adjusting your search or filters'
                                : 'Be the first to submit a game to our community!'}
                        </p>
                        <Button
                            className="bg-ggrave-red hover:bg-red-700"
                            onClick={() => window.location.href = '/submit-game'}
                        >
                            Submit a Game
                        </Button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default CommunityGames;
