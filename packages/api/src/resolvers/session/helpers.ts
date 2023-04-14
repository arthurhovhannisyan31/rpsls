import { type Session } from "../../models/session";

export const isSessionExpired = (
  session: Session,
): boolean => {

  const date = new Date();
  date.setHours(date.getHours());
  const lastUpdateDate = new Date(session.updatedAt);

  return date > lastUpdateDate;
};
