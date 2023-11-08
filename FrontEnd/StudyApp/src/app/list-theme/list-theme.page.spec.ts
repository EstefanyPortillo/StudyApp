import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MessageComponentModule } from '../message/message.module';

import { ListThemePage } from './list-theme.page';

describe('ListThemePage', () => {
  let component: ListThemePage;
  let fixture: ComponentFixture<ListThemePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListThemePage],
      imports: [IonicModule.forRoot(), MessageComponentModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ListThemePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
