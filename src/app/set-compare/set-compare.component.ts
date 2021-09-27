import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Part, PartsService } from '../parts-service.service';

@Component({
  selector: 'app-set-compare',
  templateUrl: './set-compare.component.html',
  styleUrls: ['./set-compare.component.scss'],
})
export class SetCompareComponent implements AfterViewInit {

  @ViewChild(MatSort) zSort!: MatSort;
  displayedColumns = ['setID', 'manufacturer', 'name', 'class', 'quality', 'points', 'armor', 'attack', 'speed', 'thrust', 'weight', 'stability', 'balance', 'sensorRange', 'sensorStrength', 'power', ];
  starStr: string = '⭐'

  mechas: Array<Array<Part>> = [];
  mechaCompanionStatArray: MatTableDataSource<any> = new MatTableDataSource();

  constructor(public partsService: PartsService) {}

  ngOnInit() {
    for (let i = 0; i < this.partsService.allParts.length; i += 5) {
      var tempMech: Array<Part> = [];
      tempMech.push(this.partsService.allParts[i]);
      tempMech.push(this.partsService.allParts[i + 1]);
      tempMech.push(this.partsService.allParts[i + 2]);
      tempMech.push(this.partsService.allParts[i + 3]);
      tempMech.push(this.partsService.allParts[i + 4]);
      this.mechas.push(tempMech);
    }

    for (let i = 0; i < this.mechas.length; i++) {
      var index = i
      var totalPoints = 0;
      var totalArmor = 0;
      var totalWeight = 0;
      var totalPower = 0;
      var totalAttack = 0;
      var totalSpeed = 0;
      var totalThrust = 0;
      var totalStability = 0;
      var sensorStrength = 0;
      var sensorRange = 0;

      this.mechas[i].forEach((part: Part) => {
        totalPoints += part.armorValue + (part.attackPower || 0) + (part.speed || 0)  + (part.thrust || 0)  + (part.stability || 0)
        totalArmor += part.armorValue;
        totalWeight += part.weight;
        totalPower += part.powerConsumption;
        totalAttack += part.attackPower || 0;
        totalSpeed += part.speed || 0;
        totalThrust += part.thrust || 0;
        totalStability += part.stability || 0;
        sensorStrength += part.sensorPower || 0;
        sensorRange += part.sensorRange || 0;
      });
      
      this.mechaCompanionStatArray.filteredData.push({
        setID: index + 1,
        name: this.mechas[i][0].name.split(' ')[0],
        manufacturer: this.mechas[i][0].manufacturer.name,
        quality: this.mechas[i][0].quality,
        class: this.mechas[i][0].class,
        points: totalPoints,
        armor: totalArmor,
        weight: totalWeight,
        power: totalPower,
        attack: totalAttack,
        speed: totalSpeed,
        thrust: totalThrust,
        stability: totalStability,
        balance: totalStability - totalWeight,
        sensorRange: sensorRange,
        sensorStrength: sensorStrength,
      });
    }
  }

  ngAfterViewInit(): void {
    this.mechaCompanionStatArray.sort = this.zSort
  }

  sortData(thing: any) {

  }
}
