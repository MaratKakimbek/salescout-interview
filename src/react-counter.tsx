// Implement a Counter component with two buttons:
// “Increase” and “Decrease”, which displays the current counter value.
import React from 'react';


function Counter() {
    const [count, setCount] = React.useState(0);

    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={() => setCount(count + 1)}>Increase</button>
            <button onClick={() => setCount(count - 1)}>Decrease</button>
        </div>
    );
}

export default Counter;
