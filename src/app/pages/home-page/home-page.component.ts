import { SampleService } from './../../services/sample.service';
import { KeycloakService } from 'keycloak-angular';
import { Component, OnInit } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  keycloakAuthDetails: {
    authJWTToken?: string,
    authUser?: string
  } = { authJWTToken: '', authUser: '' };

  constructor(private keycloak: KeycloakService, private sampleService: SampleService, private fileSaver: FileSaverService) { }

  /**
   * Downloads a CSV file responded from the backend.
   * The usage of FileSaverService requires installation of ngx-filesaver.
   * It can be installed using npm install file-saver ngx-filesaver --save
   */
  getSampleDownloadFile()
  {
    this.sampleService.getSampleDocument().subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response);
        this.fileSaver.save(response.body, "credentials.csv");
      },
      error: (error) => console.log(error)
    });
  }

  ngOnInit(): void {
    this.keycloak.getToken().then((value) => {
      this.keycloakAuthDetails.authJWTToken = value;
    });
    try {
      this.keycloakAuthDetails.authUser = this.keycloak.getUsername();
    } catch (err) {
      console.log(err);
      this.keycloakAuthDetails.authUser = 'There was an error fetching the username';
    }
    this.sampleService.getSampleResponse().subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response);
      },
      error: (error) => console.log(error)
    });
  }
}
