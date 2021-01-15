import { SampleService } from './../../services/sample.service';
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

  private sampleCSVDownloadData: Blob;
  csvDataArray: string[] = [];

  constructor(private sampleService: SampleService, private fileSaver: FileSaverService) { }

  /**
   * Fetches a csv file from the API.
   */
  getSampleDownloadFile(): void {
    this.sampleService.getSampleDocument().subscribe({
      next: (response: HttpResponse<any>) => {
        this.sampleCSVDownloadData = response.body;
        this.readCSVFile();
      },
      error: (error) => console.log(error)
    });
  }

  /**
   * Interprets the csv file as text, and retrieves the second line
   * containing the values. Removes the surrounding double quotes for the values.
   */
  readCSVFile(): void {
    this.sampleCSVDownloadData.text().then((csvTextData) => {
      const csvValuesLineArray = csvTextData.split('\n')[1].split(',');
      this.csvDataArray = csvValuesLineArray.map((value) => value.replace(/^"|"$/g, ''));
    });
  }

  /**
   * Downloads a CSV file responded from the backend.
   * The usage of FileSaverService requires installation of ngx-filesaver.
   * It can be installed using npm install file-saver ngx-filesaver --save
   */
  downloadSampleFile(): void {
    this.fileSaver.save(this.sampleCSVDownloadData, 'credentials.csv');
  }

  ngOnInit(): void {
    this.sampleService.getSampleResponse().subscribe({
      next: (response: HttpResponse<any>) => {
        console.log(response);
      },
      error: (error) => console.log(error)
    });

    this.getSampleDownloadFile();
  }
}
