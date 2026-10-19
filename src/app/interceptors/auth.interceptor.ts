import {
  HttpInterceptorFn
} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn =
  (req, next) => {

    const token =
      localStorage.getItem('admin_token');

    console.log(
      'Interceptor:',
      req.method,
      req.url,
      token ? 'TOKEN ENCONTRADO' : 'SEM TOKEN'
    );

    if (!token) {
      return next(req);
    }

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authReq);
  };