export interface Attraction {
    no: number;
    nama: string;
    vote_average: number;
    vote_count: number;
    type: string;
    htm_weekday: number;
    htm_weekend: number;
    latitude: number;
    longitude: number;
    description: string;
  }
  
  export interface Message {
    sender: "bot" | "user";
    message: string;
    isTyping?: boolean;
  }
  export const findAttractionsByKeyword = (attractions: Attraction[], keyword: string): Attraction[] => {
    const lowercaseKeyword = keyword.toLowerCase();
    return attractions.filter(attraction => 
      attraction.nama.toLowerCase().includes(lowercaseKeyword) || 
      (attraction.description && attraction.description.toLowerCase().includes(lowercaseKeyword))
    );
  };
  export const findAttractionsByType = (attractions: Attraction[], type: string): Attraction[] => {
    const lowercaseType = type.toLowerCase();
    return attractions.filter(attraction => 
      attraction.type && attraction.type.toLowerCase().includes(lowercaseType)
    );
  };
  export const findAttractionsByPrice = (attractions: Attraction[], maxPrice: number): Attraction[] => {
    return attractions.filter(attraction => 
      (attraction.htm_weekday && attraction.htm_weekday <= maxPrice) || 
      (attraction.htm_weekend && attraction.htm_weekend <= maxPrice)
    );
  };
  export const findTopRatedAttractions = (attractions: Attraction[], limit: number = 5): Attraction[] => {
    return [...attractions]
      .filter(attraction => attraction.vote_average && attraction.vote_count > 10)
      .sort((a, b) => b.vote_average - a.vote_average)
      .slice(0, limit);
  };