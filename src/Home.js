import React from "react";
// import {AppContext} from './context'
// import {useGlobalContext} from './context'
import Movies from "./Movies";
import Search from "./Search";

function Home() {
  // const name=useContext(AppContext)
  // const name=useGlobalContext
  return (
    <div>
      <h1>Home</h1>
      <Search />
      <Movies />

      {/* <h2>hello {name}</h2> */}
    </div>
  );
}
export default Home;
