function cardTemp(i) {
    return `
    <div class="card">
    <div class="cardHeader">
        <div class="left">
            <img class="profileImg" style="width: 35px" src="${posts[i].profileImg}" />
            <div class="flexCol">
                <span style="font-family: 'circ'">${posts[i].author}</span>
                <span style="font-size: 11px">${posts[i].description}</span>
            </div>
        </div>
        <div class="right"">⦁⦁⦁
            <div class="dropdownCard">
                <div class="cardMenuBtn" onclick="deleteCard(${i})">LÖSCHEN</div>
                <div class="cardMenuBtn deactivated">TEILEN</div>
            </div>
        </div>
    </div>
    <div class="cardImg">
        <img src="${posts[i].image}" width="100%" />
    </div>
    <div class="cardBtns">
        <div class="left">
            <img class="setInvert" onclick="likePost(${i})" id="likeBtn${i}" src="${posts[i].likeImg}" />
            <img class="setInvert" id="commBtn${i}" src="src/img/comments.png" />
            <img class="setInvert" src="src/img/message.png" />
        </div>
        <div class="right">
            <img class="setInvert" onclick="markPost(${i})" id="markBtn${i}" src="src/img/mark-unfilled.png" />
        </div>
    </div>
    <div class="cardLikes">
        <span>Gefällt</span>
        <div id="likes${i}">${posts[i].likes} </div>Mal
    </div>
    <div class="cardDesc">
        <div>
            ${posts[i].author}
            <span class="descText">${posts[i].imgDesc}</span>
        </div>
    </div>
    <div class="cardComm flexCol">
        <span class="allComms" onclick="openComments(${i})"> Alle ${posts[i].comments.length} Kommentare ansehen</span>
        <div id="allComments${i}">
            <div id="commentsDiv${i}">
            </div>
        </div>
    </div>
    <div class="cardPost">
    <form onsubmit="postMsg(${i}); return false;">
        <div>😊</div>

        <input class="inputBox" id="postComment${i}" required placeholder="Kommentieren..." minlength="2" style="height: 14px"></input>

        <button>Posten</button>
        </div>
    </form>
</div>
    `;
}

function allCommentsTemp(i, auth, comm) {
    return `<div id="commentsDiv${i}" class="comments">
            <span>${auth}</span>
            <span class="descText">${comm}</span>
        </div>`;
}

function myProfileTemp(name, img) {
    return `
        <div>
            <img class="profileImg" style="width: 50px" src="${img}" />
            <span>${name}</span>
        </div>
        <span class="profileLink" onclick="changeProfile()">Wechseln</span>
    `;
}

function followerTemp(i) {
    return `
    <div class="sugProfile">
        <div>
            <img class="profileImg" style="width: 30px" src="${user[i].image}" />
            <div class="mergeProfil">
                <span>${user[i].name}</span>
                <span style="color: #c0c0c0; font-family: sans-serif;">${user[i].desc}</span>
            </div>
        </div>
        <span id="follow${i}" class="profileLink" onclick="follow(${i})">Folgen</span>
    </div>
    `;
}

function storysTemp(i) {
    return `
    <div class="storyProfile">
        <div class="imgBgStory">
            <img class="profileImg" style="width: 55px" src="${user[i].image}" />
        </div>
        <span>${user[i].name}</span>
    </div>
    `;
}