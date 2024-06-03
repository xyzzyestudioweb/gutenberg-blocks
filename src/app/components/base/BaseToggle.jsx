import { __ } from '@wordpress/i18n';
import { ToggleControl } from "@wordpress/components";

export function BaseToggle ( { attr, data, set } ) {

    const handleOnChangeValue = ( val ) => {
		set( { [data.key]: val } );
	};

    let attributes = data.attributes
    let label = attributes.label ? attributes.label : "Toggle"

    return (
        <ToggleControl
            label = { __( label, "gutenberg-blocks" ) }
            checked = { attr }
            help = { attr ? __( "Has " + label, "gutenberg-blocks" ) : __( "Not " + label, "gutenberg-blocks" ) }
            onChange = { handleOnChangeValue }
        />
    )
}