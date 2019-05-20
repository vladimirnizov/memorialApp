import { Component, OnInit, Input } from '@angular/core';
import { MemorialRecord } from '../../models/memorial-record.model';
import { DocumentChangeAction } from '@angular/fire/firestore';

@Component({
  selector: 'app-exisitnig-records',
  templateUrl: './exisitnig-records.component.html',
  styleUrls: ['./exisitnig-records.component.css']
})
export class ExisitnigRecordsComponent implements OnInit {
  @Input('ExistingRecord')
  memorialRecordDocument: DocumentChangeAction<MemorialRecord>;
  givenName: string;
  familyName: string
  photoUrl: string;
  memorialText: string;
  country: string;

  constructor() { }

  ngOnInit() {
    this.givenName = this.memorialRecordDocument.payload.doc.data().munzah.givenName;
    this.familyName = this.memorialRecordDocument.payload.doc.data().munzah.familyName;
    this.photoUrl = this.memorialRecordDocument.payload.doc.data().munzah.photoUrl;
    this.memorialText = this.memorialRecordDocument.payload.doc.data().manziah.memorialText;
    this.country = this.memorialRecordDocument.payload.doc.data().munzah.country;
  }

}
