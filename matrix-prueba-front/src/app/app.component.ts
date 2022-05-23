import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Profile } from './profile';
import { ProfileService } from './profile.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public profiles: Profile[];
  public editProfile?: Profile;
  public deleteProfile?: Profile;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
      this.getProfiles();
  }

  public getProfiles(): void {
    this.profileService.getProfiles().subscribe(
      (response: Profile[]) => {
        this.profiles = response;
        console.log(this.profiles);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onAddProfile(addForm: NgForm): void {
    (document.getElementById('add-profile-form') as HTMLButtonElement).click();
    this.profileService.addProfile(addForm.value).subscribe(
      (response: Profile) => {
        console.log(response);
        this.getProfiles();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateProfile(profile: Profile): void {
    this.profileService.updateProfile(profile).subscribe(
      (response: Profile) => {
        console.log(response);
        this.getProfiles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteProfile(profileId: number): void {
    this.profileService.deleteProfile(profileId).subscribe(
      (response: void) => {
        console.log(response);
        this.getProfiles();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchProfiles(key: string): void {
    console.log(key);
    const results: Profile[] = [];
    for (const profile of this.profiles) {
      if (profile.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || profile.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || profile.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || profile.country.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || profile.city.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || profile.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(profile);
      }
    }
    this.profiles = results;
    if (results.length === 0 || !key) {
      this.getProfiles();
    }
  }

  public onOpenModal(mode: string, profile?: Profile): void {
    const container = (document.getElementById('main-container') as HTMLDivElement);
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display ='none';
    button.setAttribute('data-toggle','modal');
    if(mode == 'add'){
      button.setAttribute('data-target', '#addProfileModal');
    }
    if(mode == 'edit'){
      this.editProfile = profile;
      button.setAttribute('data-target', '#updateProfileModal');
    }
    if(mode == 'delete'){
      this.deleteProfile = profile;
      button.setAttribute('data-target', '#deleteProfileModal');
    }
    container.appendChild(button);
    button.click();
  }



}
