
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye, Heart, MessageSquare, Calendar, Tag, Monitor, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import DownloadSection from '../components/DownloadSection';
import { supabase } from '@/lib/supabase';

const CommunityGameDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [game, setGame] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchGame = async () => {
            if (!id) return;
            try {
                const { data, error: fetchError } = await supabase
                    .from('games')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (fetchError) throw fetchError;
                setGame(data);
            } catch (err) {
                setError('Failed to load game details.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGame();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#111111]">
                <Navbar />
                <div className="container mx-auto px-4 py-12">
                    <div className="animate-pulse space-y-6">
                        <div className="h-8 bg-gray-800 rounded w-1/4" />
                        <div className="aspect-video bg-gray-800 rounded-xl" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 space-y-4">
                                <div className="h-10 bg-gray-800 rounded w-2/3" />
                                <div className="h-4 bg-gray-800 rounded w-1/3" />
                                <div className="space-y-2">
                                    <div className="h-3 bg-gray-800 rounded w-full" />
                                    <div className="h-3 bg-gray-800 rounded w-full" />
                                    <div className="h-3 bg-gray-800 rounded w-3/4" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-48 bg-gray-800 rounded-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !game) {
        return (
            <div className="min-h-screen bg-[#111111]">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-white mb-4">{error || 'Game Not Found'}</h1>
                        <Link to="/community-games" className="text-ggrave-red hover:underline">
                            Back to Community Games
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#111111]">
            <Navbar />

            {/* Back navigation */}
            <div className="container mx-auto px-4 pt-6">
                <Link
                    to="/community-games"
                    className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm"
                >
                    <ArrowLeft size={16} className="mr-1.5" />
                    Back to Community Games
                </Link>
            </div>

            {/* Hero Banner */}
            <div className="relative mt-4">
                <div className="aspect-video w-full max-h-[420px] overflow-hidden rounded-xl mx-auto container px-4">
                    <div className="relative w-full h-full rounded-xl overflow-hidden">
                        <img
                            src={game.thumbnail || 'https://placehold.co/1200x600/222/333?text=No+Banner'}
                            alt={game.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />

                        {/* Title overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {game.genre?.map((g: string, i: number) => (
                                    <span key={i} className="px-2.5 py-0.5 bg-ggrave-red/80 backdrop-blur text-white text-xs font-medium rounded-full">
                                        {g}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-1">{game.title}</h1>
                            {game.tagline && (
                                <p className="text-lg text-gray-300 italic">{game.tagline}</p>
                            )}
                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-400">
                                <div className="flex items-center gap-1">
                                    <Eye size={14} />
                                    {(game.views || 0).toLocaleString()} views
                                </div>
                                <div className="flex items-center gap-1">
                                    <Heart size={14} />
                                    {(game.likes || 0).toLocaleString()} likes
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    {new Date(game.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Description + Gallery */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div>
                            <h2 className="text-xl font-bold text-white mb-3">About</h2>
                            <div className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed whitespace-pre-line">
                                {game.description}
                            </div>
                        </div>

                        {/* Video */}
                        {game.videoUrl && (
                            <div>
                                <h2 className="text-xl font-bold text-white mb-3">Trailer</h2>
                                <div className="aspect-video rounded-xl overflow-hidden border border-gray-800">
                                    {game.videoUrl.includes('youtube') || game.videoUrl.includes('youtu.be') ? (
                                        <iframe
                                            src={game.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                                            className="w-full h-full"
                                            allowFullScreen
                                            title="Game Trailer"
                                        />
                                    ) : (
                                        <video controls src={game.videoUrl} className="w-full h-full" />
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Media Gallery */}
                        {game.mediaGallery && game.mediaGallery.length > 0 && (
                            <div>
                                <h2 className="text-xl font-bold text-white mb-3">Screenshots</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {game.mediaGallery.map((url: string, i: number) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedImage(url)}
                                            className="aspect-video rounded-lg overflow-hidden border border-gray-800 hover:border-ggrave-red transition-colors group"
                                        >
                                            <img
                                                src={url}
                                                alt={`Screenshot ${i + 1}`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Download Section */}
                        <DownloadSection
                            downloadLinks={game.downloadLinks || []}
                            storeLink={game.storeLink}
                        />

                        {/* Game Info Card */}
                        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
                            <h3 className="font-bold text-white text-sm uppercase tracking-wider">Game Info</h3>

                            <div>
                                <label className="text-xs text-gray-500 block mb-1">Status</label>
                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${game.releaseStatus === 'Released'
                                        ? 'bg-green-900/50 text-green-400'
                                        : game.releaseStatus === 'Demo Available'
                                            ? 'bg-yellow-900/50 text-yellow-400'
                                            : 'bg-blue-900/50 text-blue-400'
                                    }`}>
                                    {game.releaseStatus}
                                </span>
                            </div>

                            <div>
                                <label className="text-xs text-gray-500 block mb-1">Price</label>
                                <span className="text-white font-semibold">
                                    {game.price === 'Free' || game.price === '0' || !game.price ? 'Free' : `$${game.price}`}
                                </span>
                            </div>

                            {game.platforms && game.platforms.length > 0 && (
                                <div>
                                    <label className="text-xs text-gray-500 block mb-1.5">Platforms</label>
                                    <div className="flex flex-wrap gap-1.5">
                                        {game.platforms.map((p: string, i: number) => (
                                            <span key={i} className="flex items-center gap-1 px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-300">
                                                <Monitor size={10} />
                                                {p}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {game.genre && game.genre.length > 0 && (
                                <div>
                                    <label className="text-xs text-gray-500 block mb-1.5">Genres</label>
                                    <div className="flex flex-wrap gap-1.5">
                                        {game.genre.map((g: string, i: number) => (
                                            <span key={i} className="flex items-center gap-1 px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-300">
                                                <Tag size={10} />
                                                {g}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="text-xs text-gray-500 block mb-1">Submitted</label>
                                <span className="text-gray-300 text-sm">
                                    {new Date(game.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    })}
                                </span>
                            </div>

                            {game.developerLink && (
                                <a
                                    href={game.developerLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-ggrave-red hover:text-red-400 transition-colors"
                                >
                                    <ExternalLink size={14} />
                                    Developer Website
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <img
                        src={selectedImage}
                        alt="Screenshot"
                        className="max-w-full max-h-full object-contain rounded-lg"
                    />
                </div>
            )}

            <Footer />
        </div>
    );
};

export default CommunityGameDetail;
