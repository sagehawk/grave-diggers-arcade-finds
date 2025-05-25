
import { supabase } from '../lib/supabase';

export const sampleGames = [
  {
    title: "Cyber Runner 2087",
    developer_name: "NeonStudio",
    description: "A fast-paced cyberpunk platformer set in a dystopian future. Run, jump, and hack your way through neon-lit cityscapes while uncovering a conspiracy that threatens humanity.",
    thumbnail_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    banner_url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    gallery_image_urls: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&h=400&fit=crop"
    ],
    trailer_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    platform_tags: ["PC", "PlayStation", "Xbox"],
    is_free: false,
    price: 29.99,
    release_status: "Released",
    release_date: "2024-01-15",
    status: "published",
    view_count: 1250,
    like_count: 89
  },
  {
    title: "Forest Guardian",
    developer_name: "GreenLeaf Games",
    description: "A peaceful adventure game where you play as a mystical guardian protecting an ancient forest. Solve puzzles, help woodland creatures, and restore balance to nature.",
    thumbnail_url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    banner_url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
    gallery_image_urls: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop"
    ],
    platform_tags: ["PC", "Nintendo Switch"],
    is_free: true,
    release_status: "Released",
    release_date: "2023-11-20",
    status: "published",
    view_count: 890,
    like_count: 156
  },
  {
    title: "Galactic Conquest",
    developer_name: "StarForge Interactive",
    description: "Command vast fleets in this epic space strategy game. Build your empire, forge alliances, and engage in massive battles across multiple star systems.",
    thumbnail_url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop",
    banner_url: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=400&fit=crop",
    gallery_image_urls: [
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=600&h=400&fit=crop"
    ],
    platform_tags: ["PC", "Mac"],
    is_free: false,
    price: 49.99,
    release_status: "Early Access",
    release_date: "2024-03-01",
    status: "published",
    view_count: 2100,
    like_count: 203
  },
  {
    title: "Neon Racer",
    developer_name: "VelocityWorks",
    description: "High-speed racing through neon-drenched tracks. Customize your vehicle, master challenging courses, and compete against players worldwide in this adrenaline-fueled racer.",
    thumbnail_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    banner_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
    gallery_image_urls: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop"
    ],
    platform_tags: ["PC", "PlayStation", "Xbox"],
    is_free: false,
    price: 39.99,
    release_status: "Released",
    release_date: "2023-08-12",
    status: "published",
    view_count: 1580,
    like_count: 127
  },
  {
    title: "Mystic Realms",
    developer_name: "Enchanted Studios",
    description: "Embark on a magical journey through mystical lands filled with ancient secrets, powerful spells, and legendary creatures. Your destiny awaits in the Mystic Realms.",
    thumbnail_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    banner_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
    gallery_image_urls: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop"
    ],
    platform_tags: ["PC", "PlayStation", "Nintendo Switch"],
    is_free: true,
    release_status: "Beta",
    release_date: "2024-06-15",
    status: "published",
    view_count: 950,
    like_count: 78
  },
  {
    title: "Urban Legends",
    developer_name: "CityScape Games",
    description: "Explore a modern city filled with supernatural mysteries. Investigate paranormal activities, solve puzzles, and uncover the truth behind urban legends.",
    thumbnail_url: "https://images.unsplash.com/photo-1514905552197-0610a4d8fd73?w=400&h=300&fit=crop",
    banner_url: "https://images.unsplash.com/photo-1514905552197-0610a4d8fd73?w=800&h=400&fit=crop",
    gallery_image_urls: [
      "https://images.unsplash.com/photo-1514905552197-0610a4d8fd73?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop"
    ],
    platform_tags: ["PC", "Mac"],
    is_free: false,
    price: 24.99,
    release_status: "Released",
    release_date: "2023-10-31",
    status: "published",
    view_count: 720,
    like_count: 92
  },
  {
    title: "Pixel Warriors",
    developer_name: "RetroPixel Studio",
    description: "A nostalgic pixel-art beat 'em up inspired by classic arcade games. Fight through waves of enemies with friends in this co-op action adventure.",
    thumbnail_url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
    banner_url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=400&fit=crop",
    gallery_image_urls: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=600&h=400&fit=crop"
    ],
    platform_tags: ["PC", "Nintendo Switch"],
    is_free: true,
    release_status: "Released",
    release_date: "2023-12-05",
    status: "published",
    view_count: 1340,
    like_count: 245
  },
  {
    title: "Ocean Depths",
    developer_name: "AquaTech Studios",
    description: "Dive into the mysterious depths of the ocean in this underwater exploration game. Discover ancient ruins, encounter sea creatures, and uncover lost treasures.",
    thumbnail_url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    banner_url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=400&fit=crop",
    gallery_image_urls: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&h=400&fit=crop"
    ],
    platform_tags: ["PC", "PlayStation", "Xbox", "Nintendo Switch"],
    is_free: false,
    price: 34.99,
    release_status: "Coming Soon",
    release_date: "2024-08-20",
    status: "published",
    view_count: 680,
    like_count: 134
  }
];

