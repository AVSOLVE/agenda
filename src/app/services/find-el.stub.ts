import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

export function findEl<T>(
  fixture: ComponentFixture<T>,
  testDataId: string
): DebugElement {
  return fixture.debugElement.query(By.css(`[data-testid=${testDataId}]`));
}

export function findElClass<T>(
  fixture: ComponentFixture<T>,
  dataClass: string
): DebugElement {
  return fixture.debugElement.query(By.css(`.${dataClass}`));
}

export function findAllElClass<T>(
  fixture: ComponentFixture<T>,
  dataAllClass: string
): DebugElement[] {
  return fixture.debugElement.queryAll(By.css(`.${dataAllClass}`));
}

export function findElId<T>(
  fixture: ComponentFixture<T>,
  dataId: string
): DebugElement {
  return fixture.debugElement.query(By.css(`#${dataId}`));
}

export function findAllElId<T>(
  fixture: ComponentFixture<T>,
  dataAllId: string
): DebugElement[] {
  return fixture.debugElement.queryAll(By.css(`#${dataAllId}`));
}
