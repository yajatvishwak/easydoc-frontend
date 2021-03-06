import Nav from "./comps/Nav";
import { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import axios from "axios";
function PatientHome() {
  const [lat, setLat] = useState("");
  const [log, setLog] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [med, setMed] = useState(false);
  const toggleDrawer = (uid) => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude.toFixed(2));
      setLog(pos.coords.longitude.toFixed(2));
    });
    axios
      .get("http://localhost:5000/getpatient/" + localStorage.getItem("uid"))
      .then((res) => {
        setMed(res.data.payload.username);
      });
  }, []);

  return (
    <>
      {" "}
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="bottom"
        className="p-5 h-[1000px]"
      >
        <div className="h-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              axios
                .post("http://localhost:5000/updatemed", {
                  uid: localStorage.getItem("uid"),
                  med: med,
                })
                .then((res) => {
                  if (res.data.message === "ok") alert("Done");
                });
            }}
            className="flex flex-col gap-4 h-full"
          >
            <div className="">Enter Medical Emergency Information: </div>
            <textarea
              type="text"
              value={med}
              onChange={(e) => setMed(e.target.value)}
              placeholder=""
              className=" p-4 rounded-xl w-full border"
            />
            <button
              type="submit"
              onClick={() => {}}
              className="p-3 mt-auto bg-blue-500 text-white rounded-2xl  text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </Drawer>
      <section className="h-full  min-h-screen text-white bg-black">
        <div className="p-5 pt-10 flex h-screen flex-col mx-auto max-w-screen-lg">
          <Nav />

          <div className="mt-10 text-2xl max-w-xs">
            Welcome Username who is a patient
          </div>

          <div className="grid gap-4 h-full p-2 mt-5">
            <div
              onClick={async () => {
                const { data } = await axios.post(
                  "http://localhost:5000/createEmergency",
                  { uid: localStorage.getItem("uid"), cord: `${lat}::${log}` }
                );
                if (data.message === "ok") alert("raised");
              }}
              className="p-3 h-full  flex justify-center items-center bg-red-500 text-white rounded-2xl text-center"
            >
              Raise Emergency Request
            </div>
            <div
              onClick={toggleDrawer}
              className="p-3  h-full flex justify-center items-center bg-blue-500 text-white rounded-2xl text-center"
            >
              Edit Data
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PatientHome;
