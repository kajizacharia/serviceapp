import { Component } from '@angular/core';
import { ArtistsService } from './artists.service';
import { Artist } from './app.interfaces';



@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css'
})
export class ArtistsComponent {
  public artists: Artist[] = [];
  isUpdateArtist: boolean = false;

  constructor(private artistsService:ArtistsService){}

  artist: Artist = {
    id: 0,
    name: '',
    country: '',
    grade: 0 
  } 

  ngOnInit():void{
    this.getArtists()
  }

  getArtists(){
    this.artistsService.getArtists().subscribe({
      next: (response) => {
        this.artists = response;
        console.log("Data was fetched successfully.")
      },
      error: (error) => {
        console.log("Error Occured: ", error)
      },
      complete: () => {
        console.log("Observable completed.")
      }
    })
  }

  get getId(){
    const all_ids = this.artists?.map((artist: Artist) => artist.id).sort()
    return all_ids[all_ids?.length -1]+1;
  }

  saveArtist(){
    
    if(!this.isUpdateArtist){
      this.artist.id = this.getId;
  
      this.artistsService.createArtist(this.artist).subscribe({
        next: (response) => {
          this.artist = {
            id: 0,
            name: '',
            country: '',
            grade: 0
          }
          console.log("Artist Created Successfully.")
          this.getArtists();
        },
        error: (error) => {
          console.log("Failed to create artist: ", error)
        }
      })
    }

    if(this.isUpdateArtist){
      this.artistsService.updateArtist(this.artist).subscribe({
        next: (response) => {
          this.isUpdateArtist = false;
  
          this.artist = {
            id: 0,
            name: '',
            country: '',
            grade: 0
          }
          console.log("Artist Updated Successfully.")
          this.getArtists();
        },
        error: (error) => {
          this.isUpdateArtist = false;
          this.artist = {
            id: 0,
            name: '',
            country: '',
            grade: 0
          }
          console.log("Failed to update artist: ", error)
        }
      })
    }


  }

  updateArtist(artist: Artist)  {
    this.artist = artist;
    this.isUpdateArtist = true;
  }

  deleteArtist(artist_id: number){
    this.artistsService.deleteArtist(artist_id).subscribe({
      next: (response) => {
        console.log("Artist deleted Successfully.")
        this.getArtists();
      },
      error: (error) => {
        console.log(`Failed to delete artist with id ${artist_id}: `, error)
      }
    })
  }
}


