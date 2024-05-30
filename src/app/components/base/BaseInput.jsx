import { __ } from '@wordpress/i18n';
import { TextControl } from "@wordpress/components";

export function BaseInput ( { attr, data, set, type } ) {

    const handleOnChangeValue = ( val ) => {
		set( { [data.key]: val } );
	};

    return (
        <TextControl
            label = { __( data.label, "gutenberg-blocks" ) }
            value = { attr }
            type = { type }
            onChange = { handleOnChangeValue }
        />
    )
}