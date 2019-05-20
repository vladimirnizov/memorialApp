import { Component, OnInit } from '@angular/core';
import { MemorialRecordsService } from '../services/memorial-records.service';
import { MemorialRecords } from '../models/memorial-records.model';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser} from '@angular/common';
import {MemorialRecord} from '../models/memorial-record.model';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import {async} from '@angular/core/testing';

@Component({
  selector: 'app-show-picture',
  templateUrl: './show-picture.component.html',
  styleUrls: ['./show-picture.component.css']
})
export class ShowPictureComponent implements OnInit {
  recordsGallery: MemorialRecords[] = [];
  // used for controlling the carousel appearence
  // - if data from the db loaded then show the carousel
  // - otherwise hide carousel
  dataLoaded = false;
  memorialExistRecord: Observable<DocumentChangeAction<MemorialRecord>[]>;
  selectedRecord: DocumentChangeAction<MemorialRecord>;
  testBrowser: boolean;
    form: NgForm;

  constructor(@Inject(PLATFORM_ID) platformId: string, private memorialRecordsService: MemorialRecordsService) {
    // only create the context of the carousel in browser
    // because if its rendered in ssr then it first looks ugly for couple of seconds untile the
    // real data from the db arrives
    this.testBrowser = isPlatformBrowser(platformId);
    if (this.testBrowser) {
      // this is only executed on the browser
      this.memorialRecordsService
        .getAllRecords()
        .subscribe(memorialRecords => {
          this.dataLoaded = true;
          this.recordsGallery = [ ...memorialRecords ];
        });
    }
  }
  addCandle(record) {

    // this.form.addFormGroup(record);

    this.memorialExistRecord = this.memorialRecordsService.getRecordExists(record);
      this.memorialExistRecord.subscribe(recordsSnapshot => {
          console.log(recordsSnapshot);
          for (const selRecord of recordsSnapshot) {
              this.memorialRecordsService.addCandle(selRecord);
          }
          // if (recordsSnapshot.length > 0) {
          //     this.munzahDataAssigned = false;
          // } else {
          //     this.munzahDataAssigned = true;
          // }

      });
      // const memorialList = this.memorialExistRecord;
      // for (const selRecord of memorialList) {
      //     console.log(selRecord);
      // }
      //

  }
  ngOnInit() {
  }
}


