import { TestBed } from '@angular/core/testing';

import { HubService } from './hub/hub.service';

describe('HubService', () => {
  let service: HubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
