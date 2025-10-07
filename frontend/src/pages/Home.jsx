export const Home = () => {
  return (
    <div className=" h-[550px] overflow-hidden relative w-full ">
      <video autoPlay loop muted className=" absolute  inset-0 object-cover">
        <source src="/videos/video-hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200/40 via-transparent to-gray-300/10" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-5xl font-bold">
          Bienvenido a <span className="text-gray-900">Commercia</span>
        </h1>
        <p className="mt-4 text-lg">Los mejores productos en un solo lugar</p>
      </div>
    </div>
  );
};
