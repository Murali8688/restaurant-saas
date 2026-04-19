window.onload = function () {

  // ================= FIREBASE CONFIG =================
  const firebaseConfig = {
    apiKey: "AIzaSyB1iDZ10RbPVfznSAAk-FLrF7UBZvS1l_8",
    authDomain: "foodpro-6fe25.firebaseapp.com",
    projectId: "foodpro-6fe25",
    storageBucket: "foodpro-6fe25.appspot.com",
    messagingSenderId: "157974385682",
    appId: "1:157974385682:web:a84999c511b274c0a474cb"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth();

  let cart = [];

  // ================= LOGIN =================
  window.login = function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("app").style.display = "block";
        loadMenu();
      })
      .catch(err => {
        alert(err.message);
        console.log(err);
      });
  };

  // ================= ADD ITEM =================
  window.addItem = function () {
    const name = document.getElementById("foodName").value;
    const price = document.getElementById("foodPrice").value;
    const img = document.getElementById("foodImg").value;

    if (!name || !price || !img) {
      alert("Fill all fields");
      return;
    }

    db.collection("menu").add({
      name,
      price: Number(price),
      img
    });

    alert("Food Added!");
  };

  // ================= LOAD MENU =================
  function loadMenu() {
    db.collection("menu").onSnapshot(snapshot => {

      const menuDiv = document.getElementById("menu");
      menuDiv.innerHTML = "";

      snapshot.forEach(doc => {
        const d = doc.data();

        menuDiv.innerHTML += `
          <div class="card">
            <img src="${d.img}" width="120">
            <h3>${d.name}</h3>
            <p>₹${d.price}</p>
            <button onclick="addToCart('${d.name}', ${d.price})">Add</button>
          </div>
        `;
      });

    });
  }

  // ================= CART =================
  window.addToCart = function (name, price) {
    cart.push({ name, price });
    renderCart();
  };

  function renderCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
      total += item.price;
      cartDiv.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
    });

    cartDiv.innerHTML += `<hr><h3>Total: ₹${total}</h3>`;
  }

  // ================= WHATSAPP =================
  window.placeOrder = function () {

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    let msg = "🛒 Order:%0A";

    cart.forEach(item => {
      msg += `${item.name} - ₹${item.price}%0A`;
    });

    window.open("https://wa.me/919247479945?text=" + msg, "_blank");
  };

};
