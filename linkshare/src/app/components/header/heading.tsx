export const HeaderComponent: React.FC = () => {
  return (
    <header className="sticky top-0 z-50">
      <div className="justify-self-start">
        <div className="flex flex-row sm:flex sm:items-center sm:justify-between">
          <div className="flex flex-col text-center sm:text-left">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Dashboard
            </h1>
            <p className="text-lg text-gray-500 text-grey">
              Search personal or published files
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
