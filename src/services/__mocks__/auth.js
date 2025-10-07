export const login = (email, password) => {
  console.log("Mock API: Logging in with", email, password);
  const userName = email.split('@')[0].replace(/[._]/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const initials = userName.split(' ').map(n => n[0]).join('').substring(0, 2);
  return Promise.resolve({
    fullName: userName,
    email: email,
    photoURL: `https://placehold.co/40x40/d1d5db/4b5563?text=${initials}`
  });
};

export const signup = (fullName, email, password) => {
  console.log("Mock API: Signing up with", fullName, email, password);
  const initials = fullName.split(' ').map(n => n[0]).join('').substring(0, 2);
  return Promise.resolve({
    fullName: fullName,
    email: email,
    photoURL: `https://placehold.co/40x40/d1d5db/4b5563?text=${initials}`
  });
};

export const logout = () => {
  console.log("Mock API: Logging out");
  return Promise.resolve();
};