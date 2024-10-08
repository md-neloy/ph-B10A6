// scroll to the bestFriend section
const bestFriend = () => {
  document.getElementById("bestFriend").scrollIntoView({ behavior: "smooth" });
};

const ApiButton = document.getElementById("ApiButton");
// create loadCategories function
const loadCategories = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await response.json();
  displayCategoryBtn(data.categories);
};
// create display category button function
const displayCategoryBtn = (categories) => {
  categories.forEach((category) => {
    const btnDiv = document.createElement("div");
    btnDiv.classList.add("w-2/6", "text-center");
    btnDiv.innerHTML = `<button id="active-${category.category}" onclick="categoresPetDisplay('${category.category}')" class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg lg:p-6 w-full h-full shadow-white bg-white activebtn"><img src="${category.category_icon}"/>${category.category}</button>`;
    ApiButton.appendChild(btnDiv);
  });
};
loadCategories();

// find ShowApiPets section where i can add my all pets cards
const ShowApiPets = document.getElementById("ShowApiPets");


// show all the pets in showApiPets sectio by their name
const categoresPetDisplay = async (category) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  const data = await response.json();
  preloader.classList.remove("hidden");
  ShowApiPets.classList.add("hidden");
  setTimeout(() => {
    ShowApiPets.classList.remove("hidden");
    preloader.classList.add("hidden");
    displayAllPets(data.data);
  }, 2000);
  removeActiveClass();
  document.getElementById(`active-${category}`).classList.add("active");
};


// find all the buttons & create removeActiveClass function
function removeActiveClass() {
  document.querySelectorAll(".activebtn").forEach((active) => {
    active.classList.remove("active");
  });
}


// find the loaderdiv
const preloader = document.getElementById("preloader");

// fetch all pets
const fectAllPets = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await response.json();
  preloader.classList.remove("hidden");
  ShowApiPets.classList.add("hidden");

  setTimeout(() => {
    ShowApiPets.classList.remove("hidden");
    preloader.classList.add("hidden");
    displayAllPets(data.pets);
  }, 2000);
};

