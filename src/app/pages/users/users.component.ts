import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  products!: any[];
  selectedProducts!: any;
  loading: boolean = false

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.loading = true;

    this.getUsers();

    this.products = [
      {
      id: '1001',
      code: 'f230fh0g3',
      name: 'Smart Watch Pro',
      description: 'Advanced fitness tracking watch',
      image: 'smart-watch.jpg',
      price: 199,
      category: 'Electronics',
      quantity: 15,
      inventoryStatus: 'INSTOCK',
      rating: 4,
      },
      {
      id: '1002',
      code: 'nd631m5p2',
      name: 'Running Shoes',
      description: 'Lightweight athletic shoes',
      image: 'running-shoes.jpg',
      price: 89,
      category: 'Sports',
      quantity: 32,
      inventoryStatus: 'INSTOCK',
      rating: 5,
      },
      {
      id: '1003',
      code: 'h214kl9r6',
      name: 'Wireless Headphones',
      description: 'Noise-canceling bluetooth headphones',
      image: 'headphones.jpg',
      price: 159,
      category: 'Electronics',
      quantity: 8,
      inventoryStatus: 'LOWSTOCK',
      rating: 4.5,
      },
    ];
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
    console.log(event);

    // this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event.data.name });
}

onRowUnselect(event: any) {
    // this.messageService.add({ severity: 'info', summary: 'Product Unselected', detail: event.data.name });
}
}
