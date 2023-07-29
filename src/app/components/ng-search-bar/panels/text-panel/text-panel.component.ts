import { Component } from '@angular/core';
import { BasePanel } from '../base-panel';

@Component({
	selector: 'app-text-panel',
	templateUrl: './text-panel.component.html',
	styleUrls: ['./text-panel.component.scss'],
})
export class TextPanelComponent extends BasePanel {}
