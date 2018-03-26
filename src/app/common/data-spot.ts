import { DataSources } from "./data-sources";

export class DataSpot {
  id: number;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  updatedTime: string;
  dataSet: DataSources;
  inputType: number;
  inputSource: string;
  others: string;
}
