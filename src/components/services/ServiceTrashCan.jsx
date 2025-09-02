const ServiceTrashCan = ({ gridItems, shapeImage }) => {
  return (
    <div className="flex items-start justify-center bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 min-h-[50vh]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {gridItems.map(
          ({ title, description, iconColor, IconComponent }, index) => (
            <div
              key={index}
              className="group relative rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-1"
            >
              {/* Trash Can Image Container */}
              <div className="w-full h-64 sm:h-72 md:h-80 lg:h-64 xl:h-72 relative">
                <img
                  src={shapeImage}
                  alt="Trash Can Shape"
                  className="w-full h-full object-cover"
                />

                {/* Content with vertical spacing */}
                <div className="absolute inset-0 flex flex-col items-center justify-start pt-6 sm:pt-10 px-2 sm:px-4 text-center overflow-hidden space-y-3">
                  <IconComponent
                    className="w-12 h-12 sm:w-16 sm:h-16 transition-transform duration-300 ease-in-out group-hover:scale-x-[-1]"
                    style={{ color: iconColor }}
                  />
                  <h1 className="text-sm sm:text-base md:text-lg font-bold text-black leading-tight">
                    {title}
                  </h1>
                  <p className="text-xs sm:text-sm text-black font-medium mt-1">
                    {description.match(/.{1,30}/g)?.map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ServiceTrashCan;
