import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.css']
})
export class PagingHeaderComponent implements OnInit {

  @Input() pageSize;
  @Input() pageNumber;
  @Input() totalProductCount;

  constructor() { }

  ngOnInit(): void {
  }

}
