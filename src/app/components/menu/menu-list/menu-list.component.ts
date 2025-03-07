import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'menu-list',
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.scss',
})
export class MenuListComponent implements OnInit {

  products: any[] = []
  loading: boolean = false;
  responsiveOptions: any[] | undefined;
  searchText: string = '';
  filteredProducts : any[]  = [];
  constructor(
    private menuService: MenuService,
    private cartService: CartService

  ){}

  ngOnInit(): void {
    this.loading = true
    this.responsiveOptions = [
      {
        breakpoint: '1100px',
        numVisible: 4,
        numScroll: 4,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '450px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.getMenus();
  }

  getMenus(){
    this.menuService.getMenus().subscribe((menus) => {

      this.products = menus;
      this.loading = false
      this.filteredProducts = menus

    });
  }

  private filterTimeout: any;


  filterProducts() {
    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }

    this.filterTimeout = setTimeout(() => {
      this.filteredProducts = this.products?.filter(product =>
        product.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        product.descripcion.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }, 100); // Espera 300ms antes de filtrar
  }


  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
    return 'info';
  }

  addToCart(product: any){
    this.cartService.addToCart(product);
  }
}
