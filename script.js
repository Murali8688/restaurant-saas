// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyB1iDZ10RbPVfznSAAk-FLrF7UBZvS1l_8",
  authDomain: "foodpro-6fe25.firebaseapp.com",
  projectId: "foodpro-6fe25",
  storageBucket: "foodpro-6fe25.appspot.com",
  messagingSenderId: "157974385682",
  appId: "1:157974385682:web:a84999c511b274c0a474cb"
};

// INIT FIREBASE
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// ================= GLOBAL VARIABLES =================
let cart = [];

// ================= LOGIN =================
function login() {
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
}

// ================= ADD FOOD =================
function addItem() {
  const name = document.getElementById("foodName").value;
  const price = document.getElementById("foodPrice").value;
  const img = document.getElementById("foodImg").value;

  if (!name || !price || !img) {
    alert("Please fill all fields");
    return;
  }

  db.collection("menu").add({
    name: name,
    price: Number(price),
    img: img
  });

  alert("Food Added!");
}

// ================= LOAD MENU =================
{
  name: "Chicken Biryani",
  price: 180,
  img: "https://source.unsplash.com/400x300/?chicken-biryani"
},
{
  name: "Mutton Biryani",
  price: 250,
  img: "https://source.unsplash.com/400x300/?mutton-biryani"
},
{
  name: "Veg Biryani",
  price: 120,
  img: "https://source.unsplash.com/400x300/?veg-biryani"
}
{
  name: "Egg Fried Rice",
  price: 130,
  img: "https://source.unsplash.com/400x300/?egg-fried-rice"
},
{
  name: "Chicken Fried Rice",
  price: 160,
  img: "https://source.unsplash.com/400x300/?chicken-fried-rice"
},
{
  name: "Veg Fried Rice",
  price: 100,
  img: "https://source.unsplash.com/400x300/?fried-rice"
}
{
  name: "Plain Dosa",
  price: 50,
  img: "https://source.unsplash.com/400x300/?dosa"
},
{
  name: "Masala Dosa",
  price: 80,
  img: "https://source.unsplash.com/400x300/?masala-dosa"
},
{
  name: "Paneer Dosa",
  price: 100,
  img: "https://source.unsplash.com/400x300/?paneer-dosa"
}
{
  name: "Chicken Curry",
  price: 170,
  img: "https://source.unsplash.com/400x300/?chicken-curry"
},
{
  name: "Butter Chicken",
  price: 220,
  img: "https://source.unsplash.com/400x300/?butter-chicken"
},
{
  name: "Chicken 65",
  price: 150,
  img: "https://source.unsplash.com/400x300/?chicken-65"
}
{
  name: "Tea",
  price: 10,
  img: "https://source.unsplash.com/400x300/?tea"
},
{
  name: "Coffee",
  price: 20,
  img: "https://source.unsplash.com/400x300/?coffee"
},
{
  name: "Masala Tea",
  price: 15,
  img: "https://source.unsplash.com/400x300/?masala-tea"
}

// ================= CART =================
function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

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

// ================= WHATSAPP ORDER =================
function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  let msg = "🛒 Order Details:%0A";

  cart.forEach(item => {
    msg += `${item.name} - ₹${item.price}%0A`;
  });

  let url = "https://wa.me/91XXXXXXXXXX?text=" + msg;

  window.open(url, "_blank");
}
