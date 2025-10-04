import { emailIconUrls, createEmailImage } from './emailIcons.js';

export const frenchEmail = `
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bienvenue sur Inkom !</title>
    <style>
      body {
        font-family: "Segoe UI", Arial, sans-serif;
        background: #f8f9ff;
        color: #333;
        margin: 0;
      }
      .container {
        background: #fff;
        max-width: 600px;
        margin: 40px auto;
        border-radius: 16px;
        box-shadow: 0 4px 24px rgba(67, 97, 238, 0.08);
        padding: 0;
        overflow: hidden;
      }
      .header {
        text-align: center;
        background: rgba(46, 107, 245, 0.2);
        padding: 24px 32px;
      }
      .header img.banner {
        width: 100%;
        max-height: 180px;
        object-fit: cover;
        border-bottom: 1px solid #e2e8f0;
      }
      .logo {
        color: #2e6bf5;
        font-size: 32px;
        font-weight: bold;
        margin: 16px 0 8px;
      }
      .title {
        color: #2d3748;
        font-size: 24px;
        margin: 0;
      }
      .content {
        padding: 32px;
      }
      .benefits {
        margin: 32px 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      .benefit-card {
        background: rgba(46, 107, 245, 0.15);
        border-radius: 16px;
        padding: 16px;
        text-align: center;
        box-shadow: 0 2px 10px rgba(67, 97, 238, 0.08);
      }
      .benefit-card img {
        width: 36px;
        height: 36px;
        margin-bottom: 8px;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
      .benefit-card span {
        font-size: 15px;
        color: #2d3748;
        display: block;
      }
      .footer {
        text-align: center;
        color: #718096;
        font-size: 14px;
        margin-top: 40px;
        border-top: 1px solid #e2e8f0;
        padding: 24px;
      }
      .socials {
        margin: 16px 0;
      }
      .socials a {
        margin: 0 8px;
        display: inline-block;
      }
      .socials img {
        width: 24px;
        height: 24px;
        transition: opacity 0.2s;
      }
      .socials a:hover img {
        opacity: 0.7;
      }
      .unsubscribe {
        font-size: 12px;
        color: #999;
        margin-top: 16px;
      }
      .unsubscribe a {
        color: #2e6bf5;
        text-decoration: underline;
      }
      @media (max-width: 600px) {
        .benefits {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        ${createEmailImage(emailIconUrls.logo, 'Inkom Logo', 200, 67, 'margin-bottom: 16px;')}
        <h1 class="title">Bienvenue sur notre liste d'attente !</h1>
      </div>

      <div class="content">
        <p>
          <strong>Bonjour et bienvenue !</strong>
        </p>

        <p>
          Merci de vous être inscrit à notre liste d'attente pour Inkom ! Vous
          faites maintenant partie d'un groupe exclusif qui sera le premier à
          découvrir notre plateforme révolutionnaire d'automatisation des
          réseaux sociaux.
        </p>

        <!-- Avantages en bento avec Images -->
        <div class="benefits">
          <div class="benefit-card">
            ${createEmailImage(emailIconUrls.coaching, 'Coaching Personnel', 36, 36)}
            <span
              ><strong>3h de coaching personnel</strong> avec nos experts pour
              optimiser votre stratégie</span
            >
          </div>
          <div class="benefit-card">
            ${createEmailImage(emailIconUrls.access, 'Accès Bêta', 36, 36)}
            <span
              ><strong>Accès bêta gratuit</strong> à toutes les fonctionnalités
              premium</span
            >
          </div>
          <div class="benefit-card">
            ${createEmailImage(emailIconUrls.discount, 'Réduction', 36, 36)}
            <span
              ><strong>Réduction de 60%</strong> sur l'abonnement pendant 6
              mois</span
            >
          </div>
          <div class="benefit-card">
            ${createEmailImage(emailIconUrls.guide, 'Guide Exclusif', 36, 36)}
            <span
              ><strong>Guide pratique exclusif</strong> de toutes nos
              fonctionnalités</span
            >
          </div>
          <div class="benefit-card">
            ${createEmailImage(emailIconUrls.vip, 'Accès VIP', 36, 36)}
            <span
              >Accès <strong>VIP prioritaire</strong> aux nouvelles
              fonctionnalités</span
            >
          </div>
          <div class="benefit-card">
            ${createEmailImage(emailIconUrls.community, 'Communauté Elite', 36, 36)}
            <span
              >Rejoindre la <strong>communauté exclusive</strong> des early
              adopters</span
            >
          </div>
        </div>

        <p>
          Nous avons hâte de vous retrouver bientôt pour partager toutes les
          nouveautés d'Inkom avec vous 🚀.
        </p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>Cordialement,<br />L'équipe Inkom</p>

        <div class="socials">
          <a href="https://twitter.com/inkom" target="_blank">
            ${createEmailImage(emailIconUrls.twitter, 'Twitter', 24, 24)}
          </a>
          <a href="https://linkedin.com/company/inkom" target="_blank">
            ${createEmailImage(emailIconUrls.linkedin, 'LinkedIn', 24, 24)}
          </a>
          <a href="https://instagram.com/inkom" target="_blank">
            ${createEmailImage(emailIconUrls.instagram, 'Instagram', 24, 24)}
          </a>
        </div>

        <p style="font-size: 13px; color: #555; margin: 20px 0">
          Vous êtes abonné à notre liste d'envoi. Nous partageons parfois des
          astuces et conseils pour vous aider à tirer le meilleur parti d'Inkom.
          Si vous décidez que vous ne souhaitez plus recevoir ces emails,
          cliquez simplement sur le lien ci-dessous.
        </p>

        <p class="unsubscribe">
          <a href="https://inkom.ai/unsubscribe?email={{EMAIL}}">
            Se désabonner
          </a>
        </p>
      </div>
    </div>
  </body>
</html>
`;

