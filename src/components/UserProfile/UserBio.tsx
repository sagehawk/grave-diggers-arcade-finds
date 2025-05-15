
import React from 'react';

interface UserBioProps {
  username: string;
  bio?: string;
}

const UserBio: React.FC<UserBioProps> = ({ username, bio }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">About {username}</h2>
      {bio ? (
        <p className="text-gray-300">{bio}</p>
      ) : (
        <p className="text-gray-500 italic">This user hasn't added a bio yet.</p>
      )}
    </div>
  );
};

export default UserBio;
