import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "./core/auth/auth.service";
import { NavigationEnd, Router} from "@angular/router";

import { OneMapCategories } from "./common/one-map-categories";
import { OneMapCategoriesService } from "./core/admin/one-map-categories.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = '张掖市自然灾害监测预警系统';
  oneMapCate: OneMapCategories[];
  sub: any;
  updateMapCate: any;

  constructor(
    public authService: AuthService,
    private router: Router,
    private oneMapCategoriesService: OneMapCategoriesService
  ) { }

  ngOnInit(): void {
    this.sub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.authService.checkLogin()) {
          this.getOneMapCategoriesList();
        }
      }
    });
    this.updateMapCate = this.oneMapCategoriesService.updateOneMapCate.subscribe(() => {
      this.getOneMapCategoriesList();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.updateMapCate.unsubscribe();
  }

  getOneMapCategoriesList(): void {
    this.oneMapCategoriesService.getOneMapCategoriesList().then(list => {
      this.oneMapCate = list;
      window.localStorage.setItem('MAP_CATEGORIES', JSON.stringify(list));
    });
  }

  goToOneMap(mapCate: OneMapCategories): void {
    this.router.navigate(['/oneMaps'], { queryParams: { cateId: mapCate.id } });
  }

  loginOut(): void {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('MAP_CATEGORIES');
    this.router.navigate(['/login']);
  }

}
