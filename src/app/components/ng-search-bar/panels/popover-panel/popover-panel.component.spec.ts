import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverPanelComponent } from './popover-panel.component';

describe('PopoverPanelComponent', () => {
	let component: PopoverPanelComponent;
	let fixture: ComponentFixture<PopoverPanelComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PopoverPanelComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(PopoverPanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
