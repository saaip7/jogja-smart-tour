// Function to get a color based on the day number (shared between components)
export const getDayColor = (day: number): string => {
    const colors = [
      "#FF5733", // Red-Orange
      "#33A8FF", // Blue
      "#FF33A8", // Pink
      "#A833FF", // Purple
      "#33FF57", // Green
      "#FFD433", // Yellow
      "#33FFF5", // Cyan
    ];
    return colors[day % colors.length];
  };
  
  // Key destinations in Yogyakarta with their coordinates
  export const yogyaDestinations: Record<string, [number, number]> = {
    // City centers
    "Yogyakarta": [-7.7956, 110.3695],
    "Sleman": [-7.7167, 110.3500],
    "Bantul": [-7.8883, 110.3333],
    "Kulon Progo": [-7.8262, 110.1644],
    "Gunung Kidul": [-7.9917, 110.6167],
    
    // Popular destinations
    "Malioboro": [-7.7930, 110.3659],
    "Candi Prambanan": [-7.7520, 110.4914],
    "Keraton Yogyakarta": [-7.8052, 110.3640],
    "Taman Sari": [-7.8100, 110.3594],
    "Candi Borobudur": [-7.6079, 110.2038],
    "Pantai Parangtritis": [-8.0257, 110.3327],
    "Gunung Merapi": [-7.5407, 110.4457],
    "Alun-Alun Kidul": [-7.8119, 110.3636],
    "Goa Jomblang": [-7.9688, 110.6811],
    "Bukit Bintang": [-7.8243, 110.4455],
    "Tebing Breksi": [-7.7764, 110.5119],
    "Museum Ullen Sentalu": [-7.6346, 110.4201],
    "Candi Ijo": [-7.7841, 110.5130],
    "Pantai Indrayanti": [-8.1507, 110.6123],
    "Kebun Teh Nglinggo": [-7.6509, 110.1315],
    "Hutan Pinus Pengger": [-7.8689, 110.4752],
    "Gumuk Pasir Parangkusumo": [-8.0294, 110.3288],
    "Jurang Tembelan": [-7.9175, 110.0673],
    "Kalibiru": [-7.8065, 110.1272],
    "Pasar Beringharjo": [-7.7986, 110.3656],
    "Pantai Depok": [-8.0132, 110.3173],
    "Desa Wisata Kasongan": [-7.8521, 110.3486],
    "Benteng Vredeburg": [-7.8005, 110.3658],
    "Kebun Buah Mangunan": [-7.9334, 110.4251],
    "Goa Pindul": [-7.9463, 110.6547],
    "Jogja Bay": [-7.7557, 110.4101],
    "Hutan Mangrove Kulon Progo": [-7.9007, 110.0597],
    "Puncak Becici": [-7.8754, 110.4878],
    "Bukit Panguk Kediwung": [-7.9463, 110.4504],
    "Museum Affandi": [-7.7829, 110.3922],
    "Goa Cerme": [-7.8883, 110.5009],
    "Sendratari Ramayana": [-7.7520, 110.4914],
    "Air Terjun Sri Gethuk": [-7.9512, 110.8152],
    "Puncak Suroloyo": [-7.6906, 110.2292],
    "Situs Ratu Boko": [-7.7700, 110.4889],
    "Monumen Jogja Kembali": [-7.7478, 110.3674],
    "Pantai Glagah": [-7.9146, 110.0547],
    "Kebun Bunga Amaryllis": [-7.7119, 110.1954],
    "Wisata Kaliurang": [-7.6533, 110.4264],
    "Bukit Paralayang": [-7.7833, 110.0864],
    "Waduk Sermo": [-7.8306, 110.1122],
  };
  
  // Function to generate a route between two points with a slight curve
  export const generateCurvedRoute = (
    point1: [number, number],
    point2: [number, number],
    curveFactor = 0.2
  ): [number, number][] => {
    // Calculate the midpoint
    const midX = (point1[0] + point2[0]) / 2;
    const midY = (point1[1] + point2[1]) / 2;
    
    // Calculate vector perpendicular to the line
    const dx = point2[0] - point1[0];
    const dy = point2[1] - point1[1];
    const perpX = -dy;
    const perpY = dx;
    
    // Normalize and scale
    const length = Math.sqrt(perpX * perpX + perpY * perpY);
    const controlX = midX + (perpX / length) * curveFactor;
    const controlY = midY + (perpY / length) * curveFactor;
    
    // Generate points along the quadratic Bézier curve
    const points: [number, number][] = [];
    for (let t = 0; t <= 1; t += 0.05) {
      const x = (1-t)*(1-t)*point1[0] + 2*(1-t)*t*controlX + t*t*point2[0];
      const y = (1-t)*(1-t)*point1[1] + 2*(1-t)*t*controlY + t*t*point2[1];
      points.push([x, y]);
    }
    
    return points;
  };
  
  // Function to find the best coordinates for a destination
  export const findBestCoordinates = (
    destinationName: string,
    locationName: string
  ): [number, number] => {
    // First try exact name match
    if (yogyaDestinations[destinationName]) {
      return yogyaDestinations[destinationName];
    }
    
    // Try partial name match for destination
    for (const [name, coords] of Object.entries(yogyaDestinations)) {
      if (destinationName.toLowerCase().includes(name.toLowerCase()) || 
          name.toLowerCase().includes(destinationName.toLowerCase())) {
        return coords;
      }
    }
    
    // Try the location
    if (yogyaDestinations[locationName]) {
      return yogyaDestinations[locationName];
    }
    
    // Try partial location match
    for (const [name, coords] of Object.entries(yogyaDestinations)) {
      if (locationName.toLowerCase().includes(name.toLowerCase()) || 
          name.toLowerCase().includes(locationName.toLowerCase())) {
        return coords;
      }
    }
    
    // Default to Yogyakarta city center with a random offset
    const defaultCoords = yogyaDestinations["Yogyakarta"];
    const randomOffset = () => (Math.random() - 0.5) * 0.08;
    return [defaultCoords[0] + randomOffset(), defaultCoords[1] + randomOffset()];
  };
  
  