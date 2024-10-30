import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorComponent } from './editor.component';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorComponent],
      providers: [
        { provide: DynamicDialogRef, useValue: {} },
        { provide: DynamicDialogConfig, useValue: {} }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});