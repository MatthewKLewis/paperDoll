import { Component, OnInit } from '@angular/core';
import { Part, PartsService } from '../parts-service.service';

@Component({
  selector: 'app-custom-part',
  templateUrl: './custom-part.component.html',
  styleUrls: ['./custom-part.component.scss'],
})
export class CustomPartComponent implements OnInit {
  maxPoints: number = 100;
  remainingPoints: number = 100;
  sliderValues: Map<string, number> = new Map<string, number>();
  tempPart: Part = {
    id: -1,
    name: '',
    type: '',
    manufacturer: '',
    quality: '',
    weight: -1,
    description: '',
    armorValue: -1,
    cost: -1,
  };

  mockUpReady: boolean = false;

  constructor(public partsService: PartsService) {}

  ngOnInit(): void {}

  calculatePoints(event: any, inputKey: string) {
    this.sliderValues.set(inputKey, event.value);
    var valueTotal = 0;
    this.sliderValues.forEach((val: number) => {
      valueTotal += val;
    });
    if (valueTotal > this.maxPoints) {
      var totalOfNormArray = 0;
      var normalizeArray: Array<any> = [];
      this.sliderValues.forEach((val: number, key: string) => {
        if (key != inputKey) {
          normalizeArray.push({ key: key, value: val });
          totalOfNormArray += val;
        }
      });
      for (let i = 0; i < normalizeArray.length; i++) {
        normalizeArray[i].value =
          (normalizeArray[i].value / totalOfNormArray) *
          (valueTotal - this.maxPoints);
        this.sliderValues.set(
          normalizeArray[i].key,
          Math.floor(
            <number>this.sliderValues.get(normalizeArray[i].key) -
              normalizeArray[i].value
          )
        );
      }
    }
    var newValueTotal = 0;
    this.sliderValues.forEach((val: number) => {
      newValueTotal += val;
    });
    this.remainingPoints = this.maxPoints - newValueTotal;
  }

  changeName(event: any) {
    this.tempPart.name = event.srcElement.value;
  }

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

  pickPartType(type: string) {
    this.tempPart = {
      id: -1,
      name: '',
      type: type,
      manufacturer: this.tempPart.manufacturer,
      quality: '',
      weight: -1,
      description: '',
      armorValue: -1,
      cost: -1,
    };

    this.sliderValues = new Map<string, number>();

    switch (type) {
      case 'head':
        this.tempPart.weight = 100;
        this.sliderValues.set('armorValue', 0);
        this.sliderValues.set('radarRange', 0);

        break;
      case 'core':
        this.tempPart.weight = 400;
        this.sliderValues.set('armorValue', 0);
        this.sliderValues.set('powerProduction', 0);
        break;
      case 'rarm':
        this.tempPart.weight = 180;
        this.sliderValues.set('armorValue', 0);
        this.sliderValues.set('damageValue', 0);
        this.sliderValues.set('armorPiercing', 0);
        this.sliderValues.set('damageOverTime', 0);
        break;
      case 'larm':
        this.tempPart.weight = 180;
        this.sliderValues.set('armorValue', 0);
        this.sliderValues.set('damageValue', 0);
        this.sliderValues.set('armorPiercing', 0);
        this.sliderValues.set('damageOverTime', 0);
        break;
      case 'legs':
        this.tempPart.weight = 500;
        this.sliderValues.set('armorValue', 0);
        this.sliderValues.set('mobility', 0);
        this.sliderValues.set('boost', 0);
        break;
      case 'rshoulder':
        this.tempPart.weight = 100;
        this.sliderValues.set('armorValue', 0);
        break;
      case 'rshoulder':
        this.tempPart.weight = 100;
        this.sliderValues.set('armorValue', 0);
        break;
      case 'lshoulder':
        this.tempPart.weight = 100;
        this.sliderValues.set('armorValue', 0);
        break;
      default:
        break;
    }
  }

  pickManufacturer(manufacturer: string) {
    this.tempPart = {
      id: -1,
      name: '',
      type: this.tempPart.type,
      manufacturer: manufacturer,
      quality: '',
      weight: -1,
      description: '',
      armorValue: -1,
      cost: -1,
    };
  }

  //Mock Up
  mockUp() {
    console.log(this.tempPart);
    console.log(this.sliderValues);
    this.mockUpReady = true;
  }
}
