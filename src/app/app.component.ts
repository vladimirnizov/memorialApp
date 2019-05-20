import { isPlatformBrowser , DOCUMENT} from '@angular/common';
import { environment } from '../environments/environment.prod';
import { Component , OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { AuthServices } from './auth/auth.service';
import { isDefaultChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject(DOCUMENT) private document: any) {}

    public ngOnInit(): void {
        if (!isPlatformBrowser(this.platformId)) {
            let bases = this.document.getElementsByTagName('base');
    
            if (bases.length > 0) {
                bases[0].setAttribute('href', environment.baseHref);
            }
        }
    }
}


