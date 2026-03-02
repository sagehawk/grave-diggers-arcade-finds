
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, ThumbsUp, Download, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface CommunityGameCardProps {
    game: any;
    className?: string;
}

const CommunityGameCard: React.FC<CommunityGameCardProps> = ({ game, className }) => {
    const hasDownloads = game.downloadLinks && game.downloadLinks.length > 0;

    return (
        <Link
            to={`/community-games/${game.id}`}
            className={cn("block group", className)}
        >
            <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/80 backdrop-blur transition-all duration-300 hover:border-ggrave-red hover:shadow-lg hover:shadow-ggrave-red/5 hover:-translate-y-1">
                {/* Thumbnail */}
                <div className="relative">
                    <AspectRatio ratio={16 / 9} className="w-full">
                        <img
                            src={game.thumbnail || 'https://placehold.co/600x400/222/333?text=No+Image'}
                            alt={game.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/222/333?text=No+Image';
                            }}
                        />
                    </AspectRatio>

                    {/* Price badge */}
                    <div className="absolute top-2 right-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${game.price === 'Free' || game.price === '0' || game.price === ''
                                ? 'bg-green-500/90 text-white'
                                : 'bg-black/70 text-white'
                            }`}>
                            {game.price === 'Free' || game.price === '0' || !game.price ? 'Free' : `$${game.price}`}
                        </span>
                    </div>

                    {/* Download badge */}
                    {hasDownloads && (
                        <div className="absolute top-2 left-2">
                            <span className="flex items-center gap-1 px-2 py-1 bg-ggrave-red/90 backdrop-blur-sm rounded-full text-xs font-bold text-white">
                                <Download size={10} />
                                {game.downloadLinks.length}
                            </span>
                        </div>
                    )}

                    {/* Release status */}
                    <div className="absolute bottom-2 left-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm ${game.releaseStatus === 'Released'
                                ? 'bg-green-900/80 text-green-300'
                                : game.releaseStatus === 'Demo Available'
                                    ? 'bg-yellow-900/80 text-yellow-300'
                                    : 'bg-blue-900/80 text-blue-300'
                            }`}>
                            {game.releaseStatus}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="font-bold text-white truncate text-base group-hover:text-ggrave-red transition-colors">
                        {game.title}
                    </h3>

                    {game.tagline && (
                        <p className="text-gray-400 text-xs mt-1 truncate">{game.tagline}</p>
                    )}

                    {/* Genre tags */}
                    {game.genre && game.genre.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {game.genre.slice(0, 3).map((g: string, i: number) => (
                                <span
                                    key={i}
                                    className="px-1.5 py-0.5 bg-gray-800 rounded text-[10px] text-gray-400 flex items-center gap-0.5"
                                >
                                    <Tag size={8} />
                                    {g}
                                </span>
                            ))}
                            {game.genre.length > 3 && (
                                <span className="px-1.5 py-0.5 text-[10px] text-gray-500">
                                    +{game.genre.length - 3}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center gap-3 mt-3 text-gray-500 text-xs">
                        <div className="flex items-center gap-1">
                            <Eye size={12} />
                            <span>{game.views || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <ThumbsUp size={12} />
                            <span>{game.likes || 0}</span>
                        </div>
                        {/* Platforms count */}
                        {game.platforms && game.platforms.length > 0 && (
                            <div className="ml-auto text-gray-600 text-[10px]">
                                {game.platforms.slice(0, 2).join(', ')}
                                {game.platforms.length > 2 && ` +${game.platforms.length - 2}`}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CommunityGameCard;
