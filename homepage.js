
document.addEventListener("DOMContentLoaded", function(){

    const storedVodTrackerArray = JSON.parse(localStorage.getItem('vodTrackerArray')) || [];
    const storedCurrentNotesArray = JSON.parse(localStorage.getItem('currentNotesArray')) || [];
    const storedPreviousNotesArray = JSON.parse(localStorage.getItem('previousNotesArray')) || [];
    const storedCountCard = parseInt(localStorage.getItem('countCard')) || 0;

    vodTrackerArray = storedVodTrackerArray;
    currentNotesArray = storedCurrentNotesArray;
    previousNotesArray = storedPreviousNotesArray;
    countCard = storedCountCard;

    storedVodTrackerArray.forEach((_, index) => {
        const cardHolderDiv = document.createElement("div");
        const btnHolderDiv = document.createElement("div");
        const cardBtn = document.createElement("button");

        cardHolderDiv.classList.add("cardholder");
        btnHolderDiv.classList.add("btnholder");
        cardBtn.classList.add("card");
        cardBtn.id = `${index}`;
        
        cardBtn.textContent = "bAtch NuMber, current NuMber";

        btnHolderDiv.append(cardBtn);
        cardHolderDiv.append(btnHolderDiv);
        displayerEl.append(cardHolderDiv);

        displayerItems.push(cardBtn);
    });

    renderCard();
});

const addBatchBtn = document.querySelector(".add-bAtchs");
const removeBatchBtn = document.querySelector(".remove-bAtchs");
const displayerEl = document.querySelector(".displayer");
let displayerItems = [];
let vodTrackerArray = [];
let currentNotesArray = [];
let previousNotesArray = [];
let countCard =  parseInt(localStorage.getItem('countCard')) || 0;

addBatchBtn.addEventListener("click", function(){
    const cardHolderDiv = document.createElement("div");
    const btnHolderDiv = document.createElement("div");
    const cardBtn = document.createElement("button");

    cardHolderDiv.classList.add("cardholder");
    btnHolderDiv.classList.add("btnholder");
    cardBtn.classList.add("card");
    cardBtn.id = `${countCard}`;
    countCard++;
    localStorage.setItem('countCard', countCard);
    cardBtn.textContent = "bAtch NuMber, current NuMber";

    btnHolderDiv.append(cardBtn);
    cardHolderDiv.append(btnHolderDiv);
    displayerEl.append(cardHolderDiv);

    displayerItems.push(cardBtn);
    renderCard();
})

removeBatchBtn.addEventListener("click", function(){
    // const storedVodTrackerArray = JSON.parse(localStorage.getItem("vodTrackerArray")) || [];
    // const storedCurrentNotesArray = JSON.parse(localStorage.getItem('currentNotesArray')) || [];
    // const storedPreviousNotesArray = JSON.parse(localStorage.getItem('previousNotesArray')) || [];

    // const storedArrays = [storedVodTrackerArray, storedCurrentNotesArray, storedPreviousNotesArray];

    // storedArrays.forEach
    countCard--;
    localStorage.setItem('countCard', countCard);
    vodTrackerArray.pop();
    currentNotesArray.pop();
    previousNotesArray.pop();
    displayerEl.removeChild(displayerItems[displayerItems.length-1].parentElement.parentElement);
    displayerItems.pop();

    localStorage.setItem('vodTrackerArray', JSON.stringify(vodTrackerArray));
    localStorage.setItem('currentNotesArray', JSON.stringify(currentNotesArray));
    localStorage.setItem('previousNotesArray', JSON.stringify(previousNotesArray))



})
function renderCard(){
    displayerItems.forEach((btn) => {
        btn.addEventListener("click", function(){
            let importantElements = [];
            let informationElements = [];
            const parentButtonDiv = getParent(btn);
            const parentContainer = getParent(parentButtonDiv);
            
            parentContainer.style.height = "500px";

            createCloseMark(parentContainer, parentButtonDiv, importantElements);
            createInformationDiv(parentContainer, importantElements, informationElements, btn.id);
            revertOriginal(parentContainer, parentButtonDiv, importantElements, informationElements, btn.id);

        });
    });
}

function getParent(btn){
    return btn.parentElement;
}

function createCloseMark(parentContainer, parentButtonDiv, importantElements){
    const closeMarkContainer = document.createElement("div");
    closeMarkContainer.classList.add("close-mark");
    const closeMark = document.createElement("button");
    closeMark.classList.add("close-btn");
    closeMark.textContent = "SAvE";
    closeMark.style.color = "whitesmoke";
    closeMarkContainer.append(closeMark);
    parentContainer.removeChild(parentButtonDiv);
    parentContainer.append(closeMarkContainer);
    importantElements.push(closeMark);
    importantElements.push(closeMarkContainer);
}

