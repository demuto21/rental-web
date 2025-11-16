import Image from 'next/image';

// Fichier : components/StatsSection.jsx

/**
 * Une petite fonction "helper" pour une boîte de statistique
 * (Ceci évite de répéter 4 fois les mêmes classes Tailwind)
 */
function StatBox({ value, label }) {
  return (
    <div className="border-4 border-blue-600 rounded-2xl p-6 md:p-8 text-center shadow-lg">
      <p className="text-3xl md:text-4xl font-bold text-black">{value}</p>
      <p className="text-lg md:text-xl text-gray-600 mt-2">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        
        {/* Grille principale à 2 colonnes (sur desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* ----- COLONNE DE GAUCHE (Titre + Image) ----- */}
          <div className="text-center md:text-left">
            {/* NOTE : L'image d'origine contient une faute ("Perfomance").
              Je l'ai corrigée en "Performance" ici. 
            */}
            <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-10">
              Performance
            </h2>
            
            <div className="flex justify-center">
              {/* Assurez-vous que le chemin 'src' est correct ! */}
              <Image
                src="/assets/key.png" // <-- CHANGEZ CECI si votre image est ailleurs
                alt="Clé de voiture"
                width={300} // Ajustez la taille au besoin
                height={300} // Ajustez la taille au besoin
                className="object-contain"
              />
            </div>
          </div>

          {/* ----- COLONNE DE DROITE (Grille 2x2 des stats) ----- */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            
            {/* Utilisation du composant StatBox */}
            <StatBox value="10000 +" label="Cars" />
            <StatBox value="150 +" label="Compagnies" />
            <StatBox value="1M +" label="Users" />
            <StatBox value="1000 +" label="Drivers" />
            
          </div>
        </div>
      </div>
    </section>
  );
}