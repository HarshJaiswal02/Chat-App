import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../public/bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-screen max-w-screen flex justify-center items-center"
      >
        {/* <Login />  */}
        {/* <Signup /> */}
        <Home />
      </div>
    </>
  );
}

export default App;
