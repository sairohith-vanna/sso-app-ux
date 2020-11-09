import { SampleService } from './../../services/sample.service';
import { KeycloakService } from 'keycloak-angular';
import { Component, OnInit } from '@angular/core';

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

  constructor(private keycloak: KeycloakService, private sampleService: SampleService) { }

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
      next: (response) => console.log(response),
      error: (error) => console.log(error)
    });
  }
}
