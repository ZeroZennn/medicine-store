async function fetchDB(table) {
  const response = await fetch(`data/${table}.json`);
  return response.json();
}

async function isLogin() {
  let cookie = document.cookie;
  cookie = cookie.replace("username=", "")
  let loginInfo;
  if (cookie != '') {
    await fetchDB("user")
    .then(data => {
      loginInfo = data.user.filter(x => x.username == cookie)[0];
      return loginInfo;
    }) .catch(error => {
        console.error("Error fetching user data:", error);
      }
    );
  }
  return loginInfo
}