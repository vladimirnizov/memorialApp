import { NgtUniversalModule } from '@ng-toolkit/universal';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CreateMemorialComponent } from './create-memorial/create-memorial.component';
import { SearchMemorialComponent } from './search-memorial/search-memorial.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
// import { NgxGalleryModule } from 'ngx-gallery';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
// import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';

import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GallerizeModule } from '@ngx-gallery/gallerize';

import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { ShowPictureComponent } from './show-picture/show-picture.component';
import { AuthServices } from './auth/auth.service';
import { MemorialRecordsService } from './services/memorial-records.service';
import { StopCreatingMemorialComponent } from './create-memorial/stop-creating-memorial.component';
import { FinishCreatingMemorialComponent } from './create-memorial/finish-creating-memorial.component';
import { environment } from '../environments/environment.prod';
import { DonationsComponent } from './footer/donations/donations.component';
import { AboutComponent } from './footer/about/about.component';
import { FooterComponent } from './footer/footer/footer.component';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search-memorial/search-results/search-results.component';
import { CounriesService } from './services/counries.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ExisitnigRecordsComponent } from './create-memorial/exisitnig-records/exisitnig-records.component';
import { PendingRecordsComponent } from './pending-records/pending-records.component';
import { PendingRecordsService } from './services/pending-records.service';
import { ManziahComponent } from './manziah/manziah.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'ngx-angular-social-login';

export function getAuthServiceConfigs() {
    const config = new AuthServiceConfig(
        [
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('311085099513333')
            },
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider('435049251107-t06d0gg3l7998md3vflcuboiqpflrunb.apps.googleusercontent.com')
            },
        ]
    );
    return config;
}

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    GalleryComponent,
    CreateMemorialComponent,
    SearchMemorialComponent,
    HeaderComponent,
    SidenavListComponent,
    ShowPictureComponent,
    StopCreatingMemorialComponent,
    DonationsComponent,
    AboutComponent,
    FooterComponent,
    SearchResultsComponent,
    FinishCreatingMemorialComponent,
    LandingPageComponent,
    ExisitnigRecordsComponent,
    PendingRecordsComponent,
    ManziahComponent
  ],
  imports: [
    CommonModule,
    NgtUniversalModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    // NgxGalleryModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CommonModule,
    CarouselModule,
    GalleriaModule,
    FileUploadModule,
    GalleryModule.forRoot({imageSize: 'contain', autoPlay: true}),
    LightboxModule.forRoot(),
    GallerizeModule,
    SocialLoginModule
  ],
  providers: [
    AuthServices,
    MemorialRecordsService,
    PendingRecordsService,
    CounriesService,
      {
          provide: AuthServiceConfig,
          useFactory: getAuthServiceConfigs
      }
  ],
  entryComponents: [StopCreatingMemorialComponent, FinishCreatingMemorialComponent]
})


export class AppModule { }

