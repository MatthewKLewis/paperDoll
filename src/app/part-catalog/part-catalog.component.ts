import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Part, partType, PartsService } from '../parts-service.service';

@Component({
  selector: 'app-part-catalog',
  templateUrl: './part-catalog.component.html',
  styleUrls: ['./part-catalog.component.scss']
})
export class PartCatalogComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) zSort!: MatSort;

  displayedModelColumns: Array<string> = ['quality', 'manufacturer', 'type', 'name', 'class', 'armorValue', 'attackPower', 'speed', 'stability', 'thrust', 'powerConsumption', 'weight', 'cost']
  starStr: string = '⭐'

  allParts!: MatTableDataSource<Part>

  constructor(public partsService: PartsService) { }

  ngOnInit(): void {
    this.allParts = new MatTableDataSource(this.partsService.allParts)
  }
  
  ngAfterViewInit(): void {
    this.allParts.sort = this.zSort;
    this.allParts.paginator = this.paginator;
    console.log(this.allParts.filteredData)
  }

  sortData(event:any) {
    this.allParts.sort = this.zSort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allParts.filter = filterValue.trim().toLowerCase();

    if (this.allParts.paginator) {
      this.allParts.paginator.firstPage();
    }
  }

  nameFromEnum(p: partType) {
    return partType[p]
  }
}
