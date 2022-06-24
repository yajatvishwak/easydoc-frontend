import Nav from "./comps/Nav";
import { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import EmergencyCard from "./comps/EmergencyCard";
import axios from "axios";

function Home() {
  const [lat, setLat] = useState("");
  const [log, setLog] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenQR, setIsOpenQR] = useState(false);
  const [selectedUID, setSelectedUID] = useState("");
  const [selected, setSelected] = useState({});
  const [emergencies, setEmergencies] = useState([
    { uid: "1", name: "bro11", cord: "12.34::12.123", respname: "bru" },
    { uid: "11", name: "bro", cord: "12.34::12.123" },
    { uid: "11", name: "bro", cord: "12.34::12.123" },
  ]);
  useEffect(() => {
    console.log("bru");
    let data = emergencies.filter((item) => {
      if (item.uid === selectedUID) return item;
    })[0];
    console.log(data);
    setSelected(data);
  }, [selectedUID]);

  const toggleDrawer = (uid) => {
    setSelectedUID(uid);
    setIsOpen((prevState) => !prevState);
  };
  const toggleDrawerQR = () => {
    setIsOpenQR((prevState) => !prevState);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude.toFixed(2));
      setLog(pos.coords.longitude.toFixed(2));
    });
    axios.get("http://localhost:5000/getEmergencies").then((res) => {
      setEmergencies(res.data.payload);
    });
  }, []);
  return (
    <>
      {selected && (
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="bottom"
          className="p-5"
        >
          <div className=" flex flex-col h-full">
            <div className="text-3xl ">{selected.name}</div>
            <div className="flex mt-3 gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>{selected.cord}</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <div className="flex gap-3 mt-auto w-full">
              <div
                onClick={() => {
                  console.log("bru");
                  window.location.href = "/patient/" + selected.uid;
                }}
                className="mt-auto bg-blue-700 text-white p-4 flex-1 rounded-2xl text-center"
              >
                View Profile
              </div>
              <div
                onClick={() => {
                  axios
                    .post("http://localhost:5000/respond", {
                      respid: localStorage.getItem("uid"),
                      eid: selected.eid,
                    })
                    .then((res) => {
                      console.log(res.data);
                    });
                }}
                className="mt-auto bg-blue-700 text-white p-4 flex-1 rounded-2xl text-center"
              >
                Respond
              </div>
            </div>
          </div>
        </Drawer>
      )}

      <Drawer
        open={isOpenQR}
        onClose={toggleDrawerQR}
        direction="bottom"
        className="p-5"
      >
        <div className="h-full">
          <form className="flex flex-col gap-4 h-full">
            <div className="text-2xl ">Enter Quick Access Number:</div>
            <input
              type="text"
              placeholder=""
              className="text-2xl  uppercase p-4 rounded-xl border"
            />
            <div
              onClick={() => {}}
              className="p-3 mt-auto bg-blue-500 text-white rounded-2xl text-center"
            >
              Submit
            </div>
          </form>
        </div>
      </Drawer>

      <section className="h-full  min-h-screen text-white bg-black">
        <div className="p-5 pt-10 flex h-screen flex-col mx-auto max-w-screen-lg">
          <Nav />

          <div className="mt-10 text-2xl max-w-xs">
            Top of the morning paramedic
          </div>
          <div className="mt-2 text-xl opacity-40 max-w-xs">
            Your coords: {lat}::{log}
          </div>

          <div className="mt-5 overflow-auto p-2  ">
            <div>Emergency Requests</div>
            <div className="grid mt-3 gap-3">
              {emergencies.map((item) => {
                return (
                  <EmergencyCard
                    item={item}
                    toggleDrawer={toggleDrawer}
                  ></EmergencyCard>
                );
              })}
            </div>
          </div>

          <div className="mt-auto p-2">
            <div
              onClick={toggleDrawerQR}
              className="p-3 bg-blue-500 text-white rounded-2xl text-center"
            >
              Access Data
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
