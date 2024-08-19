import {
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  let token = localStorage.getItem('token');
  if (token != undefined) {
    let clone = req.clone({
      headers: new HttpHeaders({
        authorization: 'bearer ' + token,
      }),
    });
    return next(clone);
  }
  return next(req);
};
