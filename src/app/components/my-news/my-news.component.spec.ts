import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNewsComponent } from './my-news.component';

describe('MyNewsComponent', () => {
  let component: MyNewsComponent;
  let fixture: ComponentFixture<MyNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
