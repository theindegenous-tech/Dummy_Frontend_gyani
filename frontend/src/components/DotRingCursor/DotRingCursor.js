import "./DotRingCursor.css";
import useMousePosition from "../hooks/useMousePosition";

const DotRingCursor = () => {
    // 1.
  const { x, y } = useMousePosition();
  return (
    <>
            {/* 2. */}
      <div
        style={{ left: `${x}px`, top: `${y}px` ,zIndex:10000}}
        className="ring"
      ></div>
            {/* 3. */}
      <div
        className="dot"
        style={{ left: `${x}px`, top: `${y}px`,zIndex:10000 }}
      ></div>
    </>
  );
};

export default DotRingCursor;