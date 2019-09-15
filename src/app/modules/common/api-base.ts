import { HttpClient, HttpResponse } from '@angular/common/http';

// RESTfull API
export class APIBase<W_Model = any, R_Model = any> {
  constructor(private client: HttpClient, protected baseURL: string) { }

  create(t: W_Model) {
    return this.client.post(this.baseURL, t).toPromise();
  }

  get(id: string) {
    const url = this.baseURL + '/' + id;
    return this.client.get<R_Model>(url).toPromise();
  }

  delete(id: string) {
    const url = this.baseURL + '/' + id;
    return this.client.delete(url).toPromise();
  }

  put(id: string, t: W_Model) {
    const url = this.baseURL + '/' + id;
    this.client.put(url, t).toPromise();
  }

  async list(listOption?: ListOption) {
    if (listOption) {
      Object.keys(listOption)
        .filter(key => listOption[key] === null || listOption[key] === '')
        .forEach(key => delete listOption[key]);
    }
    const resp = await this.client
      .get<R_Model[]>(this.baseURL, { observe: 'response', params: listOption as any })
      .toPromise();

    return toListResult(resp);
  }
}

export interface ListOption {
  page?: number; //default 1
  count?: number;
  order_by?: string;
  order?: string;
  keyword?: string;
}

export interface ListResult<T = any> {
  total: number;
  page: number;
  pageSize: number;
  list: Array<T>;
}

function toListResult<T>(resp: HttpResponse<T[]>): ListResult<T> {
  let ret: ListResult<T> = {total: 0, page: 0, pageSize: 0, list: resp.body};

  let total = resp.headers.get('X-Resource-Total');
  if (total) {
    ret = {
      total: Number(total),
      page: Number(resp.headers.get('X-Current-Page')),
      pageSize: Number(resp.headers.get('X-Page-Size')),
      list: resp.body,
    };
  }

  if (!ret.list) {
    ret.list = [];
    return ret;
  }

  if (total) {
    let idBase: number = (ret.page - 1) * ret.pageSize + 1;
    ret.list.forEach((v: any) => {
      v.id = idBase++;
    });
  }

  return ret;
}
