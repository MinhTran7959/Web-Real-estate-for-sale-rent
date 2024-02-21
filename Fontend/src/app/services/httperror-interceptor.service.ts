import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, concatMap, of, retryWhen, throwError } from 'rxjs';
import { AltertifyService } from './altertify.service';
import { ErrorCode } from 'src/enums/enums';

@Injectable({
  providedIn: 'root'
})
export class HttperrorInterceptorService implements HttpInterceptor {
  
// eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private altertify: AltertifyService) { }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
intercept(request: HttpRequest<any>, next: HttpHandler){
 // console.log("http requesr started")
    return next.handle(request)
    .pipe(
      retryWhen(error=>this.retryRequest(error,5)),
        catchError((error:HttpErrorResponse)=>{
          const errorMessage= this.setError(error);
          console.log(error);
          this.altertify.error(errorMessage);
          return throwError(errorMessage);
        })
    )
}

// retry the request in case of error
retryRequest(error: Observable<HttpErrorResponse>, retryCount: number): Observable<HttpErrorResponse> {
  return error.pipe(
    // retry in case api down 
    concatMap((checkErr: HttpErrorResponse, count: number) => {
      if(count<= retryCount){
        switch(checkErr.status)
        {
          case ErrorCode.serverDown: return of(checkErr);
          case ErrorCode.unauthoris: return of(checkErr);
        }
      }
      return throwError(checkErr);
    })
  );
}

setError(error: HttpErrorResponse): string{
    let errorMessage ="Unknow error occured";
    if(error.error instanceof ErrorEvent){
      errorMessage= error.error.message;
    }else{

      if(error.status===401){
      const text= "Login to continue";
        return text;
        }
      if(error.error.errorMessage && error.status!==0){
      errorMessage=error.error.errorMessage;
      }
    }
    return errorMessage;
}

}
