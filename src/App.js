import logo from "./logo.svg";
import "./App.css";
import FirstApp from "./First_app";
import IntractiveLive from "./IntractiveLive";
import Newprogram from "./NewProgram";
import NewCheckTest from "./NewCheckTest";
function App() {
  const appId = "b1010079b6b941c48ef2897e61cd4277";
  const token =
    "007eJxTYJgzj+l6hcqlF849YeceLe8WmHTxQPBVN8elt4/NusO3KeSEAkOSoYGhgYG5ZZJZkqWJYbKJRWqakYWleaqZYXKKiZG5+c0305IbAhkZpN5vYmRkgEAQn4UhL7W8nIEBAAYsIkk=";
  const channele = "neww";
  return (
    <div className="App">
      <FirstApp appId={appId} token={token} channele={channele}/>
    </div>
  );
}

export default App;
