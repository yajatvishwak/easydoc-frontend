import { useParams } from "react-router-dom";
import Nav from "./comps/Nav";

function Patient() {
  let { uid } = useParams();
  return (
    <>
      <section className="h-full  min-h-screen text-white bg-black">
        <div className="p-5 pt-10 flex h-screen flex-col mx-auto max-w-screen-lg">
          <Nav />
          <div className="my-10 mb-0">Patient Detail</div>
          <div className="flex flex-col mt-3">
            <div className="text-3xl font-bold">John Doe</div>
            <div className=" font-bold">123.123 :: 123123</div>
            <div className="mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Obcaecati vero dolorum, laudantium, aliquam cupiditate id debitis
              velit inventore aliquid rerum numquam enim assumenda eos non?
              Soluta in minima magni obcaecati!
            </div>
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
