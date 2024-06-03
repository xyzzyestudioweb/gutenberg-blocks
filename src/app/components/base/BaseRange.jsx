import { __ } from '@wordpress/i18n';
import { RangeControl } from "@wordpress/components";

export function BaseRange ( { attr, data, set } ) {

    const handleOnChangeValue = ( val ) => {
		set( { [data.key]: val } );
	};

    let attributes = data.attributes
    let label = attributes.label ? attributes.label : "Range"

    return (
        <RangeControl
            label = { __( label, "gutenberg-blocks" ) }
            value = { attr }
            onChange = { handleOnChangeValue }
            min = { attributes.min ? attributes.min : 0 }
            max = { attributes.max ? attributes.max : 10 }
        />
    )
}