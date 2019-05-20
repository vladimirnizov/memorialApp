import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowPictureComponent } from './show-picture/show-picture.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CreateMemorialComponent } from './create-memorial/create-memorial.component';
import { SearchMemorialComponent } from './search-memorial/search-memorial.component';
import { AuthGuard } from './auth/auth.guard';
import { DonationsComponent } from './footer/donations/donations.component';
import { AboutComponent } from './footer/about/about.component';
import { PendingRecordsComponent } from './pending-records/pending-records.component';

const routes: Routes = [
    { path: '', component: ShowPictureComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: LoginComponent},
    { path: 'gallery', component: GalleryComponent},
    { path: 'createMemorial', component: CreateMemorialComponent, canActivate: [AuthGuard] },
    { path: 'searchMemorial', component: SearchMemorialComponent},
    { path: 'donations', component: DonationsComponent},
    { path: 'about', component: AboutComponent},
    { path: '!!!', component: PendingRecordsComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}
