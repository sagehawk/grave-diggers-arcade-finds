
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Eye, Heart, MessageSquare, Download, Calendar, Clock, Share2,
  Bookmark, ThumbsUp, Flag
} from 'lucide-react';
import { 
  Carousel, CarouselContent, CarouselItem, 
  CarouselNext, CarouselPrevious 
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GameCard from '@/components/GameCard';

// Mock data for demo purposes
const mockGame = {
  id: "game1",
  title: "Neon Drift Racer",
  developer: "CyberPulse Games",
  thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
  banner: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=1200&q=80",
  description: `
    Neon Drift Racer is a high-octane racing game set in a cyberpunk future. Zip through neon-lit cityscapes, 
    customize your hover vehicle with futuristic tech, and compete in underground racing leagues to become the ultimate drift champion.
    
    ## Key Features
    - 12 unique tracks with dynamic weather and time-of-day effects
    - 24 customizable vehicles with unique handling characteristics
    - Robust upgrade system with over 100 parts to collect
    - Online multiplayer with tournaments and seasonal events
    - Original synthwave soundtrack featuring top electronic artists
  `,
  genre: ["Racing", "Action"],
  platforms: ["Windows", "PlayStation", "Xbox"],
  price: "Free",
  releaseStatus: "Early Access",
  views: 15420,
  likes: 897,
  comments: 124,
  releaseDate: "2023-10-15",
  mediaGallery: [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
  ],
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  updates: [
    {
      id: "update1",
      title: "New Track Added: Neo Downtown",
      description: "We've added a new challenging track through the heart of the city with multiple shortcuts and hazards.",
      date: "2023-12-10T14:30:00Z"
    },
    {
      id: "update2",
      title: "Vehicle Physics Update",
      description: "Completely overhauled the drift mechanics for a more realistic feel. Added new suspension settings.",
      date: "2023-11-05T09:15:00Z"
    },
    {
      id: "update3",
      title: "Initial Early Access Release",
      description: "First public release with 6 tracks, 12 vehicles, and basic customization options.",
      date: "2023-10-15T00:00:00Z"
    }
  ],
  downloadFiles: [
    {
      id: "file1",
      name: "NeonDriftRacer_v0.8.2_Win64.zip",
      size: "2.4 GB",
      version: "0.8.2",
      lastUpdated: "2023-12-10T14:30:00Z",
      downloadCount: 8243,
      url: "#"
    },
    {
      id: "file2",
      name: "NeonDriftRacer_v0.8.2_MacOS.zip",
      size: "2.3 GB",
      version: "0.8.2",
      lastUpdated: "2023-12-10T14:30:00Z",
      downloadCount: 2105,
      url: "#"
    }
  ]
};

const mockComments = [
  {
    id: "comment1",
    userId: "user1",
    userName: "DriftKing92",
    userAvatar: "https://i.pravatar.cc/150?img=1",
    text: "The new physics update is amazing! Drifting feels so much more controlled now.",
    timestamp: "2023-12-15T18:22:00Z",
    likes: 24,
    replies: [
      {
        id: "reply1",
        userId: "user2",
        userName: "NeonRider",
        userAvatar: "https://i.pravatar.cc/150?img=2",
        text: "Agreed! Have you tried the new customization options too?",
        timestamp: "2023-12-15T19:05:00Z",
        likes: 5,
        replies: []
      }
    ]
  },
  {
    id: "comment2",
    userId: "user3",
    userName: "SpeedDemon",
    userAvatar: "https://i.pravatar.cc/150?img=3",
    text: "Neo Downtown track is insanely difficult but so rewarding when you nail the tight corners!",
    timestamp: "2023-12-12T10:44:00Z",
    likes: 17,
    replies: []
  }
];

const relatedGames = [
  {
    id: "related1",
    title: "Cyber Blade",
    developer: "CyberPulse Games",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
    description: "Cyberpunk action adventure",
    genre: ["Action", "Adventure"],
    platforms: ["Windows", "PlayStation"],
    price: "Free",
    releaseStatus: "Released",
    views: 8920,
    likes: 456,
    comments: 58,
    releaseDate: "2023-08-15"
  },
  {
    id: "related2",
    title: "Velocity Rush",
    developer: "SpeedWorks",
    thumbnail: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=400&q=80",
    description: "High-speed racing game",
    genre: ["Racing", "Sports"],
    platforms: ["Windows", "Xbox"],
    price: "Free",
    releaseStatus: "Early Access",
    views: 6340,
    likes: 312,
    comments: 43,
    releaseDate: "2023-09-22"
  }
];

// Utility function for formatting dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 1) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      return `${diffMinutes}m ago`;
    }
    return `${diffHours}h ago`;
  } else if (diffDays < 30) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString();
  }
};

