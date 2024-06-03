import { __ } from '@wordpress/i18n';
import { TextControl } from "@wordpress/components";

export function BaseInput ( { attr, data, set } ) {

    const handleOnChangeValue = ( val ) => {
		set( { [data.key]: val } );
	};

    let attributes = data.attributes

    return (
        <TextControl
            label = { attributes.label ? __( attributes.label, "gutenberg-blocks" ) : __( "Text control", "gutenberg-blocks" ) }
            value = { attr }
            type = { attributes.type ? attributes.type : "text" }
            onChange = { handleOnChangeValue }
        />
    )
}