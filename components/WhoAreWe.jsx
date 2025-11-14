
export default function WhoAreWe() {
  return (
    <div className="min-h-screen bg-blue-600">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-8">
                Who are we
              </h1>
              <p className="text-xl leading-relaxed">
                Easy-rent est une application de location des véhicules d'une part et de gestion des agences de véhicules d'une autre part
              </p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-500 p-8 rounded-lg">
                  <div className="text-4xl font-bold text-white mb-2">15+</div>
                  <div className="text-white text-sm uppercase tracking-wide">
                    Years of experience
                  </div>
                </div>
                <div className="bg-orange-500 p-8 rounded-lg">
                  <div className="text-4xl font-bold text-white mb-2">95</div>
                  <div className="text-white text-sm uppercase tracking-wide">
                    International store
                  </div>
                </div>
              </div>
              <div className="bg-blue-800 p-8 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-4xl font-bold text-white">1M+</div>
                  <div className="text-white text-sm uppercase">View</div>
                </div>
                <div className="w-full bg-blue-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-300 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img src="/assets/car1.jpeg" alt="Pickup truck" className="w-full h-48 object-cover" />
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img src="/assets/car2.jpeg" alt="SUV" className="w-full h-48 object-cover" />
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img src="/assets/car3.jpeg" alt="Compact car" className="w-full h-48 object-cover" />
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img src="/assets/car4.jpeg" alt="Luxury sedan" className="w-full h-48 object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
