import { Component } from '@angular/core';
import { Part, PartsService, partType } from '../parts-service.service';



@Component({
  selector: 'part-assembly',
  templateUrl: './part-assembly.component.html',
  styleUrls: ['./part-assembly.component.scss'],
})
export class PartAssemblyComponent {

  anvilHit: HTMLAudioElement = new Audio('../assets/sounds/anvil.mp3');

  constructor(public partsService: PartsService) {
    this.anvilHit.volume = 0.1;
  }

  getImagePath(pT: partType) {
    switch (pT) {
      case partType.head:
        return '../assets/images/Head.png';
      case partType.core:
        return '../assets/images/Core.png';
      case partType.legs:
        return '../assets/images/Legs.png';
      default:
        return '../assets/images/LeftArm.png';
    }
  }

  toolTip(part: Part) {
    console.log(part);
  }

}
