const burgerMenu = document.querySelector('.burger-menu');
const navbar = document.querySelector('.navbar');
const overlay = document.querySelector('.overlay');
const body = document.body;

function toggleMenu() {
    burgerMenu.classList.toggle('burger-open');
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
    

    if (navbar.classList.contains('active')) {
      body.style.overflow = 'hidden';  
  } else {
      body.style.overflow = 'auto'; 
  }
}

burgerMenu.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', toggleMenu);
});

const pets = [
    { name: "Katrine", img: "assets/img/pets-katrine.png" },
    { name: "Jennifer", img: "assets/img/pets-jennifer.png" },
    { name: "Woody", img: "assets/img/pets-woody.png" },
    { name: "Sophia", img: "assets/img/pets-sophia.png" },
    { name: "Timmy", img: "assets/img/pets-timmy.png" },
    { name: "Charly", img: "assets/img/pets-charly.png" },
    { name: "Scarlett", img: "assets/img/pets-scarlet.png" },
    { name: "Freddie", img: "assets/img/pets-freddie.png" }
];

let petsArray = [];
const pages = 6; 
let currentPage = 1;
let petsPerPage = 8;
let totalPages = pages;

const carousel = document.querySelector('.pets-cards');
const currentPageDisplay = document.querySelector('.current-page span');
const firstPageBtn = document.querySelector('.first-page');
const prevPageBtn = document.querySelector('.prev-page');
const nextPageBtn = document.querySelector('.next-page');
const lastPageBtn = document.querySelector('.last-page');


