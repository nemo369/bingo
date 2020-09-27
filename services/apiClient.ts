import { NuxtAxiosInstance } from '@nuxtjs/axios';
enum ReqMethods {
  request = 'request',
  delete = 'delete',
  get = 'get',
  head = 'head',
  options = 'options', // url, config
  post = 'post',
  put = 'put',
  patch = 'patch', // url, data, config
}

let client: any;

export function setClient(newclient: any) {
  client = newclient;
}

// Request helpers
const reqMethods: ReqMethods[] = [
  ReqMethods.request,
  ReqMethods.delete,
  ReqMethods.get,
  ReqMethods.head,
  ReqMethods.options, // url, config
  ReqMethods.post,
  ReqMethods.put,
  ReqMethods.patch, // url, data, config
];

const service: NuxtAxiosInstance = {} as NuxtAxiosInstance;

reqMethods.forEach((method) => {
  service[method] = function () {
    if (!client) throw new Error('apiClient not installed');
    return client[method].apply(null, arguments);
  };
});

export default service;
