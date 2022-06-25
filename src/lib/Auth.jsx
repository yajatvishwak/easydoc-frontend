import axios from "axios";
import { useState } from "react";

function Auth() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [type, setType] = useState("");
  const [mode, setMode] = useState("login");

  return (
    <section className="h-full   min-h-screen text-white bg-black">
      {mode === "login" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post("http://localhost:5000/login", {
                username: username,
                password: pass,
              })
              .then((res) => {
                if (res.data.message === "ok") {
                  localStorage.setItem("uid", req.data.uid);
                  localStorage.setItem("mode", req.data.usertype);
                  localStorage.setItem("username", username);
                  if (res.data.usertype === "para") window.location.href = "/";
                  else window.location.href = "/phome";
                }
              });
          }}
          className="p-10 flex flex-col justify-end h-screen "
        >
          <div className="my-5">
            <div className="text-3xl font-bold">Easy Doc</div>
            <div className="opacity-50">Tits are great</div>
          </div>
          <div className="flex flex-col gap-3 ">
            <label htmlFor=".">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 text-black rounded-xl outline-none"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="flex flex-col gap-3 mt-7">
            <label htmlFor=".">Password</label>
            <input
              onChange={(e) => setPass(e.target.value)}
              className="p-3 text-black rounded-xl outline-none"
              type="text"
              placeholder="Username"
            />
          </div>
          <div onClick={() => setMode("signup")} className="mt-5">
            Signup instead?
          </div>
          <div>
            <button
              className="p-3 rounded-full w-full bg-blue-600 mt-10"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      )}
      {mode === "signup" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post("http://localhost:5000/signup", {
                username: username,
                password: pass,
                usertype: type,
              })
              .then((res) => {
                if (res.data.message === "ok") {
                  localStorage.setItem("uid", res.data.uid);
                  localStorage.setItem("mode", res.data.usertype);
                  localStorage.setItem("username", username);
                  if (res.data.usertype === "para") {
                    console.log(res.data);
                    window.location.href = "/";
                  } else window.location.href = "/phome";
                }
              });
          }}
          className="p-10 flex flex-col justify-end h-screen "
        >
          <div className="my-5">
            <div className="text-3xl font-bold">Easy Doc</div>
            <div className="opacity-50">Tits are great</div>
          </div>
          <div className="flex flex-col gap-3 ">
            <label htmlFor=".">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 text-black rounded-xl outline-none"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="flex flex-col gap-3 mt-7">
            <label htmlFor=".">Type</label>
            <input
              onChange={(e) => setType(e.target.value)}
              className="p-3 text-black rounded-xl outline-none"
              type="text"
              placeholder="Type(para/patient)"
            />
          </div>
          <div className="flex flex-col gap-3 mt-7">
            <label htmlFor=".">Password</label>
            <input
              onChange={(e) => setPass(e.target.value)}
              className="p-3 text-black rounded-xl outline-none"
              type="text"
              placeholder="Username"
            />
          </div>
          <div onClick={() => setMode("signup")} className="mt-5">
            Signin instead?
          </div>
          <div>
            <button
              className="p-3 rounded-full w-full bg-blue-600 mt-10"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

export default Auth;
