// @ts-nocheck
import { BiSearch } from "react-icons/bi";
import bgImage from "../assets/bg.svg";

const Hero = ({ searchTerm, searchTermChange }) => {
  return (
    <div className="relative w-full min-h-[300px]">
      <div className="absolute top-[50%] left-[50%] z-10 flex w-full max-w-[90%] translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-2 text-white md:max-w-[70%] text-center">
        <h1 className="text-xl font-semibold md:text-3xl lg:text-5xl">
          Download High Quality Images by creators
        </h1>
        <h4 className="md:mt-4 text-lg font-medium">
          Over 2.4 million+ stock Images by our talented community
        </h4>
        <div className="mt-2 md:mt-6 flex w-full items-center gap-1 rounded-md bg-white px-4 py-1 shadow-inner">
          <BiSearch className="text-neutral-500" size={24} />
          <input
            value={searchTerm}
            onChange={searchTermChange}
            type="text"
            className="w-full bg-transparent py-2 px-1 focus:outline-none text-black font-medium"
            placeholder="Search high resolution Images, categories, wallpapers"
          />
        </div>
      </div>
      <img
        src={bgImage}
        alt="bg"
        className="z-0 flex w-full min-h-[300px] items-center justify-center"
      />
    </div>
  );
};

export default Hero;
