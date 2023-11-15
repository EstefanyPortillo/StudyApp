import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MessageComponentModule } from '../message/message.module';

import { ListTopicPage } from './list-topic.page';

describe('ListTopicPage', () => {
  let component: ListTopicPage;
  let fixture: ComponentFixture<ListTopicPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTopicPage],
      imports: [IonicModule.forRoot(), MessageComponentModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ListTopicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