export const sampleGenres = [
  { name: "Action", slug: "action" },
  { name: "Adventure", slug: "adventure" },
  { name: "Strategy", slug: "strategy" },
  { name: "Racing", slug: "racing" },
  { name: "RPG", slug: "rpg" },
  { name: "Platformer", slug: "platformer" },
  { name: "Puzzle", slug: "puzzle" },
  { name: "Simulation", slug: "simulation" }
];

export const insertSampleData = async () => {
  try {
    console.log('Starting sample data insertion...');
    
    // Insert genres first
    const { data: existingGenres } = await supabase
      .from('genres')
      .select('slug');
    
    const existingSlugs = existingGenres?.map(g => g.slug) || [];
    const newGenres = sampleGenres.filter(g => !existingSlugs.includes(g.slug));
    
    if (newGenres.length > 0) {
      const { error: genresError } = await supabase
        .from('genres')
        .insert(newGenres);
        
      if (genresError) {
        console.error('Error inserting genres:', genresError);
      } else {
        console.log(`Inserted ${newGenres.length} genres`);
      }
    }
    
    // Check existing games to avoid duplicates
    const { data: existingGames } = await supabase
      .from('games')
      .select('title');
    
    const existingTitles = existingGames?.map(g => g.title) || [];
    const newGames = sampleGames.filter(g => !existingTitles.includes(g.title));
    
    if (newGames.length > 0) {
      const { data: insertedGames, error: gamesError } = await supabase
        .from('games')
        .insert(newGames)
        .select('id, title');
        
      if (gamesError) {
        console.error('Error inserting games:', gamesError);
        return;
      }
      
      console.log(`Inserted ${insertedGames?.length} games`);
      
      // Associate games with genres
      const { data: allGenres } = await supabase
        .from('genres')
        .select('id, slug');
        
      if (allGenres && insertedGames) {
        const gameGenreAssociations = [];
        
        for (const game of insertedGames) {
          // Assign 1-3 random genres to each game
          const numGenres = Math.floor(Math.random() * 3) + 1;
          const shuffledGenres = [...allGenres].sort(() => 0.5 - Math.random());
          const selectedGenres = shuffledGenres.slice(0, numGenres);
          
          for (const genre of selectedGenres) {
            gameGenreAssociations.push({
              game_id: game.id,
              genre_id: genre.id
            });
          }
        }
        
        const { error: associationError } = await supabase
          .from('game_genres')
          .insert(gameGenreAssociations);
          
        if (associationError) {
          console.error('Error creating game-genre associations:', associationError);
        } else {
          console.log(`Created ${gameGenreAssociations.length} game-genre associations`);
        }
      }
    } else {
      console.log('No new games to insert - all sample games already exist');
    }
    
    console.log('Sample data insertion completed!');
    return true;
  } catch (error) {
    console.error('Error in insertSampleData:', error);
    return false;
  }
};
