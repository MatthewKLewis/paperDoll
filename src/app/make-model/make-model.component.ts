import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Model, PartsService } from '../parts-service.service';

@Component({
  selector: 'app-make-model',
  templateUrl: './make-model.component.html',
  styleUrls: ['./make-model.component.scss']
})
export class MakeModelComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) zSort!: MatSort;

  displayedColumns: Array<string> = ['name', 'scout', 'light', 'medium', 'heavy', 'superheavy']
  displayedModelColumns: Array<string> = ['industryRating', 'name', 'class', 'description']

  allModels!: MatTableDataSource<Model>

  constructor(public partsService: PartsService) { }

  ngOnInit(): void {
    var tempArray = []
    for (let i = 0; i < this.partsService.manufacturers.length; i++) {
      for (let j = 0; j < this.partsService.manufacturers[i].models.length; j++) {
        tempArray.push(this.partsService.manufacturers[i].models[j])
      }
    }
    this.allModels = new MatTableDataSource(tempArray)
  }
  
  ngAfterViewInit(): void {
    console.log(this.zSort)
    this.allModels.sort = this.zSort;
  }

  sortData(event:any) {
    this.allModels.sort = this.zSort
  }
}
