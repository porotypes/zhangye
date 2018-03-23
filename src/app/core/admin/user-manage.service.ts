import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from '../service-base.service';

import { UserManage } from "../../common/user-manage";

@Injectable()
export class UserManageService extends ServiceBaseService<UserManage> {

  getUserManageList(): Promise<UserManage[]> {
    return super.getAll('users').then(userList => {
      return userList;
    });
  }

  delUser(user: UserManage): Promise<UserManage> {
    const url = 'user/' + user.id;
    return super.delete(url).then(user => {
      return user;
    });
  }

}
