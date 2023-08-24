/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MainServiceService } from './MainService.service';

describe('Service: MainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainServiceService]
    });
  });

  it('should ...', inject([MainServiceService], (service: MainServiceService) => {
    expect(service).toBeTruthy();
  }));
});
