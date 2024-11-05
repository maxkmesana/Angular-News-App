import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNewsPageComponent } from './my-news-page.component';

describe('MyNewsPageComponent', () => {
  let component: MyNewsPageComponent;
  let fixture: ComponentFixture<MyNewsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyNewsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyNewsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
