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
export class PartsService {

  inactiveParts: Array<Part> = [
    {
      name: 'EXPERT HEAD',
      type: 'head',
      manufacturer: 'Anaheim Electronics',
      quality: 'performance',
      weight: 100,
      description: 'an advanced head array',
      powerConsumption: 10,
      armorValue: 100,
      cost: 400,
    },
    {
      name: 'EXPERT CORE',
      type: 'core',
      manufacturer: 'Anaheim Electronics',
      quality: 'performance',
      weight: 600,
      description: 'a mecha part',
      powerProduction: 300,
      armorValue: 100,
      cost: 600,
    },
    {
      name: 'EXPERT Left ARM',
      type: 'larm',
      manufacturer: 'Anaheim Electronics',
      quality: 'performance',
      weight: 200,
      description: 'a mecha part',
      powerConsumption: 10,
      armorValue: 100,
      attack: { damageType: 'melee', damage: 10, armorPiercing: 0 },
      cost: 350,
    },
    {
      name: 'ULTIMATE Right ARM',
      type: 'rarm',
      manufacturer: 'Anaheim Electronics',
      quality: 'elite',
      weight: 220,
      description: 'a mecha part',
      powerConsumption: 10,
      armorValue: 100,
      cost: 700,
    },
    {
      name: 'SWIFT LEGS',
      type: 'legs',
      manufacturer: 'Anaheim Electronics',
      quality: 'master',
      weight: 400,
      description: 'a mecha part',
      powerConsumption: 10,
      armorValue: 100,
      cost: 1250,
    },
    {
      name: 'HEAVY LEGS',
      type: 'legs',
      manufacturer: 'Anaheim Electronics',
      quality: 'master',
      weight: 800,
      description: 'a mecha part',
      powerConsumption: 10,
      armorValue: 100,
      cost: 1400,
    },
    {
      name: 'SHOULDER ROCKET SYSTEM',
      type: 'rshoulder',
      manufacturer: 'Anaheim Electronics',
      quality: 'performance',
      weight: 160,
      description: 'a mecha part',
      powerConsumption: 10,
      armorValue: 100,
      cost: 400,
    },
    {
      name: 'SHOULDER LASER SYSTEM',
      type: 'lshoulder',
      manufacturer: 'Anaheim Electronics',
      quality: 'performance',
      weight: 140,
      description: 'a mecha part',
      powerConsumption: 10,
      armorValue: 100,
      cost: 400,
    },
    {
      name: 'Junk Head',
      type: 'head',
      manufacturer: 'Anaheim Electronics',
      quality: 'junk',
      weight: 100,
      description: 'a mecha part',
      powerConsumption: 10,
      armorValue: 100,
      cost: 80,
    },
    {
      name: 'Standard Core',
      type: 'core',
      manufacturer: 'Anaheim Electronics',
      quality: 'stock',
      weight: 550,
      description: 'a mecha part',
      powerProduction: 200,
      armorValue: 100,
      cost: 120,
    },
    {
      name: 'Standard Right Arm',
      type: 'rarm',
      manufacturer: 'Anaheim Electronics',
      quality: 'stock',
      weight: 110,
      description: 'a mecha part',
      powerConsumption: 30,
      armorValue: 100,
      cost: 100,
    },
    {
      name: 'Junk Left Arm',
      type: 'larm',
      manufacturer: 'Anaheim Electronics',
      quality: 'junk',
      weight: 140,
      description: 'a mecha part',
      powerConsumption: 40,
      armorValue: 100,
      cost: 60,
    },
    {
      name: 'Standard Legs',
      type: 'legs',
      manufacturer: 'Anaheim Electronics',
      quality: 'stock',
      weight: 400,
      description: 'a mecha part',
      powerConsumption: 50,
      armorValue: 100,
      cost: 100,
    },
  ];

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
