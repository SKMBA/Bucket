import shimmer from "./../css/shimmer.css";

const ShimmerNoAnimate = ({ message }) => {
  return (
    <div className="shimmer-no-animate">
      <div>{message}</div>
    </div>
  );
};
export default ShimmerNoAnimate;
