import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  products!: any[];
  selectedProducts!: any;
  loading: boolean = false

  constructor(private userService: UsersService, private messageService: MessageService) {}

  ngOnInit() {
    this.loading = true;

    this.getUsers();


  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (response: any) => {
        setTimeout(() => {
        this.products = response;
          this.loading = false
        }, 3000);
      },
      (error: Error) => {
        console.error(error);

      }
    );
  }

  onRowSelect(event: any) {
    this.selectedProducts.push(event)

    // this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name });
}

onRowUnselect(event: any) {
    // this.messageService.add({ severity: 'info', summary: 'Product Unselected', detail: event.data.name });
}
}
