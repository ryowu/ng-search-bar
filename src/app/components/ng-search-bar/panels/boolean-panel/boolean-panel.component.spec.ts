import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanPanelComponent } from './boolean-panel.component';

describe('BooleanPanelComponent', () => {
	let component: BooleanPanelComponent;
	let fixture: ComponentFixture<BooleanPanelComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BooleanPanelComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(BooleanPanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
