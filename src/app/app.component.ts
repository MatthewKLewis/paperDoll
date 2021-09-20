import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

interface Part {
  name: string,
  type: string,
  weight: number,
  powerConsumption: number,
  powerProduction?: number,
  description: string,
  cost?: number,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  errorMessage: string = ''

  inactiveParts: Array<Part> = [
    {name: 'EXPERT HEAD', type: 'sensor', weight: 100, description: 'a mecha part', powerConsumption: 10},
    {name: 'EXPERT CORE', type: 'core', weight: 100, description: 'a mecha part', powerConsumption: 10, powerProduction: 300},
    {name: 'EXPERT L ARM', type: 'larm', weight: 100, description: 'a mecha part', powerConsumption: 10},
    {name: 'ULTIMATE R ARM', type: 'rarm', weight: 100, description: 'a mecha part', powerConsumption: 10},
    {name: 'SWIFT LEGS', type: 'legs', weight: 100, description: 'a mecha part', powerConsumption: 10},
    {name: 'HEAVY LEGS', type: 'legs', weight: 100, description: 'a mecha part', powerConsumption: 10},
    {name: 'SHOULDER MOUNTED ROCKET SYSTEM', type: 'shoulders', weight: 100, description: 'a mecha part', powerConsumption: 10},
  ];
  
  activeParts: Array<Part> = [
    {name: 'Standard Head', type: 'sensor', weight: 100, description: 'a mecha part', powerConsumption: 10},
    {name: 'Standard Core', type: 'core', weight: 100, description: 'a mecha part', powerConsumption: 20, powerProduction: 200},
    {name: 'Standard Left Arm', type: 'larm', weight: 100, description: 'a mecha part', powerConsumption: 30},
    {name: 'Standard Right Arm', type: 'rarm', weight: 100, description: 'a mecha part', powerConsumption: 40},
    {name: 'Standard Legs', type: 'legs', weight: 100, description: 'a mecha part', powerConsumption: 50},
  ];

  drop(event: CdkDragDrop<any[]>) {
    //log item to be moved:
    var newContainerId = event.container.id
    console.log(newContainerId)

    var itemToMove = event.previousContainer.data[event.previousIndex]
    console.log(itemToMove)

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
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
        console.log("Core Already Added.")
        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          identicalPartTypeIndex,
          event.previousContainer.data.length - 1);
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    } else if (newContainerId === 'inactivePartsElement') {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getImagePath(partType: string) {
    switch (partType) {
      case 'head':
        return '../assets/images/head.webp'    
      default:
        return '../assets/images/head.webp'
    }
  }

  getTotalWeight() {
    var totalWeight = 0
    for (let i = 0; i < this.activeParts.length; i++) {
      totalWeight += this.activeParts[i].weight;
    }
    return totalWeight;
  }

  getTotalPowerProduction() {
    var totalPP = 0
    for (let i = 0; i < this.activeParts.length; i++) {
      totalPP += this.activeParts[i].powerProduction || 0;
    }
    return totalPP;
  }

  getTotalPowerConsumption() {
    var totalPC = 0
    for (let i = 0; i < this.activeParts.length; i++) {
      totalPC += this.activeParts[i].powerConsumption;
    }
    return totalPC;
  }

  isMechaComplete(): boolean { //TO-DO
    if (this.activeParts.length < 5) {
      return false;
    } else {
      return true;
    }
  }

}
