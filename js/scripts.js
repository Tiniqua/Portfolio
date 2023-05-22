function openProjectPopup(title, brief, description, link, videoUrl) {
  event.preventDefault();
  var popup = document.getElementById('projectPopup');
  var projectTitle = document.getElementById('projectTitle');
  var projectBrief = document.getElementById('projectBrief');
  var projectDescription = document.getElementById('projectDescription');
  var projectLink = document.getElementById('projectLink');
  var videoContainer = document.getElementById('videoContainer');

  projectBrief.textContent = brief;
  projectTitle.textContent = title;
  projectDescription.textContent = description;

  if (link) {
    projectLink.href = link;
    projectLink.style.display = 'inline'; // Show the link if a link is provided
  } else {
    projectLink.style.display = 'none'; // Hide the link if no link is provided
  }

  if (videoUrl) {
    var videoElement = document.createElement('video');
    videoElement.src = videoUrl;
    videoElement.type = 'video/mp4';
    videoElement.width = '640';
    videoElement.height = '360';
    videoElement.controls = true;
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoContainer.innerHTML = '';
    videoContainer.appendChild(videoElement);
  } else {
    videoContainer.innerHTML = '';
  }

  popup.style.display = 'block';

  // Delay registering the click event listener to close the popup
  setTimeout(function() {
    document.addEventListener('click', closePopupOutside);
  }, 100);
}


function closeProjectPopup() {
  event.preventDefault();
  var popup = document.getElementById('projectPopup');
  popup.style.display = 'none';

  // Remove click event listener from document
  document.removeEventListener('click', closePopupOutside);
}

function closePopupOutside(event) {
  var popupContent = document.querySelector('.projectPopupContent');
  var isClickInsidePopup = popupContent.contains(event.target);
  if (!isClickInsidePopup) {
      closeProjectPopup();
  }
}


function toggle(){
    var x = document.getElementById("dropDown")
    if(x.style.display === "none")
        {
            x.style.display = "block";
        }
    else{
        x.style.display = "none";
    }
}

// not working
function embolden(x) {
  x.style.fontweight = 'bold';
  x.style.fontweight = 'bold';
}

function normal(x) {
  x.style.fontweight = 'normal';
  x.style.fontweight = 'normal';
}

// BROWSER SNAKE GAME

const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
var score = 0;



// Snake
var snake;

function Snake()
{
  this.x = 0;
  this.y = 0;
  this.xSpeed = scale*1;
  this.ySpeed = 0;
  this.total = 0;
  this.tail = [];


  this.draw = function(){
    context.fillStyle = "#000000";
    context.font = "20px Arial";
    context.fillText(score,canvas.height, canvas.width/2)

    for(let i=0; i<this.tail.length; i++)
    {      
      context.fillRect(this.tail[i].x,this.tail[i].y,scale,scale);
    }

    context.fillRect(this.x,this.y,scale,scale);
  }

  this.update = function(){
    for (let i=0; i<this.tail.length -1; i++)
    {
      this.tail[i] = this.tail[i+1];
    }
    this.tail[this.total - 1] = {x:this.x, y:this.y};

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if(this.x > canvas.width)
    {
      this.x = 0;
    }
    if(this.x < 0)
    {
      this.x = canvas.width;
    }
    if(this.y > canvas.height)
    {
      this.y = 0;
    }
    if(this.y < 0)
    {
      this.y = canvas.height;
    }
  }

  this.changeDirection = function(direction){
    switch(direction)
    {
      case 'Up':
        this.xSpeed = 0;
        this.ySpeed = -scale*1;
        break;
      case 'Down':
        this.xSpeed = 0;
        this.ySpeed = scale*1;
        break;
      case 'Left':
        this.xSpeed = -scale*1;
        this.ySpeed = 0;
        break;
      case 'Right':
        this.xSpeed = scale*1;
        this.ySpeed = 0;          
        break;          
    }
  }

  this.eat = function(pill){
    if(this.x === pill.x && this.y === pill.y)
    {
      this.total++;
      return true
    }
    return false;
  }
}

// Setup Draw

function setup(){
  snake = new Snake();
  pill = new Pill();
  pill.pickLocation();

  window.setInterval(() =>{
    context.clearRect(0,0,canvas.width,canvas.height);    
    pill.draw()
    snake.update();
    snake.draw();

    if(snake.eat(pill))
    {
      pill.pickLocation();
      snake.score++;
    }

  },250);
};

window.addEventListener('keydown',((evt) => {
  evt.preventDefault();
  const direction = evt.key.replace('Arrow','')
  snake.changeDirection(direction);
}))

// Pill
function Pill(){
  this.x;
  this.y;

  this.pickLocation = function(){
    this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
    this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
  }

  this.draw = function(){
    context.fillStyle = "#FF0000";
    context.fillRect(this.x,this.y,scale,scale)
  }
}