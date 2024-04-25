import { HttpInterceptorFn } from '@angular/common/http';

// const setToken = (token: string) => {
//   localStorage.setItem('token', token);
// };
const getToken = () => {
  return localStorage.getItem('token');
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // setToken('token');
  const authToken = getToken();

  // "if" because the endpoint for singup and singin doesn't need the token
  if (authToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  return next(req);
};
