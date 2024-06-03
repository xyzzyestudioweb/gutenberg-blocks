import { BaseInput } from "./components/base/BaseInput";
import { BaseToggle } from "./components/base/BaseToggle";
import { BaseRange } from "./components/base/BaseRange";

export function BaseComponent( { attr, data, set } ) {

	switch( data.componentType ) {
		case "input":
			return <BaseInput attr={ attr } data={ data } set={ set }  />
        case "toggle":
            return <BaseToggle attr={ attr } data={ data } set={ set } />
		case "range":
			return <BaseRange attr={ attr } data={ data } set={ set } />
		default:
			return <BaseInput attr={ attr } data={ data } set={ set } />
	}

}