const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const game = mockGame; // In a real app, you'd fetch the game based on the ID

  // State to track active media item
  const [activeMedia, setActiveMedia] = React.useState(0);

  // Reset carousel timer on manual navigation
  const handleManualNav = (index: number) => {
    setActiveMedia(index);
    // Reset autoplay timer logic would go here
  };

  return (
    <div className="bg-[#111111] text-white min-h-screen pb-10">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="text-xs text-gray-400 mb-4">
          <Link to="/" className="hover:text-ggrave-red">Home</Link> &gt; 
          <Link to="/games" className="hover:text-ggrave-red ml-1">Games</Link> &gt; 
          <Link to={`/games/category/${game.genre[0]}`} className="hover:text-ggrave-red ml-1">{game.genre[0]}</Link> &gt; 
          <span className="ml-1 text-gray-300">{game.title}</span>
        </div>

        {/* Game Title and Developer */}
        <h1 className="font-pixel text-3xl md:text-4xl text-white mb-1">{game.title}</h1>
        <div className="mb-6">
          <span className="text-sm text-gray-400">by </span>
          <Link to={`/developer/${game.developer}`} className="text-sm text-ggrave-red hover:underline">
            {game.developer}
          </Link>
        </div>

        {/* Main two-column layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column (Main Content) */}
          <div className="flex-1">
            {/* Media Gallery */}
            <div className="bg-[#181818] border border-gray-800 rounded-sm overflow-hidden mb-6">
              {game.videoUrl && activeMedia === 0 ? (
                <div className="aspect-video w-full">
                  <iframe
                    className="w-full h-full"
                    src={game.videoUrl}
                    title={`${game.title} Gameplay Video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <Carousel>
                  <CarouselContent>
                    {game.mediaGallery?.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-video w-full">
                          <img 
                            src={image} 
                            alt={`${game.title} Screenshot ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 border-none" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 border-none" />
                </Carousel>
              )}

              {/* Thumbnails with no gaps */}
              <div className="flex overflow-x-auto">
                {game.videoUrl && (
                  <div 
                    className={`flex-shrink-0 cursor-pointer ${activeMedia === 0 ? 'border-2 border-ggrave-red' : ''}`}
                    onClick={() => handleManualNav(0)}
                  >
                    <div className="w-24 h-16 bg-black flex items-center justify-center">
                      <div className="w-8 h-8 bg-ggrave-red rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-t-4 border-t-transparent border-l-8 border-l-white border-b-4 border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {game.mediaGallery?.map((image, index) => (
                  <div 
                    key={index}
                    className={`flex-shrink-0 cursor-pointer ${activeMedia === (game.videoUrl ? index + 1 : index) ? 'border-2 border-ggrave-red' : ''}`}
                    onClick={() => handleManualNav(game.videoUrl ? index + 1 : index)}
                  >
                    <img 
                      src={image} 
                      alt={`Thumb ${index + 1}`}
                      className="w-24 h-16 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Game Description */}
            <div className="bg-[#181818] border border-gray-800 rounded-sm p-4 mb-6">
              <h2 className="font-pixel text-xl mb-4 text-white">About This Game</h2>
              <div className="text-gray-300 whitespace-pre-line">
                {game.description}
              </div>
            </div>

            {/* Updates Section */}
            <div className="bg-[#181818] border border-gray-800 rounded-sm p-4 mb-6">
              <h2 className="font-pixel text-xl mb-4 text-white">Updates</h2>
              <div className="space-y-4">
                {game.updates?.map((update) => (
                  <div key={update.id} className="border-l-2 border-gray-700 pl-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-white">{update.title}</h3>
                      <span className="text-xs text-gray-400">{formatDate(update.date)}</span>
                    </div>
                    <p className="text-sm text-gray-300">{update.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Downloads Section */}
            {game.downloadFiles && game.downloadFiles.length > 0 && (
              <div className="bg-[#181818] border border-gray-800 rounded-sm p-4 mb-6">
                <h2 className="font-pixel text-xl mb-4 text-white">Downloads</h2>
                <div className="space-y-2">
                  {game.downloadFiles.map((file) => (
                    <div key={file.id} className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[#222222] rounded-sm">
                      <div className="flex-grow">
                        <div className="font-medium text-white">{file.name}</div>
                        <div className="flex flex-wrap gap-x-4 text-xs text-gray-400 mt-1">
                          <span>Size: {file.size}</span>
                          {file.version && <span>Version: {file.version}</span>}
                          {file.lastUpdated && <span>Updated: {formatDate(file.lastUpdated)}</span>}
                          {file.downloadCount !== undefined && (
                            <span className="flex items-center">
                              <Download size={12} className="mr-1" />
                              {file.downloadCount.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button variant="default" size="sm">
                        <Download size={16} className="mr-1" /> Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="bg-[#181818] border border-gray-800 rounded-sm p-4">
              <h2 className="font-pixel text-xl mb-4 text-white">Comments</h2>
              
              {/* Comment Sort Options */}
              <div className="flex gap-4 mb-4">
                <button className="text-sm text-ggrave-red hover:underline">Newest</button>
                <button className="text-sm text-gray-400 hover:text-white">Oldest</button>
                <button className="text-sm text-gray-400 hover:text-white">Popular</button>
              </div>
              
              {/* New Comment Input */}
              <div className="flex gap-3 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                </div>
                <div className="flex-grow">
                  <textarea 
                    className="w-full bg-[#222222] border border-gray-700 rounded-sm p-3 text-sm text-white focus:outline-none focus:border-ggrave-red"
                    placeholder="Add a comment..."
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <Button variant="default" size="sm">Post Comment</Button>
                  </div>
                </div>
              </div>
              
              {/* Comments List */}
              <div className="space-y-6">
                {mockComments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="flex-shrink-0">
                      <img src={comment.userAvatar} alt={comment.userName} className="w-10 h-10 rounded-full" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white">{comment.userName}</span>
                        <span className="text-xs text-gray-400">{formatDate(comment.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">{comment.text}</p>
                      
                      {/* Comment Actions */}
                      <div className="flex gap-4 text-xs text-gray-400 mb-4">
                        <button className="flex items-center hover:text-ggrave-red">
                          <ThumbsUp size={14} className="mr-1" /> {comment.likes}
                        </button>
                        <button className="hover:text-ggrave-red">Reply</button>
                        <button className="hover:text-ggrave-red flex items-center">
                          <Flag size={14} className="mr-1" /> Report
                        </button>
                      </div>
                      
                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="pl-4 border-l border-gray-700 space-y-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3 mt-3">
                              <div className="flex-shrink-0">
                                <img src={reply.userAvatar} alt={reply.userName} className="w-8 h-8 rounded-full" />
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-white">{reply.userName}</span>
                                  <span className="text-xs text-gray-400">{formatDate(reply.timestamp)}</span>
                                </div>
                                <p className="text-sm text-gray-300 mb-2">{reply.text}</p>
                                
                                {/* Reply Actions */}
                                <div className="flex gap-4 text-xs text-gray-400">
                                  <button className="flex items-center hover:text-ggrave-red">
                                    <ThumbsUp size={14} className="mr-1" /> {reply.likes}
                                  </button>
                                  <button className="hover:text-ggrave-red">Reply</button>
                                  <button className="hover:text-ggrave-red flex items-center">
                                    <Flag size={14} className="mr-1" /> Report
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column (Sidebar) */}
          <div className="lg:w-80 flex-shrink-0">
            {/* Action Buttons */}
            <div className="bg-[#181818] border border-gray-800 rounded-sm p-4 mb-6">
              <div className="grid gap-3">
                <Button variant="default" className="w-full">
                  <Download size={16} className="mr-2" /> Download Game
                </Button>
                <Button variant="secondary" className="w-full">
                  <Bookmark size={16} className="mr-2" /> Add to Collection
                </Button>
                <Button variant="secondary" className="w-full">
                  <Heart size={16} className="mr-2" /> Like Game
                </Button>
                <Button variant="secondary" className="w-full">
                  <Share2 size={16} className="mr-2" /> Share
                </Button>
              </div>
            </div>
            
            {/* Game Stats */}
            <div className="bg-[#181818] border border-gray-800 rounded-sm p-4 mb-6">
              <h2 className="font-pixel text-sm mb-3 text-white">Game Stats</h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Eye size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-300">{game.views.toLocaleString()} Views</span>
                </div>
                <div className="flex items-center">
                  <Heart size={16} className="text-ggrave-red mr-2" />
                  <span className="text-gray-300">{game.likes.toLocaleString()} Likes</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-300">{game.comments.toLocaleString()} Comments</span>
                </div>
                <div className="flex items-center">
                  <Download size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-300">
                    {game.downloadFiles?.reduce((sum, file) => sum + (file.downloadCount || 0), 0).toLocaleString()} Downloads
                  </span>
                </div>
                <div className="flex items-center col-span-2">
                  <Calendar size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-300">Released {new Date(game.releaseDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center col-span-2">
                  <Clock size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-300">Last Updated {formatDate(game.updates?.[0]?.date || game.releaseDate)}</span>
                </div>
              </div>
            </div>
            
            {/* Developer/Credits */}
            <div className="bg-[#181818] border border-gray-800 rounded-sm p-4 mb-6">
              <h2 className="font-pixel text-sm mb-3 text-white">Credits</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-gray-400 block mb-1">Developer</span>
                  <Link to={`/developer/${game.developer}`} className="text-sm text-ggrave-red hover:underline">
                    {game.developer}
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Categories/Tags */}
            <div className="bg-[#181818] border border-gray-800 rounded-sm p-4 mb-6">
              <h2 className="font-pixel text-sm mb-3 text-white">Categories</h2>
              <div className="flex flex-wrap gap-2 mb-3">
                {game.genre.map((genre) => (
                  <Link 
                    key={genre}
                    to={`/games/category/${genre}`}
                    className="px-3 py-1 bg-[#222222] hover:bg-[#333333] text-xs rounded-sm text-gray-300"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
              
              <h2 className="font-pixel text-sm mb-3 text-white">Platforms</h2>
              <div className="flex flex-wrap gap-2">
                {game.platforms.map((platform) => (
                  <div key={platform} className="px-3 py-1 bg-[#222222] text-xs rounded-sm text-gray-300">
                    {platform}
                  </div>
                ))}
              </div>
            </div>
            
            {/* More from Developer */}
            <div className="bg-[#181818] border border-gray-800 rounded-sm p-4 mb-6">
              <h2 className="font-pixel text-sm mb-3 text-white">More from {game.developer}</h2>
              <div className="space-y-3">
                {relatedGames.filter(g => g.developer === game.developer).map((game) => (
                  <div key={game.id} className="flex gap-2">
                    <Link to={`/games/${game.id}`} className="flex-shrink-0">
                      <img 
                        src={game.thumbnail} 
                        alt={game.title} 
                        className="w-20 h-12 object-cover rounded-sm"
                      />
                    </Link>
                    <div className="overflow-hidden">
                      <Link to={`/games/${game.id}`} className="text-sm text-white hover:text-ggrave-red line-clamp-1">
                        {game.title}
                      </Link>
                      <div className="flex gap-2 text-xs text-gray-400 mt-1">
                        <span>{game.genre[0]}</span>
                        <span>·</span>
                        <span>{game.platforms[0]}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Related Games */}
            <div className="bg-[#181818] border border-gray-800 rounded-sm p-4">
              <h2 className="font-pixel text-sm mb-3 text-white">Related Games</h2>
              <div className="space-y-3">
                {relatedGames.map((game) => (
                  <div key={game.id} className="flex gap-2">
                    <Link to={`/games/${game.id}`} className="flex-shrink-0">
                      <img 
                        src={game.thumbnail} 
                        alt={game.title} 
                        className="w-20 h-12 object-cover rounded-sm"
                      />
                    </Link>
                    <div className="overflow-hidden">
                      <Link to={`/games/${game.id}`} className="text-sm text-white hover:text-ggrave-red line-clamp-1">
                        {game.title}
                      </Link>
                      <div className="flex gap-2 text-xs text-gray-400 mt-1">
                        <span>{game.developer}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
