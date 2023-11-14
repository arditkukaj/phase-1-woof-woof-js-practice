document.addEventListener('DOMContentLoaded', () => {
    const dogBar = document.getElementById('dog-bar');
    const dogInfo = document.getElementById('dog-info');
    const goodDogFilterBtn = document.getElementById('good-dog-filter');
  
    let filterGoodDogs = false; 
  

    const displayDogInfo = (dog) => {
      dogInfo.innerHTML = `
        <img src="${dog.image}" alt="${dog.name}">
        <h2>${dog.name}</h2>
        <button id="good-dog-button">${dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button> `;
  
      const goodDogButton = document.getElementById('good-dog-button');
      goodDogButton.addEventListener('click', () => {
        dog.isGoodDog = !dog.isGoodDog;
        goodDogButton.textContent = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
        updateIsGoodDogStatus(dog.id, dog.isGoodDog);
      });
    };
    const updateIsGoodDogStatus = (dogId, isGoodDog) => {
    };

    const filterAndDisplayPups = (dogs) => {
      dogBar.innerHTML = ''; 
      dogs.forEach((dog) => {
        if (!filterGoodDogs || (filterGoodDogs && dog.isGoodDog)) {
          const dogSpan = document.createElement('span');
          dogSpan.textContent = dog.name;
          dogSpan.addEventListener('click', () => {
            displayDogInfo(dog);
          });
  
          dogBar.appendChild(dogSpan);
        }
      });
    };

    const toggleFilter = () => {
      filterGoodDogs = !filterGoodDogs;
      goodDogFilterBtn.textContent = `Filter good dogs: ${filterGoodDogs ? 'ON' : 'OFF'}`;
      filterAndDisplayPups(allDogs); 
    };
  
    let allDogs = []; 
    const fetchPupData = () => {
      fetch('http://localhost:3000/pups')
        .then(response => response.json())
        .then(data => {
          allDogs = data; 
          filterAndDisplayPups(allDogs);
        })
    };
  
    goodDogFilterBtn.addEventListener('click', () => {
      toggleFilter(); 
    });
    fetchPupData();
  });