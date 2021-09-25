import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Part, PartsService } from '../parts-service.service';

@Component({
  selector: 'app-part-catalog',
  templateUrl: './part-catalog.component.html',
  styleUrls: ['./part-catalog.component.scss']
})
export class PartCatalogComponent implements OnInit {

  @ViewChild(MatSort) zSort!: MatSort;

  displayedColumns: Array<string> = ['name', 'scout', 'light', 'medium', 'heavy', 'superheavy']
  displayedModelColumns: Array<string> = ['industryRating', 'name', 'class', 'description']

  allParts!: MatTableDataSource<Part>

  constructor(public partsService: PartsService) { }

  ngOnInit(): void {
    this.allParts = new MatTableDataSource(this.partsService.allParts)
  }
  
  ngAfterViewInit(): void {
    console.log(this.zSort)
    this.allParts.sort = this.zSort;
  }

  sortData(event:any) {
    this.allParts.sort = this.zSort
  }
}
