import md5 from "md5";

export const getGravatarUrl = (email = null) => {
  if (email) {
    // Generate hash based on email
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
  } else {
    // Generate random hash if no email
    const randomHash = md5(Math.random().toString());
    return `https://www.gravatar.com/avatar/${randomHash}?d=identicon`;
  }
};
