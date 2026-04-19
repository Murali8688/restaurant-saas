// 🔥 FIREBASE CONFIG (replace with your Firebase project)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

let cart = [];

/* 🔐 LOGIN */
function login(){
  auth.signInWithEmailAndPassword(email.value, password.value)
  .then(()=>{
    loginBox.style.display="none";
    app.style.display="block";
    loadMenu();
  })
  .catch(err=>alert(err.message));
}

/* 🍽️ ADD FOOD */
function addItem(){
  db.collection("menu").add({
    name: foodName.value,
    price: foodPrice.value,
    img: foodImg.value
  });
}

/* 📥 LOAD MENU */
function loadMenu(){
  db.collection("menu").onSnapshot(snap=>{
    menu.innerHTML="";
    snap.forEach(doc=>{
      let d = doc.data();

      menu.innerHTML += `
        <div>
          <img src="${d.img}">
          <h3>${d.name}</h3>
          <p>₹${d.price}</p>
          <button onclick="addToCart('${d.name}',${d.price})">Add</button>
        </div>
      `;
    });
  });
}

/* 🛒 CART */
function addToCart(name,price){
  cart.push({name,price});
  renderCart();
}

function renderCart(){
  cartDiv = document.getElementById("cart");
  cartDiv.innerHTML="";

  cart.forEach(c=>{
    cartDiv.innerHTML += `<p>${c.name} - ₹${c.price}</p>`;
  });
}

/* 📲 WHATSAPP ORDER */
function placeOrder(){
  let msg="Order:%0A";

  cart.forEach(c=>{
    msg += `${c.name} - ₹${c.price}%0A`;
  });

  window.open("https://wa.me/91XXXXXXXXXX?text="+msg);
}
