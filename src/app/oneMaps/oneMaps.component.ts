import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './oneMaps.component.html',
  styleUrls: ['./oneMaps.component.css']
})
export class OneMapsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.createdMap();
  }

  private createdMap(): void {
    const map = new T.Map('map');
    map.centerAndZoom(new T.LngLat(100.456411, 38.93274), 12);
  }

}
