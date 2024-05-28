export default function BaseComponent( props ) {
    
    let type = props.input

    return (
        <h1>{type}</h1>
    )
}