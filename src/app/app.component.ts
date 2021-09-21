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
  description: string;
  
  cost: number;
  powerConsumption?: number;
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
      cost: 400,
    },
    {
      name: 'EXPERT CORE',
      type: 'core',
      quality: 'performance',
      weight: 600,
      description: 'a mecha part',
      powerProduction: 300,
      cost: 600,
    },
    {
      name: 'EXPERT Left ARM',
      type: 'larm',
      quality: 'performance',
      weight: 200,
      description: 'a mecha part',
      powerConsumption: 10,
      attack: { damageType: 'melee', damage: 10, armorPiercing: 0 },
      cost: 350,
    },
    {
      name: 'ULTIMATE Right ARM',
      type: 'rarm',
      quality: 'elite',
      weight: 220,
      description: 'a mecha part',
      powerConsumption: 10,
      cost: 700,
    },
    {
      name: 'SWIFT LEGS',
      type: 'legs',
      quality: 'master',
      weight: 400,
      description: 'a mecha part',
      powerConsumption: 10,
      cost: 1250,
    },
    {
      name: 'HEAVY LEGS',
      type: 'legs',
      quality: 'master',
      weight: 800,
      description: 'a mecha part',
      powerConsumption: 10,
      cost: 1400,
    },
    {
      name: 'SHOULDER ROCKET SYSTEM',
      type: 'rshoulder',
      quality: 'performance',
      weight: 160,
      description: 'a mecha part',
      powerConsumption: 10,
      cost: 400,
    },
    {
      name: 'SHOULDER LASER SYSTEM',
      type: 'lshoulder',
      quality: 'performance',
      weight: 140,
      description: 'a mecha part',
      powerConsumption: 10,
      cost: 400,
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
      cost: 80,
    },
    {
      name: 'Standard Core',
      type: 'core',
      quality: 'stock',
      weight: 550,
      description: 'a mecha part',
      powerProduction: 200,
      cost: 120,
    },
    {
      name: 'Standard Right Arm',
      type: 'rarm',
      quality: 'stock',
      weight: 110,
      description: 'a mecha part',
      powerConsumption: 30,
      cost: 100,
    },
    {
      name: 'Junk Left Arm',
      type: 'larm',
      quality: 'junk',
      weight: 140,
      description: 'a mecha part',
      powerConsumption: 40,
      cost: 60,
    },
    {
      name: 'Standard Legs',
      type: 'legs',
      quality: 'stock',
      weight: 400,
      description: 'a mecha part',
      powerConsumption: 50,
      cost: 100,
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

    //clear comparison
    this.hoverClear()
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

  hoverToCompare(hovPart: Part) {
    this.activeAndHoverParts = JSON.parse(JSON.stringify(this.activeParts))
    this.activeAndHoverParts[this.activeAndHoverParts.findIndex((part: Part)=>{return part.type == hovPart.type})] = hovPart;
  }
  hoverClear() {
    this.activeAndHoverParts = []
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
