import crypto from "node:crypto";

export const generateSlug = (): string => {
  const scamWordsOne = ["free", "urgent", "claim", "win", "offer", "bonus", "limited", "exclusive", "hurry", "act", "now", "today", "important", "alert"];
  const scamWordsTwo = ["iphone", "prize", "bitcoin", "cash", "gift", "voucher", "discount", "loan", "deal", "promotion", "sale", "membership", "subscription"];
  const scamWordsThree = ["verify", "winner", "login", "account", "security", "password", "update", "confirm", "reset", "alert", "notification", "message"];
  const randomNumber = (length: number) => crypto.randomInt(0, length);

  return `${scamWordsOne[randomNumber(scamWordsOne.length)]}-${scamWordsTwo[randomNumber(scamWordsTwo.length)]}-${scamWordsThree[randomNumber(scamWordsThree.length)]}`;
};