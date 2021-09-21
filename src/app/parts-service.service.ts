import { Injectable } from '@angular/core';

export interface Attack {
  damageType: string;
  damage: number;
  armorPiercing: number;
}

export interface Defense {
  name: string;
  type: string;
}

export interface Part {
  name: string;
  type: string;
  manufacturer: string;
  quality: string;
  weight: number;
  description: string;
  armorValue: number;
  cost: number;

  powerConsumption?: number;
  powerProduction?: number;

  attack?: Attack;
  defense?: Defense;
}

@Injectable({
  providedIn: 'root'
})
export class PartsServiceService {

  constructor() { }

  getNewPart() {
    var tempPart: Part = {
      name: 'test',
      type: 'test',
      manufacturer: 'test',
      quality: 'test',
      weight: 0,
      description: 'test',
      armorValue: 0,
      cost: 0,
    }
    return tempPart;
  }
}
