import { Component, Input } from '@angular/core';
import { FilterUnit } from '../filter-unit';

@Component({
	selector: 'app-base-panel',
	template: '',
})
export class BasePanel {
	@Input() public filterUnit: FilterUnit = new FilterUnit();
	@Input() public identifier: number = 0;
}
