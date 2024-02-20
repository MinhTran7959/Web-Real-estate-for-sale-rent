import { IPropertyBase } from "./ipropertyBase";

export class Property implements IPropertyBase {
  id!: number;
  sellRent!: number;
  name!: string;
  propertyTypeId!: number;
  propertyType!: string;
  bhk!: number;
  furnishingTypeId!: number;
  furnishingType!: string;
  price!: number;
  builtArea!: number;
  carpetArea?: number;
  address!: string;
  address2?: string;
  CityId!: number;
  city!: string;
  floorNo?: string;
  totalFloors?: string;
  readyToMove!: boolean;
  age?: string;
  mainEntrance?: string;
  security?: number;
  gated?: boolean;
  maintenance?: number;
  estPossessionOn?: Date;
  photos?: string;
  description?: string;

 // photos?: Photo[];
}