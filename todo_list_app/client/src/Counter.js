import {useState} from "react";
import {Button} from "react-bootstrap";

export default function Counter() {
    // state: a counter value
    const [counter, setCounter] = useState(0);

    // action: code causing update to state when some event happens
    const increment = () => {
        setCounter(prevState => prevState + 1);
    }

    return (
        <div>
            Value: {counter}
            <Button onClick={increment} as="switch">Increment</Button>
        </div>
    );

}