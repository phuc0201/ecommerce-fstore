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

  const slides2 = [
    {
      id: 234233123,
      image:
        "https://buggy.yodycdn.com/images/home-carousel-dt/fa2d6619f3f7ad76fc8f0010b143a05b.webp?width=2400&height=1350",
    },
    {
      id: 23434324,
      image:
        "https://buggy.yodycdn.com/images/home-carousel-dt/ef7e6afe0e588e923e88475181063a0d.webp?width=2400&height=1350",
    },
    {
      id: 24234324,
      image:
        "https://buggy.yodycdn.com/images/home-carousel-dt/c86becf1eef412db0374949c8e1f615f.webp?width=2400&height=1350",
    },
    {
      id: 234234,
      image:
        "https://buggy.yodycdn.com/images/home-carousel-dt/325fa2a2b77a72e24e53f11a457cd3ae.webp?width=2400&height=1350",
    },
  ];

  const slides3 = [
    {
      id: 2748334,
      image:
        "https://buggy.yodycdn.com/images/home-banner-dt/511ff81c8ab3fbf8dd90e080636801ae.webp?width=2880&height=1620",
    },
    {
      id: 3535345,
      image:
        "https://buggy.yodycdn.com/images/collection-horizontal-dt/d8ff3e10579a20761be0681b25d9a79c.webp?width=2720&height=1530",
    },
  ];

  const slides4 = [
    {
      id: 324234234,
      image:
        "https://buggy.yodycdn.com/images/home-banner-dt/a5c68bfb5b123751f510b2cf1bde179a.webp?width=2880&height=1620",
    },
    {
      id: 24243342,
      image:
        "https://buggy.yodycdn.com/images/home-banner-dt/5e55e1bf325bdc93c5ade4088e3dfdfa.webp?width=2880&height=1620",
    },
    {
      id: 22347348,
      image:
        "https://buggy.yodycdn.com/images/home-banner-dt/54ee2566286a17f65ac6d98fb1c1ea53.webp?width=2880&height=1620",
    },
  ];

  const technologyFashionItems = [
    {
      id: 243234,
      image:
        "https://buggy.yodycdn.com/images/home-grid-dt/ac86da3160af474c1e24322ff4b12fe7.webp?width=648&height=864",
    },
    {
      id: 372348,
      image:
        "https://buggy.yodycdn.com/images/home-grid-dt/032b910eac2c682cc1edb1b5c0fd4c71.webp?width=648&height=864",
    },
    {
      id: 345435,
      image:
        "https://buggy.yodycdn.com/images/home-grid-dt/915ff90bf2e5d84006848b20ac06c236.webp?width=648&height=864",
    },
    {
      id: 353454,
      image:
        "https://buggy.yodycdn.com/images/home-grid-dt/4c09e8305a7b197297bec46c9c3acb55.webp?width=648&height=864",
    },
  ];

  return (
    <div className={`md:-mt-[68px] grid gap-16`}>
      <Carousel slides={slides1} />
      <Carousel slides={slides2} variant="center" />
      <Carousel slides={slides3} />

      <section className="px-2 lg:px-12">
        <h1 className="mb-3 text-center text-lg lg:mb-8 lg:text-left lg:text-3xl font-semibold">
          THỜI TRANG KẾT HỢP CÔNG NGHỆ
        </h1>
        <div className="grid gap-x-2 gap-y-3 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-x-4">
          {technologyFashionItems.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt=""
              className="aspect-[3/4] w-full rounded-md object-cover"
            />
          ))}
        </div>
      </section>

      <Carousel slides={slides4} />
    </div>
  );
};

export default Home;
