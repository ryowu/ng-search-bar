import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterUnit } from '../../filter-unit';

@Component({
	selector: 'app-popover-panel',
	templateUrl: './popover-panel.component.html',
	styleUrls: ['./popover-panel.component.scss'],
})
export class PopoverPanelComponent {
	@Input() public filterUnit: FilterUnit = new FilterUnit();
	@Input() public identifier: number = 0;

	public onSearchButtonClicked(): void {
		this.filterUnit.onSearchButtonClicked();
	}
}
