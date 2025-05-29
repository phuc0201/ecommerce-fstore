import Carousel from "../components/Carousel";

const Home: React.FC = () => {
  const slides1 = [
    {
      id: 1334,
      image: "./assets/imgs/banners/1.webp",
      alt: "Khuyến mãi Quốc tế Thiếu nhi - Giảm 20% toàn bộ sản phẩm trẻ em",
    },
    {
      id: 2243,
      image: "./assets/imgs/banners/2.webp",
      alt: "Khuyến mãi Quốc tế Thiếu nhi - Giảm 20% toàn bộ sản phẩm trẻ em",
    },
    {
      id: 3243,
      image: "./assets/imgs/banners/3.webp",
      alt: "Khuyến mãi Quốc tế Thiếu nhi - Giảm 20% toàn bộ sản phẩm trẻ em",
    },
  ];

  return (
    <div className={`-mt-[68px]`}>
      <Carousel slides={slides1} />
    </div>
  );
};

export default Home;
