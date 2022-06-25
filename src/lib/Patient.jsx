import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "./comps/Nav";

function Patient() {
  let { uid } = useParams();
  let [name, setName] = useState();
  let [med, setMed] = useState();
  useEffect(() => {
    axios.get("http://localhost:5000/getpatient/" + uid).then((res) => {
      setName(res.data.payload.username);
      setMed(res.data.payload.med);
    });
  }, []);
  return (
    <>
      <section className="h-full  min-h-screen text-white bg-black">
        <div className="p-5 pt-10 flex h-screen flex-col mx-auto max-w-screen-lg">
          <Nav />
          <div className="my-10 mb-0">Patient Detail</div>
          <div className="flex flex-col mt-3">
            <div className="text-3xl font-bold">{name}</div>
            <div className=" font-bold">Medical History</div>
            <div className="mt-4">{med}</div>
          </div>
          <div className="mt-auto p-2">
            <div className="p-3 bg-blue-500 text-white rounded-2xl text-center">
              Go back
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Patient;
