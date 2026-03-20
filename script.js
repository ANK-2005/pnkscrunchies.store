const firebaseConfig = {
  apiKey:"YOUR_API_KEY",
  authDomain:"YOUR_PROJECT.firebaseapp.com",
  projectId:"YOUR_PROJECT"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// SCROLL ANIMATION
function revealOnScroll(){
  const elements = document.querySelectorAll('.fade-up, .card');

  elements.forEach((el, i)=>{
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if(top < windowHeight - 50){
      setTimeout(()=>{
        el.classList.add('show');
      }, i * 100); // stagger delay
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
// PAGE LOAD FADE
document.body.style.opacity = 0;

window.onload = () => {
  document.body.style.transition = "opacity 1s ease";
  document.body.style.opacity = 1;
};
// PARALLAX EFFECT
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  document.querySelectorAll(".card img").forEach(img => {
    img.style.transform = `translateY(${scrollY * 0.05}px) scale(1.05)`;
  });
});
// ADVANCED SCROLL REVEAL
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".fade-up").forEach(el=>{
  observer.observe(el);
});

// HOVER FLOAT EFFECT
document.addEventListener("mousemove", (e) => {
  document.querySelectorAll(".card").forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 20;
    const rotateY = (x - centerX) / 20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
});
// PAGE FADE IN
document.body.style.opacity = 0;

window.onload = () => {
  document.body.style.transition = "opacity 1.2s ease";
  document.body.style.opacity = 1;
};
<p class="stock">Only ${Math.floor(Math.random()*5)+3} left</p>
function checkout(){
  let total = cart.reduce((s,i)=>s+i.price,0);

  if(cart.length >= 2){
    total = total * 0.9; // 10% discount
  }
  function addToCart(p){
  cart.push(p);
  updateCart();

  alert("Added to cart ?");
}
    function viewProduct(name, price, image){
  window.location.href =
    `product.html?name=${encodeURIComponent(name)}&price=${price}&image=${encodeURIComponent(image)}`;
}
  function openCheckout(){
  document.getElementById("checkoutModal").classList.remove("hidden");
}
    function payOnline(){

  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const address = document.getElementById("custAddress").value;

  if(!name || !phone || !address){
    return alert("Please fill all details");
  }

  const total = cart.reduce((s,i)=>s+i.price,0);

  const options = {
    key: "YOUR_RAZORPAY_KEY",
    amount: total * 100,
    currency: "INR",

    handler: function(res){

      db.collection("orders").add({
        name, phone, address,
        items: cart,
        amount: total,
        paymentId: res.razorpay_payment_id,
        status: "paid"
      });

      alert("Payment Successful 💖");
    }
  };

  new Razorpay(options).open();
}
    function cashOnDelivery(){

  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const address = document.getElementById("custAddress").value;

  if(!name || !phone || !address){
    return alert("Please fill all details");
  }

  const total = cart.reduce((s,i)=>s+i.price,0);

  db.collection("orders").add({
    name, phone, address,
    items: cart,
    amount: total,
    status: "Paid"
  });

  alert("Order Placed 💖");
}
    function loadReviews(){

  db.collection("reviews")
    .where("product", "==", product.name)
    .get()
    .then(snap=>{
      let html="";

      snap.forEach(doc=>{
        const r = doc.data();
        html += `
        <div class="review">
          <b>${r.name}</b>
          <p>${r.text}</p>
        </div>`;
      });

      document.getElementById("reviewsList").innerHTML = html;
    });

}
    function addReview(){
      
<h2 id="avgRating">⭐ 0.0</h2>
      
  const name = document.getElementById("reviewName").value;
  const text = document.getElementById("reviewText").value;
      
      db.collection("reviews").add({
  product: product.name,
  name,
  text,
  rating: selectedRating
})
      
      html += `
<div class="review">
  <b>${r.name}</b>
  <div>${"★".repeat(r.rating || 5)}</div>
  <p>${r.text}</p>
</div>`;

  if(!name || !text){
    return alert("Write something first");
  }

  db.collection("reviews").add({
    product: product.name,
    name,
    text
  }).then(()=>{
    document.getElementById("reviewName").value = "";
    document.getElementById("reviewText").value = "";
    loadReviews();
  });

}
    let totalRating = 0;
let count = 0;

snap.forEach(doc=>{
  const r = doc.data();

  totalRating += r.rating || 5;
  count++;

  html += `
  <div class="review">
    <b>${r.name}</b>
    <div>${"★".repeat(r.rating || 5)}</div>
    <p>${r.text}</p>
  </div>`;
});

const avg = count ? (totalRating / count).toFixed(1) : 0;
document.getElementById("avgRating").innerText = "⭐ " + avg;
    
    const mainImg = document.getElementById("mainImg");
const thumbs = document.getElementById("thumbs");

mainImg.src = product.images[0];

product.images.forEach((img, index)=>{
  const t = document.createElement("img");
  t.src = img;

  if(index === 0) t.classList.add("active");

  t.onclick = ()=>{
    mainImg.src = img;

    document.querySelectorAll(".thumbs img")
      .forEach(i=>i.classList.remove("active"));

    t.classList.add("active");
  };

  thumbs.appendChild(t);
});
    let current = 0;

mainImg.addEventListener("touchstart", e=>{
  startX = e.touches[0].clientX;
});

mainImg.addEventListener("touchend", e=>{
  let endX = e.changedTouches[0].clientX;

  if(endX < startX - 50){
    current = (current + 1) % product.images.length;
  }
  if(endX > startX + 50){
    current = (current - 1 + product.images.length) % product.images.length;
  }

  mainImg.src = product.images[current];
});
    {
  name: "Silk Scrunchie",
  price: 299,
  images: ["img1.jpg", "img2.jpg"],
  video: "video.mp4"
}
    const mediaBox = document.getElementById("mediaBox");
const thumbs = document.getElementById("thumbs");

let mediaList = [...product.images];

// Add video if exists
if(product.video){
  mediaList.push(product.video);
}

let current = 0;

// Render main media
function showMedia(index){
  current = index;

  const src = mediaList[index];

  if(src.endsWith(".mp4")){
    mediaBox.innerHTML = `
      <video src="${src}" autoplay muted loop playsinline></video>
    `;
  } else {
    mediaBox.innerHTML = `
      <img src="${src}">
    `;
  }

  document.querySelectorAll(".thumbs img")
    .forEach((t,i)=>{
      t.classList.toggle("active", i === index);
    });
}

// Thumbnails
mediaList.forEach((src, index)=>{
  const t = document.createElement("img");

  // Show video thumbnail as image (optional)
  if(src.endsWith(".mp4")){
    t.src = product.images[0]; // fallback thumbnail
  } else {
    t.src = src;
  }

  t.onclick = ()=> showMedia(index);

  thumbs.appendChild(t);
});

// Load first
showMedia(0);
    let startX = 0;

mediaBox.addEventListener("touchstart", e=>{
  startX = e.touches[0].clientX;
});

mediaBox.addEventListener("touchend", e=>{
  let endX = e.changedTouches[0].clientX;

  if(endX < startX - 50){
    current = (current + 1) % mediaList.length;
  }

  if(endX > startX + 50){
    current = (current - 1 + mediaList.length) % mediaList.length;
  }

  showMedia(current);
});
    const zoomBox = document.getElementById("mediaBox");

zoomBox.addEventListener("mousemove", (e) => {

  const img = zoomBox.querySelector("img");
  if(!img) return;

  const rect = zoomBox.getBoundingClientRect();

  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;

  img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
  img.style.transform = "scale(1.8)";
});

zoomBox.addEventListener("mouseleave", () => {
  const img = zoomBox.querySelector("img");
  if(img){
    img.style.transform = "scale(1)";
  }
});
    function showMedia(index){
  current = index;

  const src = mediaList[index];

  if(src.endsWith(".mp4")){
    mediaBox.innerHTML = `
      <video src="${src}" autoplay muted loop playsinline></video>
    `;
  } else {
    mediaBox.innerHTML = `
      <img src="${src}" class="zoom-img">
    `;
  }
}
    window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  document.querySelectorAll(".editorial-img img, .lifestyle").forEach(el=>{
    el.style.transform = `translateY(${scrollY * 0.1}px)`;
  });
});