const displayAllPets = (pets) => {
    // find the sort button
    const sortbtn = document.getElementById("sortbtn");
    const arr = pets;
    sortbtn.addEventListener("click", () => {
        arr.sort((a, b) => {
            const priceA = parseFloat(a.price);
            const priceB = parseFloat(b.price);
            return priceB - priceA;
        })
        displayAllPets(arr);
    })
  ShowApiPets.innerHTML = "";
  if (pets.length == 0) {
    ShowApiPets.classList.remove("grid");
    const nofoundDiv = document.createElement("div");
    nofoundDiv.classList.add("bg-[rgba(19,19,19,0.3)]", "py-24", "px-3");
    nofoundDiv.innerHTML = `
            <div class="flex justify-center items-center"><img src="./images/error.webp"/></div>
            <h3 class="text-primary text-3xl font-bold mt-6 mb-4 text-center">No Information Available</h3>
            <p class="text-secondary text-[16px] text-base text-center lg:w-[720px] mx-auto">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
            its layout. The point of using Lorem Ipsum is that it has a.</P>

        `;
    ShowApiPets.appendChild(nofoundDiv);
    return;
  }
  ShowApiPets.classList.add("grid");
  arr.forEach((pet) => {
      let birth = pet.date_of_birth;
      if (!birth) {
          birth = "unavailable"
      }
      let gender = pet.gender;
      if (!gender) {
          gender = "unavailabe";
      }
      let breed = pet.breed;
      if (!breed) {
          breed="unavailabe"
      }
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
            <div class="card card-compact bg-base-100 w-full p-5 shadow-xl">
                <figure>
                    <img
                    class="h-[272px] object-cover"
                    src="${pet.image}"
                    alt="petImage" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${pet.pet_name}</h2>
                    <p class="flex gap-2 justify-normal items-center"><img src="./images/breed.png"/><span>Breed: ${breed}</span></p>
                    <p class="flex gap-2 justify-normal items-center"><img src="./images/birth.png"/><span>Birth: ${birth}</span></p>
                    <p class="flex gap-2 justify-normal items-center"><img src="./images/gender.png"/><span>Gender: ${gender}</span></p>
                    <p class="flex gap-2 justify-normal items-center"><img src="./images/price.png"/><span>Price: ${pet.price}$</span></p>
                    <hr/>
                    <div class="card-actions justify-between items-center">
                    <button class="btn btn-primary hover:border-brand hover:bg-transparent bg-white shadow-white border-2 border-brand border-solid" onclick="addImg(${pet.petId},this)"><img class="w-5 h-5 fill-white object-fill" src="https://img.icons8.com/?size=50&id=24816&format=png"/></button>
                    <button class="btn btn-primary hover:border-brand text-brand hover:bg-brand hover:text-white  bg-white shadow-white border-2 border-brand border-solid" onclick="handsakeModal(this)">Adopt</button>
                    <button  class="btn btn-primary hover:border-brand text-brand hover:bg-brand hover:text-white bg-white shadow-white border-2 border-brand border-solid" onclick="modalDesign(${pet.petId})">Details</button>
                    </div>
                </div>
            </div>
        `;
    ShowApiPets.appendChild(cardDiv);
  });
};

fectAllPets();

// add the specific like pet images in the showpetImg div
const showpetImg = document.getElementById("showpetImg");
const addImg = async (petId,element) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await response.json();
  const imgDiv = document.createElement("div");
  // toggole for like background color
  if (element.id == `id-${petId}`) {
    element.id = "";
    let childId = document.getElementById(`Cid-${petId}`);
    element.classList.remove("bg-brand","hover:bg-brand");
    element.classList.add("bg-white","hover:bg-transparent");
    childId.parentNode.removeChild(childId);
  } else {
    element.id = `id-${petId}`;
    element.classList.add("bg-brand","hover:bg-brand");
    element.classList.remove("bg-white","hover:bg-transparent");
    imgDiv.classList.add("lg:h-[125px]");
    imgDiv.id = `Cid-${petId}`;
    imgDiv.innerHTML = `<img src="${data.petData.image}" class="w-full h-full object-cover"/>`;
    showpetImg.appendChild(imgDiv);
  }
};
// create modalDesign function for details button
const modalDesign = async (petId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await response.json();
  const modalText = document.getElementById("modalText");
  modalText.innerHTML = "";
  const textarea = document.createElement("div");
  textarea.innerHTML = `
        <div class="card card-compact bg-base-100 w-full p-5 shadow-xl">
                <figure>
                    <img
                    class="h-[272px] lg:object-cover"
                    src="${data.petData.image}"
                    alt="petImage" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${data.petData.pet_name}</h2>
                    <div class="flex gap-5 justify-between items-center">
                        <p class="flex gap-2 justify-normal items-center w-1/2"><img src="./images/breed.png"/><span>Breed: ${data.petData.breed}</span></p>
                        <p class="flex gap-2 justify-normal items-center w-1/2"><img src="./images/birth.png"/><span>Birth: ${data.petData.date_of_birth}</span></p>
                    </div>
                    <div class="flex gap-5 justify-between items-center">
                        <p class="flex gap-2 justify-normal items-center w-1/2"><img src="./images/gender.png"/><span>Gender: ${data.petData.gender}</span></p>
                        <p class="flex gap-2 justify-normal items-center w-1/2"><img src="./images/price.png"/><span>Price: ${data.petData.price}$</span></p>
                    </div>
                    <p class="flex gap-2 justify-normal items-center"><img src="./images/gender.png"/><span>Vaccubated status: ${data.petData.vaccinated_status}</span></p>
                    <hr>
                    <div>
                        <h3 class="text-[16px] font-semibold text-primary">Details Information</h3>
                        <p class="text-[16px] text-secondary mt-3">${data.petData.pet_details}</p>
                    </div>
                </div>
            </div>
    `;
  modalText.appendChild(textarea);
  my_modal_1.showModal();
};

// create handsakeModal function for adopt button

const handsakeModal = (element) => {
  let countdown = 3;
  const countdownTime = document.getElementById("countdownTime");
  countdownTime.innerText = countdown;
  const count = setInterval(() => {
    countdownTime.innerText = countdown - 1;
    countdown--;
  }, 1000);
  setTimeout(() => {
    clearInterval(count);
    countdownTime.innerText = "";
    element.disabled = true;
    my_modal_2.close();
  }, 3000);
  my_modal_2.showModal();
};
