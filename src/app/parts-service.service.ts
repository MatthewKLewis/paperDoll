import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';

function sortByPartType(partA: Part, partB: Part): number {
  return partA.type - partB.type;
}

export interface Part {
  id: number;
  name: string;
  description?: string;

  type: partType;
  class: string;
  quality: number;

  manufacturer: Manufacturer;
  model?: string;

  weight: number;
  armorValue: number;
  powerConsumption: number;

  cost: number;

  sensorPower?: number;
  sensorRange?: number;

  attackPower?: number;
  attackRange?: number;

  defense?: number;

  stability?: number;
  speed?: number;
  thrust?: number;

  bonuses: Array<any>;
}
export interface Bonus {
  partType: partType;
  partProp: keyof Part;
  bonusAdds: boolean;
  bonusCoefficient: number;
  description?: string;
}
export interface Model {
  name: string;
  class: string;
  description?: string;
  industryRating: number;
  bonuses: Array<Bonus>;
}
export interface Manufacturer {
  name: string;
  models: Array<Model>;
  bonuses: Array<Bonus>;
}
export enum partType {
  'head' = 777,
  'core' = 778,
  'larm' = 779,
  'rarm' = 780,
  'legs' = 781,
  'lshoulder' = 782,
  'rshoulder' = 783,
  'slotted' = 784,
  'any' = 785,
}

//END OF INTERFACES AND UTILITY FUNCTIONS

