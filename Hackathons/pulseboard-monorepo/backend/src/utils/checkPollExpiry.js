const checkPollExpiry = (expiryTime) => {
  if (!expiryTime) {
    return false;
  }

  return new Date() > new Date(expiryTime);
};

export default checkPollExpiry;