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
        <div class="right">⦁⦁⦁
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
            <img class="setInvert" onclick="openComments(${i})" id="commBtn${i}" src="src/img/comments.png" />
            <img class="setInvert" src="src/img/message.png" />
        </div>
        <div class="right">
            <img class="setInvert" onclick="markPost(${i})" id="markBtn${i}" src="${posts[i].markImg}" />
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
        <div class="comment" id="allComments${i}">
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

function allCommentsTemp(i, auth, comm, j) {
    return `<div id="commentsDiv${j}" class="comment">
                <div class="oneComment">
                    <div>
                        <span>${auth}</span>
                        <span class="descText">${comm}</span>
                    </div>
                    <div>
                        <img class="trashImg setInvert" onclick="deleteComment(${i}, ${j})" src="src/img/trash.png">
                    </div>
                </div>
                
            </div>
                `;
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
        <span id="follow${i}" class="profileLink" onclick="follow(${i})">${user[i].followed}</span>
    </div>
    `;
}

function storysTemp(i) {
    return `
    <div class="storyProfile">
        <div class="imgBgStory">
            <img class="profileImg" style="width: 55px" src="${user[i].image}" />
        </div>
        <span>${user[i].name.substring(0, 9) + ".."}</span>
    </div>
    `;
}

function openCommentsTemp(i) {
    return `
    <div class="overlay-content" onclick="dontClose(event)">
    <img class="commImage" src="${posts[i].image}"/>
    <div class="comment-box">
        <div>
            <div class="cardHeader">
                <div class="left">
                    <img class="profileImg" style="width: 35px" src="${posts[i].profileImg}" />
                    <div class="flexCol">
                        <span style="font-family: 'circ'">${posts[i].author}</span>
                        <span style="font-size: 11px">${posts[i].description}</span>
                    </div>
                </div>
                <div class="right">⦁⦁⦁
                    <div class="dropdownCard ">
                        <div class="cardMenuBtn deactivated ">TEILEN</div>
                    </div>
                </div>
            </div>
            <div id="allCommentsBox${i}" class="commentsComms">
            
            </div>
        </div>
        <form onsubmit="postMsgBox(${i}); return false;">
        <input class="inputBox" id="postCommentBox${i}" required placeholder="Kommentieren..." minlength="2" style="height: 14px"></input>
        
    </form>

    </div>
</div>
    `;
}