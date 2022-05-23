import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Profile } from './profile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getProfiles(): Observable <Profile[]> {
    return this.http.get<Profile[]>(`${this.apiServerUrl}/profile/all`);
  }
  public addProfile(profile: Profile): Observable <Profile> {
    return this.http.post<Profile>(`${this.apiServerUrl}/profile/add`, profile);
  }
  public updateProfile(profile: Profile): Observable <Profile> {
    return this.http.put<Profile>(`${this.apiServerUrl}/profile/update`, profile);
  }
  public deleteProfile(profileId: number): Observable <void> {
    return this.http.delete<void>(`${this.apiServerUrl}/profile/delete/${profileId}`);
  }
}
