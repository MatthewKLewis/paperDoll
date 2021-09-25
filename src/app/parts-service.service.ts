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
      partAValue = 3.5;
      break;
    case 'larm':
      partAValue = 4.5;
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
      partBValue = 3;
      break;
    case 'larm':
      partBValue = 4;
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
export interface Mobility {
  speed: number;
  stability: number;
  thrust: number;
}
export interface Part {
  id: number;
  name: string;
  description?: string;

  type: string;
  class: string;
  quality: number;

  manufacturer: Manufacturer;
  model?: string;

  weight: number;
  armorValue: number;
  powerConsumption?: number;

  cost: number;

  sensor?: Sensor;
  powerProduction?: number;
  attack?: Attack;
  defense?: Defense;
  mobility?: Mobility;
}
export interface Model {
  name: string;
  class: string;
  description?: string;
  industryRating: number;
  bonuses: Array<any>;
}
export interface Manufacturer {
  name: string;
  models: Array<Model>;
}

//END OF INTERFACES AND UTILITY FUNCTIONS

@Injectable({
  providedIn: 'root',
})
export class PartsService {
  inactivePartFilter: string = '';

  partTypes: Array<string> = ['head', 'core', 'larm', 'rarm', 'legs'];

  manufacturers: Array<Manufacturer> = [
    {
      name: 'Avionissimo',
      models: [
        {
          name: 'Evra',
          class: 'scout',
          industryRating: 5,
          description: `The Avionissimo Evra is the lightest frame from this manufacturer, and their best regarded.`,
          bonuses: [],
        },
        {
          name: 'Hugo',
          class: 'light',
          industryRating: 4,
          description: `Avionissimo's Hugo model is a solid entry in the light mech category.`,
          bonuses: [],
        },
        { name: 'Guillaume', class: 'medium', industryRating: 3, bonuses: [] },
        { name: 'Valjean', class: 'heavy', industryRating: 2, bonuses: [] },
        { name: 'CRAV', class: 'superheavy', industryRating: 1, bonuses: [] },
      ],
    },
    {
      name: 'Corgistics',
      models: [
        {
          name: 'Micro',
          class: 'scout',
          industryRating: 4,
          description: `The Corgistics Micro packs a lot of firepower into the smallest yet mecha platform.`,
          bonuses: [],
        },
        { name: 'cFrame', class: 'light', industryRating: 3, bonuses: [] },
        { name: 'CorPro', class: 'medium', industryRating: 5, bonuses: [] },
        { name: 'Black', class: 'heavy', industryRating: 2, bonuses: [] },
        {
          name: 'HeavyBlack',
          class: 'superheavy',
          industryRating: 1,
          bonuses: [],
        },
      ],
    },
    {
      name: 'Fleetwood Marine',
      models: [
        { name: 'FM-00', class: 'scout', industryRating: 1, bonuses: [] },
        { name: 'FM-12', class: 'light', industryRating: 2, bonuses: [] },
        { name: 'FM-34', class: 'medium', industryRating: 4, bonuses: [] },
        {
          name: 'FM-56',
          class: 'heavy',
          industryRating: 5,
          description: `The FM-56 is the premiere heavy mecha platform for military applications`,
          bonuses: [],
        },
        { name: 'FM-78', class: 'superheavy', industryRating: 3, bonuses: [] },
      ],
    },
    {
      name: 'GAZAN',
      models: [
        { name: 'Kalinka', class: 'scout', industryRating: 1, bonuses: [] },
        { name: 'Razvedik', class: 'light', industryRating: 2, bonuses: [] },
        { name: 'Bog-tier', class: 'medium', industryRating: 3, bonuses: [] },
        { name: 'Smetann', class: 'heavy', industryRating: 4, bonuses: [] },
        {
          name: 'Josef',
          class: 'superheavy',
          industryRating: 5,
          description: `The GAZAN Josef - The best in class mecha for the SuperHeavy category.`,
          bonuses: [],
        },
      ],
    },
    {
      name: 'Mantissa',
      models: [
        { name: 'Hyperion', class: 'scout', industryRating: 4, bonuses: [] },
        { name: 'Radix', class: 'light', industryRating: 5, bonuses: [] },
        { name: 'Abscissa', class: 'medium', industryRating: 3, bonuses: [] },
        { name: 'Significand', class: 'heavy', industryRating: 2, bonuses: [] },
        {
          name: 'Ordinate',
          class: 'superheavy',
          industryRating: 1,
          bonuses: [],
        },
      ],
    },
    {
      name: 'Vincente',
      models: [
        { name: 'Piper', class: 'scout', industryRating: 1, bonuses: [] },
        { name: 'Goshawk', class: 'light', industryRating: 2, bonuses: [] },
        { name: 'Eagle', class: 'medium', industryRating: 4, bonuses: [] },
        { name: 'Condor', class: 'heavy', industryRating: 5, bonuses: [] },
        {
          name: 'Double Condor',
          class: 'superheavy',
          industryRating: 3,
          bonuses: [],
        },
      ],
    },
    {
      name: 'Yamashita',
      models: [
        { name: 'Tanto', class: 'scout', industryRating: 3, bonuses: [] },
        { name: 'Dan-No-Ura', class: 'light', industryRating: 5, bonuses: [] },
        { name: 'Uji', class: 'medium', industryRating: 4, bonuses: [] },
        { name: 'Goro', class: 'heavy', industryRating: 1, bonuses: [] },
        {
          name: 'Ichi-no-Tani',
          class: 'superheavy',
          industryRating: 2,
          bonuses: [],
        },
      ],
    },
    {
      name: 'Yantian Industrial',
      models: [
        { name: 'Aifeng', class: 'scout', industryRating: 2, bonuses: [] },
        { name: 'Chobra', class: 'light', industryRating: 1, bonuses: [] },
        { name: 'QXHJ', class: 'medium', industryRating: 5, bonuses: [] },
        { name: 'RuppShch', class: 'heavy', industryRating: 4, bonuses: [] },
        { name: 'Baseus', class: 'superheavy', industryRating: 3, bonuses: [] },
      ],
    },
  ];

