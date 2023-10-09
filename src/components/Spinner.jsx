import Loader from "../assets/gradient-loader.png";

export const Spinner = () => {
  return (
    <div role="alertdialog" aria-label="Loading">
      <img src={Loader} alt="Loader" className="animate-spin"></img>
    </div>
  );
};
