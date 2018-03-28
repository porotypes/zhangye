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
  min: number;
  max: number;
}
