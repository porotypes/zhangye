import { Injectable } from '@angular/core';

export const ADMIN_MENE = [
  { url: 'userManage', title: '用户管理' },
  { url: 'oneMapCategories', title: '一张图分类管理' },
  { url: 'oneMaps', title: '一张图数据管理' },
  { url: 'dataSources', title: '数据源(集合)管理' },
  { url: 'dataSpot', title: '数据源(点)管理' },
  { url: 'typeOfDisaster', title: '自然灾害类型管理' },
  { url: 'WarningRules', title: '预警规则管理' },
  { url: 'WarningLevels', title: '灾害预警等级管理' },
];

@Injectable()
export class AdminMenuService {
  getMenuItem(): Array<any> {
    return ADMIN_MENE;
  }
}
