(async () => {
    await getUser();
    if (!user) {
        alert("Please login first");
        location.href = "index.html";
    }
})();