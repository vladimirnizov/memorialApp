import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthServices } from '../../auth/auth.service';
import { PendingRecordsService } from '../../services/pending-records.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;
  pendingExists = false;

  constructor(private authService: AuthServices, private pendingRecordsService: PendingRecordsService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;

      this.pendingRecordsService.getRecordsWithPendings()
      .subscribe(recordsWithPending => {
        for  (let concreteRecordWithPending of recordsWithPending) {
          if (concreteRecordWithPending && concreteRecordWithPending.payload.doc.data().pendingData.length > 0) {
            this.pendingExists = true;
            return;
          }
        } 
      })
    })
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
    this.pendingExists = false;
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
