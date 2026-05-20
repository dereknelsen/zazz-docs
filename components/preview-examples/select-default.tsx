export default function SelectDefault() {
  return (
    <select className="select" defaultValue="">
      <option value="" disabled>
        Select one…
      </option>
      <option value="first">First choice</option>
      <option value="second">Second choice</option>
      <option value="third">Third choice</option>
    </select>
  );
}