@Injectable({
  providedIn: 'root',
})
export class PartsService {
  partTypes: Array<partType> = [
    partType.head,
    partType.core,
    partType.larm,
    partType.rarm,
    partType.legs,
  ];
  manufacturers: Array<Manufacturer> = [
    {
      name: 'Avionissimo',
      bonuses: [
        {
          partType: partType.any,
          partProp: 'weight',
          bonusAdds: false,
          bonusCoefficient: 5,
        },
        {
          partType: partType.legs,
          partProp: 'speed',
          bonusAdds: true,
          bonusCoefficient: 2,
        },
      ],
      models: [
        {
          name: 'Evra',
          class: 'scout',
          industryRating: 5,
          description: `The Avionissimo Evra is the lightest frame from this manufacturer, and their best regarded.`,
          bonuses: [
            {
              partType: partType.legs,
              partProp: 'speed',
              bonusAdds: true,
              bonusCoefficient: 5,
            },
          ],
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
      bonuses: [
        {
          partType: partType.core,
          partProp: 'powerConsumption',
          bonusAdds: false,
          bonusCoefficient: 5,
        },
        {
          partType: partType.head,
          partProp: 'sensorRange',
          bonusAdds: true,
          bonusCoefficient: 5,
        },
      ],
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
      bonuses: [
        {
          partType: partType.rarm,
          partProp: 'attackPower',
          bonusAdds: true,
          bonusCoefficient: 2,
        },
        {
          partType: partType.legs,
          partProp: 'speed',
          bonusAdds: true,
          bonusCoefficient: 2,
        },
      ],
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
      name: 'VOLGAZ',
      bonuses: [
        {
          partType: partType.any,
          partProp: 'armorValue',
          bonusAdds: true,
          bonusCoefficient: 5,
        },
        {
          partType: partType.legs,
          partProp: 'stability',
          bonusAdds: true,
          bonusCoefficient: 5,
        },
      ],
      models: [
        { name: 'Kalinka', class: 'scout', industryRating: 1, bonuses: [] },
        { name: 'Razvedik', class: 'light', industryRating: 2, bonuses: [] },
        { name: 'Bog-tier', class: 'medium', industryRating: 3, bonuses: [] },
        { name: 'Smetann', class: 'heavy', industryRating: 4, bonuses: [] },
        {
          name: 'Josef',
          class: 'superheavy',
          industryRating: 5,
          description: `The VOLGAZ Josef - The best in class mecha for the SuperHeavy category.`,
          bonuses: [],
        },
      ],
    },
    {
      name: 'Mantissa',
      bonuses: [
        {
          partType: partType.head,
          partProp: 'sensorPower',
          bonusAdds: true,
          bonusCoefficient: 5,
        },
      ],
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
      bonuses: [
        {
          partType: partType.larm,
          partProp: 'attackPower',
          bonusAdds: true,
          bonusCoefficient: 2,
        },
        {
          partType: partType.rarm,
          partProp: 'attackPower',
          bonusAdds: true,
          bonusCoefficient: 2,
        },
      ],
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
      bonuses: [
        {
          partType: partType.legs,
          partProp: 'speed',
          bonusAdds: true,
          bonusCoefficient: 5,
        },
      ],
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
      bonuses: [
        {
          partType: partType.legs,
          partProp: 'thrust',
          bonusAdds: true,
          bonusCoefficient: 5,
        },
        {
          partType: partType.any,
          partProp: 'cost',
          bonusAdds: false,
          bonusCoefficient: 10,
        },
      ],
      models: [
        { name: 'Aifeng', class: 'scout', industryRating: 2, bonuses: [] },
        { name: 'Chobra', class: 'light', industryRating: 1, bonuses: [] },
        { name: 'QXHJ', class: 'medium', industryRating: 5, bonuses: [] },
        { name: 'RuppShch', class: 'heavy', industryRating: 4, bonuses: [] },
        { name: 'Baseus', class: 'superheavy', industryRating: 3, bonuses: [] },
      ],
    },
  ];

  allParts: Array<Part> = [];

  activeParts: Array<Part> = [];
  activeAndHoverParts: Array<Part> = [];

  inactiveParts: Array<Part> = [];
  inactivePartFilter: partType | null = null;

  constructor() {
    this.createEveryPart();
    for (let i = 0; i < 20; i++) {
      this.inactiveParts.push(
        this.allParts[Math.floor(Math.random() * this.allParts.length)]
      );
    }
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

  //Stat Getters
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
  getTopWeight(hover: boolean = false) {
    var topWeight = 0;
    if (hover) {
      for (let i = 0; i < this.activeAndHoverParts.length; i++) {
        if (this.activeAndHoverParts[i].type != partType.legs) {
          topWeight += this.activeAndHoverParts[i].weight || 0;
        }
      }
    } else {
      for (let i = 0; i < this.activeParts.length; i++) {
        if (this.activeAndHoverParts[i].type != partType.legs) {
          topWeight += this.activeParts[i].weight || 0;
        }
      }
    }
    return topWeight;
  }
  getLegWeight(hover: boolean = false) {
    if (hover) {
      return (
        this.activeAndHoverParts.find((part: Part) => {
          return part.type == partType.legs;
        })?.weight || 0
      );
    } else {
      return (
        this.activeParts.find((part: Part) => {
          return part.type == partType.legs;
        })?.weight || 0
      );
    }
  }
  getHeadArmor(hover: boolean = false): number {
    if (hover) {
      return (
        this.activeAndHoverParts.find((part: Part) => {
          return part.type == partType.head;
        })?.armorValue || 0
      );
    } else {
      return (
        this.activeParts.find((part: Part) => {
          return part.type == partType.head;
        })?.armorValue || 0
      );
    }
  }
  getCoreArmor(hover: boolean = false): number {
    if (hover) {
      return (
        this.activeAndHoverParts.find((part: Part) => {
          return part.type == partType.core;
        })?.armorValue || 0
      );
    } else {
      return (
        this.activeParts.find((part: Part) => {
          return part.type == partType.core;
        })?.armorValue || 0
      );
    }
  }
  getLarmArmor(hover: boolean = false): number {
    if (hover) {
      return (
        this.activeAndHoverParts.find((part: Part) => {
          return part.type == partType.larm;
        })?.armorValue || 0
      );
    } else {
      return (
        this.activeParts.find((part: Part) => {
          return part.type == partType.larm;
        })?.armorValue || 0
      );
    }
  }
  getRarmArmor(hover: boolean = false): number {
    if (hover) {
      return (
        this.activeAndHoverParts.find((part: Part) => {
          return part.type == partType.rarm;
        })?.armorValue || 0
      );
    } else {
      return (
        this.activeParts.find((part: Part) => {
          return part.type == partType.rarm;
        })?.armorValue || 0
      );
    }
  }
  getLegArmor(hover: boolean = false): number {
    if (hover) {
      return (
        this.activeAndHoverParts.find((part: Part) => {
          return part.type == partType.legs;
        })?.armorValue || 0
      );
    } else {
      return (
        this.activeParts.find((part: Part) => {
          return part.type == partType.legs;
        })?.armorValue || 0
      );
    }
  }
  getRarmWeaponDamage(hover: boolean = false): number {
    if (hover) {
      return (
        this.activeAndHoverParts.find((part: Part) => {
          return part.type === partType.rarm;
        })?.attackPower || 0
      );
    } else {
      return (
        this.activeParts.find((part: Part) => {
          return part.type === partType.rarm;
        })?.attackPower || 0
      );
    }
  }
  getLarmWeaponDamage(hover: boolean = false): number {
    if (hover) {
      return (
        this.activeAndHoverParts.find((part: Part) => {
          return part.type === partType.larm;
        })?.attackPower || 0
      );
    } else {
      return (
        this.activeParts.find((part: Part) => {
          return part.type === partType.larm;
        })?.attackPower || 0
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
  getTitleForPart(short: partType) {
    switch (short) {
      case partType.rarm:
        return 'Right Arm';
      case partType.larm:
        return 'Left Arm';
      case partType.head:
        return 'Head';
      case partType.core:
        return 'Core';
      case partType.legs:
        return 'Legs';
      case partType.rshoulder:
        return 'Right Shoulder';
      case partType.lshoulder:
        return 'Left Shoulder';
      case partType.slotted:
        return 'Slot Item';
      default:
        return 'ERROR!';
    }
  }

  //Part Gen
  createEveryPart() {
    for (let i = 0; i < this.manufacturers.length; i++) {
      for (let j = 0; j < this.manufacturers[i].models.length; j++) {
        for (let k = 0; k < this.partTypes.length; k++) {
          //base identity
          var tempPart: Part = {
            id: i * 100 + j * 10 + k,
            name:
              this.manufacturers[i].models[j].name +
              ' ' +
              this.getTitleForPart(this.partTypes[k]),
            description: this.manufacturers[i].models[j].description || '',
            manufacturer: this.manufacturers[i],
            class: this.manufacturers[i].models[j].class,
            quality: this.manufacturers[i].models[j].industryRating,
            type: this.partTypes[k],
            weight: 0,
            powerConsumption: 0,
            armorValue: 0,
            cost: 0,
            bonuses: this.manufacturers[i].models[j].bonuses || [],
          };

          //SWITCH TYPE: base weight, power, armor
          switch (this.partTypes[k]) {
            case partType.rarm:
              tempPart.weight = 100;
              tempPart.powerConsumption = 20;
              tempPart.armorValue = 100;
              tempPart.attackPower = 100;
              break;
            case partType.larm:
              tempPart.weight = 100;
              tempPart.powerConsumption = 20;
              tempPart.armorValue = 100;
              tempPart.attackPower = 100;
              break;
            case partType.head:
              tempPart.weight = 50;
              tempPart.powerConsumption = 20;
              tempPart.armorValue = 80;
              break;
            case partType.core:
              tempPart.weight = 300;
              tempPart.powerConsumption = -200;
              tempPart.armorValue = 350;
              break;
            case partType.legs:
              tempPart.weight = 400;
              tempPart.powerConsumption = 100;
              tempPart.armorValue = 400;
              tempPart.speed = 30;
              tempPart.thrust = 10;
              tempPart.stability = 10;
              break;
            case partType.rshoulder:
              tempPart.weight = 40;
              tempPart.powerConsumption = 10;
              tempPart.armorValue = 80;
              break;
            case partType.lshoulder:
              tempPart.weight = 40;
              tempPart.powerConsumption = 10;
              tempPart.armorValue = 80;
              break;
            case partType.slotted:
              tempPart.weight = 10;
              tempPart.powerConsumption = 10;
              tempPart.armorValue = 10;
              break;
            default:
              tempPart.weight = -1;
              tempPart.powerConsumption = -1;
              tempPart.armorValue = -1;
              break;
          }

          //Base cost and power for cores.
          tempPart.cost = tempPart.weight * Math.pow(tempPart.quality, 4);
          if (tempPart.powerConsumption < 0) {
            tempPart.powerConsumption -= tempPart.quality * 10;
          } else {
            tempPart.powerConsumption += tempPart.quality * 2;
          }

          //weightclass mod
          switch (tempPart.class) {

            case 'scout':
              tempPart.cost *= 0.8
              tempPart.weight -= 30
              tempPart.powerConsumption *= .6

              // alter by quality
              tempPart.armorValue -= 40 - (tempPart.quality * 5);
              if (tempPart.attackPower) {
                tempPart.attackPower += (tempPart.weight / 5) + (tempPart.quality * 5) 
              } else if (tempPart.speed && tempPart.stability && tempPart.thrust) {
                tempPart.speed += 20 + tempPart.quality;
                tempPart.stability -= 20 //stability gets no benefit from quality
                tempPart.thrust += 20 + tempPart.quality;
              }
              tempPart.powerConsumption -= (tempPart.quality * 2)
              tempPart.armorValue += (tempPart.quality * 10)
              break;

            case 'light':
              tempPart.cost *= 0.9;
              tempPart.weight -= 10;
              tempPart.powerConsumption *= .8

              // alter by quality
              tempPart.armorValue -= 10  - (tempPart.quality * 5);
              if (tempPart.attackPower) {
                tempPart.attackPower += (tempPart.weight / 5) + (tempPart.quality * 5) 
              } else if (tempPart.speed && tempPart.stability && tempPart.thrust) {
                tempPart.speed += 10 + tempPart.quality;
                tempPart.stability -= 10 //stability gets no benefit from quality
                tempPart.thrust += 10 + tempPart.quality;
              }
              tempPart.powerConsumption -= (tempPart.quality * 2)
              tempPart.armorValue += (tempPart.quality * 10)
              break;

            case 'medium':
              // alter by quality
              tempPart.armorValue += 0  + (tempPart.quality * 5);
              if (tempPart.attackPower) {
                tempPart.attackPower += (tempPart.weight / 5) + (tempPart.quality * 5) 
              } else if (tempPart.speed && tempPart.stability && tempPart.thrust) {
                tempPart.speed += tempPart.quality;
                tempPart.stability += tempPart.quality;
                tempPart.thrust += tempPart.quality;
              }
              tempPart.powerConsumption -= (tempPart.quality * 2)
              tempPart.armorValue += (tempPart.quality * 10)
              break;

            case 'heavy':
              tempPart.cost *= 1.1;
              tempPart.weight += 10;
              tempPart.powerConsumption *= 1.2
              
              // alter by quality
              tempPart.armorValue += 30  + (tempPart.quality * 5);
              if (tempPart.attackPower) {
                tempPart.attackPower += (tempPart.weight / 5) + (tempPart.quality * 5) 
              } else if (tempPart.speed && tempPart.stability && tempPart.thrust) {
                tempPart.speed -= 10 //speed and thrust get no benefit from quality
                tempPart.stability += 10 + tempPart.quality;
                tempPart.thrust -= 10 //speed and thrust get no benefit from quality
              }
              tempPart.powerConsumption -= (tempPart.quality * 2)
              tempPart.armorValue += (tempPart.quality * 10)
              break;

            case 'superheavy':
              tempPart.cost *= 1.2;
              tempPart.weight += 100;
              tempPart.powerConsumption *= 1.6

              // alter by quality
              tempPart.armorValue += 80  + (tempPart.quality * 5);
              if (tempPart.attackPower) {
                tempPart.attackPower += (tempPart.weight / 5) + (tempPart.quality * 5) 
              } else if (tempPart.speed && tempPart.stability && tempPart.thrust) {
                tempPart.speed -= 20 //speed and thrust get no benefit from quality
                tempPart.stability += 20 + tempPart.quality;
                tempPart.thrust -= 20 //speed and thrust get no benefit from quality
              }
              tempPart.powerConsumption -= (tempPart.quality * 2)
              tempPart.armorValue += (tempPart.quality * 10)
              break;
              
          }

          //manufacturer mod
          //  //MANUFACTURER SPECIFIC BONUSES, hopefully possible to iterate over manufacturer.bonuses array?
          for (let i = 0; i < tempPart.manufacturer.bonuses.length; i++) {
            tempPart = this.resolveBonus(
              tempPart,
              tempPart.manufacturer.bonuses
            );
          }

          //make->MODEL mod
          //  //MODEL SPECIFI BONUSES, iterable.
          for (let i = 0; i < tempPart.bonuses.length; i++) {
            tempPart = this.resolveBonus(tempPart, tempPart.bonuses);
          }

          this.allParts.push(tempPart);
        }
      }
    }
  }

  resolveBonus(part: Part, bonuses: Array<Bonus>): Part {
    for (let i = 0; i < bonuses.length; i++) {
      var pK: partType = bonuses[i].partType;
      if (part[bonuses[i].partProp as keyof Part] && (part.type === pK || pK == partType.any)) {
        if (bonuses[i].bonusAdds) {
          for (let j = 0; j < bonuses[i].bonusCoefficient; j++) {
            part[bonuses[i].partProp as keyof Part]++;
          }
        } else {
          for (let k = 0; k < bonuses[i].bonusCoefficient; k++) {
            part[bonuses[i].partProp as keyof Part]--;
          }
        }
      } else {
        //console.log('PROPERTY NOT FOUND ERROR!');
      }
    }
    return part;
  }
}
