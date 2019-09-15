import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { APIBase } from '../../../modules/common/api-base';

@Injectable({
  providedIn: 'root'
})
export class VersionService extends APIBase<Version, Version> {

  constructor(protected http: HttpClient) {
    super(http, "/api/versions");
  }
}

export interface Version {
  version: string,
  deepin_version: string,
  tracker_url: string,
  release_url: string,
  debian_seq: number,
}