function createInformationDiv(parentContainer, importantElements, informationElements, cardId){
    // Creates all the required elements
    const informationDiv = document.createElement("div");
    const vodTrackerLinks = document.createElement("div");
    const vodTrackerLinksHeadingDiv = document.createElement("div");
    const vodTrackerLinksContentDiv = document.createElement("div");
    const vodTrackerLinksHeading = document.createElement("h1");
    const notesDiv = document.createElement("div");
    const currentNotes = document.createElement("div");
    const currentNotesHeadingDiv = document.createElement("div");
    const currentNotesContentDiv = document.createElement("div");
    const currentNotesHeading = document.createElement("h1");
    const inputCurrentNotes = document.createElement("textarea");
    const inputPreviousNotes = document.createElement("textarea");
    const inputVodTracker = document.createElement("textarea");
    const previousNotes = document.createElement("div");
    const previousNotesHeadingDiv = document.createElement("div");
    const previousNotesContentDiv = document.createElement("div");
    const previousNotesHeading = document.createElement("h1");
    
    // Adds all the required classes to the respective elements
    informationDiv.classList.add("information-div");
    vodTrackerLinks.classList.add("vod-tracker");
    notesDiv.classList.add("notes-div");
    currentNotes.classList.add("current-notes");
    previousNotes.classList.add("previous-notes");
    vodTrackerLinksHeadingDiv.classList.add("heading-vod");
    vodTrackerLinksContentDiv.classList.add("content-vod");
    currentNotesHeadingDiv.classList.add("heading-current");
    currentNotesContentDiv.classList.add("content-current");
    previousNotesHeadingDiv.classList.add("heading-previous");
    previousNotesContentDiv.classList.add("content-previous");

    // Styling the elements
    inputVodTracker.style.resize = "none";
    inputVodTracker.setAttribute("placeholder", "VOD and Tracker Links");
    inputCurrentNotes.style.resize = "none";
    inputCurrentNotes.setAttribute("placeholder", "Current Notes");
    inputPreviousNotes.style.resize = "none";
    inputPreviousNotes.setAttribute("placeholder", "Previous Notes");
    vodTrackerLinksHeading.textContent = "vOD And TrAcker Links";
    currentNotesHeading.textContent = "Current Notes";
    previousNotesHeading.textContent = "Previous Notes";

    inputVodTracker.value = vodTrackerArray[cardId] || "";
    inputCurrentNotes.value = currentNotesArray[cardId] || "";
    inputPreviousNotes.value = previousNotesArray[cardId] || "";

    // Appending all the
    vodTrackerLinksHeadingDiv.append(vodTrackerLinksHeading);
    vodTrackerLinks.append(vodTrackerLinksHeadingDiv);
    vodTrackerLinksContentDiv.append(inputVodTracker);
    vodTrackerLinks.append(vodTrackerLinksContentDiv);
    currentNotesHeadingDiv.append(currentNotesHeading);
    currentNotes.append(currentNotesHeadingDiv);
    currentNotesContentDiv.append(inputCurrentNotes);
    currentNotes.append(currentNotesContentDiv);
    previousNotesHeadingDiv.append(previousNotesHeading);
    previousNotes.append(previousNotesHeadingDiv);
    previousNotesContentDiv.append(inputPreviousNotes);
    previousNotes.append(previousNotesContentDiv);
    informationDiv.append(vodTrackerLinks);
    notesDiv.append(currentNotes);
    notesDiv.append(previousNotes);
    informationDiv.append(notesDiv);
    parentContainer.append(informationDiv);

    importantElements.push(informationDiv);
    informationElements.push(inputVodTracker, inputCurrentNotes, inputPreviousNotes);
}

function revertOriginal(parentContainer, parentButtonDiv, importantElements, informationElements, cardId){
    importantElements[0].addEventListener("click", function(){

        vodTrackerArray[cardId] = informationElements[0].value;
        currentNotesArray[cardId] = informationElements[1].value;
        previousNotesArray[cardId] = informationElements[2].value;

        localStorage.setItem('vodTrackerArray', JSON.stringify(vodTrackerArray));
        localStorage.setItem('currentNotesArray', JSON.stringify(currentNotesArray));
        localStorage.setItem('previousNotesArray', JSON.stringify(previousNotesArray))

        parentContainer.style.height = "100px";
        parentContainer.removeChild(importantElements[1]);
        parentContainer.removeChild(importantElements[2]);
        parentContainer.append(parentButtonDiv);
    })
}