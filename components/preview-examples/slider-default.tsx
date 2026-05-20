export default function SliderDefault() {
  return (
    <input
      type="range"
      min={0}
      max={100}
      defaultValue={50}
      aria-label="Volume"
      style={{ maxWidth: "20rem" }}
    />
  );
}
