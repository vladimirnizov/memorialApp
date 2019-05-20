import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { PendingData } from '../models/pending-data.model';

@Component({
  selector: 'app-manziah',
  templateUrl: './manziah.component.html',
  styleUrls: ['./manziah.component.css']
})
export class ManziahComponent implements OnInit {

  @Input('PendingData')
  memorialRecordDocument: PendingData;
  givenName: string;
  familyName: string
  photoUrl: string;
  memorialText: string;
  country: string;

  // @Output()
  // manziahAccept: EventEmitter<string> = new EventEmitter<string>(); 
  // @Output()
  // manziahDecline: EventEmitter<string> = new EventEmitter<string>(); 

  constructor() { }

  ngOnInit() {
    this.givenName = this.memorialRecordDocument.manziah.givenName;
    this.familyName = this.memorialRecordDocument.manziah.familyName;
    this.photoUrl = this.memorialRecordDocument.manziah.photoUrl;
    this.memorialText = this.memorialRecordDocument.manziah.memorialText;
    this.country = this.memorialRecordDocument.manziah.country;
  }

  // accept() {
  //   this.manziahAccept.emit(JSON.stringify(this.memorialRecordDocument));
  // }
  // decline() {
  //   this.manziahDecline.emit(JSON.stringify(this.memorialRecordDocument));
  // }
}