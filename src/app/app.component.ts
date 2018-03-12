import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    this.createdMap();
  }

  private createdMap(): void {
    const map = new T.Map('map');
    map.centerAndZoom(new T.LngLat(116.40769, 39.89945), 12);
  }
}
