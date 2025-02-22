import { Component } from '@angular/core';

@Component({
  selector: 'skeleton-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  products: any[] = [];

  ngOnInit() {
      this.products = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
  }

}
