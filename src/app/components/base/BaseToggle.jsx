import { __ } from '@wordpress/i18n';
import { ToggleControl } from "@wordpress/components";

export function BaseToggle ( { attr, data, set } ) {

    const handleOnChangeValue = ( val ) => {
		set( { [data.key]: val } );
	};

    return (
        <ToggleControl
            label = { __( data.label, "gutenberg-blocks" ) }
            checked = { attr }
            help = { attr ? __( "Has " + data.label, "gutenberg-blocks" ) : __( "Not " + data.label, "gutenberg-blocks" ) }
            onChange = { handleOnChangeValue }
        />
    )
}