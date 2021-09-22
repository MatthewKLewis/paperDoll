import { Component, OnInit } from '@angular/core';
import { Part } from '../parts-service.service';

@Component({
  selector: 'app-custom-part',
  templateUrl: './custom-part.component.html',
  styleUrls: ['./custom-part.component.scss'],
})
export class CustomPartComponent implements OnInit {
  workingValues = {
    qualityIndex: 100,
    baseWeight: 0,
    weightMultiplier: 0,
  };

  tempPart: Part = {
    name: '',
    type: '',
    manufacturer: '',
    quality: '',
    weight: -1,
    description: '',
    armorValue: -1,
    cost: -1,
  };

  constructor() {}

  ngOnInit(): void {}

  changeName(event: any) {
    this.tempPart.name = event.srcElement.value;
  }

  pickPartType(type: string) {
    this.tempPart.type = type;
    switch (type) {
      case 'head':
        this.workingValues.baseWeight = 100;
        break;
      case 'core':
        this.workingValues.baseWeight = 400;
        break;
      case 'rarm':
        this.workingValues.baseWeight = 180;
        this.tempPart.attack = {
          damage: 10,
          damageType: 'melee',
          armorPiercing: 0,
        }
        break;
      case 'larm':
        this.workingValues.baseWeight = 180;
        this.tempPart.attack = {
          damage: 10,
          damageType: 'melee',
          armorPiercing: 0,
        }
        break;
      case 'legs':
        this.workingValues.baseWeight = 500;
        break;
      case 'misc':
        this.workingValues.baseWeight = 100;
        break;
      default:
        break;
    }
  }

  pickManufacturer(manufacturer: string) {
    this.tempPart.manufacturer = manufacturer;
    switch (manufacturer) {      
      case 'San Ysidro':
        this.workingValues.weightMultiplier = .8;
        break;
      case 'Yantian Mechanics Concern':
        this.workingValues.weightMultiplier = 1;
        break;
      case 'Corcellyx':
        this.workingValues.weightMultiplier = 1.2;
        break;
      default:
        break;
    }
  }
}
