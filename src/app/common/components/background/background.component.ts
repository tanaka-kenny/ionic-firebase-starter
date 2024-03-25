import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  standalone: true,
  styleUrls: ['./background.component.scss'],
  imports: [ IonicModule, CommonModule],
})
export class BackgroundComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
 