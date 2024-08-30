import React, {Suspense} from "react";
const RemoteApp = React.lazy(() => import("app2/App"));

const App = () => {
  return (
    <div>
      <div>
        <h1>BSC Dasboard</h1>
      </div>
      <Suspense fallback={"loading..."}>
        <RemoteApp/>
      </Suspense>
    </div>)
}


export default App;
