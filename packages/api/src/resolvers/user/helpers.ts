import { type Session } from "../../models/session";

export const isSessionExpired = (
  session: Session,
): boolean => {

  const date = new Date();
  date.setHours(date.getHours() - 24);
  const lastUpdateDate = new Date(session.updatedAt);

  return date > lastUpdateDate;
};
