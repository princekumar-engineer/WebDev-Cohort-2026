const getAnonymousIdentifier = (req) => {
  const forwarded = req.headers["x-forwarded-for"];

  const ip = forwarded
    ? forwarded.split(",")[0]
    : req.socket.remoteAddress;

  const userAgent = req.headers["user-agent"] || "unknown";

  return `${ip}-${userAgent}`;
};

export default getAnonymousIdentifier;