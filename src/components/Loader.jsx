// @ts-nocheck
import loader from "../assets/loader.svg";

const Loader = () => {
  return (
    <div className="flex w-full items-center justify-center py-16">
      <div className="flex w-full animate-pulse flex-col items-center">
        <img src={loader} alt="loader" className="w-[80%] md:w-1/2 lg:w-1/4" />
        <h1 className="z-50 -mt-10 max-w-sm text-center font-montserrat text-2xl font-extrabold text-neutral-400">
          Loading some awesome Images...
        </h1>
      </div>
    </div>
  );
};

export default Loader;
