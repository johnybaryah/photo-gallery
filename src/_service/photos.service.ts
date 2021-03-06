import { Injectable, OnInit } from '@angular/core';
import { IPhoto } from '../_models/photo';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { GALLERY_IMAGE } from '../../node_modules/ngx-image-gallery';


@Injectable({
  providedIn: 'root'
})

export class PhotosService implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  api: string = 'api/photos/photos.json';

  allPhotos: GALLERY_IMAGE[];

  constructor(private _http: HttpClient) { }

  getAllPhotos(): Observable<IPhoto[]> {
    // get count first
    return this._http.get<IPhoto[]>(this.api).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  ngOnInit(): void {
    this.getAllPhotos().subscribe(p => {
      this.allPhotos = p;
    });
  }
}
