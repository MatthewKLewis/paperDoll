import { Component } from '@angular/core';
import { Part, Attack, Defense, PartsService } from '../parts-service.service';



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

  getImagePath(partType: string) {
    switch (partType) {
      case 'head':
        return '../assets/images/Head.png';
      case 'core':
        return '../assets/images/Core.png';
      case 'legs':
        return '../assets/images/Legs.png';
      case 'misc':
        return '#';
      default:
        return '../assets/images/LeftArm.png';
    }
  }

  toolTip(part: Part) {
    console.log(part);
  }

}
