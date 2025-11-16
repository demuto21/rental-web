import Image from 'next/image';
// Importez l'icône étoile de la librairie
import { FaStar } from 'react-icons/fa';

// Fichier : components/Testimonials.jsx

// 1. Définissez les données pour vos 3 avis
const testimonialData = [
  {
    imageSrc: '/assets/default-avatar.jpeg', // <-- REMPLACEZ PAR VOTRE CHEMIN
    text: "En tant que concessionnaire automobile, j'ai eu à confier mes véhicules aux gestionnaires de cette application et je n'ai pas été déçu. Bonne gestion des véhicules et des revenus.",
    author: 'JCD SARL',
  },
  {
    imageSrc: '/assets/default-avatar.jpeg', // <-- REMPLACEZ PAR VOTRE CHEMIN
    text: "J'ai remis mon véhicule à cette entreprise, il y'a deux ans...aujourd'hui, ils gèrent plusieurs de mes véhicules, et sont devenus des partenaires financiers fiables.",
    author: 'M. Yannick SIYAPZE',
  },
  {
    imageSrc: '/assets/default-avatar.jpeg', // <-- REMPLACEZ PAR VOTRE CHEMIN
    text: 'Lorsque nous voulons des véhicules pour nos clients et nos employés, cette entreprise se montre toujours prompte, efficace et dynamique pour les rendre disponible.',
    author: 'Hotel LE CONFORT',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white pt-16">
      <div className="container mx-auto px-6">
        
        {/* ----- TITRE ----- */}
        <h2 className="text-4xl md:text-5xl font-bold text-blue-700 text-center mb-12">
          Satisfied Agencies
        </h2>

        {/* ----- GRILLE D'AVIS ----- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* On "mappe" (boucle) sur les données pour créer les cartes */}
          {testimonialData.map((review, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center text-center"
            >
              {/* Image Avatar */}
              <Image
                src={review.imageSrc}
                alt={`Logo ${review.author}`}
                width={96} // 96px (w-24)
                height={96} // 96px (h-24)
                className="rounded-full object-cover"
              />

              {/* Étoiles */}
              <div className="flex text-orange-400 my-5">
                <FaStar size={24} />
                <FaStar size={24} />
                <FaStar size={24} />
                <FaStar size={24} />
                <FaStar size={24} />
              </div>

              {/* Texte de l'avis */}
              <p className="text-gray-600 leading-relaxed">
                "{review.text}"
              </p>

              {/* Auteur de l'avis */}
              <p className="text-blue-700 font-bold mt-6 text-lg">
                {review.author}
              </p>
            </div>
          ))}
        </div>

        {/* ----- BOUTON "VIEW MORE" ----- */}
        <div className="text-center mt-12">
          <button 
            className="bg-orange-500 text-white text-xl font-bold py-4 px-10 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
          >
            View More
          </button>
        </div>

      </div>
    </section>
  );
}