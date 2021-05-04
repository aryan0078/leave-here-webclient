export const loginApi = async (email, password) => {
  let res = fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });
  return await res;
};
export const getNotes = async (userid) => {
  let res = fetch("http://localhost:3000/user/" + userid);
  return await res;
};

export const getNote = async (noteid) => {
  let res = fetch("http://localhost:3000/notes/" + noteid);
  return await res;
};
export const updateNote = async (uid, user, content) => {
  let res = fetch("http://localhost:3000/updateNote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: uid,
      content: content,
      user: user,
      lastModified: new Date(),
    }),
  });
  return await res;
};
