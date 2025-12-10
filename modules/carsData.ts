// modules/carsData.ts

export interface Car {
  id: string | number;
  name: string;
  price: number;
  currency: string;
  type: string;
  fuel: string;
  seats: number;
  transmission: string; // 1 = Manuelle, 2 = Auto
  rating: number;
  reviewsCount: number;
  isFavorite: boolean;
  image: string; // Image principale
  gallery: string[]; // Galerie d'images
  tag?: string;
  description: string;
  location: string;
  specs: {
    modele: string;
    marque: string;
    capacite: string;
    couleur: string;
    kilometrage: string;
    vitesseMax: string;
    portes: number;
  };
  reviewsList: {
    id: number;
    user: string;
    avatar: string;
    rating: number;
    comment: string;
  }[];
}

export const allCars: Car[] = [
  {
    id: 1,
    name: "Audi Rouge Sport",
    price: 150000,
    currency: "CFA",
    type: "Sport",
    fuel: "Essence",
    seats: 2,
    transmission: "Automatique",
    rating: 4.8,
    reviewsCount: 12,
    isFavorite: true,
    tag: "Populaire",
    image: "/assets/car2.jpeg", // Assurez-vous que ces images existent
    gallery: ["/assets/car2.jpeg", "/assets/car1.jpeg", "/assets/car3.jpeg", "/assets/car4.jpeg"],
    description: "Une voiture sportive élégante, parfaite pour les mariages ou les week-ends de luxe. Confort absolu et puissance garantie.",
    location: "Yaoundé, Route de Kribi",
    specs: {
      modele: "R8 Coupé",
      marque: "Audi",
      capacite: "2 Personnes",
      couleur: "Rouge",
      kilometrage: "15 000 km",
      vitesseMax: "330 Km/h",
      portes: 2
    },
    reviewsList: [
      { id: 1, user: "Manuella DK", avatar: "/assets/default-avatar.jpeg", rating: 5, comment: "J'ai adoré cette voiture, elle est très confortable !" },
      { id: 2, user: "Paul H.", avatar: "/assets/default-avatar.jpeg", rating: 4, comment: "Superbe expérience de conduite." }
    ]
  },
  {
    id: 2,
    name: "Toyota Fortuner",
    price: 85000,
    currency: "CFA",
    type: "SUV",
    fuel: "Diesel",
    seats: 7,
    transmission: "Automatique",
    rating: 4.5,
    reviewsCount: 24,
    isFavorite: false,
    tag: "Familial",
    image: "/assets/toyota.jpg",
    gallery: ["/assets/toyota.jpg", "/assets/car6.png", "/assets/car5.png"],
    description: "Le SUV parfait pour les routes camerounaises. Robuste, spacieux et sécurisé pour toute la famille.",
    location: "Douala, Bonapriso",
    specs: {
      modele: "Fortuner",
      marque: "Toyota",
      capacite: "7 Personnes",
      couleur: "Blanc",
      kilometrage: "45 000 km",
      vitesseMax: "200 Km/h",
      portes: 5
    },
    reviewsList: [
      { id: 1, user: "Jean Marc", avatar: "/assets/default-avatar.jpeg", rating: 5, comment: "Très robuste pour aller à l'Ouest." }
    ]
  },
  {
    id: 3,
    name: "Mercedes GLE 450",
    price: 120000,
    currency: "CFA",
    type: "Luxe",
    fuel: "Hybride",
    seats: 5,
    transmission: "Automatique",
    rating: 5.0,
    reviewsCount: 8,
    isFavorite: true,
    tag: "Premium",
    image: "/assets/car6.png",
    gallery: ["/assets/car6.png", "/assets/limousine.jpg", "/assets/car2.jpeg"],
    description: "Le summum du luxe et de la technologie. Idéal pour les rendez-vous d'affaires.",
    location: "Yaoundé, Bastos",
    specs: {
      modele: "GLE 450",
      marque: "Mercedes",
      capacite: "5 Personnes",
      couleur: "Noir",
      kilometrage: "10 000 km",
      vitesseMax: "250 Km/h",
      portes: 5
    },
    reviewsList: []
  },
  // Ajoutez d'autres voitures ici avec la même structure...
];