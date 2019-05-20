import { Component } from '@angular/core';

@Component({
    selector: 'app-finish-creating-memorial',
    template: `<h1 mat-dialog-title> Your memorial was sucessfully created!</h1>
               <mat-dialog-actions>
               <button mat-button [mat-dialog-close]="true">Finish</button>
               </mat-dialog-actions>`
})
export class FinishCreatingMemorialComponent {

}