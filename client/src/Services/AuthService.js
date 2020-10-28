 export default {
  adminLogin: (user) => {
    return fetch("/admin/adminLogin", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { isAuthenticated: false, user: { matric: "", role: "" } };
    });
  },
  userLogin: (user) => {
    return fetch("/user/userLogin", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { isAuthenticated: false, user: { matric: "", role: "" } };
    });
  },
  register: (user) => {
    return fetch("/user/register", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  adminRegisteration: (user) => {
    return fetch("/admin/adminRegister", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  logout: () => {
    return fetch("/user/logout")
      .then((res) => res.json())
      .then((data) => data);
  },
  adminLogout: () => {
    return fetch("/admin/adminLogout")
      .then((res) => res.json())
      .then((data) => data);
  },
  isAuthenticated: () => {
    return fetch("/user/authenticated").then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { isAuthenticated: false, user: { matric: "", role: "" } };
    });
  },
};

