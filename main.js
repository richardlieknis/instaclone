const sugProfiles = document.getElementById('suggestProfiles');
const storyPanel = document.getElementById('storyPanel');
const myProfile = document.getElementById('myProfile');
const content = document.getElementById('content');


//let toggleLike = [];
let toggleMark = [];
let toggleThem = false;
let profileName = 'Manni';
let currentTheme = lightmode();

function renderContent() {
    content.innerHTML = '';
    saveAndLoad();
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
        load('liked');
        content.innerHTML += cardTemp(i);
        renderComments(i);

    }
    setTheme();
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
        save('posts', posts);

        renderCard();
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
    //let likeBtn = document.getElementById(`likeBtn${i}`);
    //toggleLike[i] = !toggleLike[i];
    if (posts[i].liked === false) {
        posts[i].likeImg = "src/img/heart_filled.png";
        console.log(posts[0].likeImg);
        changeLikes(i, 'increase');
        posts[i].liked = true;
    } else if (posts[i].liked === true) {
        posts[i].likeImg = "src/img/heart_empty.png";
        console.log(posts[0].likeImg);
        changeLikes(i, 'decrease')
        posts[i].liked = false;
    }

    renderCard();
    save('posts', posts); //TODO - FUNKTIONIERT NICHT

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
        posts[i].likes = likeHtml + 1;
        likes.innerHTML = posts[i].likes = posts[i].likes.toLocaleString('de-DE');
    }
    if (set === 'decrease') {
        posts[i].likes = likeHtml - 1;
        likes.innerHTML = posts[i].likes = posts[i].likes.toLocaleString('de-DE');
    }
}


function follow(id) {
    let follow = document.getElementById(`follow${id}`);

    if (follow.innerHTML === 'Folgen') {
        follow.innerHTML = 'Gefolgt';
        follow.style.color = 'var(--lightgray)';
    } else {
        follow.innerHTML = 'Folgen';
        follow.style.color = '#0095F6';
    }
}


function pageTheme() {
    let pageTheme = document.getElementById("pageTheme");
    toggleThem = !toggleThem

    if (toggleThem) {
        pageTheme.innerHTML = 'LightMode';
        currentTheme = darkmode();
    }
    if (!toggleThem) {
        pageTheme.innerHTML = 'DarkMode';
        currentTheme = lightmode();
    }
}


function setTheme() {
    if (currentTheme === 'darkmode') { darkmode() }
    if (currentTheme === 'lightmode') { lightmode() }
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
    return 'darkmode';
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
    return 'lightmode';
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

///////////////////////////////////////// CREATE & DELETE POST

function createPost() {
    let errorMsg = document.querySelector('.errorMsgHide').classList;
    try {
        let getImage = document.getElementById('getImage');
        let getTxValue = document.getElementById('textInput').value;
        newPostJson(getImage.src, getTxValue);
        renderCard();
        showCreatePost(false);
        save('posts', posts);
        document.querySelector('.displayImg').innerHTML = "";
        errorMsg.remove('errorMsgShow');
    } catch (error) {;
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
        'likeImg': 'src/img/heart_empty.png',
        'likes': '0',
        'liked': false,
        'marked': false,
        'commAuth': [],
        'comments': [],
    }

    posts.unshift(newPost);
}


function deleteCard(i) {
    posts.splice(i, 1);
    save('posts', posts);
    renderCard();
}

////////!SECTION


function save(keyname, array, i) {
    localStorage.setItem(keyname, JSON.stringify(array));
}


function load(keyname) {
    return JSON.parse(localStorage.getItem(keyname));
}


function saveAndLoad() {

    if (load('posts', posts) != null) {
        posts = load('posts', posts)
    }
    save('posts', posts);



}
////////////////////////////////////////////////////// ALLGEIMEIN