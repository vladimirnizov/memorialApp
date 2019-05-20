import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MemorialRecord } from '../models/memorial-record.model';
import { AngularFirestoreCollection, AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map, defaultIfEmpty } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { MemorialRecordsService } from '../services/memorial-records.service';

@Component({
  selector: 'app-search-memorial',
  templateUrl: './search-memorial.component.html',
  styleUrls: ['./search-memorial.component.css']
})
export class SearchMemorialComponent implements OnInit {
  recordsSnapshot: Observable<DocumentChangeAction<MemorialRecord>[]>; // Observable<MemorialRecord[]>;
  records: MemorialRecord[];
  recordsSubscription: Subscription;
  noRecord: boolean;


  constructor(private memorialRecordsService: MemorialRecordsService) { }

  ngOnInit() {
   this.noRecord = false;
  }

  onSubmit(searchForm: NgForm) {
    this.records = [];

    this.memorialRecordsService.getRecordByName(searchForm)
    .subscribe(recordsWithMeta => {
      for (const record of recordsWithMeta) {
        this.records.push( { ...record.payload.doc.data() });
      }

      if (this.records.length == 0) {
        this.noRecord = true;
      } else {
        this.noRecord = false;
      }
    });
  }
 }
