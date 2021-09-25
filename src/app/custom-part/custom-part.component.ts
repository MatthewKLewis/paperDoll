import { Component, OnInit } from '@angular/core';
import { Manufacturer, Part, PartsService, partType } from '../parts-service.service';

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
    type: partType.any,
    class: '',
    manufacturer: {
      name: '',
      models: [],
      bonuses: [],
    },
    model: '',
    quality: 0,
    weight: -1,
    description: '',
    armorValue: -1,
    cost: -1,
    bonuses: [],
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

  pickPartType(type: partType) {
    this.tempPart = {
      id: -1,
      name: '',
      type: partType.any,
      class: '',
      manufacturer: this.tempPart.manufacturer,
      quality: 0,
      weight: -1,
      description: '',
      armorValue: -1,
      cost: -1,
      bonuses: []
    };

    this.sliderValues = new Map<string, number>();

    switch (type) {
      case partType.head:
        this.tempPart.weight = 100;
        this.sliderValues.set('armorValue', 0);
        this.sliderValues.set('radarRange', 0);

        break;
      case partType.core:
        this.tempPart.weight = 400;
        this.sliderValues.set('armorValue', 0);
        this.sliderValues.set('powerProduction', 0);
        break;
      case partType.rarm:
        this.tempPart.weight = 180;
        this.sliderValues.set('armorValue', 0);
        this.sliderValues.set('damageValue', 0);
        this.sliderValues.set('armorPiercing', 0);
        this.sliderValues.set('damageOverTime', 0);
        break;
      case partType.larm:
        this.tempPart.weight = 180;
        this.sliderValues.set('armorValue', 0);
        this.sliderValues.set('damageValue', 0);
        this.sliderValues.set('armorPiercing', 0);
        this.sliderValues.set('damageOverTime', 0);
        break;
      case partType.legs:
        this.tempPart.weight = 500;
        this.sliderValues.set('armorValue', 0);
        this.sliderValues.set('mobility', 0);
        this.sliderValues.set('boost', 0);
        break;
      case partType.rshoulder:
        this.tempPart.weight = 100;
        this.sliderValues.set('armorValue', 0);
        break;
      case partType.lshoulder:
        this.tempPart.weight = 100;
        this.sliderValues.set('armorValue', 0);
        break;
      default:
        break;
    }
  }

  pickManufacturer(manufacturer: Manufacturer) {
    this.tempPart = {
      id: -1,
      name: '',
      type: this.tempPart.type,
      class: '',
      manufacturer: manufacturer,
      quality: 0,
      weight: -1,
      description: '',
      armorValue: -1,
      cost: -1,
      bonuses: []
    };
  }

  //Mock Up
  mockUp() {
    console.log(this.tempPart);
    console.log(this.sliderValues);
    this.mockUpReady = true;
  }
}
