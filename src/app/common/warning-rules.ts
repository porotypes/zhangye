import { WarningLevel } from "./warning-level";
import { TypeOfDisaster } from "./type-of-disaster";
import { DataSpot } from "./data-spot";

export class WarningRules {
  id: number;
  name: string;
  description: string;
  prewarningLevel: WarningLevel;
  disaster: TypeOfDisaster;
  dataColumn: DataSpot;
  prewarningLevelId: number;
  disasterId: number;
  dataColumnId: number;
  min: number;
  max: number;
  unit: string;
}
