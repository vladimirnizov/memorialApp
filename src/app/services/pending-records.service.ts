import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { AuthServices } from '../auth/auth.service';
import { MemorialRecord } from '../models/memorial-record.model';
import { Observable } from 'rxjs';

@Injectable()
export class PendingRecordsService {
  private memorialRecordWithPending:  AngularFirestoreCollection<MemorialRecord>;
  private email: string;

  constructor(private auth: AuthServices, private db: AngularFirestore) { }

  getRecordsWithPendings(): Observable<DocumentChangeAction<MemorialRecord>[]> {
    // "email": this.auth.getUserEmail(),
    if (this.auth.isAuth()) {
      this.email = this.auth.getUserEmail();

      this.memorialRecordWithPending = this.db.collection('memorial_records', ref => {
        return ref
          .where('manziah.email', '==', this.email)
          .orderBy('pendingData');
        });

      // return memorialRecordsCollection.valueChanges();
      return this.memorialRecordWithPending.snapshotChanges();
    } else {
      return null;
    }
  }

  aprovePendingRecord(record: any, pendingManziah: any) {
    // console.log(record);
    // console.log('----------');
    // console.log(pendingManziah);
    const tmpManziahArr = record.payload.doc.data().othersManziah ? record.payload.doc.data().othersManziah : [];
    tmpManziahArr.push(pendingManziah);
    // console.log('HAIM ARRAY:', record.payload.doc.data().pendingData)
    const tmpPendingArr = record.payload.doc.data().pendingData.filter(obj => {
      // console.log(obj.manziah.familyName)
      // console.log(pendingManziah.manziah.familyName)
      // console.log(manziah.givenName, pendingManziah.givenName, manziah.familyName, pendingManziah.familyName)
      return obj.manziah.familyName !== pendingManziah.manziah.familyName;
    });

    // console.log(tmpPendingArr)

    this.db.collection('memorial_records').doc(record.payload.doc.id).update({othersManziah: tmpManziahArr, pendingData: tmpPendingArr});
    // this.db.collection('memorial_records').doc(record.payload.doc.id).update({pendingData: tmpPendingArr})
    // check authentication first
    // this.db.collection('memorial_records').doc(record.payload.doc.id).update({pending_data: pendingRecords})
  }

  declinePendingRecord(record: any, pendingManziah: any) {
    const tmpPendingArr = record.payload.doc.data().pendingData.filter(obj => {
      // console.log(obj.manziah.familyName)
      // console.log(pendingManziah.manziah.familyName)
      return obj.manziah.familyName !== pendingManziah.manziah.familyName;
    });

    this.db.collection('memorial_records').doc(record.payload.doc.id).update({pendingData: tmpPendingArr});
  }



}
