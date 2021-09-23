import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Part, Attack, Defense, PartsService } from '../parts-service.service'

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

@Component({
  selector: 'part-assembly',
  templateUrl: './part-assembly.component.html',
  styleUrls: ['./part-assembly.component.scss'],
})
export class PartAssemblyComponent {
  
  anvilHit: HTMLAudioElement = new Audio('../assets/sounds/anvil.mp3')

  inactivePartFilter: string = ''

  inactiveParts: Array<Part> = [];
  activeParts: Array<Part> = [];
  activeAndHoverParts: Array<Part> = []

  constructor(public partsService: PartsService) {
    this.anvilHit.volume = 0.1
    this.inactiveParts = this.partsService.inactiveParts
    
    //sort
    this.inactiveParts.sort((partA, partB) => {
      return sortByPartType(partA, partB);
    });
    this.activeParts.sort((partA, partB) => {
      return sortByPartType(partA, partB);
    });
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
      case 'head':
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
  getHeadArmor(hover: boolean = false) {
    if (hover) {
      return this.activeAndHoverParts.find((part: Part)=>{return part.type == 'head'})?.armorValue;
    } else {
      return this.activeParts.find((part: Part)=>{return part.type == 'head'})?.armorValue;
    }
  }
  getCoreArmor(hover: boolean = false) {
    if (hover) {
      return this.activeAndHoverParts.find((part: Part)=>{return part.type == 'core'})?.armorValue;
    } else {
      return this.activeParts.find((part: Part)=>{return part.type == 'core'})?.armorValue;
    }
  }
  getLarmArmor(hover: boolean = false) {
    if (hover) {
      return this.activeAndHoverParts.find((part: Part)=>{return part.type == 'larm'})?.armorValue;
    } else {
      return this.activeParts.find((part: Part)=>{return part.type == 'larm'})?.armorValue;
    }
  }
  getRarmArmor(hover: boolean = false) {
    if (hover) {
      return this.activeAndHoverParts.find((part: Part)=>{return part.type == 'rarm'})?.armorValue;
    } else {
      return this.activeParts.find((part: Part)=>{return part.type == 'rarm'})?.armorValue;
    }
  }
  getLegArmor(hover: boolean = false) {
    if (hover) {
      return this.activeAndHoverParts.find((part: Part)=>{return part.type == 'legs'})?.armorValue;
    } else {
      return this.activeParts.find((part: Part)=>{return part.type == 'legs'})?.armorValue;
    }
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

  addSpecialParts() {
    this.inactiveParts.push(...this.partsService.inactiveSpecialParts)
  }
}