  activeParts: Array<Part> = [];
  activeAndHoverParts: Array<Part> = [];
  inactiveParts: Array<Part> = [];

  constructor() {
    this.createEveryPart();
  }

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
  getHeadArmor(hover: boolean = false): number {
    if (hover) {
      return (
        this.activeAndHoverParts.find((part: Part) => {
          return part.type == 'head';
        })?.armorValue || 0
      );
    } else {
      return (
        this.activeParts.find((part: Part) => {
          return part.type == 'head';
        })?.armorValue || 0
      );
    }
  }
  getCoreArmor(hover: boolean = false): number {
    if (hover) {
      return (
        this.activeAndHoverParts.find((part: Part) => {
          return part.type == 'core';
        })?.armorValue || 0
      );
    } else {
      return (
        this.activeParts.find((part: Part) => {
          return part.type == 'core';
        })?.armorValue || 0
      );
    }
  }
  getLarmArmor(hover: boolean = false): number {
    if (hover) {
      return (
        this.activeAndHoverParts.find((part: Part) => {
          return part.type == 'larm';
        })?.armorValue || 0
      );
    } else {
      return (
        this.activeParts.find((part: Part) => {
          return part.type == 'larm';
        })?.armorValue || 0
      );
    }
  }
  getRarmArmor(hover: boolean = false): number {
    if (hover) {
      return (
        this.activeAndHoverParts.find((part: Part) => {
          return part.type == 'rarm';
        })?.armorValue || 0
      );
    } else {
      return (
        this.activeParts.find((part: Part) => {
          return part.type == 'rarm';
        })?.armorValue || 0
      );
    }
  }
  getLegArmor(hover: boolean = false): number {
    if (hover) {
      return (
        this.activeAndHoverParts.find((part: Part) => {
          return part.type == 'legs';
        })?.armorValue || 0
      );
    } else {
      return (
        this.activeParts.find((part: Part) => {
          return part.type == 'legs';
        })?.armorValue || 0
      );
    }
  }
  getRarmWeaponDamage(hover: boolean = false): number {
    if (hover) {
      return (
        this.activeAndHoverParts.find((part: Part) => {
          return part.type === 'rarm';
        })?.attack?.damage || 0
      );
    } else {
      return (
        this.activeParts.find((part: Part) => {
          return part.type === 'rarm';
        })?.attack?.damage || 0
      );
    }
  }
  getLarmWeaponDamage(hover: boolean = false): number {
    if (hover) {
      return (
        this.activeAndHoverParts.find((part: Part) => {
          return part.type === 'larm';
        })?.attack?.damage || 0
      );
    } else {
      return (
        this.activeParts.find((part: Part) => {
          return part.type === 'larm';
        })?.attack?.damage || 0
      );
    }
  }

