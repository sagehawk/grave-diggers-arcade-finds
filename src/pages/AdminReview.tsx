import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { generateClient } from 'aws-amplify/data';
import { fetchAuthSession } from 'aws-amplify/auth';
import { getUrl } from 'aws-amplify/storage';
import type { Schema } from '../../amplify/data/resource';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, ExternalLink, Loader2, Shield, Inbox, Eye } from 'lucide-react';

const client = generateClient<Schema>();

interface GameItem {
    id: string;
    title: string;
    summary?: string | null;
    description?: string | null;
    genre?: string | null;
    status?: string | null;
    thumbnail_url?: string | null;
    video_url?: string | null;
    price?: string | null;
    submitter_id?: string | null;
    createdAt?: string | null;
    downloadLinks?: (string | null)[] | null;
}

const AdminReview: React.FC = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
    const [games, setGames] = useState<GameItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [thumbnailUrls, setThumbnailUrls] = useState<Record<string, string>>({});
    const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);

    // Check if user is in ADMINS group
    useEffect(() => {
        const checkAdmin = async () => {
            if (!isAuthenticated) {
                setIsCheckingAdmin(false);
                return;
            }
            try {
                const session = await fetchAuthSession();
                const groups = (session.tokens?.accessToken?.payload?.['cognito:groups'] as string[]) || [];
                setIsAdmin(groups.includes('ADMINS'));
            } catch (err) {
                console.error('Error checking admin status:', err);
                setIsAdmin(false);
            } finally {
                setIsCheckingAdmin(false);
            }
        };
        checkAdmin();
    }, [isAuthenticated]);

    // Load all games (admin can see all)
    useEffect(() => {
        if (!isAdmin) return;
        const loadGames = async () => {
            setIsLoading(true);
            try {
                const { data, errors } = await client.models.Game.list();
                if (errors) {
                    console.error('Error loading games:', errors);
                    return;
                }
                setGames(data as unknown as GameItem[]);

                // Resolve thumbnail URLs from S3
                const urls: Record<string, string> = {};
                for (const game of data) {
                    if (game.thumbnail_url && !game.thumbnail_url.startsWith('http')) {
                        try {
                            const result = await getUrl({ path: game.thumbnail_url });
                            urls[game.id] = result.url.toString();
                        } catch {
                            // ignore
                        }
                    } else if (game.thumbnail_url) {
                        urls[game.id] = game.thumbnail_url;
                    }
                }
                setThumbnailUrls(urls);
            } catch (err) {
                console.error('Error loading games:', err);
            } finally {
                setIsLoading(false);
            }
        };
        loadGames();
    }, [isAdmin]);

    const handleApprove = async (gameId: string) => {
        try {
            await client.models.Game.update({
                id: gameId,
                status: 'approved'
            } as any);
            setGames(prev => prev.map(g => g.id === gameId ? { ...g, status: 'approved' } : g));
            toast({ title: 'Game Approved', description: 'The game is now live on the site.' });
        } catch (err) {
            console.error('Error approving game:', err);
            toast({ title: 'Error', description: 'Failed to approve game.', variant: 'destructive' });
        }
    };

    const handleReject = async (gameId: string) => {
        try {
            await client.models.Game.update({
                id: gameId,
                status: 'rejected'
            } as any);
            setGames(prev => prev.map(g => g.id === gameId ? { ...g, status: 'rejected' } : g));
            toast({ title: 'Game Rejected', description: 'The game has been rejected.' });
        } catch (err) {
            console.error('Error rejecting game:', err);
            toast({ title: 'Error', description: 'Failed to reject game.', variant: 'destructive' });
        }
    };

    const handleDelete = async (gameId: string) => {
        try {
            await client.models.Game.delete({ id: gameId });
            setGames(prev => prev.filter(g => g.id !== gameId));
            toast({ title: 'Game Deleted', description: 'The game has been permanently deleted.' });
        } catch (err) {
            console.error('Error deleting game:', err);
            toast({ title: 'Error', description: 'Failed to delete game.', variant: 'destructive' });
        }
    };

    if (isCheckingAdmin) {
        return (
            <div className="min-h-screen bg-ggrave-black text-white flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-ggrave-red" />
            </div>
        );
    }

    if (!isAuthenticated || !isAdmin) {
        return (
            <div className="min-h-screen bg-ggrave-black text-white">
                <Navbar />
                <div className="container mx-auto px-4 py-20 text-center">
                    <Shield className="h-16 w-16 text-red-500 mx-auto mb-6" />
                    <h1 className="text-3xl font-pixel text-ggrave-red mb-4">Access Denied</h1>
                    <p className="text-gray-400 text-lg mb-8">
                        You don't have permission to access this page. Only administrators can review game submissions.
                    </p>
                    <Button onClick={() => navigate('/')} className="bg-ggrave-red hover:bg-red-700">
                        Return Home
                    </Button>
                </div>
                <Footer />
            </div>
        );
    }

    const pendingGames = games.filter(g => !g.status || g.status === 'pending' || g.status === 'In Development');
    const approvedGames = games.filter(g => g.status === 'approved');
    const rejectedGames = games.filter(g => g.status === 'rejected');

    return (
        <div className="min-h-screen bg-ggrave-black text-white">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <Shield className="h-8 w-8 text-ggrave-red" />
                    <h1 className="text-3xl font-pixel text-ggrave-red">Admin Review</h1>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4 text-center">
                        <Inbox className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-yellow-400">{pendingGames.length}</p>
                        <p className="text-sm text-yellow-300/70">Pending Review</p>
                    </div>
                    <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4 text-center">
                        <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-400">{approvedGames.length}</p>
                        <p className="text-sm text-green-300/70">Approved</p>
                    </div>
                    <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4 text-center">
                        <XCircle className="h-6 w-6 text-red-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-red-400">{rejectedGames.length}</p>
                        <p className="text-sm text-red-300/70">Rejected</p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-ggrave-red" />
                    </div>
                ) : games.length === 0 ? (
                    <div className="text-center py-20">
                        <Inbox className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                        <h2 className="text-xl text-gray-400">No games submitted yet</h2>
                        <p className="text-gray-500 mt-2">When users submit games, they'll appear here for review.</p>
                    </div>
                ) : (
                    <>
                        {/* Pending Games */}
                        {pendingGames.length > 0 && (
                            <div className="mb-10">
                                <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center gap-2">
                                    <Inbox className="h-5 w-5" /> Pending Review ({pendingGames.length})
                                </h2>
                                <div className="space-y-4">
                                    {pendingGames.map(game => (
                                        <GameReviewCard
                                            key={game.id}
                                            game={game}
                                            thumbnailUrl={thumbnailUrls[game.id]}
                                            onApprove={() => handleApprove(game.id)}
                                            onReject={() => handleReject(game.id)}
                                            onDelete={() => handleDelete(game.id)}
                                            onSelect={() => setSelectedGame(selectedGame?.id === game.id ? null : game)}
                                            isExpanded={selectedGame?.id === game.id}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Approved Games */}
                        {approvedGames.length > 0 && (
                            <div className="mb-10">
                                <h2 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5" /> Approved ({approvedGames.length})
                                </h2>
                                <div className="space-y-4">
                                    {approvedGames.map(game => (
                                        <GameReviewCard
                                            key={game.id}
                                            game={game}
                                            thumbnailUrl={thumbnailUrls[game.id]}
                                            onApprove={() => handleApprove(game.id)}
                                            onReject={() => handleReject(game.id)}
                                            onDelete={() => handleDelete(game.id)}
                                            onSelect={() => setSelectedGame(selectedGame?.id === game.id ? null : game)}
                                            isExpanded={selectedGame?.id === game.id}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Rejected Games */}
                        {rejectedGames.length > 0 && (
                            <div className="mb-10">
                                <h2 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
                                    <XCircle className="h-5 w-5" /> Rejected ({rejectedGames.length})
                                </h2>
                                <div className="space-y-4">
                                    {rejectedGames.map(game => (
                                        <GameReviewCard
                                            key={game.id}
                                            game={game}
                                            thumbnailUrl={thumbnailUrls[game.id]}
                                            onApprove={() => handleApprove(game.id)}
                                            onReject={() => handleReject(game.id)}
                                            onDelete={() => handleDelete(game.id)}
                                            onSelect={() => setSelectedGame(selectedGame?.id === game.id ? null : game)}
                                            isExpanded={selectedGame?.id === game.id}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

// ---------- Game Review Card Component ----------
interface GameReviewCardProps {
    game: GameItem;
    thumbnailUrl?: string;
    onApprove: () => void;
    onReject: () => void;
    onDelete: () => void;
    onSelect: () => void;
    isExpanded: boolean;
}

const GameReviewCard: React.FC<GameReviewCardProps> = ({
    game,
    thumbnailUrl,
    onApprove,
    onReject,
    onDelete,
    onSelect,
    isExpanded
}) => {
    const statusColor = {
        approved: 'bg-green-500/20 text-green-400 border-green-500/30',
        rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
        pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    };

    const currentStatus = game.status === 'approved' ? 'approved' : game.status === 'rejected' ? 'rejected' : 'pending';

    return (
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg overflow-hidden transition-all">
            <div className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-800/30" onClick={onSelect}>
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                    {thumbnailUrl ? (
                        <img src={thumbnailUrl} alt={game.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">No img</div>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold truncate">{game.title}</h3>
                    <p className="text-gray-400 text-sm truncate">{game.summary || 'No summary'}</p>
                    <div className="flex items-center gap-2 mt-1">
                        {game.genre && <span className="text-xs text-gray-500">{game.genre}</span>}
                        {game.price && <span className="text-xs text-gray-500">• {game.price}</span>}
                        {game.createdAt && (
                            <span className="text-xs text-gray-500">• {new Date(game.createdAt).toLocaleDateString()}</span>
                        )}
                    </div>
                </div>

                {/* Status Badge */}
                <Badge className={`${statusColor[currentStatus]} border text-xs`}>
                    {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                </Badge>

                <Eye className="h-4 w-4 text-gray-500" />
            </div>

            {/* Expanded Details */}
            {isExpanded && (
                <div className="border-t border-gray-700/50 p-4 bg-gray-900/80">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <h4 className="text-sm font-semibold text-gray-300 mb-1">Description</h4>
                            <p className="text-sm text-gray-400">{game.description || 'No description provided.'}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-300 mb-1">Details</h4>
                            <ul className="text-sm text-gray-400 space-y-1">
                                <li><strong>Submitter ID:</strong> {game.submitter_id || 'Unknown'}</li>
                                <li><strong>Status:</strong> {game.status || 'pending'}</li>
                                <li><strong>Price:</strong> {game.price || 'Free'}</li>
                                {game.video_url && (
                                    <li>
                                        <a href={game.video_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
                                            <ExternalLink className="h-3 w-3" /> Trailer Link
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Thumbnail Preview */}
                    {thumbnailUrl && (
                        <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-300 mb-2">Thumbnail Preview</h4>
                            <img src={thumbnailUrl} alt={game.title} className="w-48 h-32 object-cover rounded-lg border border-gray-700" />
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2 border-t border-gray-700/50">
                        {currentStatus !== 'approved' && (
                            <Button
                                onClick={(e) => { e.stopPropagation(); onApprove(); }}
                                className="bg-green-600 hover:bg-green-700 text-white"
                                size="sm"
                            >
                                <CheckCircle className="h-4 w-4 mr-1" /> Approve
                            </Button>
                        )}
                        {currentStatus !== 'rejected' && (
                            <Button
                                onClick={(e) => { e.stopPropagation(); onReject(); }}
                                className="bg-yellow-600 hover:bg-yellow-700 text-white"
                                size="sm"
                            >
                                <XCircle className="h-4 w-4 mr-1" /> Reject
                            </Button>
                        )}
                        <Button
                            onClick={(e) => { e.stopPropagation(); onDelete(); }}
                            variant="destructive"
                            size="sm"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminReview;
