import { Attraction, findAttractionsByKeyword, findAttractionsByType, findAttractionsByPrice, findTopRatedAttractions } from '.././utils/attractions.utils';

export const processQuery = (query: string, attractions: Attraction[], isLoading: boolean): string => {
  const lowercaseQuery = query.toLowerCase();
  
  if (isLoading) {
    return "Sedang memuat data. Mohon tunggu sebentar...";
  }
  
  if (attractions.length === 0) {
    return "Maaf, saya tidak memiliki data tempat wisata saat ini.";
  }
  if (lowercaseQuery.includes("terima kasih") || lowercaseQuery.includes("thanks")) {
    return "Sama-sama! Ada yang bisa saya bantu lagi?";
  }
  
  if (lowercaseQuery.includes("halo") || lowercaseQuery.includes("hi") || lowercaseQuery.includes("hello")) {
    return "Halo! Ada yang bisa saya bantu tentang wisata di Jogja?";
  }
  if (lowercaseQuery.includes("harga") || lowercaseQuery.includes("tiket") || lowercaseQuery.includes("htm")) {
    const priceMatch = lowercaseQuery.match(/\d+/g);
    
    if (priceMatch) {
      const maxPrice = parseInt(priceMatch[0]);
      const affordableAttractions = findAttractionsByPrice(attractions, maxPrice);
      
      if (affordableAttractions.length > 0) {
        const attractionsList = affordableAttractions
          .slice(0, 5)
          .map(a => `• ${a.nama} (${a.type || 'Umum'}) - Weekday: Rp${a.htm_weekday?.toLocaleString() || 'N/A'}, Weekend: Rp${a.htm_weekend?.toLocaleString() || 'N/A'}`)
          .join("\n");
          
        return `Tempat wisata dengan harga tiket di bawah Rp${maxPrice.toLocaleString()}:\n${attractionsList}\n\nIngin info lebih detail tentang salah satu tempat?`;
      } else {
        return `Maaf, saya tidak menemukan tempat wisata dengan harga tiket di bawah Rp${maxPrice.toLocaleString()}.`;
      }
    }
    
    const randomAttractions = attractions
      .filter(a => a.htm_weekday || a.htm_weekend)
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
      
    const priceList = randomAttractions
      .map(a => `• ${a.nama} - Weekday: Rp${a.htm_weekday?.toLocaleString() || 'N/A'}, Weekend: Rp${a.htm_weekend?.toLocaleString() || 'N/A'}`)
      .join("\n");
      
    return `Berikut beberapa contoh harga tiket masuk tempat wisata di Jogja:\n${priceList}\n\nIngin info tentang tempat tertentu? Tanyakan saja.`;
  }

  if (lowercaseQuery.includes("jenis") || lowercaseQuery.includes("tipe") || lowercaseQuery.includes("kategori")) {
    const types = attractions
      .map(a => a.type)
      .filter(Boolean)
      .reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
    
    const typesList = Object.entries(types)
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => `• ${type}: ${count} tempat`)
      .join("\n");
      
    return `Jenis-jenis wisata di Jogja:\n${typesList}\n\nIngin tahu tempat wisata dengan jenis tertentu?`;
  }

  // Best/top rated queries
  if (lowercaseQuery.includes("terbaik") || lowercaseQuery.includes("populer") || lowercaseQuery.includes("rating") || lowercaseQuery.includes("rekomendasi")) {
    const topAttractions = findTopRatedAttractions(attractions);
    
    if (topAttractions.length > 0) {
      const topList = topAttractions
        .map(a => `• ${a.nama} (${a.type || 'Umum'}) - Rating: ${a.vote_average}/10 (${a.vote_count} votes)`)
        .join("\n");
        
      return `Tempat wisata dengan rating tertinggi di Jogja:\n${topList}\n\nIngin info lebih lanjut tentang salah satu tempat?`;
    } else {
      return "Maaf, saya tidak dapat menemukan data rating untuk tempat wisata.";
    }
  }

  const typeKeywords = [
    { keywords: ["pantai", "beach", "laut"], type: "pantai" },
    { keywords: ["gunung", "mountain", "hiking"], type: "gunung" },
    { keywords: ["candi", "temple"], type: "candi" },
    { keywords: ["museum"], type: "museum" },
    { keywords: ["kuliner", "makanan", "food"], type: "kuliner" },
    { keywords: ["belanja", "shopping", "mall"], type: "belanja" }
  ];
  
  for (const { keywords, type } of typeKeywords) {
    if (keywords.some(keyword => lowercaseQuery.includes(keyword))) {
      const typeAttractions = findAttractionsByType(attractions, type);
      
      if (typeAttractions.length > 0) {
        const typeList = typeAttractions
          .slice(0, 5)
          .map(a => `• ${a.nama} - Rating: ${a.vote_average || 'N/A'}/10`)
          .join("\n");
          
        return `Tempat wisata kategori ${type} di Jogja:\n${typeList}\n\nIngin detail tentang salah satu tempat?`;
      } else {
        return `Maaf, saya tidak menemukan tempat wisata kategori ${type} dalam data saya.`;
      }
    }
  }

  for (const attraction of attractions) {
    if (lowercaseQuery.includes(attraction.nama.toLowerCase())) {
      let response = `📍 **${attraction.nama}**\n`;
      response += `Kategori: ${attraction.type || 'Umum'}\n`;
      response += `Rating: ${attraction.vote_average || 'N/A'}/10 (${attraction.vote_count || 0} votes)\n`;
      response += `Tiket Masuk: Weekday Rp${attraction.htm_weekday?.toLocaleString() || 'N/A'}, Weekend Rp${attraction.htm_weekend?.toLocaleString() || 'N/A'}\n\n`;
      
      if (attraction.description) {
        response += `${attraction.description}`;
      }
      
      return response;
    }
  }

  const words = lowercaseQuery.split(/\s+/).filter(word => word.length > 3);
  for (const word of words) {
    const matchingAttractions = findAttractionsByKeyword(attractions, word);
    
    if (matchingAttractions.length > 0) {
      const resultsList = matchingAttractions
        .slice(0, 5)
        .map(a => `• ${a.nama} (${a.type || 'Umum'})`)
        .join("\n");
        
      return `Saya menemukan beberapa tempat wisata yang mungkin sesuai:\n${resultsList}\n\nIngin informasi lebih detail tentang salah satu tempat?`;
    }
  }

  return "Maaf, saya tidak memiliki informasi tentang hal tersebut. Anda bisa bertanya tentang tempat wisata, harga tiket, jenis wisata, atau rekomendasi tempat terbaik di Jogja.";
};