import { Component, OnInit } from '@angular/core';
import { PendingRecordsService } from '../services/pending-records.service';
import { AuthServices } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { PendingData } from '../models/pending-data.model';

@Component({
  selector: 'app-pending-records',
  templateUrl: './pending-records.component.html',
  styleUrls: ['./pending-records.component.css']
})
export class PendingRecordsComponent implements OnInit {
  pendingRecords: Observable<DocumentChangeAction<PendingData>[]>
  // private pendingData: any;
  constructor(private pendingRecordsService: PendingRecordsService) { }

  ngOnInit() {
    // if (this.auth.isAuth()) {
    //   const email = this.auth.getUserEmail();
      this.pendingRecords = this.pendingRecordsService.getRecordsWithPendings()
      // this.pendingRecords.subscribe(recordsWithPending => {
      //   for (const item of recordsWithPending) {
      //     console.log([ ...item.payload.doc.data().pendingData ])
      //   }
        
      // })
    // }
  }

  chooseFromExistingRecords(record: any, pendingManziah: any) {
    // console.log(pendingMaznziah)
    this.pendingRecordsService.aprovePendingRecord(record, pendingManziah)
  }

  acceptManziah(record: any, pendingManziah: any) {
    // this.chatItems.push(e);
    this.pendingRecordsService.aprovePendingRecord(record, pendingManziah)
  }

  declineManziah(record: any, pendingManziah: any) {
    this.pendingRecordsService.declinePendingRecord(record, pendingManziah)
  }
}
