const token = localStorage.getItem("token");
if (token) {
  window.location.href = "../index.html";
}

const formLogin = document.querySelector(".log-in-button");

formLogin.addEventListener("click", async function (event) {
  event.preventDefault();

  // Récupération des valeurs email et mot de passe
  const identify = {
    email: document.querySelector("[name=email]").value,
    password: document.querySelector("[name=password]").value,
  };

  console.log(identify);

  const chargeUtile = JSON.stringify(identify);

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: chargeUtile,
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      // Stocker le token
      localStorage.setItem("token", token);
      // Redirection vers la page d'accueil
      window.location.href = "../index.html";
    }
    // Affichage d'un message d'erreur
    else {
      const ErrorMsg = document.querySelector(".error-msg");
      ErrorMsg.textContent = "Erreur dans l’identifiant ou le mot de passe";
    }
    // Effacement des valeurs des champs email et password
    document.querySelector("#email").value = "";
    document.querySelector("#password").value = "";
  } catch (error) {
    console.log("une erreur est survenue", error);
  }
});
