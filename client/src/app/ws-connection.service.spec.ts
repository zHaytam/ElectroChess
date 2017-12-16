import { TestBed, inject } from '@angular/core/testing';

import { WsConnectionService } from './ws-connection.service';

describe('WsConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsConnectionService]
    });
  });

  it('should be created', inject([WsConnectionService], (service: WsConnectionService) => {
    expect(service).toBeTruthy();
  }));
});
