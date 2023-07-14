import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SearchField, SearchFieldType, TextSearchField } from './types';

export class FilterUnit {
	//#region Members
	private _field: SearchField;
	private _caption: string;
	private readonly fb: FormBuilder = new FormBuilder();
	private _dataForm: FormGroup = this.fb.group({});

	private currentChipButtonClass = '';

	public autoEmitChange = false;
	//#endregion

	constructor() {
		this._field = { name: '', type: SearchFieldType.string };
		this._caption = '';
		this.currentChipButtonClass =
			this._field.css?.buttonChip?.default || 'btn btn-primary';
	}

	//#region Get/Set
	private get isDirty(): boolean {
		if (this._field.type === SearchFieldType.string) {
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
		return this._field.type === SearchFieldType.string;
	}

	public set filterField(value: SearchField) {
		this._field = value;
		this._caption = value.caption || '';
		this.buildFilterDataForm();
	}
	//#endregion

	private getRawCaption(): string {
		const caption = this._field.caption || 'Field';
		if (this._field.type === SearchFieldType.string) {
			const textValue = this._dataForm.get('textValue')?.value;
			return textValue ? `${caption} : ${textValue}` : caption;
		} else {
			return caption;
		}
	}

	private buildFilterDataForm() {
		const formGroupConfig: { [key: string]: FormControl } = {};
		switch (this._field.type) {
			case SearchFieldType.string: {
				const textField: TextSearchField = this
					._field as TextSearchField;
				formGroupConfig['textValue'] = new FormControl();
				formGroupConfig['isCaseSensitive'] = new FormControl(
					textField.isCaseSensitive
				);
				break;
			}
		}

		this._dataForm = this.fb.group(formGroupConfig);
	}

	public getFilterResultObject(): any {
		let result: any;
		if (this.isDirty) {
			if (this._field.type === SearchFieldType.string) {
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

	public onSearch(): void {
		this.currentChipButtonClass = this.isDirty
			? this._field.css?.buttonChip?.dirty || 'btn btn-warning'
			: this._field.css?.buttonChip?.default || 'btn btn-primary';

		this._caption = this.getRawCaption();
	}
}
