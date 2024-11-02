import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from './app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  constructor(private http: HttpClient) { }

  getArtists(): Observable<Artist[]>{
    return this.http.get<Artist[]>("http://localhost:3000/artists");
  }

  createArtist(artist: Artist): Observable<Artist>{
    return this.http.post<Artist>("http://localhost:3000/artists", artist);
  }
  
  updateArtist(artist: Artist): Observable<Artist>{
    return this.http.put<Artist>(`http://localhost:3000/artists/${artist.id}`, artist);
  }
  
  deleteArtist(artist_id: number): Observable<any>{
    return this.http.delete<any>(`http://localhost:3000/artists/${artist_id}`);
  }
}
