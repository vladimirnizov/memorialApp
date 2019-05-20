import { Component, OnInit, Input } from '@angular/core';

import { MemorialRecord } from '../../models/memorial-record.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input('MemorialRecord')
  memorialRecord: MemorialRecord;
 
  constructor() { }

  ngOnInit() {
  }
}
