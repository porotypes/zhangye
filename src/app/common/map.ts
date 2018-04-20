import { OneMapCategories } from "./one-map-categories";

export class Map {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  priority: number;
  type: number;
  zoomLevel: number;
  setList: any[];
  categoryList: OneMapCategories[];
}
