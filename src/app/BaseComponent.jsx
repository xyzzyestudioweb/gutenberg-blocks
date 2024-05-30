import { BaseInput } from "./components/base/BaseInput";
import { BaseToggle } from "./components/base/BaseToggle";

export function BaseComponent( { attr, data, set, type = "text" } ) {

	switch( data.component ) {
		case "input":
			return <BaseInput attr={ attr } data={ data } set={ set } type={ type } />
        case "toggle":
            return <BaseToggle attr={ attr } data={ data } set={ set } />
		default:
			return <BaseInput attr={ attr } data={ data } set={ set } type={ type } />
	}

}