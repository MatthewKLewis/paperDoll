import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

interface Attack {
  damageType: string;
  damage: number;
  armorPiercing: number;
}

interface Defense {
  name: string;
  type: string;
}

interface Part {
  name: string;
  type: string;
  quality: string;
  weight: number;
  powerConsumption: number;
  description: string;

  cost?: number;
  powerProduction?: number;
  attack?: Attack;
  defense?: Defense;
}

function sortByPartType(partA: Part, partB: Part): number {
  var partAValue = 0;
  var partBValue = 0;

  switch (partA.type) {
    case 'sensor':
      partAValue = 5;
      break;
    case 'core':
      partAValue = 4;
      break;
    case 'rarm':
      partAValue = 3;
      break;
    case 'larm':
      partAValue = 3;
      break;
    case 'legs':
      partAValue = 2;
      break;
    case 'misc':
      partAValue = 1;
      break;
    default:
      partAValue = 0;
      break;
  }

  switch (partB.type) {
    case 'sensor':
      partBValue = 5;
      break;
    case 'core':
      partBValue = 4;
      break;
    case 'rarm':
      partAValue = 3;
      break;
    case 'larm':
      partAValue = 3;
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  //audio
  anvilHit: HTMLAudioElement = new Audio('../assets/sounds/anvil.wav')
  inactivePartFilter: string = ''

  inactiveParts: Array<Part> = [
    {
      name: 'EXPERT HEAD',
      type: 'sensor',
      quality: 'performance',
      weight: 100,
      description: 'an advanced sensor array',
      powerConsumption: 10,
    },
    {
      name: 'EXPERT CORE',
      type: 'core',
      quality: 'performance',
      weight: 100,
      description: 'a mecha part',
      powerConsumption: 10,
      powerProduction: 300,
    },
    {
      name: 'EXPERT Left ARM',
      type: 'larm',
      quality: 'performance',
      weight: 100,
      description: 'a mecha part',
      powerConsumption: 10,
      attack: { damageType: 'melee', damage: 10, armorPiercing: 0 },
    },
    {
      name: 'ULTIMATE Right ARM',
      type: 'rarm',
      quality: 'elite',
      weight: 100,
      description: 'a mecha part',
      powerConsumption: 10,
    },
    {
      name: 'SWIFT LEGS',
      type: 'legs',
      quality: 'master',
      weight: 100,
      description: 'a mecha part',
      powerConsumption: 10,
    },
    {
      name: 'HEAVY LEGS',
      type: 'legs',
      quality: 'master',
      weight: 100,
      description: 'a mecha part',
      powerConsumption: 10,
    },
    {
      name: 'SHOULDER MOUNTED ROCKET SYSTEM',
      type: 'rshoulder',
      quality: 'performance',
      weight: 100,
      description: 'a mecha part',
      powerConsumption: 10,
    },
    {
      name: 'SHOULDER MOUNTED LASER SYSTEM',
      type: 'lshoulder',
      quality: 'performance',
      weight: 100,
      description: 'a mecha part',
      powerConsumption: 10,
    },
  ];
  activeParts: Array<Part> = [
    {
      name: 'Junk Head',
      type: 'sensor',
      quality: 'junk',
      weight: 100,
      description: 'a mecha part',
      powerConsumption: 10,
    },
    {
      name: 'Standard Core',
      type: 'core',
      quality: 'stock',
      weight: 100,
      description: 'a mecha part',
      powerConsumption: 20,
      powerProduction: 200,
    },
    {
      name: 'Standard Right Arm',
      type: 'rarm',
      quality: 'stock',
      weight: 100,
      description: 'a mecha part',
      powerConsumption: 30,
    },
    {
      name: 'Junk Left Arm',
      type: 'larm',
      quality: 'junk',
      weight: 100,
      description: 'a mecha part',
      powerConsumption: 40,
    },
    {
      name: 'Standard Legs',
      type: 'legs',
      quality: 'stock',
      weight: 100,
      description: 'a mecha part',
      powerConsumption: 50,
    },
  ];
  activeAndHoverParts: Array<Part> = []

  constructor() {
    this.anvilHit.volume = 0.1
  }

  drop(event: CdkDragDrop<any[]>) {
    var newContainerId = event.container.id;
    var itemToMove = event.previousContainer.data[event.previousIndex];

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (newContainerId === 'activePartsElement') {
      var identicalPartTypeFound = false;
      var identicalPartTypeIndex = -1;
      for (let i = 0; i < this.activeParts.length; i++) {
        if (this.activeParts[i].type === itemToMove.type) {
          identicalPartTypeIndex = i;
          identicalPartTypeFound = true;
          break;
        }
      }
      if (identicalPartTypeFound) {
        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          identicalPartTypeIndex,
          event.previousContainer.data.length - 1
        );
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
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

    //play anvil hit
    this.anvilHit.play()
  }

  filterInactiveParts() {
    return this.inactiveParts.filter((part: Part)=>{return !this.inactivePartFilter || part.type == this.inactivePartFilter})
  }

  getImagePath(partType: string) {
    switch (partType) {
      case 'sensor':
        return '../assets/images/Head.png';
      case 'core':
        return '../assets/images/Core.png';
      case 'legs':
        return '../assets/images/Legs.png';
      case 'misc':
        return '#';
      default:
        return '../assets/images/LeftArm.png';
    }
  }

  getTotalWeight() {
    var totalWeight = 0;
    for (let i = 0; i < this.activeParts.length; i++) {
      totalWeight += this.activeParts[i].weight;
    }
    return totalWeight;
  }

  getTotalPowerProduction() {
    var totalPP = 0;
    for (let i = 0; i < this.activeParts.length; i++) {
      totalPP += this.activeParts[i].powerProduction || 0;
    }
    return totalPP;
  }

  getTotalPowerConsumption() {
    var totalPC = 0;
    for (let i = 0; i < this.activeParts.length; i++) {
      totalPC += this.activeParts[i].powerConsumption;
    }
    return totalPC;
  }

  getArrayOfWeapons() {
    return this.activeParts.filter((part: Part)=>{return part.attack})
  }

  hoverToCompare(hovPart: Part) {
    this.activeAndHoverParts = JSON.parse(JSON.stringify(this.activeParts))
    this.activeAndHoverParts[this.activeAndHoverParts.findIndex((part: Part)=>{return part.type == hovPart.type})] = hovPart;
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
