import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterngitComponent } from './interngit.component';

describe('InterngitComponent', () => {
  let component: InterngitComponent;
  let fixture: ComponentFixture<InterngitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterngitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterngitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