function generatePetsArray() {
    for (let i = 0; i < 6; i++) {
        petsArray = petsArray.concat(pets);
    }
    petsArray = shuffleArray(petsArray); 
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
function generatePetsArray() {
    petsArray = [];
    const copies = Math.ceil((pets.length * 6) / pets.length); 

    
    for (let i = 0; i < totalPages; i++) {
        
        const shuffledPets = shuffleArray([...pets]);
        petsArray = petsArray.concat(shuffledPets);
    }
}

function updatePage() {
    
    const start = (currentPage - 1) * petsPerPage;
    const end = start + petsPerPage;
    const currentPets = petsArray.slice(start, end);

    
    carousel.innerHTML = '';

    
    currentPets.forEach(pet => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img class="pets-image" src="${pet.img}" alt="${pet.name}">
            <p class="pet-name">${pet.name}</p>
            <button class="pets-button">Learn more</button>
        `;
        carousel.appendChild(card);
    });

    
    currentPageDisplay.textContent = currentPage;

   
    updatePaginationButtons();
    assignCardEventHandlers();
}

function updatePaginationButtons() {
    
    if (currentPage === 1) {
        firstPageBtn.disabled = true;
        prevPageBtn.disabled = true;
        firstPageBtn.classList.add('button-paginator-inactive');
        prevPageBtn.classList.add('button-paginator-inactive');
    } else {
        firstPageBtn.disabled = false;
        prevPageBtn.disabled = false;
        firstPageBtn.classList.remove('button-paginator-inactive');
        prevPageBtn.classList.remove('button-paginator-inactive');
    }

    
    if (currentPage === totalPages) {
        nextPageBtn.disabled = true;
        lastPageBtn.disabled = true;
        nextPageBtn.classList.add('button-paginator-inactive');
        lastPageBtn.classList.add('button-paginator-inactive');
    } else {
        nextPageBtn.disabled = false;
        lastPageBtn.disabled = false;
        nextPageBtn.classList.remove('button-paginator-inactive');
        lastPageBtn.classList.remove('button-paginator-inactive');
    }
}


firstPageBtn.addEventListener('click', () => {
    currentPage = 1;
    updatePage();
});

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        updatePage();
    }
});

nextPageBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        updatePage();
    }
});

lastPageBtn.addEventListener('click', () => {
    currentPage = totalPages;
    updatePage();
});


window.addEventListener('resize', () => {
    const width = window.innerWidth;
    if (width <= 319) {
        petsPerPage = 1;
        totalPages = 48;
    } else if (width <= 767) {
        petsPerPage = 3;
        totalPages = 16;
    } else if (width <=1279) {
        petsPerPage = 6;
        totalPages = 8;
    }    else {
        petsPerPage = 8;
        totalPages = 6;
    } 
    updatePage();
});


generatePetsArray();
updatePage();


function updatePaginationButtons() {
   
    if (currentPage === 1) {
        firstPageBtn.disabled = true;
        prevPageBtn.disabled = true;
        firstPageBtn.classList.add('button-paginator-inactive');
        prevPageBtn.classList.add('button-paginator-inactive');
        
        firstPageBtn.classList.remove('button-paginator'); 
        prevPageBtn.classList.remove('button-paginator');
    } else {
        firstPageBtn.disabled = false;
        prevPageBtn.disabled = false;
        firstPageBtn.classList.remove('button-paginator-inactive');
        prevPageBtn.classList.remove('button-paginator-inactive');
        
        firstPageBtn.classList.add('button-paginator'); 
        prevPageBtn.classList.add('button-paginator');
    }

   
    if (currentPage === totalPages) {
        nextPageBtn.disabled = true;
        lastPageBtn.disabled = true;
        nextPageBtn.classList.add('button-paginator-inactive');
        lastPageBtn.classList.add('button-paginator-inactive');
        
        nextPageBtn.classList.remove('button-paginator');
        lastPageBtn.classList.remove('button-paginator');
    } else {
        nextPageBtn.disabled = false;
        lastPageBtn.disabled = false;
        nextPageBtn.classList.remove('button-paginator-inactive');
        lastPageBtn.classList.remove('button-paginator-inactive');
        
        nextPageBtn.classList.add('button-paginator');
        lastPageBtn.classList.add('button-paginator');
    }
}

function updatePaginationButtons() {
    
    if (currentPage === 1) {
        firstPageBtn.disabled = true;
        prevPageBtn.disabled = true;
        firstPageBtn.classList.add('button-paginator-inactive');
        prevPageBtn.classList.add('button-paginator-inactive');
        
        firstPageBtn.classList.remove('button-paginator');
        prevPageBtn.classList.remove('button-paginator');

       
        firstPageBtn.querySelector('span').classList.add('inactive');
        prevPageBtn.querySelector('span').classList.add('inactive');
        firstPageBtn.querySelector('span').classList.remove('active');
        prevPageBtn.querySelector('span').classList.remove('active');
    } else {
        firstPageBtn.disabled = false;
        prevPageBtn.disabled = false;
        firstPageBtn.classList.remove('button-paginator-inactive');
        prevPageBtn.classList.remove('button-paginator-inactive');
        
        firstPageBtn.classList.add('button-paginator');
        prevPageBtn.classList.add('button-paginator');

        
        firstPageBtn.querySelector('span').classList.remove('inactive');
        prevPageBtn.querySelector('span').classList.remove('inactive');
        firstPageBtn.querySelector('span').classList.add('active');
        prevPageBtn.querySelector('span').classList.add('active');
    }

   
    if (currentPage === totalPages) {
        nextPageBtn.disabled = true;
        lastPageBtn.disabled = true;
        nextPageBtn.classList.add('button-paginator-inactive');
        lastPageBtn.classList.add('button-paginator-inactive');
        
        nextPageBtn.classList.remove('button-paginator');
        lastPageBtn.classList.remove('button-paginator');

        
        nextPageBtn.querySelector('span').classList.add('inactive');
        lastPageBtn.querySelector('span').classList.add('inactive');
        nextPageBtn.querySelector('span').classList.remove('active');
        lastPageBtn.querySelector('span').classList.remove('active');
    } else {
        nextPageBtn.disabled = false;
        lastPageBtn.disabled = false;
        nextPageBtn.classList.remove('button-paginator-inactive');
        lastPageBtn.classList.remove('button-paginator-inactive');
        
        nextPageBtn.classList.add('button-paginator');
        lastPageBtn.classList.add('button-paginator');

        
        nextPageBtn.querySelector('span').classList.remove('inactive');
        lastPageBtn.querySelector('span').classList.remove('inactive');
        nextPageBtn.querySelector('span').classList.add('active');
        lastPageBtn.querySelector('span').classList.add('active');
    }
}

const petsInfo = {
    "Jennifer": {
      title: "Jennifer",
      subtitle: "Dog - Labrador",
      description: "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      image: "./assets/img/pets-jennifer.png",
      age: "2 months",
      inoculations: "none",
      diseases: "none",
      parasites: "none"
    },
    "Sophia": {
      title: "Sophia",
      subtitle: "Dog - Shih Tzu",
      description: "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      image: "./assets/img/pets-sophia.png",
      age: "1.5 years",
      inoculations: "none",
      diseases: "none",
      parasites: "none"
    },
    "Woody": {
      title: "Woody",
      subtitle: "Dog - Golden Retriever",
      description: "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      image: "./assets/img/pets-woody.png",
      age: "3.5 years",
      inoculations: "none",
      diseases: "none",
      parasites: "none"
    },
    "Scarlett": {
      title: "Scarlett",
      subtitle: "Dog - Jack Russell Terrier",
      description: "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      image: "./assets/img/pets-scarlet.png",
      age: "2 years",
      inoculations: "none",
      diseases: "none",
      parasites: "none"
    },
    "Katrine": {
      title: "Katrine",
      subtitle: "Cat - British Shorthair",
      description: "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxation.",
      image: "./assets/img/pets-katrine.png",
      age: "1.5 years",
      inoculations: "none",
      diseases: "none",
      parasites: "none"
    },
    "Timmy": {
      title: "Timmy",
      subtitle: "Cat - British Shorthair",
      description: "Timmy is an adorable grey British Shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      image: "./assets/img/pets-timmy.png",
      age: "1 year",
      inoculations: "up to date",
      diseases: "none",
      parasites: "none"
    },
    "Freddie": {
      title: "Freddie",
      subtitle: "Cat - British Shorthair",
      description: "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      image: "./assets/img/pets-freddie.png",
      age: "2 years",
      inoculations: "none",
      diseases: "none",
      parasites: "none"
    },
    "Charly": {
      title: "Charly",
      subtitle: "Dog - Jack Russell Terrier",
      description: "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      image: "./assets/img/pets-charly.png",
      age: "3 years",
      inoculations: "none",
      diseases: "none",
      parasites: "none"
    }
  };
  
  
  const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('close-btn');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const modalDescription = document.getElementById('modal-description');
const modalImage = document.getElementById('modal-img');
const modalAge = document.getElementById('modal-age');
const modalInoculations = document.getElementById('modal-inoculations');
const modalDiseases = document.getElementById('modal-diseases');
const modalParasites = document.getElementById('modal-parasites');

function assignCardEventHandlers() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function () {
            const petName = this.querySelector('.pet-name').textContent;
            const petInfo = petsInfo[petName];
            if (petInfo) {
                modalTitle.textContent = petInfo.title;
                modalSubtitle.textContent = petInfo.subtitle;
                modalDescription.textContent = petInfo.description;
                modalImage.src = petInfo.image;
                modalAge.textContent = petInfo.age;
                modalInoculations.textContent = petInfo.inoculations;
                modalDiseases.textContent = petInfo.diseases;
                modalParasites.textContent = petInfo.parasites;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

closeModalBtn.addEventListener('click', function () {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; 
});

window.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});
