// DRAFT. Have this reviewed by someone qualified in Nigerian data protection law
// before launch, and update it whenever the product changes (for example when
// the admin area, analytics or any form of storage is added).
export const PRIVACY_UPDATED = "8 October 2026";

export const PRIVACY_SUMMARY = [
  "We do not ask you to sign up.",
  "Your answers stay in your browser and are not sent to us.",
  "We do not sell or share personal information.",
];

export const PRIVACY_SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "What we collect",
    body: [
      "Nothing from the meal planner. The answers you give about your stage of pregnancy, allergies and budget are used on your own device to build your plan. They are not sent to our servers, and they are gone when you close or refresh the page.",
    ],
  },
  {
    title: "Copying your plan",
    body: [
      "When you use Copy plan, the text goes to your phone's clipboard. We never see it. What you do with it, such as sending it on WhatsApp, is up to you.",
    ],
  },
  {
    title: "Technical information",
    body: [
      "Like most websites, our hosting provider may record basic technical details when you visit, such as your IP address, browser type and the pages requested. This is used to keep the site secure and working. We do not use it to identify you.",
    ],
  },
  {
    title: "Visit counts and cookies",
    body: [
      "We may count how many people visit using a privacy-friendly tool that does not use cookies and does not follow you across other sites. The planner does not use advertising or tracking cookies.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "Under the Nigeria Data Protection Act 2023 you have rights over your personal data, including the right to ask what we hold about you and to ask us to correct or delete it. Because we do not collect personal data from the planner, there is usually nothing to correct or delete, but you can contact us at any time.",
    ],
  },
  {
    title: "Our approach",
    body: [
      "We aim to follow the Nigeria Data Protection Act 2023 and to collect as little information as we can.",
    ],
  },
  {
    title: "Changes to this page",
    body: [
      "If we change how the site works, we will update this page and the date at the top.",
    ],
  },
];
