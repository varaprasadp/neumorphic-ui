import React from "react";
import "./App.css";
import Home from "./screens/Home";
export default function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

// import { useState } from "react";

// function App() {
//   // Declare a new state variable, which we'll call "count"
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>Click me</button>
//     </div>
//   );
// }
// export default App;
