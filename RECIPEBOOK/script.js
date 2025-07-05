document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const bookCover = document.getElementById("bookCover");
  const recipeList = document.getElementById("recipeList");
  const recipeDetails = document.getElementById("recipeDetails");

  const recipes = {
    dal: {
      title: "Dal Tadka",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/98/Tadka_Dal.jpg",
      ingredients: [
        "1 cup toor dal",
        "½ cup chopped onions, 1 cup tomatoes",
        "2 green chilies, ginger",
        "Turmeric, asafoetida, cumin seeds",
        "Ghee, garlic, dry red chilies"
      ],
      instructions: [
        "Pressure cook dal with vegetables and spices.",
        "Prepare tadka in ghee with garlic, cumin, and chilies.",
        "Mix into dal and simmer before serving."
      ]
    },
    chicken: {
      title: "Creamy Garlic Chicken",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Creamy_Garlic_Chicken_with_Basil.jpg",
      ingredients: [
        "3 chicken breasts, flour, parmesan",
        "Salt, garlic powder, black pepper",
        "Olive oil, butter, onion",
        "6 garlic cloves, chicken broth",
        "Heavy cream, parsley"
      ],
      instructions: [
        "Season and coat chicken, pan-fry until golden.",
        "Sauté garlic and onion, add chicken broth.",
        "Add cream and parmesan, simmer chicken."
      ]
    },
    potato: {
      title: "Hasselback Potato",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Hasselback_Potatoes.jpg",
      ingredients: [
        "1 large potato, garlic cloves",
        "Butter, olive oil",
        "Rosemary, salt, pepper"
      ],
      instructions: [
        "Slice potato thinly (not all the way through).",
        "Insert garlic between slices, brush with butter/oil.",
        "Bake at 220°C until crispy outside, soft inside."
      ]
    },
    biryani: {
      title: "Chicken Biryani",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Hyderabadi_Chicken_Biryani.jpg",
      ingredients: [
        "2 cups basmati rice, 500g chicken",
        "1 cup yogurt, 2 onions, chilies",
        "Ginger-garlic paste, whole spices",
        "Mint, coriander, saffron, ghee"
      ],
      instructions: [
        "Marinate chicken with yogurt and spices.",
        "Cook partially boiled rice separately.",
        "Layer chicken and rice, cook on low 30-40 min."
      ]
    },
    alfredo: {
      title: "Pasta Alfredo",
      image: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Fettuccine_Alfredo_1.jpg",
      ingredients: [
        "Fettuccine pasta, butter, cream",
        "Garlic, parmesan cheese",
        "Salt, pepper, parsley"
      ],
      instructions: [
        "Boil pasta. Melt butter with garlic.",
        "Add cream and cheese, stir until smooth.",
        "Combine with pasta and garnish."
      ]
    },
    paneer: {
      title: "Paneer Butter Masala",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Paneer_Butter_Masala.jpg",
      ingredients: [
        "Paneer cubes, tomatoes, onions",
        "Butter, cream, cashews",
        "Ginger-garlic paste, spices"
      ],
      instructions: [
        "Sauté onions, tomatoes, and cashews; blend.",
        "Cook paste with butter and spices.",
        "Add paneer and cream; simmer."
      ]
    }
  };

  startBtn.addEventListener("click", () => {
    bookCover.classList.add("hidden");
    recipeList.classList.remove("hidden");
    recipeDetails.innerHTML = "";
  });

  document.querySelectorAll(".recipe-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const recipeKey = btn.dataset.recipe;
      showRecipe(recipeKey);
    });
  });

  function showRecipe(key) {
    const r = recipes[key];
    if (!r) return;

    let html = `
      <h2>${r.title}</h2>
      <img src="${r.image}" alt="${r.title}" class="recipe-img" />
      <h4>Ingredients:</h4>
      <ul>${r.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
      <h4>Instructions:</h4>
      <ol>${r.instructions.map(i => `<li>${i}</li>`).join("")}</ol>
      <button class="btn" id="backBtn">Back</button>
      <button class="btn" id="favBtn">Save to Favorites</button>
    `;

    recipeDetails.innerHTML = html;
    recipeList.classList.add("hidden");

    document.getElementById("backBtn").addEventListener("click", () => {
      recipeDetails.innerHTML = "";
      recipeList.classList.remove("hidden");
    });

    document.getElementById("favBtn").addEventListener("click", () => {
      let favs = JSON.parse(localStorage.getItem("favorites")) || [];
      if (!favs.includes(key)) {
        favs.push(key);
        localStorage.setItem("favorites", JSON.stringify(favs));
        alert(`${r.title} added to favorites!`);
      } else {
        alert("Already in favorites.");
      }
    });
  }

  // Optional: Display favorites on load
  const favs = JSON.parse(localStorage.getItem("favorites")) || [];
  if (favs.length > 0) {
    const favSection = document.createElement("div");
    favSection.innerHTML = `<h3>Your Favorites:</h3>`;
    favs.forEach(key => {
      if (recipes[key]) {
        const btn = document.createElement("button");
        btn.textContent = recipes[key].title;
        btn.className = "recipe-btn";
        btn.addEventListener("click", () => showRecipe(key));
        favSection.appendChild(btn);
      }
    });
    document.body.insertBefore(favSection, recipeList);
  }
});
