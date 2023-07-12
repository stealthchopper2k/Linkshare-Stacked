import Image from "next/image";

export const HeaderComponent: React.FC = () => {
  return (
    <header className="sticky top-0 z-50">
      <div className="justify-self-start sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-row sm:flex sm:items-center sm:justify-between">
          <div className="flex flex-col text-center sm:text-left">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              RabbitHole
            </h1>
            <p className="text-lg text-gray-500">Personal History Assistant</p>
          </div>
          <Image
            src="/riggedrabbit.png"
            sizes="(max-width: 768px) 5vw, (max-width: 1200px) 5vw, 5vw"
            className="object-scale-down"
            fill={true}
            alt="Picture of the author"
          />
        </div>
      </div>
    </header>
  );
};
