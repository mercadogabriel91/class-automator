// function App(data: any) {
//   const { message } = data;
//   console.log("hello front");

//   return (
//     <>
//       <p>hello im a simple app</p>
//       <p>{message}</p>
//     </>
//   );
// }
import React from "react";
const App: React.FC<{}> = (data: any) => {
  const { message } = data;

  return (
    <>
      <p>hello im a simple app</p>
      <p>{message}</p>
    </>
  );
};

export default App;
