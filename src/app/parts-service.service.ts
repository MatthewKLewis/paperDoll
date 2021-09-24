import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';

function sortByPartType(partA: Part, partB: Part): number {
  var partAValue = 0;
  var partBValue = 0;
  switch (partA.type) {
    case 'head':
      partAValue = 10.5;
      break;
    case 'core':
      partAValue = 6.5;
      break;
    case 'rarm':
      partAValue = 4.5;
      break;
    case 'larm':
      partAValue = 3.5;
      break;
    case 'legs':
      partAValue = 2.5;
      break;
    case 'misc':
      partAValue = 1.5;
      break;
    default:
      partAValue = 0.5;
      break;
  }
  switch (partB.type) {
    case 'head':
      partBValue = 10;
      break;
    case 'core':
      partBValue = 6;
      break;
    case 'rarm':
      partBValue = 4;
      break;
    case 'larm':
      partBValue = 3;
      break;
    case 'legs':
      partBValue = 2;
      break;
    case 'misc':
      partBValue = 1;
      break;
    default:
      partBValue = 0;
      break;
  }
  return partBValue - partAValue;
}

export interface Attack {
  damageType: string;
  damage: number;
  armorPiercing: number;
}
export interface Defense {
  name: string;
  type: string;
}
export interface Sensor {
  range: number;
  decibels: number;
}
export interface Part {
  id: number;
  name: string;
  type: string;
  manufacturer: string;
  quality: string;
  weight: number;
  description: string;
  armorValue: number;
  cost: number;

  subType?: string;

  powerConsumption?: number;
  powerProduction?: number;

  attack?: Attack;
  defense?: Defense;
  sensor?: Sensor;
}
export interface Manufacturer {
  name: string;
  bonuses: Array<any>;
}

//END OF INTERFACES AND UTILITY FUNCTIONS

@Injectable({
  providedIn: 'root',
})
export class PartsService {
  inactivePartFilter: string = '';

  partTypes: Array<string> = [
    'head',
    'core',
    'larm',
    'rarm',
    'legs',
    'rshoulder',
    'lshoulder',
    'slotted',
  ];

  manufacturers: Array<Manufacturer> = [
    { name: 'Avonisimmo', bonuses: [] },
    { name: 'Corgistics', bonuses: [] },
    { name: 'Fleetwood Marine', bonuses: [] },
    { name: 'GAZAN', bonuses: [] },
    { name: 'Mantissa', bonuses: [] },
    { name: 'Vincente', bonuses: [] },
    { name: 'Yamashita', bonuses: [] },
    { name: 'Yantian Industrian', bonuses: [] },
  ];

  activeParts: Array<Part> = [];
  activeAndHoverParts: Array<Part> = [];

