function EmergencyCard(props) {
  return (
    <div
      onClick={() => {
        props.toggleDrawer(props.item.uid);
      }}
      className="bg-blue-300  text-black p-5 rounded-2xl "
    >
      <div className="text-blue-800 font-bold">{props.item.name}</div>
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
        <div>{props.item.cord}</div>
      </div>

      <div className="mt-3">
        {props.item.respname
          ? props.item.respname + " is responding to this request"
          : ""}{" "}
      </div>
    </div>
  );
}

export default EmergencyCard;
