import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const frenchEmail = fs.readFileSync(path.join(__dirname, 'fr-mail.html'), 'utf-8');

export const englishEmail = fs.readFileSync(path.join(__dirname, 'en-mail.html'), 'utf-8');

export const rawFrenchEmail = `
Bienvenue chez Inkom ✨

Bonjour,

Merci de vous être inscrit sur la liste d'attente Inkom ! Dès maintenant, vous bénéficiez d'avantages exclusifs réservés à notre communauté 🎉 :

- 3h de coaching 1:1 personnalisé offert
- Accès gratuit complet pendant toute la bêta
- Réduction de 60% sur l'abonnement pendant 6 mois
- Guide pratique exclusif de toutes nos fonctionnalités
- Accès VIP prioritaire aux nouvelles fonctionnalités
- Rejoindre la communauté exclusive des early adopters

Nous avons hâte de vous retrouver bientôt pour partager toutes les nouveautés d'Inkom avec vous 🚀.

Cordialement,
L'équipe Inkom

  
Vous êtes abonné à notre liste d'envoi. Nous partageons parfois des astuces et conseils pour vous aider à tirer le meilleur parti d'Inkom. Si vous décidez que vous ne souhaitez plus recevoir ces emails, cliquez simplement sur le lien ci-dessous.

Se désabonner
`;
export const rawEnglishEmail = `
Welcome to Inkom ✨
Hello,

Thanks for signing up for the Inkom waiting list! From now on, you will benefit from exclusive advantages reserved for our community 🎉 :

- 3h of personalized 1:1 coaching offered
- Complete free access during the entire beta
- 60% reduction on the subscription for 6 months
- Exclusive practical guide to all our features
- VIP Access to new features
- Join the exclusive community of early adopters

We look forward to seeing you soon to share all the new features of Inkom with you 🚀.

Best regards,
The Inkom Team

  
You are subscribed to our mailing list. We occasionally share tips and advice to help you get the most out of Inkom. If you decide that you no longer wish to receive these emails, simply click the link below.

Unsubscribe
`;