  //Mecha Stats and Readiness
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

  //Display
  getTitleForPart(short: string) {
    switch (short) {
      case 'rarm':
        return 'Right Arm';
      case 'larm':
        return 'Left Arm';
      case 'head':
        return 'Head';
      case 'core':
        return 'Core';
      case 'legs':
        return 'Legs';
      case 'rshoulder':
        return 'Right Shoulder';
      case 'lshoulder':
        return 'Left Shoulder';
      case 'slotted':
        return 'Slot Item';
      default:
        return 'ERROR!';
    }
  }

  //part gen
  createEveryPart() {
    for (let i = 0; i < this.manufacturers.length; i++) {
      for (let j = 0; j < this.manufacturers[i].models.length; j++) {
        for (let k = 0; k < this.partTypes.length; k++) {
          //base identity
          var tempPart: Part = {
            id: i * 100 + j * 10 + k,
            name: this.manufacturers[i].models[j].name + ' ' + this.getTitleForPart(this.partTypes[k]),
            description: this.manufacturers[i].models[j].description || '',
            manufacturer: this.manufacturers[i],
            class: this.manufacturers[i].models[j].class,
            quality: this.manufacturers[i].models[j].industryRating,
            type: this.partTypes[k],
            weight: 0,
            powerConsumption: 0,
            armorValue: 0,
            cost: 0,
          };

          //base weight, power, armor
          switch (this.partTypes[k]) {
            case 'rarm':
              tempPart.weight = 100
              tempPart.powerConsumption = 20
              tempPart.armorValue = 100
              tempPart.attack = {
                damageType: 'ballistic',
                damage: 10,
                armorPiercing: 1,
              }
              break;
            case 'larm':
              tempPart.weight = 100
              tempPart.powerConsumption = 20
              tempPart.armorValue = 100
              tempPart.attack = {
                damageType: 'ballistic',
                damage: 10,
                armorPiercing: 1,
              }
              break;
            case 'head':
              tempPart.weight = 50
              tempPart.powerConsumption = 20
              tempPart.armorValue = 80
              break;
            case 'core':
              tempPart.weight = 300
              tempPart.powerProduction = 200
              tempPart.armorValue = 350
              break;
            case 'legs':
              tempPart.weight = 400
              tempPart.powerConsumption = 100
              tempPart.armorValue = 400
              break;
            case 'rshoulder':
              tempPart.weight = 40
              tempPart.powerConsumption = 10
              tempPart.armorValue = 80
              break;
            case 'lshoulder':
              tempPart.weight = 40
              tempPart.powerConsumption = 10
              tempPart.armorValue = 80
              break;
            case 'slotted':
              tempPart.weight = 10
              tempPart.powerConsumption = 10
              tempPart.armorValue = 10
              break;
            default:
              tempPart.weight = -1
              tempPart.powerConsumption = -1
              tempPart.armorValue = -1
              break;
          }

          tempPart.cost = tempPart.weight * Math.pow(tempPart.quality, 4)
          if (tempPart.powerProduction) {tempPart.powerProduction += tempPart.quality * 10}

          //class mod

          //type mod

          //manufacturer mod

          this.inactiveParts.push(tempPart)
        }
      }
    }
  }
}
