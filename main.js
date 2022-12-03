const sugProfiles = document.getElementById('suggestProfiles');
const storyPanel = document.getElementById('storyPanel');
const myProfile = document.getElementById('myProfile');
const content = document.getElementById('content');


let toggleLike = [];
let toggleMark = [];
let toggleThem = false;
let profileName = 'Manni';

function renderContent() {
    content.innerHTML = '';
    renderCard();
    renderFollower();
    renderStorys();
    renderMyProfile(profileName);
}

function renderMyProfile(name) {
    profileName = name;
    myProfile.innerHTML = myProfileTemp(profileName, 'src/img/profile.jpeg');
}

function renderFollower() {
    for (let i = 0; i < user.length; i++) {
        sugProfiles.innerHTML += followerTemp(i);
    }
}

function renderStorys() {
    for (let i = 0; i < user.length; i++) {
        storyPanel.innerHTML += storysTemp(i);
    }
}

function renderCard() {
    content.innerHTML = "";
    for (let i = 0; i < posts.length; i++) {
        content.innerHTML += cardTemp(i);
        toggleLike.unshift(false);
        renderComments(i);
    }
}

function renderComments(i) {
    for (let j = 0; j < posts[i].comments.length; j++) {
        const comments = posts[i].comments[j];
        const authors = posts[i].commAuth[j];
        renderCommsInCard(i, authors, comments);
    }
}

function renderCommsInCard(i, auth, comm) {
    let allComments = document.getElementById(`allComments${i}`);
    allComments.innerHTML += allCommentsTemp(i, auth, comm);
}

function postMsg(id) {
    const textareaInput = document.getElementById(`postComment${id}`);
    let msg = textareaInput.value;
    let author = profileName;
    if (msg.length > 0) {
        textareaInput.value = '';
        posts[id].commAuth.push(author);
        posts[id].comments.push(msg);
        renderCommsInCard(id, author, msg);
    }
}

function changeProfile() {
    if (profileName === 'Manni') {
        renderMyProfile('Hansi');
    } else renderMyProfile('Manni');
}


function dontClose(event) {
    event.stopPropagation();
}

/////////////////////////////////////////////// BUTTON FUNCTIONS

function likePost(i) {
    let likeBtn = document.getElementById(`likeBtn${i}`);
    toggleLike[i] = !toggleLike[i];
    if (toggleLike[i]) {
        likeBtn.src = "src/img/heart_filled.png";
        changeLikes(i, 'increase')
    }
    if (!toggleLike[i]) {
        likeBtn.src = "src/img/heart_empty.png";
        changeLikes(i, 'decrease')
    }
}

function markPost(i) {
    let markBtn = document.getElementById(`markBtn${i}`);
    toggleMark[i] = !toggleMark[i];
    if (toggleMark[i]) { markBtn.src = "src/img/mark-filled.png"; }
    if (!toggleMark[i]) { markBtn.src = "src/img/mark-unfilled.png"; }
}

function changeLikes(i, set) {
    const likes = document.getElementById(`likes${i}`);
    likeHtml = +likes.innerHTML.replaceAll('.', '');

    if (set === 'increase') {
        let sum = likeHtml + 1;
        likes.innerHTML = sum.toLocaleString('de-DE');
    }
    if (set === 'decrease') {
        let sum = likeHtml - 1;
        likes.innerHTML = sum.toLocaleString('de-DE');
    }
}

function follow(id) {
    let follow = document.getElementById(`follow${id}`);

    if (follow.innerHTML === 'Folgen') {
        follow.innerHTML = 'Gefolgt';
    } else {
        follow.innerHTML = 'Folgen';
    }
}

function pageTheme() {
    let pageTheme = document.getElementById("pageTheme");
    toggleThem = !toggleThem

    if (toggleThem) {
        pageTheme.innerHTML = 'LightMode';
        darkmode();
    }
    if (!toggleThem) {
        pageTheme.innerHTML = 'DarkMode';
        lightmode();
    }
}

function darkmode() {
    document.documentElement.style.setProperty('--white', '#111');
    document.documentElement.style.setProperty('--lightgray', '#333');
    document.documentElement.style.setProperty('--darkgray', '#fff');
    document.documentElement.style.setProperty('--navBg', '#222');
    document.body.style.backgroundColor = "#222";
    let setInvert = document.querySelectorAll('.setInvert');
    setInvert.forEach(e => {
        e.classList.add("invert");
    });
}

function lightmode() {
    document.documentElement.style.setProperty('--white', '#fff');
    document.documentElement.style.setProperty('--lightgray', '#ddd');
    document.documentElement.style.setProperty('--darkgray', '#333');
    document.documentElement.style.setProperty('--navBg', '#fafafa');
    document.body.style.backgroundColor = "#fff";
    let setInvert = document.querySelectorAll('.setInvert');
    setInvert.forEach(e => {
        e.classList.remove("invert");
    });
}

function showCreatePost(boolean) {
    if (boolean) {
        document.querySelector('.overlayBg').style.display = "flex";
        document.body.style.overflow = "auto";
    }
    if (!boolean) {
        document.querySelector('.overlayBg').style.display = "none";
        document.body.style.overflow = "unset";
        document.querySelector('.errorMsgHide').classList.remove('errorMsgShow');
    }
}

/////////////////////////////////////////////// FILE UPLOAD

const imgInput = document.getElementById('imageInput');
let uploadedImg = '';

imgInput.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploadedImg = reader.result;
        document.querySelector('.displayImg').innerHTML = `<img id="getImage" src="${uploadedImg}">`;
    });
    reader.readAsDataURL(this.files[0]);
})

/////////////////////////////////////////

function createPost() {
    let errorMsg = document.querySelector('.errorMsgHide').classList;
    try {
        let getImage = document.getElementById('getImage');
        let getTxValue = document.getElementById('textInput').value;
        newPostJson(getImage.src, getTxValue);
        renderCard();
        showCreatePost(false);
        document.querySelector('.displayImg').innerHTML = "";
        errorMsg.remove('errorMsgShow');
    } catch (error) {
        console.error("Bitte Bild einfügen!");
        errorMsg.add('errorMsgShow');
    }
}

function newPostJson(image, desc) {
    let newPost = {
        'author': `${profileName}`,
        'description': 'Bali, Indonesien',
        'profileImg': 'src/img/profile.jpeg',
        'image': `${image}`,
        'imgDesc': `${desc}`,
        'likes': '0',
        'commAuth': [],
        'comments': [],
    }

    posts.unshift(newPost);
}

////////!SECTION


function openComments(i) {

}
////////////////////////////////////////////////////// ALLGEIMEIN