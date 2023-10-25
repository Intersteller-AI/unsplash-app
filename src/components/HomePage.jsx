// @ts-nocheck
import Hero from "./Hero";
import Navbar from "./Navbar";
import { formatNumber } from "../utils/format";
import Loader from "./Loader";
import DetailsModal from "./DetailsModal";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import toast from "react-hot-toast";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [imageId, setImageId] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [navSearchTerm, setNavSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.unsplash.com/photos?client_id=pmsFQ2pLrzkSkMEMl615-XU2oZ9RT0yhsTPEVQDUPB8&page=${page}`
      );
      const data = await response.json();

      setItems((prevItems) => [...prevItems, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      toast.error(error.message``);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const {data, isFetching } = useQuery({
  //   queryFn: () => getAll(),
  //   queryKey: ["photos"],
  // });

  const handleModalOpen = (img) => {
    setImageId(img.id);
    setModalOpen(true);
    // console.log(img);
  };

  const searchImagesChange = async (e) => {
    const { value } = e.target;
    setNavSearchTerm(value);
    setPage(1);
    if (value.trim()) {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?client_id=pmsFQ2pLrzkSkMEMl615-XU2oZ9RT0yhsTPEVQDUPB8&page=${page}&per_page=10&query=${value}`
        );
        const data = await response.json();
        // console.log(data);
        setSearchedItems(data.results);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    } else {
      setSearchedItems([]);
    }
  };

  const loadMore = async () => {
    if (navSearchTerm || searchTerm) {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?client_id=pmsFQ2pLrzkSkMEMl615-XU2oZ9RT0yhsTPEVQDUPB8&page=${page}&per_page=10&query=${
            navSearchTerm || searchTerm
          }`
        );
        const data = await response.json();
        setSearchedItems((prevItems) => [...prevItems, ...data.results]);
        setPage((prev) => prev + 1);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  const searchTermChange = async (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    setPage(1);
    if (value.trim()) {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?client_id=pmsFQ2pLrzkSkMEMl615-XU2oZ9RT0yhsTPEVQDUPB8&page=${page}&per_page=10&query=${value}`
        );
        const data = await response.json();
        // console.log(data);
        setSearchedItems(data.results);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    } else {
      setSearchedItems([]);
    }
  };

  return (
    <div className="relative h-screen w-full">
      <Navbar
        searchImagesChange={searchImagesChange}
        navSearchTerm={navSearchTerm}
      />
      <div className="w-full pt-12 md:pt-20">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Hero searchTerm={searchTerm} searchTermChange={searchTermChange} />
            {navSearchTerm || searchTerm ? (
              <div className="gallery px-4 md:px-16 lg:px-24">
                <InfiniteScroll
                  dataLength={searchedItems.length}
                  next={loadMore}
                  hasMore={true} // Replace with a condition based on your data source
                  loader={<Loader />}
                  endMessage={
                    <h1 className="text-2xl font-semibold">
                      No more data to load.
                    </h1>
                  }
                >
                  <ul className="images">
                    {searchedItems?.map((img, index) => (
                      <li
                        onClick={() => handleModalOpen(img)}
                        className="card rounded-lg border border-neutral-200 bg-white drop-shadow-sm transition-all duration-200 hover:scale-105"
                        key={index}
                      >
                        <img
                          src={img?.urls.small}
                          alt="img"
                          className="cursor-pointer"
                        />
                        <div className=" z-[4] flex w-full items-center py-4 px-5 text-sm">
                          <div className="flex flex-1 items-center gap-4">
                            <div className="h-10 w-10 cursor-pointer overflow-hidden rounded-full border">
                              <img
                                src={img.user.profile_image.small}
                                alt="profile"
                                className="h-full w-full"
                              />
                            </div>
                            <div className="flex flex-1 flex-col font-montserrat">
                              <h1 className="cursor-pointer truncate whitespace-nowrap font-bold capitalize text-neutral-700">
                                {img.user.name}
                              </h1>
                              <h1 className="cursor-pointer font-bold text-neutral-400">
                                @{img.user.username}
                              </h1>
                            </div>
                          </div>
                          <div className="flex items-center justify-center font-montserrat">
                            <h1 className="font-bold uppercase text-neutral-500">
                              {formatNumber(img?.likes)}
                            </h1>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </InfiniteScroll>
              </div>
            ) : (
              <div className="gallery px-4 md:px-16 lg:px-24">
                <InfiniteScroll
                  dataLength={items.length}
                  next={fetchData}
                  hasMore={true} // Replace with a condition based on your data source
                  loader={<Loader />}
                  endMessage={
                    <h1 className="text-2xl font-semibold">
                      No more data to load.
                    </h1>
                  }
                >
                  <ul className="images">
                    {items?.map((img, index) => (
                      <li
                        onClick={() => handleModalOpen(img)}
                        className="card rounded-lg border border-neutral-200 bg-white drop-shadow-sm transition-all duration-200 hover:scale-105"
                        key={index}
                      >
                        <img
                          src={img?.urls.small}
                          alt="img"
                          className="cursor-pointer"
                        />
                        <div className=" z-[4] flex w-full items-center py-4 px-5 text-sm">
                          <div className="flex flex-1 items-center gap-4">
                            <div className="h-10 w-10 cursor-pointer overflow-hidden rounded-full border">
                              <img
                                src={img.user.profile_image.small}
                                alt="profile"
                                className="h-full w-full"
                              />
                            </div>
                            <div className="flex flex-1 flex-col font-montserrat">
                              <h1 className="cursor-pointer truncate whitespace-nowrap font-bold capitalize text-neutral-700">
                                {img.user.name}
                              </h1>
                              <h1 className="cursor-pointer font-bold text-neutral-400">
                                @{img.user.username}
                              </h1>
                            </div>
                          </div>
                          <div className="flex items-center justify-center font-montserrat">
                            <h1 className="font-bold uppercase text-neutral-500">
                              {formatNumber(img?.likes)}
                            </h1>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </InfiniteScroll>
              </div>
            )}
          </>
        )}
      </div>
      <DetailsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        imageId={imageId}
        setImageId={setImageId}
      />
    </div>
  );
}
