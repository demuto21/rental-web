import Link from 'next/link';
import { FaInstagram, FaTwitter, FaYoutube, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer id = "footer" className="bg-white text-gray-700"> {/* Fond blanc, texte gris */}
            <div className="container mx-auto px-6 py-16">

                {/* Grille principale du Footer */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* Colonne 1: Logo et Réseaux */}
                    <div className="md:col-span-1">
                        {/* REMARQUE : Remplacez ce H2 par votre composant Logo 
              ou une balise next/image comme ceci :
              <Image src="/logo.svg" alt="Easy-Rent Logo" width={150} height={40} />
            */}
                        <h2 className="text-2xl font-bold">
                            <span className="text-blue-600">EASY</span>
                            <span className="text-orange-500">-RENT</span> {/* Ajustez "text-orange-500" si la couleur est différente */}
                        </h2>
                        <p className="mt-2 text-gray-500">
                            Rent your Dream Car with a Click
                        </p>
                        {/* Icônes de réseaux sociaux */}
                        <div className="flex space-x-4 mt-6">
                            <Link href="#" className="text-gray-400 hover:text-gray-600">
                                <FaInstagram size={20} />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-gray-600">
                                <FaTwitter size={20} />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-gray-600">
                                <FaYoutube size={20} />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-gray-600">
                                <FaFacebookF size={20} />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-gray-600">
                                <FaLinkedinIn size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Colonne 2: Legal */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="/mentions-legales" className="hover:underline">Mentions legales</Link></li>
                            <li><Link href="/cgv" className="hover:underline">CGV</Link></li>
                            <li><Link href="/confidentialite" className="hover:underline">Confidentialite</Link></li>
                            <li><Link href="/cookies" className="hover:underline">Cookies</Link></li>
                        </ul>
                    </div>

                    {/* Colonne 3: Services */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Services</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="/financement" className="hover:underline">Financement</Link></li>
                            <li><Link href="/assurance" className="hover:underline">Assurance</Link></li>
                            <li><Link href="/garantie" className="hover:underline">Garantie</Link></li>
                            <li><Link href="/livraison" className="hover:underline">Livraison</Link></li>
                        </ul>
                    </div>

                    {/* Colonne 4: Contact Us */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
                        <ul className="mt-4 space-y-2">
                            {/* Le lien "mailto:" ouvrira le client email de l'utilisateur */}
                            <li>
                                <a href="mailto:easy-rent@mail.com" className="text-blue-600 hover:underline">
                                    easy-rent@mail.com
                                </a>
                            </li>
                            {/* J'ajoute un exemple pour le téléphone, même si l'icône est petite */}
                            {/* <li>
                <a href="tel:+33123456789" className="hover:underline">+33 1 23 45 67 89</a>
              </li> */}
                        </ul>
                    </div>

                </div>
            </div>

            {/* Ligne de séparation et Copyright */}
            <div className="border-t border-gray-200">
                <div className="container mx-auto px-6 py-6 text-center text-sm text-gray-500">
                    © 2025 Easy-rent. Tous droits réservés
                </div>
            </div>
            {/* ----- BARRES DE PIED DE PAGE (Footer Bars) ----- */}
      <div className="mt-16">
        <div className="h-4 bg-blue-600"></div>
      </div>
        </footer>
    );
}