function Nav() {
  return (
    <div className="flex justify-between w-full">
      <div>Easy Doc</div>
      <div>{localStorage.getItem("mode")}</div>
    </div>
  );
}

export default Nav;