  inactiveParts: Array<Part> = [
    {
      id: 1,
      name: 'Junk Head',
      type: 'head',
      manufacturer: 'Anaheim Electronics',
      quality: 'junk',
      weight: 100,
      description: 'a mecha part',
      powerConsumption: 10,
      armorValue: 100,
      sensor: { range: 10, decibels: 10 },
      cost: 80,
    },
    {
      id: 2,
      name: 'Standard Head',
      type: 'head',
      manufacturer: 'Anaheim Electronics',
      quality: 'stock',
      weight: 90,
      description: 'a mecha part',
      powerConsumption: 10,
      armorValue: 120,
      sensor: { range: 20, decibels: 15 },

      cost: 80,
    },
    {
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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

  inactiveSpecialParts: Array<Part> = [
    {
      id: 7,
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
      id: 8,
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
      id: 9,
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
      id: 10,
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
      id: 11,
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
      id: 12,
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
      id: 13,
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
      id: 14,
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
  ];

  constructor() {}

  drop(event: CdkDragDrop<any[]>) {
    var newContainerId = event.container.id;
    var itemToAdd = event.previousContainer.data[event.previousIndex];
    var itemToRemove: any = {};
    var indexToRemove: number = -1;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (newContainerId === 'activePartsElement') {
      for (let i = 0; i < this.activeParts.length; i++) {
        if (this.activeParts[i].type === itemToAdd.type) {
          indexToRemove = i;
          itemToRemove = this.activeParts[i];
          break;
        }
      }
      if (indexToRemove > -1) {
        this.activeParts.push(itemToAdd);
        this.inactiveParts.push(itemToRemove);
        this.activeParts.splice(indexToRemove, 1);
        this.inactiveParts.splice(event.previousIndex, 1);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    } else if (newContainerId === 'inactivePartsElement') {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    //and sort
    this.inactiveParts.sort((partA, partB) => {
      return sortByPartType(partA, partB);
    });
    this.activeParts.sort((partA, partB) => {
      return sortByPartType(partA, partB);
    });
    this.hoverClear();
  }

  /* // Stat Getters // */
  getTotalMechValue(hover: boolean = false) {
    var totalValue = 0;
    if (hover) {
      for (let i = 0; i < this.activeAndHoverParts.length; i++) {
        totalValue += this.activeAndHoverParts[i].cost || 0;
      }
    } else {
      for (let i = 0; i < this.activeParts.length; i++) {
        totalValue += this.activeParts[i].cost || 0;
      }
    }
    return totalValue;
  }
  getTotalPowerConsumption(hover: boolean = false) {
    var totalPC = 0;
    if (hover) {
      for (let i = 0; i < this.activeAndHoverParts.length; i++) {
        totalPC += this.activeAndHoverParts[i].powerConsumption || 0;
      }
    } else {
      for (let i = 0; i < this.activeParts.length; i++) {
        totalPC += this.activeParts[i].powerConsumption || 0;
      }
    }
    return totalPC;
  }
  getTotalPowerProduction(hover: boolean = false) {
    var totalPP = 0;
    if (hover) {
      for (let i = 0; i < this.activeAndHoverParts.length; i++) {
        totalPP += this.activeAndHoverParts[i].powerProduction || 0;
      }
    } else {
      for (let i = 0; i < this.activeParts.length; i++) {
        totalPP += this.activeParts[i].powerProduction || 0;
      }
    }
    return totalPP;
  }
  getTotalWeight(hover: boolean = false) {
    var totalWeight = 0;
    if (hover) {
      for (let i = 0; i < this.activeAndHoverParts.length; i++) {
        totalWeight += this.activeAndHoverParts[i].weight || 0;
      }
    } else {
      for (let i = 0; i < this.activeParts.length; i++) {
        totalWeight += this.activeParts[i].weight || 0;
      }
    }
    return totalWeight;
  }
  getHeadArmor(hover: boolean = false) {
    if (hover) {
      return this.activeAndHoverParts.find((part: Part) => {
        return part.type == 'head';
      })?.armorValue;
    } else {
      return this.activeParts.find((part: Part) => {
        return part.type == 'head';
      })?.armorValue;
    }
  }
  getCoreArmor(hover: boolean = false) {
    if (hover) {
      return this.activeAndHoverParts.find((part: Part) => {
        return part.type == 'core';
      })?.armorValue;
    } else {
      return this.activeParts.find((part: Part) => {
        return part.type == 'core';
      })?.armorValue;
    }
  }
  getLarmArmor(hover: boolean = false) {
    if (hover) {
      return this.activeAndHoverParts.find((part: Part) => {
        return part.type == 'larm';
      })?.armorValue;
    } else {
      return this.activeParts.find((part: Part) => {
        return part.type == 'larm';
      })?.armorValue;
    }
  }
  getRarmArmor(hover: boolean = false) {
    if (hover) {
      return this.activeAndHoverParts.find((part: Part) => {
        return part.type == 'rarm';
      })?.armorValue;
    } else {
      return this.activeParts.find((part: Part) => {
        return part.type == 'rarm';
      })?.armorValue;
    }
  }
  getLegArmor(hover: boolean = false) {
    if (hover) {
      return this.activeAndHoverParts.find((part: Part) => {
        return part.type == 'legs';
      })?.armorValue;
    } else {
      return this.activeParts.find((part: Part) => {
        return part.type == 'legs';
      })?.armorValue;
    }
  }

  hoverToCompare(hovPart: Part) {
    this.activeAndHoverParts = JSON.parse(JSON.stringify(this.activeParts));
    var indexOfReplacement = this.activeAndHoverParts.findIndex(
      (part: Part) => {
        return part.type == hovPart.type;
      }
    );
    if (indexOfReplacement === -1) {
      indexOfReplacement = this.activeAndHoverParts.length;
    }
    this.activeAndHoverParts[indexOfReplacement] = hovPart;
  }
  hoverClear() {
    this.activeAndHoverParts = [];
  }

  isMechaComplete(): boolean {
    //TO-DO
    if (this.activeParts.length < 5) {
      return false;
    } else {
      return true;
    }
  }
}
