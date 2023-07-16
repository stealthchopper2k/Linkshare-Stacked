import Search from "./Search";

export const HeaderComponent: React.FC = () => {
  return (
    <header className="">
      <div className="absolute top-[-10] w-full h-96 bg-gray-400 bg-gradient-to-br from-pink-400 to-[#0055D1] rounded-md filter blur-3xl opacity-50 rounded-b-2xl -z-50" />
      <div className="z-10">
        <div className="flex flex-row sm:flex sm:items-center sm:justify-between">
          <div className="flex flex-col text-center sm:text-left">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Dashboard
            </h1>
            <p className="text-lg text-gray-500 text-grey">
              Search personal or published files
            </p>
            <Search />
          </div>
        </div>
      </div>
    </header>
  );
};
