import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDealerComponent } from './home-dealer.component';

describe('HomeDealerComponent', () => {
  let component: HomeDealerComponent;
  let fixture: ComponentFixture<HomeDealerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDealerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
