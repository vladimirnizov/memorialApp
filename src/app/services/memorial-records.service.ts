import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
// import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { MemorialRecord } from '../models/memorial-record.model';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { PendingData } from '../models/pending-data.model';
import {AuthServices} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {ResponseContentType} from '@angular/http';
import {map} from 'rxjs/internal/operators';
import * as firebase from 'firebase';


@Injectable()
export class MemorialRecordsService {
    familyName: any;

    // memorialRecordsCollection: AngularFirestoreCollection<MemorialRecord>;
    // url = 'http://localhost:3000/memorialRecords?_sort=id&_order=desc';

    constructor(private db: AngularFirestore, private auth: AuthServices, private http: HttpClient) {
    }

    addRecordToDb(memorialRecord: MemorialRecord) {
        this.db.collection('memorial_records').add(memorialRecord);
    }

    getAllRecords() {
        let records: Observable<any[]>;
        records = this.db.collection('memorial_records').valueChanges();

        console.log(this.db.collection('memorial_records').snapshotChanges());

        return records;
    }

    getRecordByName(searchForm: NgForm): Observable<DocumentChangeAction<MemorialRecord>[]> { // Observable<MemorialRecord[]> {
        let memorialRecordsCollection: AngularFirestoreCollection<MemorialRecord>;
        if (searchForm.value.user_search_data.length >= 2) {
            memorialRecordsCollection = this.db.collection('memorial_records', ref => {
                return ref.where('munzah.familyName', '==', searchForm.value.user_search_data);
            });

            // return memorialRecordsCollection.valueChanges();
            return memorialRecordsCollection.snapshotChanges();
        }
    }

    recordExists(munzahForm: NgForm): Observable<DocumentChangeAction<MemorialRecord>[]> {// Observable<MemorialRecord[]> {
        let memorialRecordsCollection: AngularFirestoreCollection<MemorialRecord>;

        memorialRecordsCollection = this.db.collection('memorial_records', ref => {
            return ref
                .where('munzah.familyName', '==', munzahForm.value.family_name)
                .where('munzah.givenName', '==', munzahForm.value.given_name);
        });

        // return memorialRecordsCollection.valueChanges();
        return memorialRecordsCollection.snapshotChanges();
    }

    updateRecord(oldRecord: DocumentChangeAction<MemorialRecord>, pendingRecords: PendingData[]) {
        // console.log(oldRecord)
        this.db.collection('memorial_records').doc(oldRecord.payload.doc.id).update({pendingData: pendingRecords});
    }

    getRecordExists(record: MemorialRecord) {
        let memorialRecordsCollection: AngularFirestoreCollection<MemorialRecord>;

        memorialRecordsCollection = this.db.collection('memorial_records', ref => {
            return ref
                .where('munzah.familyName', '==', record.munzah.familyName)
                .where('munzah.givenName', '==', record.munzah.givenName);
        });

        // return memorialRecordsCollection.valueChanges();
        return memorialRecordsCollection.snapshotChanges();
    }

    addCandle(record: DocumentChangeAction<MemorialRecord>) {
        let user = {
            email: '',
            image: '',
            name: '',
        };
        user = this.auth.getUser();
        if (user) {
            const tmpManziahArr = {
                country: '',
                email: user.email,
                familyName: user.name.split(' ')[1],
                givenName: user.name.split(' ')[0],
                memorialText: 'love you always',
                photoUrl: user.image,
                relationship: ''
            };
            this.db.collection('memorial_records').doc(record.payload.doc.id)
                .update({othersManziah: firebase.firestore.FieldValue.arrayUnion({manziah: tmpManziahArr})});
        } else {
            const tmpManziahArr = {
                country: '',
                email: this.auth.getUserEmail(),
                familyName: '',
                givenName: '',
                memorialText: 'love you always',
                photoUrl: 'data:image/png;base64,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',
                relationship: ''
            };
            this.db.collection('memorial_records').doc(record.payload.doc.id)
                .update({othersManziah: firebase.firestore.FieldValue.arrayUnion({manziah: tmpManziahArr})});
        }
    }
}

// CREAT AN ARRAY OF COUNTRIES THAT WILL DISPLAY THE SELECTED COUNTRY FLAG
