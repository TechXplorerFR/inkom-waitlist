// Email translations for subscription/welcome email

export interface EmailTranslation {
  subject: string;
  html: string;
  text: string;
}

export const emailTranslations: { [key: string]: EmailTranslation } = {
  en: {
    subject: "🎉 Welcome to Inkom Beta - Your Exclusive Benefits Await!",
    html: `
      <!DOCTYPE html>
      <html lang=\"en\">
      <head>
        <meta charset=\"UTF-8\">
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
        <title>Welcome to Inkom Beta!</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8f9ff; color: #333; margin: 0; line-height: 1.6; }
          .container { background: #fff; max-width: 650px; margin: 40px auto; border-radius: 16px; box-shadow: 0 4px 24px rgba(67,97,238,0.08); overflow: hidden; }
          .header { background: linear-gradient(135deg, #4361ee, #7048e8); color: white; text-align: center; padding: 32px; }
          .logo { font-size: 36px; font-weight: bold; margin-bottom: 8px; }
          .title { font-size: 20px; margin: 0; opacity: 0.95; }
          .content { padding: 32px; }
          .benefits-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 24px 0; }
          .benefit-card { background: #f8f9ff; border: 1px solid #e0e4ff; border-radius: 12px; padding: 16px; text-align: center; }
          .benefit-icon { font-size: 24px; margin-bottom: 8px; }
          .benefit-title { font-weight: bold; color: #2d3748; margin-bottom: 4px; font-size: 14px; }
          .benefit-desc { font-size: 12px; color: #718096; }
          .highlight { background: linear-gradient(135deg, #4361ee, #7048e8); color: white; padding: 20px; border-radius: 12px; margin: 24px 0; text-align: center; }
          .cta-button { display: inline-block; background: #4361ee; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 16px 0; }
          .footer { text-align: center; color: #718096; font-size: 14px; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 24px; }
          @media (max-width: 600px) { .benefits-grid { grid-template-columns: 1fr; } }
        </style>
      </head>
      <body>
        <div class=\"container\">
          <div class=\"header\">
            <div class=\"logo\">🚀 Inkom</div>
            <p class=\"title\">Welcome to Our Exclusive Beta Waitlist!</p>
          </div>
          <div class=\"content\">
            <p><strong>Hello future Inkom pioneer!</strong></p>
            <p>🎯 You've successfully joined our exclusive beta waitlist! You're now part of a select group who will transform social media management forever.</p>
            
            <div class=\"highlight\">
              <h3 style=\"margin-top:0;\">🌟 Your Exclusive Early Adopter Benefits</h3>
              <p style=\"margin-bottom:0;\">Because you joined early, you get access to incredible exclusive benefits worth hundreds of euros!</p>
            </div>

            <div class=\"benefits-grid\">
              <div class=\"benefit-card\">
                <div class=\"benefit-icon\">🎓</div>
                <div class=\"benefit-title\">3h Personal Coaching</div>
                <div class=\"benefit-desc\">Free 1:1 strategy session with our experts</div>
              </div>
              <div class=\"benefit-card\">
                <div class=\"benefit-icon\">✅</div>
                <div class=\"benefit-title\">Free Beta Access</div>
                <div class=\"benefit-desc\">Complete access to all premium features</div>
              </div>
              <div class=\"benefit-card\">
                <div class=\"benefit-icon\">💰</div>
                <div class=\"benefit-title\">60% Discount</div>
                <div class=\"benefit-desc\">Huge savings for 6 months post-launch</div>
              </div>
              <div class=\"benefit-card\">
                <div class=\"benefit-icon\">📚</div>
                <div class=\"benefit-title\">Exclusive Guide</div>
                <div class=\"benefit-desc\">Master all features with our complete manual</div>
              </div>
              <div class=\"benefit-card\">
                <div class=\"benefit-icon\">⚡</div>
                <div class=\"benefit-title\">VIP Access</div>
                <div class=\"benefit-desc\">First to test every new feature</div>
              </div>
              <div class=\"benefit-card\">
                <div class=\"benefit-icon\">👥</div>
                <div class=\"benefit-title\">Elite Community</div>
                <div class=\"benefit-desc\">Join our exclusive entrepreneurs network</div>
              </div>
            </div>

            <div style=\"background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 16px; margin: 24px 0;\">
              <p style=\"margin: 0; color: #856404;\"><strong>⏰ Limited Time:</strong> Beta spots are limited! You're securing your place in an exclusive group.</p>
            </div>

            <h3>What happens next?</h3>
            <ul>
              <li>🚀 <strong>Beta Launch Notification:</strong> Be the first to know when we go live</li>
              <li>📧 <strong>Exclusive Updates:</strong> Get insider access to new features and improvements</li>
              <li>🎁 <strong>Special Offers:</strong> Receive early adopter bonuses and exclusive deals</li>
              <li>🤝 <strong>Direct Line to Founders:</strong> Your feedback shapes Inkom's future</li>
            </ul>

            <div class=\"highlight\">
              <h3 style=\"margin-top:0;\">Ready to revolutionize your social media?</h3>
              <p>Join our community and start preparing for the transformation!</p>
              <a href=\"https://inkom.ai\" class=\"cta-button\" style=\"color: white;\">Visit Our Website</a>
            </div>

            <p><strong>Legal Notice:</strong><br>
            In accordance with GDPR regulations, your data is used solely for Inkom product communications. You can exercise your rights to access, modify, or delete your data by replying to this email.<br>
            <a href=\"https://inkom.ai/unsubscribe?email={{EMAIL}}\" style=\"color:#4361ee;\">Unsubscribe here</a> if you no longer wish to receive our updates.</p>
          </div>
          <div class=\"footer\">
            <p><strong>The Inkom Team</strong><br>
            Building the future of social media automation</p>
            <p style=\"font-size:12px;color:#999;margin-top:16px;\">
              Questions? Reply to this email - we'd love to hear from you!<br>
              <a href=\"https://inkom.ai/unsubscribe?email={{EMAIL}}\" style=\"color:#4361ee;\">Unsubscribe</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  text: `🎉 Welcome to Inkom Beta - Your Exclusive Benefits Await!

Hello future Inkom pioneer!

🎯 You've successfully joined our exclusive beta waitlist! You're now part of a select group who will transform social media management forever.

🌟 YOUR EXCLUSIVE EARLY ADOPTER BENEFITS:
Because you joined early, you get access to incredible exclusive benefits worth hundreds of euros!

✅ 3h Personal Coaching - Free 1:1 strategy session with our experts
✅ Free Beta Access - Complete access to all premium features  
✅ 60% Discount - Huge savings for 6 months post-launch
✅ Exclusive Guide - Master all features with our complete manual
✅ VIP Access - First to test every new feature
✅ Elite Community - Join our exclusive entrepreneurs network

⏰ LIMITED TIME: Beta spots are limited! You're securing your place in an exclusive group.

WHAT HAPPENS NEXT?
🚀 Beta Launch Notification: Be the first to know when we go live
📧 Exclusive Updates: Get insider access to new features and improvements  
🎁 Special Offers: Receive early adopter bonuses and exclusive deals
🤝 Direct Line to Founders: Your feedback shapes Inkom's future

Ready to revolutionize your social media? Join our community and start preparing for the transformation!

Visit: https://inkom.ai

Legal Notice:
In accordance with GDPR regulations, your data is used solely for Inkom product communications. You can exercise your rights to access, modify, or delete your data by replying to this email.
Unsubscribe: https://inkom.ai/unsubscribe?email={{EMAIL}}

The Inkom Team
Building the future of social media automation

Questions? Reply to this email - we'd love to hear from you!`
  },
  fr: {
    subject: "🎉 Bienvenue dans la Bêta Inkom - Vos Avantages Exclusifs Vous Attendent !",
    html: `
      <!DOCTYPE html>
      <html lang=\"fr\">
      <head>
        <meta charset=\"UTF-8\">
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
        <title>Bienvenue dans la Bêta Inkom !</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8f9ff; color: #333; margin: 0; line-height: 1.6; }
          .container { background: #fff; max-width: 650px; margin: 40px auto; border-radius: 16px; box-shadow: 0 4px 24px rgba(67,97,238,0.08); overflow: hidden; }
          .header { background: linear-gradient(135deg, #4361ee, #7048e8); color: white; text-align: center; padding: 32px; }
          .logo { font-size: 36px; font-weight: bold; margin-bottom: 8px; }
          .title { font-size: 20px; margin: 0; opacity: 0.95; }
          .content { padding: 32px; }
          .benefits-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 24px 0; }
          .benefit-card { background: #f8f9ff; border: 1px solid #e0e4ff; border-radius: 12px; padding: 16px; text-align: center; }
          .benefit-icon { font-size: 24px; margin-bottom: 8px; }
          .benefit-title { font-weight: bold; color: #2d3748; margin-bottom: 4px; font-size: 14px; }
          .benefit-desc { font-size: 12px; color: #718096; }
          .highlight { background: linear-gradient(135deg, #4361ee, #7048e8); color: white; padding: 20px; border-radius: 12px; margin: 24px 0; text-align: center; }
          .cta-button { display: inline-block; background: #4361ee; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 16px 0; }
          .footer { text-align: center; color: #718096; font-size: 14px; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 24px; }
          @media (max-width: 600px) { .benefits-grid { grid-template-columns: 1fr; } }
        </style>
      </head>
      <body>
        <div class=\"container\">
          <div class=\"header\">
            <div class=\"logo\">🚀 Inkom</div>
            <p class=\"title\">Bienvenue dans Notre Liste d'Attente Bêta Exclusive !</p>
          </div>
          <div class=\"content\">
            <p><strong>Bonjour futur pionnier d'Inkom !</strong></p>
            <p>🎯 Vous avez rejoint avec succès notre liste d'attente bêta exclusive ! Vous faites maintenant partie d'un groupe sélect qui va transformer la gestion des réseaux sociaux à jamais.</p>
            
            <div class=\"highlight\">
              <h3 style=\"margin-top:0;\">🌟 Vos Avantages Exclusifs d'Early Adopter</h3>
              <p style=\"margin-bottom:0;\">Parce que vous nous avez rejoint tôt, vous avez accès à des avantages exclusifs incroyables d'une valeur de plusieurs centaines d'euros !</p>
            </div>

            <div class=\"benefits-grid\">
              <div class=\"benefit-card\">
                <div class=\"benefit-icon\">🎓</div>
                <div class=\"benefit-title\">3h de Coaching Personnel</div>
                <div class=\"benefit-desc\">Session de stratégie 1:1 gratuite avec nos experts</div>
              </div>
              <div class=\"benefit-card\">
                <div class=\"benefit-icon\">✅</div>
                <div class=\"benefit-title\">Accès Bêta Gratuit</div>
                <div class=\"benefit-desc\">Accès complet à toutes les fonctionnalités premium</div>
              </div>
              <div class=\"benefit-card\">
                <div class=\"benefit-icon\">💰</div>
                <div class=\"benefit-title\">Réduction de 60%</div>
                <div class=\"benefit-desc\">Économies importantes pendant 6 mois post-lancement</div>
              </div>
              <div class=\"benefit-card\">
                <div class=\"benefit-icon\">📚</div>
                <div class=\"benefit-title\">Guide Exclusif</div>
                <div class=\"benefit-desc\">Maîtrisez toutes les fonctionnalités avec notre manuel complet</div>
              </div>
              <div class=\"benefit-card\">
                <div class=\"benefit-icon\">⚡</div>
                <div class=\"benefit-title\">Accès VIP</div>
                <div class=\"benefit-desc\">Premier à tester chaque nouvelle fonctionnalité</div>
              </div>
              <div class=\"benefit-card\">
                <div class=\"benefit-icon\">👥</div>
                <div class=\"benefit-title\">Communauté Elite</div>
                <div class=\"benefit-desc\">Rejoignez notre réseau exclusif d'entrepreneurs</div>
              </div>
            </div>

            <div style=\"background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 16px; margin: 24px 0;\">
              <p style=\"margin: 0; color: #856404;\"><strong>⏰ Temps Limité :</strong> Les places bêta sont limitées ! Vous sécurisez votre place dans un groupe exclusif.</p>
            </div>

            <h3>Que se passe-t-il maintenant ?</h3>
            <ul>
              <li>🚀 <strong>Notification de Lancement Bêta :</strong> Soyez le premier informé quand nous serons en ligne</li>
              <li>📧 <strong>Mises à Jour Exclusives :</strong> Accès privilégié aux nouvelles fonctionnalités et améliorations</li>
              <li>🎁 <strong>Offres Spéciales :</strong> Recevez des bonus d'early adopter et offres exclusives</li>
              <li>🤝 <strong>Ligne Directe avec les Fondateurs :</strong> Vos retours façonnent l'avenir d'Inkom</li>
            </ul>

            <div class=\"highlight\">
              <h3 style=\"margin-top:0;\">Prêt à révolutionner vos réseaux sociaux ?</h3>
              <p>Rejoignez notre communauté et préparez-vous à la transformation !</p>
              <a href=\"https://inkom.ai\" class=\"cta-button\" style=\"color: white;\">Visiter Notre Site</a>
            </div>

            <p><strong>Mentions Légales :</strong><br>
            Conformément au RGPD, vos données sont utilisées uniquement pour les communications produit Inkom. Vous pouvez exercer vos droits d'accès, modification ou suppression en répondant à cet email.<br>
            <a href=\"https://inkom.ai/unsubscribe?email={{EMAIL}}\" style=\"color:#4361ee;\">Désabonnez-vous ici</a> si vous ne souhaitez plus recevoir nos mises à jour.</p>
          </div>
          <div class=\"footer\">
            <p><strong>L'Équipe Inkom</strong><br>
            Construisons l'avenir de l'automatisation des réseaux sociaux</p>
            <p style=\"font-size:12px;color:#999;margin-top:16px;\">
              Des questions ? Répondez à cet email - nous adorons avoir de vos nouvelles !<br>
              <a href=\"https://inkom.ai/unsubscribe?email={{EMAIL}}\" style=\"color:#4361ee;\">Se désabonner</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  text: `🎉 Bienvenue dans la Bêta Inkom - Vos Avantages Exclusifs Vous Attendent !

Bonjour futur pionnier d'Inkom !

🎯 Vous avez rejoint avec succès notre liste d'attente bêta exclusive ! Vous faites maintenant partie d'un groupe sélect qui va transformer la gestion des réseaux sociaux à jamais.

🌟 VOS AVANTAGES EXCLUSIFS D'EARLY ADOPTER :
Parce que vous nous avez rejoint tôt, vous avez accès à des avantages exclusifs incroyables d'une valeur de plusieurs centaines d'euros !

✅ 3h de Coaching Personnel - Session de stratégie 1:1 gratuite avec nos experts
✅ Accès Bêta Gratuit - Accès complet à toutes les fonctionnalités premium
✅ Réduction de 60% - Économies importantes pendant 6 mois post-lancement
✅ Guide Exclusif - Maîtrisez toutes les fonctionnalités avec notre manuel complet
✅ Accès VIP - Premier à tester chaque nouvelle fonctionnalité
✅ Communauté Elite - Rejoignez notre réseau exclusif d'entrepreneurs

⏰ TEMPS LIMITÉ : Les places bêta sont limitées ! Vous sécurisez votre place dans un groupe exclusif.

QUE SE PASSE-T-IL MAINTENANT ?
🚀 Notification de Lancement Bêta : Soyez le premier informé quand nous serons en ligne
📧 Mises à Jour Exclusives : Accès privilégié aux nouvelles fonctionnalités et améliorations
🎁 Offres Spéciales : Recevez des bonus d'early adopter et offres exclusives  
🤝 Ligne Directe avec les Fondateurs : Vos retours façonnent l'avenir d'Inkom

Prêt à révolutionner vos réseaux sociaux ? Rejoignez notre communauté et préparez-vous à la transformation !

Visitez : https://inkom.ai

Mentions Légales :
Conformément au RGPD, vos données sont utilisées uniquement pour les communications produit Inkom. Vous pouvez exercer vos droits d'accès, modification ou suppression en répondant à cet email.
Désabonnement : https://inkom.ai/unsubscribe?email={{EMAIL}}

L'Équipe Inkom
Construisons l'avenir de l'automatisation des réseaux sociaux

Des questions ? Répondez à cet email - nous adorons avoir de vos nouvelles !`
  }
  // Add more languages as needed
};
