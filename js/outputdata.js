var ADDLISTNAME = "add-list"; // localforage で利用するキー
var num = 0; //登録者の人数
var Name;　//登録者の名前
var livea; //登録者の住所
var maila; //登録者のめあど
var comment;
//var memoList = document.getElementById("writelist");

var outputElements = {　//履歴の出力先
  memoList: document.querySelector("#writelist")
};

var rirekis = [];

var createRirekiRiseutElement = function(memo){
  var div = document.createElement("div");
  div.textContent = memo.Name +","+ memo.livea +"," + memo.maila + "," + memo.timestamp;
  div.setAttribute("class", "memo-word");
  return div;
};


function createRirekiElement(memo){
  var li = document.createElement("li");
  li.appendChild(createRirekiRiseutElement(memo));
  li.setAttribute("class","memo");

  return li;
}

/*
 メモオブジェクトを HTML として表示する関数
 */
var displayRireki = function(rireki){
  var test = createRirekiElement(rireki);
  console.log(test);
  outputElements.memoList.appendChild(test);
};

var restoreRirekiList = function(){
  var i = 0;
  if(rirekis.length >0 ){
    $("#writelist").html("");
  }
  while(i < rirekis.length){
    displayRireki(rirekis[i]);
    i = i + 1;
  }
};

/*
 アプリの初期化を行う関数
 */
function inptApp(){
    localforage.setDriver("localStorageWrapper");
  localforage.getItem(ADDLISTNAME, function(data){
    console.log(data);
    if(data.length>0){
      rirekis = data;
      console.log(rirekis);
    }
    restoreRirekiList();
  });
}

inptApp();


function RiekisClear(){
  localforage.removeItem(ADDLISTNAME,function(data) {
    // Run this code once the key has been removed.
    rirekis = [];
    $("#writelist").html("履歴を消去しました");
});
}