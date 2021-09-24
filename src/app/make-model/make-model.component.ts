import { Component, OnInit } from '@angular/core';
import { PartsService } from '../parts-service.service';

@Component({
  selector: 'app-make-model',
  templateUrl: './make-model.component.html',
  styleUrls: ['./make-model.component.scss']
})
export class MakeModelComponent implements OnInit {

  displayedColumns: Array<string> = ['name', 'light', 'medium', 'heavy']

  constructor(public partsService: PartsService) { }

  ngOnInit(): void { }

}
