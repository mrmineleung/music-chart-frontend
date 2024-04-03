import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-8 sm:py-16 lg:py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              All-In-One Music Chart Data Platform
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Visualize music charts data and generate playlist including Melon,
              Billboard, YouTube Music, Genie, Flo, Bugs and so on ...
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 content-stretch m-2">
        <Link to="/charts/melon">
        <div className="border rounded-lg bg-gradient-to-r from-sky-500 to-emerald-500">
          <div className="flex justify-center place-items-center rounded-lg h-32 transition-all hover:bg-accent/50 hover:text-accent-foreground duration-500">
            <span className="text-3xl font-extrabold">Melon</span>
          </div>
        </div>
        </Link>
        <Link to="/charts/billboard">
        <div className="border rounded-lg bg-gradient-to-r from-stone-500 to-neutral-500">
          <div className="flex justify-center place-items-center rounded-lg h-32 transition-all hover:bg-accent/50 hover:text-accent-foreground duration-500">
          <span className="text-3xl font-extrabold">Billboard</span>
          </div>
        </div>
        </Link>
        {/* <Link to="/charts/youtube"> */}
        <div className="border rounded-lg bg-gradient-to-r from-red-500 to-orange-500">
          <div className="flex justify-center place-items-center rounded-lg h-32 transition-all hover:bg-accent/50 hover:text-accent-foreground duration-500">
          <span className="text-3xl font-extrabold">YouTube</span>
          </div>
        </div>
        {/* </Link> */}
      </div>
      </div>
    </>
  );
};

export default Home;
