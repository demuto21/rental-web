'use client';

import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, ThumbsUp, Calendar, Building2, Users } from "lucide-react";
import Image from "next/image";

interface BusinessReview {
  id: number;
  companyName: string;
  industry: string;
  avatar: string;
  avatarImage: string;
  rating: number;
  date: string;
  location: string;
  fleetSize: string;
  duration: string;
  comment: string;
  helpful: number;
  verified: boolean;
  contactPerson: string;
}

const mockBusinessReviews: BusinessReview[] = [
  // Vos données restent identiques
  {
    id: 1,
    companyName: "Camtel Business Solutions",
    industry: "Télécommunications",
    avatar: "CB",
    avatarImage: "https://images.unsplash.com/photo-1578758803946-2c4f6738df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3MlMjBwZXJzb258ZW58MXx8fHwxNzYzMDI3OTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5,
    date: "2025-11-09",
    location: "Yaoundé, Bastos",
    fleetSize: "15 véhicules",
    duration: "Contrat annuel",
    contactPerson: "Alain Nkomo Ebale, Directeur Achats",
    comment: "Partenariat excellent depuis 2 ans. Service client très réactif, flotte toujours disponible pour nos techniciens. La gestion administrative est simplifiée avec leur plateforme en ligne. Prix très compétitifs pour notre volume.",
    helpful: 42,
    verified: true
  },
  // ... autres reviews
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? "fill-orange-500 text-orange-500" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithFallback = ({ src, alt, className }: ImageWithFallbackProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={56}
      height={56}
      className={className}
      onError={(e) => {
        // Fallback si l'image ne charge pas
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
      }}
    />
  );
};

export function ReviewsPublics() {
  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      {/* Header avec gradient */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-700 text-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Avis des Entreprises</h2>
        <p className="opacity-90 text-lg">Témoignages de nos clients professionnels et entreprises</p>
        <div className="flex gap-8 mt-6">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold">4.8</span>
              <span className="opacity-75 text-xl">/5</span>
            </div>
            <StarRating rating={5} />
            <p className="mt-1 opacity-75">Basé sur 456 avis d'entreprises</p>
          </div>
        </div>
      </div>

      {/* Grid des reviews */}
      <div className="grid gap-6">
        {mockBusinessReviews.map((review) => (
          <Card key={review.id} className="p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-orange-500">
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-orange-200">
                  <ImageWithFallback 
                    src={review.avatarImage} 
                    alt={review.contactPerson}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Contenu */}
              <div className="flex-1">
                {/* En-tête avec infos entreprise */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-5 h-5 text-orange-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{review.companyName}</h3>
                      {review.verified && (
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-0">
                          Certifié
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 mt-1">
                      <span className="text-sm">{review.industry}</span>
                      <span className="text-sm">•</span>
                      <span className="text-sm">{review.location}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 italic">{review.contactPerson}</p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>

                {/* Badges informations */}
                <div className="flex gap-2 mb-3">
                  <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                    <Users className="w-3 h-3 mr-1" />
                    {review.fleetSize}
                  </Badge>
                  <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-50">
                    <Calendar className="w-3 h-3 mr-1" />
                    {review.duration}
                  </Badge>
                </div>

                {/* Commentaire */}
                <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

                {/* Footer avec date et bouton utile */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(review.date).toLocaleDateString('fr-FR')}
                  </div>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors duration-200">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">Utile ({review.helpful})</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