export const englishEmail = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Inkom!</title>
    <style>
      body {
        font-family: "Segoe UI", Arial, sans-serif;
        background: #f8f9ff;
        color: #333;
        margin: 0;
      }
      .container {
        background: #fff;
        max-width: 600px;
        margin: 40px auto;
        border-radius: 16px;
        box-shadow: 0 4px 24px rgba(67, 97, 238, 0.08);
        padding: 0;
        overflow: hidden;
      }
      .header {
        text-align: center;
        background: rgba(46, 107, 245, 0.2);
        padding: 24px 32px;
      }
      .header img.banner {
        width: 100%;
        max-height: 180px;
        object-fit: cover;
        border-bottom: 1px solid #e2e8f0;
      }
      .logo {
        color: #2e6bf5;
        font-size: 32px;
        font-weight: bold;
        margin: 16px 0 8px;
      }
      .title {
        color: #2d3748;
        font-size: 24px;
        margin: 0;
      }
      .content {
        padding: 32px;
      }
      .benefits {
        margin: 32px 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      .benefit-card {
        background: rgba(46, 107, 245, 0.15);
        border-radius: 16px;
        padding: 16px;
        text-align: center;
        box-shadow: 0 2px 10px rgba(67, 97, 238, 0.08);
      }
      .benefit-card img {
        width: 36px;
        height: 36px;
        margin-bottom: 8px;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
      .benefit-card span {
        font-size: 15px;
        color: #2d3748;
        display: block;
      }
      .footer {
        text-align: center;
        color: #718096;
        font-size: 14px;
        margin-top: 40px;
        border-top: 1px solid #e2e8f0;
        padding: 24px;
      }
      .socials {
        margin: 16px 0;
      }
      .socials a {
        margin: 0 8px;
        display: inline-block;
      }
      .socials img {
        width: 24px;
        height: 24px;
        transition: opacity 0.2s;
      }
      .socials a:hover img {
        opacity: 0.7;
      }
      .unsubscribe {
        font-size: 12px;
        color: #999;
        margin-top: 16px;
      }
      .unsubscribe a {
        color: #2e6bf5;
        text-decoration: underline;
      }
      @media (max-width: 600px) {
        .benefits {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        ${createEmailImage(emailIconUrls.logo, 'Inkom Logo', 200, 67, 'margin-bottom: 16px;')}
        <h1 class="title">Welcome to our waitlist!</h1>
      </div>

      <div class="content">
        <p>
          <strong>Hello and welcome!</strong>
        </p>

        <p>
          Thank you for signing up for our Inkom waitlist! You are now part of
          an exclusive group that will be the first to discover our
          revolutionary social media automation platform.
        </p>

        <!-- Benefits with Images -->
        <div class="benefits">
          <div class="benefit-card">
            ${createEmailImage(emailIconUrls.coaching, 'Personal Coaching', 36, 36)}
            <span
              ><strong>3h personal coaching</strong> with our experts to
              optimize your strategy</span
            >
          </div>
          <div class="benefit-card">
            ${createEmailImage(emailIconUrls.access, 'Beta Access', 36, 36)}
            <span
              ><strong>Free beta access</strong> to all premium features</span
            >
          </div>
          <div class="benefit-card">
            ${createEmailImage(emailIconUrls.discount, 'Discount', 36, 36)}
            <span
              ><strong>60% discount</strong> on subscription for 6 months</span
            >
          </div>
          <div class="benefit-card">
            ${createEmailImage(emailIconUrls.guide, 'Exclusive Guide', 36, 36)}
            <span
              ><strong>Exclusive practical guide</strong> to all our features</span
            >
          </div>
          <div class="benefit-card">
            ${createEmailImage(emailIconUrls.vip, 'VIP Access', 36, 36)}
            <span
              ><strong>VIP priority access</strong> to new features</span
            >
          </div>
          <div class="benefit-card">
            ${createEmailImage(emailIconUrls.community, 'Elite Community', 36, 36)}
            <span
              >Join the <strong>exclusive community</strong> of early adopters</span
            >
          </div>
        </div>

        <p>
          We can't wait to connect with you soon to share all the Inkom news
          with you 🚀.
        </p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>Best regards,<br />The Inkom team</p>

        <div class="socials">
          <a href="https://twitter.com/inkom" target="_blank">
            ${createEmailImage(emailIconUrls.twitter, 'Twitter', 24, 24)}
          </a>
          <a href="https://linkedin.com/company/inkom" target="_blank">
            ${createEmailImage(emailIconUrls.linkedin, 'LinkedIn', 24, 24)}
          </a>
          <a href="https://instagram.com/inkom" target="_blank">
            ${createEmailImage(emailIconUrls.instagram, 'Instagram', 24, 24)}
          </a>
        </div>

        <p style="font-size: 13px; color: #555; margin: 20px 0">
          You are subscribed to our mailing list. We sometimes share tips and
          advice to help you get the most out of Inkom. If you decide you no
          longer want to receive these emails, simply click the link below.
        </p>

        <p class="unsubscribe">
          <a href="https://inkom.ai/unsubscribe?email={{EMAIL}}">
            Unsubscribe
          </a>
        </p>
      </div>
    </div>
  </body>
</html>
`;

export const rawFrenchEmail = `
Bienvenue chez Inkom ✨

Bonjour,

Merci de vous être inscrit sur la liste d'attente Inkom ! Dès maintenant, vous bénéficiez d'avantages exclusifs réservés à notre communauté 🎉 :

3h de coaching 1:1 personnalisé offert
Accès gratuit complet pendant toute la bêta
Réduction de 60% sur l'abonnement pendant 6 mois
Guide pratique exclusif de toutes nos fonctionnalités
Accès VIP prioritaire aux nouvelles fonctionnalités
Rejoindre la communauté exclusive des early adopters
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

3h of personalized 1:1 coaching offered
Complete free access during the entire beta
60% reduction on the subscription for 6 months
Exclusive practical guide to all our features
VIP Access to new features
Join the exclusive community of early adopters
We look forward to seeing you soon to share all the new features of Inkom with you 🚀.

Best regards,
The Inkom Team

  
You are subscribed to our mailing list. We occasionally share tips and advice to help you get the most out of Inkom. If you decide that you no longer wish to receive these emails, simply click the link below.

Unsubscribe
`;
