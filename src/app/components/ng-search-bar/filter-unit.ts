import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
	BooleanSearchField,
	SearchField,
	SearchFieldType,
	TextSearchField,
} from './types';
import { Subject, Subscription } from 'rxjs';

export class FilterUnit {
	//#region Members
	private sub: Subscription;
	private _field: SearchField;
	private _caption: string;
	private readonly fb: FormBuilder = new FormBuilder();
	private _dataForm: FormGroup = this.fb.group({});

	private currentChipButtonClass = '';

	public autoEmitChange = false;
	public $actionSource: Subject<void> = new Subject<void>();
	//#endregion

	constructor() {
		this.sub = new Subscription();
		this._field = { name: '', type: SearchFieldType.String };
		this._caption = '';
		this.currentChipButtonClass =
			this._field.css?.buttonChip?.default || 'btn btn-primary';
	}

	//#region Get/Set
	private get isDirty(): boolean {
		if (this._field.type === SearchFieldType.String) {
			const textValue = this._dataForm.get('textValue')?.value;
			return textValue && textValue.trim() !== '';
		} else {
			return this._dataForm.dirty;
		}
	}

	public get dataForm(): FormGroup {
		return this._dataForm;
	}

	public get fieldCaption(): string {
		if (this.autoEmitChange) {
			const caption = this._field.caption || 'Field';
			if (!this.isDirty) return caption;

			return this.getRawCaption();
		} else {
			return this._caption;
		}
	}

	public get textPlaceholder(): string {
		const caption = this._field.caption || 'Field';
		return `Enter ${caption}`;
	}

	public get filterButtonClass(): string {
		if (this.autoEmitChange) {
			return this.isDirty
				? this._field.css?.buttonChip?.dirty || 'btn btn-warning'
				: this._field.css?.buttonChip?.default || 'btn btn-primary';
		} else {
			return this.currentChipButtonClass;
		}
	}

	public get isStringType(): boolean {
		return this._field.type === SearchFieldType.String;
	}

	public get isBooleanType(): boolean {
		return this._field.type === SearchFieldType.Boolean;
	}

	public set filterField(value: SearchField) {
		this._field = value;
		this._caption = value.caption || '';
		this.buildFilterDataForm();
	}
	//#endregion

	private getRawCaption(): string {
		const caption = this._field.caption || 'Field';
		if (this._field.type === SearchFieldType.String) {
			const textValue = this._dataForm.get('textValue')?.value;
			return textValue ? `${caption} : ${textValue}` : caption;
		} else {
			return caption;
		}
	}

	private buildFilterDataForm() {
		const formGroupConfig: { [key: string]: FormControl } = {};
		switch (this._field.type) {
			case SearchFieldType.String: {
				const textField: TextSearchField = this
					._field as TextSearchField;
				formGroupConfig['textValue'] = new FormControl();
				formGroupConfig['isCaseSensitive'] = new FormControl(
					textField.isCaseSensitive
				);
				break;
			}
			case SearchFieldType.Boolean: {
				const booleanField: BooleanSearchField = this
					._field as BooleanSearchField;
				formGroupConfig['checked'] = new FormControl(
					booleanField.checked
				);
				break;
			}
		}

		this._dataForm = this.fb.group(formGroupConfig);

		if (this.sub) {
			this.sub.unsubscribe();
		}

		this.sub = this._dataForm.valueChanges.subscribe((data) => {
			if (this._field.type === SearchFieldType.String) {
				if (data.textValue && this.autoEmitChange) {
					this.$actionSource.next();
				}
			} else if (this._field.type === SearchFieldType.Boolean) {
				this.$actionSource.next();
			}
		});
	}

	public dispose(): void {
		if (this.sub) {
			this.sub.unsubscribe();
		}

		this.$actionSource.complete();
	}

	public getFilterResultObject(): any {
		let result: any;

		if (this._field.type === SearchFieldType.Boolean) {
			result = {};
			result[this._field.name] = {
				equalTo: this._dataForm.get('checked')?.value,
			};
		} else if (this.isDirty) {
			if (this._field.type === SearchFieldType.String) {
				const textField: TextSearchField = this
					._field as TextSearchField;
				const filterProperty: any = {};
				filterProperty[textField.name] = this._dataForm.get(
					'isCaseSensitive'
				)?.value
					? {
							includesSensitive:
								this._dataForm.get('textValue')?.value,
					  }
					: {
							includes: this._dataForm.get('textValue')?.value,
					  };

				result = filterProperty;
			}
		}

		return result;
	}

	public onReset(): void {
		this._dataForm.reset();
		this.currentChipButtonClass =
			this._field.css?.buttonChip?.default || 'btn btn-primary';
		this._caption = this._field.caption || '';
	}

	public onSearchButtonClicked(): void {
		this.currentChipButtonClass = this.isDirty
			? this._field.css?.buttonChip?.dirty || 'btn btn-warning'
			: this._field.css?.buttonChip?.default || 'btn btn-primary';

		this._caption = this.getRawCaption();
		this.$actionSource.next();
	}
}
