import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ListResult } from '../../../modules/common/api-base';
import { Version, VersionService } from './version.service';

@Injectable({
  providedIn: 'root'
})
export class VersionListService implements Resolve<ListResult<Version>>{

  constructor(private service: VersionService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    return this.service.list(route.queryParams);
  }
}
