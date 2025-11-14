'use client';

import { Star, ThumbsUp, Users, Award, TrendingUp } from "lucide-react";
import { ReviewCard } from "../components/ReviewCard";
import { StatsCard } from "../components/StatsCard";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function Home() {
  const reviews = [
    {
      name: "Amina Ndong",
      initials: "AN",
      avatar: "https://images.unsplash.com/photo-1668752741330-8adc5cef7485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMwOTY0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      date: "Il y a 2 jours",
      service: "Développement Web",
      comment: "Excellente expérience avec cette agence ! L'équipe est très professionnelle et à l'écoute. Mon site web a été livré dans les temps et dépasse mes attentes. Je recommande vivement leurs services.",
      verified: true,
    },
    {
      name: "Pierre Mbarga",
      initials: "PM",
      avatar: "https://images.unsplash.com/photo-1645736593731-4eef033ac37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbWFuJTIwYnVzaW5lc3MlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMwOTY0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      date: "Il y a 5 jours",
      service: "Marketing Digital",
      comment: "Une agence au top ! Ils ont su comprendre mes besoins et proposer des solutions adaptées. Les résultats sont visibles et mon chiffre d'affaires a augmenté de 40% en 3 mois.",
      verified: true,
    },
    {
      name: "Grace Ewane",
      initials: "GE",
      avatar: "https://images.unsplash.com/photo-1563132337-f159f484226c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBlbnRyZXByZW5ldXJ8ZW58MXx8fHwxNzYyOTc3NDMxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4,
      date: "Il y a 1 semaine",
      service: "Design Graphique",
      comment: "Très satisfaite du travail réalisé. Le design de ma marque est moderne et reflète parfaitement mes valeurs. L'équipe créative est talentueuse et réactive.",
      verified: true,
    },
    {
      name: "Jean-Paul Nkongo",
      initials: "JN",
      avatar: "https://images.unsplash.com/photo-1616804827035-f4aa814c14ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcHJvZmVzc2lvbmFsJTIwbWFufGVufDF8fHx8MTc2MzA5NjQ1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      date: "Il y a 1 semaine",
      service: "SEO & Référencement",
      comment: "Grâce à leur expertise en SEO, mon site est passé de la page 5 à la première page de Google ! Résultats incroyables et équipe très compétente.",
      verified: true,
    },
    {
      name: "Fatima Bello",
      initials: "FB",
      avatar: "https://images.unsplash.com/photo-1687422808311-a776f467a468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBidXNpbmVzc3xlbnwxfHx8fDE3NjI5NzcwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      date: "Il y a 2 semaines",
      service: "Stratégie Digitale",
      comment: "Un accompagnement personnalisé du début à la fin. L'agence a pris le temps de comprendre mon projet et m'a guidé avec des conseils avisés. Parfait !",
      verified: true,
    },
    {
      name: "Emmanuel Tchiendjo",
      initials: "ET",
      avatar: "https://images.unsplash.com/photo-1703059680709-d9554370fff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZW50cmVwcmVuZXVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYzMDk2NDU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4,
      date: "Il y a 2 semaines",
      service: "E-commerce",
      comment: "Notre boutique en ligne fonctionne parfaitement et les ventes ont explosé ! Quelques petits ajustements au début mais l'équipe a été très réactive.",
      verified: true,
    }
  ];

  const allReviews = reviews;
  const fiveStarReviews = reviews.filter((r) => r.rating === 5);
  const fourStarReviews = reviews.filter((r) => r.rating === 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-white text-4xl mb-2">🌟 Agence Satisfaite</h1>
              <p className="text-white/90 text-lg">
                Découvrez les avis de nos clients
              </p>
            </div>
            <Button className="bg-[#F97316] hover:bg-[#EA580C] text-white border-0">
              Laisser un avis
            </Button>
          </div>

          {/* Rating Overview */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <div className="text-6xl mb-2 text-white">4.9</div>
                <div className="flex justify-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-8 w-8 fill-[#F97316] text-[#F97316]"
                    />
                  ))}
                </div>
                <p className="text-white/90 text-lg">
                  Basé sur {reviews.length} avis vérifiés
                </p>
              </div>

              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count =
                    stars === 5
                      ? fiveStarReviews.length
                      : stars === 4
                      ? fourStarReviews.length
                      : 0;
                  const percentage = Math.round((count / reviews.length) * 100);

                  return (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="text-white w-12">{stars} ★</span>
                      <div className="flex-1 bg-white/20 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-[#F97316] h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-white w-12 text-right">
                        {percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatsCard
            value="98%"
            label="Clients Satisfaits"
            icon={<ThumbsUp className="h-8 w-8 text-[#F97316]" />}
          />
          <StatsCard
            value="500+"
            label="Projets Réalisés"
            icon={<Award className="h-8 w-8 text-[#F97316]" />}
          />
          <StatsCard
            value="250+"
            label="Clients Actifs"
            icon={<Users className="h-8 w-8 text-[#F97316]" />}
            gradient
          />
          <StatsCard
            value="+45%"
            label="Croissance Moyenne"
            icon={<TrendingUp className="h-8 w-8 text-white" />}
            gradient
          />
        </div>

        {/* Reviews Section */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 bg-white border-2 border-[#3B82F6]/20">
            <TabsTrigger value="all">
              Tous les avis ({allReviews.length})
            </TabsTrigger>
            <TabsTrigger value="5stars">
              5 étoiles ({fiveStarReviews.length})
            </TabsTrigger>
            <TabsTrigger value="4stars">
              4 étoiles ({fourStarReviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {allReviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </TabsContent>

          <TabsContent value="5stars" className="space-y-4">
            {fiveStarReviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </TabsContent>

          <TabsContent value="4stars" className="space-y-4">
            {fourStarReviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white text-3xl mb-4">
            Rejoignez nos clients satisfaits
          </h2>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Bénéficiez de notre expertise et transformez votre projet en
            succès. Plus de 98% de nos clients nous recommandent !
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              className="bg-[#F97316] hover:bg-[#EA580C] text-white border-0"
            >
              Demander un devis gratuit
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-[#1E3A8A] hover:bg-white/90 border-0"
            >
              Voir nos réalisations
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
