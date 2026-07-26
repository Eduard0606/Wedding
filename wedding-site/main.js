const sections = document.querySelectorAll("section");
const popup = document.getElementById("popup");
const popupClose = document.getElementById("popupClose");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

sections.forEach((section) => {
  observer.observe(section);
});

const weddingDate = new Date("September 09, 2026 16:00:00");

function updateTimer() {
  const now = new Date();

  const difference = weddingDate - now;

  if (difference <= 0) {
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

  const minutes = Math.floor((difference / (1000 * 60)) % 60);

  const seconds = Math.floor((difference / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

setInterval(updateTimer, 1000);
updateTimer();
const scriptURL =
  "https://script.google.com/macros/s/AKfycbz_w3KwDPtwVG2fv_tLJPEUNMXINIU03MkhNWA90d99vX3cu4YZ9Zd0AbG12JB9oBg/exec";
const form = document.getElementById("guestForm");
const submitBtn = form.querySelector(".submit-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = "Отправляем...";
  const alcohol = [
    ...document.querySelectorAll('input[name="alcohol"]:checked'),
  ].map((item) => item.value);
  const food = [...document.querySelectorAll('input[name="food"]:checked')].map(
    (item) => item.value,
  );
  const data = {
    name: form.name.value,
    visit: form.visit.value,
    alcohol,
    food,
    comment: form.comment.value,
  };
  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (result.success) {
      popup.classList.add("show");
      submitBtn.textContent = "Ответ отправлен";
      form.reset();
    }
  } catch (error) {
    submitBtn.disabled = false;
    submitBtn.textContent = "Отправить ответ";
    alert("Произошла ошибка. Попробуйте ещё раз.");
    console.error(error);
  }
});
popupClose.addEventListener("click", () => {
  popup.classList.remove("show");
});

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.remove("show");
  }
});
