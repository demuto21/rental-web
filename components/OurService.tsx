import Image from 'next/image';

export default function OurServices() {
  const services = [
    {
      id: 1,
      title: "Vehicle Reservation",
      description: "With this app, a customer can book a vehicle, all type of vehicle : car, motorcyle, fly.",
      image: "/vehicule1.png", // Remplace par le nom de ton image
    },
    {
      id: 2,
      title: "Booking A Driver",
      description: "With this app, a customer should be able to book a driver with a car when he can not drive it.",
      image: "/driver.png", // Remplace par le nom de ton image
    },
    {
      id: 3,
      title: "Management of a Vehicle Agency",
      description: "With this app, when you have an agency, you can be our partner by sign in your agency to our platform.",
      image: "/agencies.png", // Remplace par le nom de ton image
    },
  ];

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Titre de la section */}
        <h2 className="text-4xl font-bold text-[#2563EB] text-center mb-16">
          Our services
        </h2>

        {/* Liste des services */}
        <div className="space-y-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`flex items-center gap-12 ${
                index % 2 === 0 ? '' : 'flex-row-reverse'
              }`}
            >
              {/* Image avec cadre bleu */}
              <div className="flex-shrink-0">
                <div className="relative bg-[#2563EB] rounded-3xl p-1.5 shadow-lg">
                  <div className="bg-white rounded-2xl overflow-hidden w-[280px] h-[200px]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={280}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {/* Bouton View More */}
                  <button className="absolute -bottom-4 right-6 bg-[#F76513] hover:bg-[#e55a0f] text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg transition-all hover:scale-105">
                    View More
                  </button>
                </div>
              </div>

              {/* Contenu texte */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
