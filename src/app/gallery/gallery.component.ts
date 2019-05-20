import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MemorialRecordsService } from '../services/memorial-records.service';
import { MemorialRecord } from '../models/memorial-record.model';

import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {
  itemsGallery: Observable<any[]>;
  // anotherGallery: any;
  // dataLoaded = false;

  constructor(
    private memorialRecordsService: MemorialRecordsService) { }

  ngOnInit() {
    this.itemsGallery = this.memorialRecordsService.getAllRecords()
      // .subscribe(memorialRecords => {
      //   memorialRecords.forEach((record: MemorialRecord) => {
      //     this.itemsGallery.push( 
      //       // new ImageItem(
      //       {
      //         src: record.munzah.photoUrl,
      //         thumb: record.munzah.photoUrl
      //       }
      //     // )
      //     )
      //   });
      //   this.dataLoaded = true;
      //   console.log(this.itemsGallery);
      // })
  }

}
