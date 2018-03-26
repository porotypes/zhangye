import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ServiceBaseService } from '../service-base.service';

import { UserManage } from "../../common/user-manage";

@Injectable()
export class UserManageService extends ServiceBaseService<UserManage> {

  getUserManageList(): Promise<UserManage[]> {
    return super.getAll('users/').then(userList => {
      return userList;
    });
  }

  addUser(user: UserManage): Promise<any> {
    const url = 'users/';
    return super.post(url, user).then(user => {
      return user;
    });
  }

  changeUser(user: UserManage): Promise<any> {
    const url = 'users/';
    return super.put(url, user).then(user => {
      return user;
    });
  }

  delUser(user: UserManage): Promise<UserManage> {
    const url = 'users/' + user.id;
    return super.delete(url).then(user => {
      return user;
    });
  }

}
