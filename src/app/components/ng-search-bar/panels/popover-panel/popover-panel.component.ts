import { Component, ViewChild } from '@angular/core';
import { BasePanel } from '../base-panel';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-popover-panel',
	templateUrl: './popover-panel.component.html',
	styleUrls: ['./popover-panel.component.scss'],
})
export class PopoverPanelComponent extends BasePanel {
	@ViewChild('dropdownHandle')
	public dropdownHandle!: NgbDropdown;
	public onSearchButtonClicked(): void {
		if (
			this.dropdownHandle &&
			this.filterUnit.closePopoverAfterFilterApplied
		) {
			this.dropdownHandle.close();
		}

		this.filterUnit.onSearchButtonClicked();
	}
}
