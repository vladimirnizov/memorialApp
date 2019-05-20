import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { StopCreatingMemorialComponent } from './stop-creating-memorial.component';
import { FinishCreatingMemorialComponent } from './finish-creating-memorial.component';
import { Munzah } from '../models/munzah.model';
import { Manziah } from '../models/manziah.model';
import { AuthServices } from '../auth/auth.service';
import { MemorialRecordsService } from '../services/memorial-records.service';
import { MemorialRecord } from '../models/memorial-record.model';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { CounriesService } from '../services/counries.service';
import { Country } from '../models/country.model';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { PendingData } from '../models/pending-data.model';

@Component({
  selector: 'app-create-memorial',
  templateUrl: './create-memorial.component.html',
  styleUrls: ['./create-memorial.component.css']
})
export class CreateMemorialComponent implements OnInit, OnDestroy {
  isLinear = false;
  existingRecords: MemorialRecord[];
  existingRecordsDocument: Observable<DocumentChangeAction<MemorialRecord>[]>;

  manziah: Manziah;
  munzah: Munzah;
  maxDate = null;
  countries: Country[];
  imageFileInBase64 = [];
  recordsSubscription: Subscription;
  munzahDataAssigned: boolean;
  chosenOneFromExistingRecords: DocumentChangeAction<MemorialRecord>;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private auth: AuthServices,
    private memorialRecordsService: MemorialRecordsService,
    private snackBar: MatSnackBar,
    private countriesService: CounriesService
     ) { }

  ngOnInit() {
    this.munzahDataAssigned = false;
    this.countries = this.countriesService
    .getCountries()
    .map(countryObject => {
      return {
        countryCode: countryObject['alpha-2'],
        countryName: countryObject['name']
      };
    });

    this.maxDate = new Date();
    this.maxDate.setHours(this.maxDate.getHours() - 1);
  }

  chooseFromExistingRecords(chosenRecord: any) {
    this.chosenOneFromExistingRecords = chosenRecord;
    this.munzahDataAssigned = true;
  }

  onNewRecord() {
    this.chosenOneFromExistingRecords = null;
    this.munzahDataAssigned = true;
  }

  checkIfRecordExist(form: NgForm) {
    this.existingRecordsDocument = this.memorialRecordsService.recordExists(form);
    this.existingRecordsDocument.subscribe(recordsSnapshot => {
      if (recordsSnapshot.length > 0) {
        this.munzahDataAssigned = false;
      } else {
        this.munzahDataAssigned = true;
      }
    });
  }

  onSubmitMunzah(form: NgForm) {
    this.checkIfRecordExist(form);

    if (form.valid && this.imageFileInBase64.length > 0) {
      this.munzah = {
        'givenName': form.value.given_name,
        'familyName': form.value.family_name,
        'birthDate': form.value.birth_date.toLocaleDateString('he-IL', { year: 'numeric', month: 'numeric', day: 'numeric' }),
        'deathDate': form.value.death_date.toLocaleDateString('he-IL', { year: 'numeric', month: 'numeric', day: 'numeric' }),
        'country': form.value.country,
        'photoUrl': this.imageFileInBase64.pop()
      };
      this.imageFileInBase64 = [];
    }
  }

  onSubmitManziah(form: NgForm) {
    // console.log('ONSUBMIT Manziah', form);
    if (form.valid && this.munzahDataAssigned && this.imageFileInBase64.length > 0) {
      // if (this.oldRecordFound = true)
      this.manziah = {
        'email': this.auth.getUserEmail() ? this.auth.getUserEmail() : this.auth.getUser().email,
        'givenName': form.value.given_name,
        // "familyName": "shushani",
        'familyName': form.value.family_name,
        'relationship': form.value.relationship,
        // "country": "israel",
        'country': form.value.country,
        // "photoUrl": "https://picsum.photos/600/400/?509"
        'photoUrl': this.imageFileInBase64.pop(),
        'memorialText': form.value.memorial_text
      };
      this.imageFileInBase64 = [];
    }
  }

  onSubmitFinalForm() {
    if (this.chosenOneFromExistingRecords) {
      if (this.munzah && this.manziah) {
        const tmpRecord = { ...this.chosenOneFromExistingRecords.payload.doc.data() };
        const pendingRecords = tmpRecord.pendingData ? tmpRecord.pendingData : [];

        const pendingData: PendingData = {
          manziah: this.manziah
        };

        pendingRecords.push(pendingData);
        // tmpRecord.pending_data = pendingRecords;

        this.memorialRecordsService.updateRecord(this.chosenOneFromExistingRecords, pendingRecords);
        this.dialog.open(FinishCreatingMemorialComponent);
        this.router.navigate(['']);
      } else {
        this.snackBar.open('please fill up the form correctly', null, {
          duration: 3000
        });
      }
    } else {
      if (this.munzah && this.manziah) {
        const memorialRecord: MemorialRecord = {
          'munzah': this.munzah,
          'manziah': this.manziah
        };
        // console.log('ONSUBMIT FinalForm', memorialRecord);
        this.memorialRecordsService.addRecordToDb(memorialRecord);
        this.dialog.open(FinishCreatingMemorialComponent);
        this.router.navigate(['']);
      } else {
        this.snackBar.open('please fill up the form correctly', null, {
          duration: 3000
        });
      }
    }
  }

  onStop() {
    const dialogRef = this.dialog.open(StopCreatingMemorialComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['']);
      }
    });
  }

  onUploadChange(evt: any) {
    this.imageFileInBase64 = [];
    const file = evt.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.imageFileInBase64.push('data:image/png;base64,' + btoa(e.target.result));
  }

  ngOnDestroy() {
    // this.recordsSubscription.unsubscribe();
  }

}
