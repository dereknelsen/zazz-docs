export default function SelectDefault() {
  return (
    <select className="select" defaultValue="">
      <button>
        <selectedcontent></selectedcontent>
      </button>
      <option value="" disabled>
        Select one…
      </option>
      <option value="first">First choice</option>
      <option value="second">Second choice</option>
      <option value="third">Third choice</option>
    </select>
  );
}
