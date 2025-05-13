
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { 
  Pencil, 
  Trash2, 
  Eye, 
  ThumbsUp, 
  MessageSquare 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface UserSubmissionsProps {
  userId: string;
  isOwnProfile: boolean;
}

const UserSubmissions: React.FC<UserSubmissionsProps> = ({ userId, isOwnProfile }) => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchSubmissions = async () => {
      setIsLoading(true);
      
      try {
        let query = supabase.from('games')
          .select('*')
          .eq('submitter_user_id', userId);
        
        // For public profiles, only show published games
        if (!isOwnProfile) {
          query = query.eq('status', 'published');
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        setSubmissions(data || []);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        toast({
          title: "Error",
          description: "Failed to load game submissions",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, [userId, isOwnProfile, toast]);

  const handleEditGame = (gameId: string) => {
    navigate(`/submit-game?edit=${gameId}`);
  };

  const handleDeleteGame = (game: any) => {
    setGameToDelete(game);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!gameToDelete) return;
    
    try {
      // Delete the game from Supabase (or use soft delete by updating status)
      const { error } = await supabase
        .from('games')
        .update({ status: 'deleted' })
        .eq('id', gameToDelete.id);
        
      if (error) throw error;
      
      // Remove from local state
      setSubmissions(submissions.filter(game => game.id !== gameToDelete.id));
      
      toast({
        title: "Game deleted",
        description: `"${gameToDelete.title}" has been deleted successfully.`,
      });
    } catch (error) {
      console.error('Error deleting game:', error);
      toast({
        title: "Error",
        description: "Failed to delete the game. Please try again.",
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
      setGameToDelete(null);
    }
  };

  const renderStatusBadge = (status: string) => {
    const statusClasses = {
      published: "bg-green-800 text-green-100",
      pending: "bg-yellow-800 text-yellow-100",
      rejected: "bg-red-800 text-red-100"
    };
    
    const statusClass = statusClasses[status as keyof typeof statusClasses] || "bg-gray-800 text-gray-100";
    
    return (
      <span className={`px-2 py-1 text-xs rounded ${statusClass}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (isLoading) {
    return <p className="text-center py-8">Loading submissions...</p>;
  }

  if (submissions.length === 0) {
    return (
      <div className="bg-gray-900 p-8 rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4">No games unearthed yet!</h2>
        <p className="text-gray-400 mb-6">
          {isOwnProfile 
            ? "You haven't submitted any games yet." 
            : "This user hasn't submitted any games yet."}
        </p>
        
        {isOwnProfile && (
          <Button 
            className="bg-ggrave-red hover:bg-red-700"
            onClick={() => navigate('/submit-game')}
          >
            Submit Your First Game
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {submissions.map(game => (
          <Card key={game.id} className="bg-gray-900 border-gray-800 overflow-hidden">
            <div className="relative aspect-video">
              <img 
                src={game.thumbnail} 
                alt={game.title} 
                className="w-full h-full object-cover"
              />
              {isOwnProfile && (
                <div className="absolute top-2 right-2">
                  {renderStatusBadge(game.status)}
                </div>
              )}
            </div>
            
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{game.title}</h3>
              {isOwnProfile && (
                <p className="text-gray-400 text-sm mb-2">
                  Submitted on {new Date(game.createdAt).toLocaleDateString()}
                </p>
              )}
              
              <div className="flex items-center space-x-4 text-gray-400 text-sm">
                <div className="flex items-center">
                  <Eye size={14} className="mr-1" />
                  <span>{game.views || 0}</span>
                </div>
                <div className="flex items-center">
                  <ThumbsUp size={14} className="mr-1" />
                  <span>{game.likes || 0}</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare size={14} className="mr-1" />
                  <span>{game.comments || 0}</span>
                </div>
              </div>
            </CardContent>
            
            {isOwnProfile && (
              <CardFooter className="p-4 pt-0 justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-gray-700 text-white hover:bg-gray-800"
                  onClick={() => handleEditGame(game.id)}
                >
                  <Pencil size={14} className="mr-1" /> Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-red-700 text-red-400 hover:bg-red-900 hover:text-red-200"
                  onClick={() => handleDeleteGame(game)}
                >
                  <Trash2 size={14} className="mr-1" /> Delete
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-red-400">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete "{gameToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="bg-red-700 hover:bg-red-800"
            >
              Delete Game
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserSubmissions;
