import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatAgentWeatherPage } from './chat-agent-weather.page';

describe('ChatAgentWeatherPage', () => {
  let component: ChatAgentWeatherPage;
  let fixture: ComponentFixture<ChatAgentWeatherPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatAgentWeatherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
