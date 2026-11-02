//get the cover page and newspaper reader sections
const cover=document.getElementById("cover");
const reader=document.getElementById("reader");

//get the buttons to open the newspaper
const openIssueButtons=document.querySelectorAll("#cover .open-paper");

//get the buttons to close the newspaper and navigate between pages
const closePaperButton=document.getElementById("closePaper");
const previousButton=document.getElementById("prevPage");
const nextButton=document.getElementById("nextPage");
const nextButtonBottom=document.getElementById("nextPageBottom");

//get the left and right pages of the newspaper and the book element
const leftPage=document.getElementById("leftPage");
const rightPage=document.getElementById("rightPage");
const book=document.getElementById("book");

//get the page number and total number of pages elements
const pageNumber=document.getElementById("pageNumber");
const pageTotal=document.getElementById("pageTotal");

//store the current spread index
let currentSpread=0;

//store the newspaper pages data as an array of arrays, each containing two articles and each article containing a kicker, title, link, image, standfirst and body
const newspaperPages=[
    [
        {
            kicker: "ABOUT",
            title: "Computer Science, Design & Technology.",
            link:"about.html",
            image:"media/about/profile.png",
            standfirst:"A computer science engineer exploring AI, interaction design and human-centered technology.",
            body:"Welcome to THE PORTFOLIO TIMES: a collection of my research, professional experience, technical skills and ideas. Explore the stories behind the projects, the questions that inspire them and the technologies that bring them to life."

        },

        {
            kicker:"RESEARCH & AI",
            title:"AI & Human-Computer Interaction",
            link:"research.html",
            image:"media/research/RESEARCH.png",
            standfirst:"Exploring AI, multimodal systems and accessible interaction.",
            body:"Research is an opportunity to investigate difficult questions, text ideas and consider how intelligent systems might better support the peopel who use them "
        }
    ],
    [
       {

        kicker: "PROFESSIONAL",
        title: "Building systems. Solving problems.",
        link:"professional.html",
        image:"media/professional/Professional.png",
        standfirst: "Software development and enterprise system experience.",
        body: "My experience as a Systems Engineer at Tata Consultancy Services involved full-stack development, Salesforce administration, configuration and testing and investigating technical issues."
       },

    {
        kicker:"SKILLS & TECHNOLOGY",
        title:"Technical Skills & Tools.",
        link:"skills.html",
        image:"media/skills/Skills.png",
        standfirst:"Software engineering, applied AI and interactive media.",
        body: "My technical foundations include programming, databases, machine learning and software development. My studies in Interactive Digital Media extend this work into visual computing, design and immersive technologies"
    }
    ],

    [
        {

        kicker: "EXTRAS",
        title: "Projects, Programmes & Communities",
        link:"extras.html",
        image:"media/extras/6.png",
        standfirst: "Professional development, technology communities and continuous learning",
        body: "Alongside academic and professional experience, I value opportunities to learn from new challenges, collaborate with others and develop skills beyond the classroom."

        },

        {

        kicker: "ABOUT",
        title: "My academic and professional journey",
        link:"about.html",
        image:"media/about/about.png",
        standfirst: "A journey through computer science, research and interactive technology.",
        body: "I am pursuing an MSc in Interactive Digital Media at Trinity College Dublin. I am particularly interested in human-computer interaction, AI and inclusive technologies that respond thoughtfully to user's needs."
        }
    ]
];


//function to open the newspaper reader and hide the cover page, set the current spread to 0 and display the first spread
function openNewspaper(){
    if(!cover || !reader){
        return;
    }

    cover.hidden=true; //hide the cover page
    reader.hidden=false;

    currentSpread=0; //set the current spread to 0
    displaySpread(); //display the first spread

    window.scrollTo(0,0); //scroll to the top of the page
}

//function to close the newspaper reader and show the cover page
function closeNewspaper(){
    //check if the cover and reader elements exist
    if(!cover || !reader){
        return;
    }

    reader.hidden=true; //hide the reader section
    cover.hidden=false; //show the cover section

    window.scrollTo(0,0); //scroll to the top of the page
} 

//add event listeners to the open issue buttons to open the newspaper reader when clicked
openIssueButtons.forEach(function (button){
    button.addEventListener ("click", function (event){
        event.preventDefault();
    openNewspaper();
});
});

//add event listener to the close paper button to close the newspaper reader when clicked
if(closePaperButton){
    closePaperButton.addEventListener(
        "click",
        closeNewspaper
    );
}

//function to display the current spread of the newspaper, update the page number and total pages, and enable/disable the previous and next buttons based on the current spread index
function displaySpread(direction){
    if(!leftPage || !rightPage){ //check if the left and right page elements exist
        return;
    }
//get the current spread of articles from the newspaperPages array
const spread=newspaperPages[currentSpread];

//check if the spread exists
if(!spread){
    return;
}
//set the innerHTML of the left and right pages to the HTML of the articles in the current spread
leftPage.innerHTML=createArticleHTML(spread[0]);
rightPage.innerHTML=createArticleHTML(spread[1]);

if(pageNumber){ //check if the page number element exists
    pageNumber.textContent=currentSpread + 1;
}

if(pageTotal){ //check if the page total element exists
    pageTotal.textContent=newspaperPages.length;
}

if(previousButton){ //check if the previous button element exists
    previousButton.disabled=currentSpread===0;
}

if(nextButton){ //check if the next button element exists
    nextButton.disabled=currentSpread===newspaperPages.length-1;
}
if(nextButtonBottom){
    nextButtonBottom.disabled = currentSpread === newspaperPages.length-1
}

if(book && direction){ //check if the book element exists and a direction is provided
    book.classList.remove("turn-next", "turn-previous");
    void book.offsetWidth;

    if(direction === "next"){ //check if the direction is next
        book.classList.add("turn-next");
    }
    if(direction === "previous"){ //check if the direction is previous
        book.classList.add("turn-previous");
    }
}

}

//function to create the HTML for an article given its data, including kicker, title, link, image, standfirst and body
function createArticleHTML(article){
    return `
            <div class="page-content">
            <p class="kicker">${article.kicker}</p> 

            <img
                class="article-image"
                src="${article.image}"
                alt="${article.title}"
            >

            <h2>${article.title}</h2>

            <p class="cover-deck">
            ${article.standfirst}
            </p>

            <p>${article.body}</p>

            <a 
                class="open-paper"
                href="${article.link}">
                READ THIS STORY
            </a>
        </div>
     `;
}


//function to show the next spread of the newspaper if the current spread index is less than the total number of spreads minus one, and call the displaySpread function with "next" as the direction
function  showNextSpread(){
    if(currentSpread < newspaperPages.length-1){ //check if the current spread index is less than the total number of spreads minus one
        currentSpread++;
        displaySpread("next");
    }
}

//function to show the previous spread of the newspaper if the current spread index is greater than zero, and call the displaySpread function with "previous" as the direction
function showPreviousSpread(){
    if(currentSpread >0){ //check if the current spread index is greater than zero
        currentSpread--;
        displaySpread("previous");
    }
}

//add event listeners to the next and previous buttons to show the next or previous spread when clicked
if(nextButton){
    nextButton.addEventListener(
        "click",
        showNextSpread
    );
}

//add event listener to the next button at the bottom of the page to show the next spread when clicked
if(nextButtonBottom){
    nextButtonBottom.addEventListener(
        "click",
        showNextSpread
    );
}

//add event listener to the previous button to show the previous spread when clicked
if(previousButton){
    previousButton.addEventListener(
        "click",
        showPreviousSpread
    );
}

































