export interface RoutePoint {
    latitude: number;
    longitude: number;
  }
  
  export interface RouteResponse {
    routes: {
      geometry: {
        coordinates: [number, number][];
      };
      distance: number;
      duration: number;
    }[];
  }
  
  export const MapService = {
    async getRoute(points: RoutePoint[]): Promise<RouteResponse> {
      if (points.length < 2) {
        throw new Error('At least 2 points are needed to create a route');
      }
      const coordinates = points
        .map(point => `${point.longitude},${point.latitude}`)
        .join(';');
  
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch route: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching route:', error);
        throw error;
      }
    },
    
    estimateTravelTime(start: RoutePoint, end: RoutePoint): number {
      const R = 6371;
      const dLat = this.deg2rad(end.latitude - start.latitude);
      const dLon = this.deg2rad(end.longitude - start.longitude);
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(start.latitude)) * Math.cos(this.deg2rad(end.latitude)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      const distance = R * c;

      const timeHours = distance / 30;
      return Math.round(timeHours * 60);
    },
  
    deg2rad(deg: number): number {
      return deg * (Math.PI/180);
    }
  };