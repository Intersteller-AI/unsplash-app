// @ts-nocheck
import { ModalClose, Sheet } from "@mui/joy";
import { Modal } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getOne } from "../services/unsplash.service";
import { useEffect, useState } from "react";
import { formatNumber } from "../utils/format";
import { BsInstagram } from "react-icons/bs";
import { FiTwitter } from "react-icons/fi";
import { BiLike } from "react-icons/bi";
import { AiOutlineShareAlt, AiOutlineInfoCircle } from "react-icons/ai";

const DetailsModal = ({ modalOpen, setModalOpen, imageId, setImageId }) => {
  const [numToShow, setNumToShow] = useState(4);

  const handleModalClose = () => {
    setImageId("");
    setModalOpen(false);
  };

  const { data, refetch } = useQuery({
    enabled: false,
    refetchOnWindowFocus: false,
    queryFn: () => getOne(imageId),
    queryKey: [""],
  });

  useEffect(() => {
    refetch();
  }, [imageId, refetch]);

  // console.log(data);

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={modalOpen}
      onClose={handleModalClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sheet
        sx={{
          backgroundColor: "transparent",
          boxShadow: "lg",
          border: "none",
          outline: "none",
        }}
      >
        <ModalClose
          onClick={handleModalClose}
          variant="outlined"
          sx={{
            bgcolor: "background.surface",
            borderRadius: "50%",
            position: "absolute",
            left: "98%",
            top: "-2%",
          }}
        />
        <div className="overflow-hidden rounded-xl bg-white w-[90vw] md:w-[80vw] h-[90vh] lg:w-[70vw]">
          <div className="relative h-[65%] w-full overflow-hidden bg-white">
            <img
              src={data?.urls?.full}
              alt={data?.user?.name}
              className="h-full w-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 flex w-full items-center justify-between px-6 py-2">
              <div className="flex md:flex-row flex-col items-center gap-4">
                <button className="hidden md:flex items-center gap-1 rounded-md border-2 border-white px-2 py-1 font-montserrat text-sm font-semibold text-white mix-blend-difference">
                  <AiOutlineShareAlt size={16} />
                  Share
                </button>
                <button className="flex items-center gap-1 rounded-md border-2 border-white px-2 py-1 font-montserrat text-sm font-semibold text-white mix-blend-difference">
                  <AiOutlineInfoCircle size={16} />
                  Info
                </button>
              </div>
              <button className="rounded-md whitespace-nowrap bg-[#3CB46E] text-sm px-4 py-2 md:text-base md:px-10 md:py-3 font-montserrat font-semibold text-white">
                Download image
              </button>
            </div>
          </div>
          <div className="h-[35%] w-full bg-white py-2">
            <div className="flex-col md:flex-row z-[4] flex w-full md:gap-0 gap-3 md:items-center py-4 px-5 text-sm">
              <div className="flex flex-1 items-center gap-4">
                <div className="h-12 w-12 cursor-pointer overflow-hidden rounded-full border">
                  <img
                    src={data?.user?.profile_image.large}
                    alt="profile"
                    className="h-full w-full"
                  />
                </div>
                <div className="flex max-w-xs flex-col font-montserrat">
                  <h1 className="cursor-pointer truncate whitespace-nowrap font-bold capitalize text-neutral-700">
                    {data?.user?.name}
                  </h1>
                  <h1 className="cursor-pointer font-bold text-neutral-400">
                    @{data?.user?.username}
                  </h1>
                </div>
                <div className="hidden md:flex max-w-sm items-center gap-2 truncate px-6 ">
                  {data?.user?.social.instagram_username && (
                    <h1 className="flex items-center font-semibold text-neutral-500">
                      <BsInstagram className="mx-1 text-lg" />
                      <span>/</span>
                      {data?.user?.social?.instagram_username}
                    </h1>
                  )}
                  {data?.user?.social.twitter_username && (
                    <h1 className="flex items-center font-semibold text-neutral-500">
                      <FiTwitter className="mx-1 text-lg" />
                      <span>/</span>
                      {data?.user?.social?.twitter_username}
                    </h1>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-center gap-4 font-montserrat">
                <h1 className="flex items-center gap-1 font-bold text-neutral-500">
                  {formatNumber(data?.downloads)}
                  <span>downloads</span>
                </h1>
                <h1 className="flex items-center gap-2 font-bold uppercase text-neutral-500">
                  <BiLike size={20} />
                  {formatNumber(data?.likes)}
                </h1>
              </div>
            </div>
            <div className="w-full px-5 py-2 font-montserrat">
              <h1 className="font-semibold">Related Tags</h1>
              <div className="mt-2 flex flex-wrap gap-2 overflow-y-auto">
                {data?.tags?.slice(0, numToShow).map((tag, index) => (
                  <div
                    key={index}
                    className="bg-[#ECECEC] px-4 py-1 font-semibold"
                  >
                    {tag.title}
                  </div>
                ))}
                {data?.tags?.length > numToShow && (
                  <div
                    onClick={() => setNumToShow(numToShow + 12)}
                    className="cursor-pointer px-2 py-1 font-medium text-blue-500"
                  >
                    Show More
                  </div>
                )}
              </div>{" "}
            </div>
          </div>
        </div>
      </Sheet>
    </Modal>
  );
};

export default DetailsModal;
