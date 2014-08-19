var ADDLISTNAME = "add-list"; // localforage で利用するキー
var num = 0; //登録者の人数
var Name;　//登録者の名前
var livea; //登録者の住所
var maila; //登録者のめあど
var comment;



var rirekis = [];

function createList(Name,livea,maila){
  return{
    Name : Name,
    livea : livea,
    maila : maila,
    timestamp: new Date()
  };
}

function saveRirekiList(){
  localforage.setItem(ADDLISTNAME, rirekis, function(){
  });
}

function deleteList(){
  var n = 0;
  if(rirekis.length > 0){
    while(n < rirekis.length){
      var rirekiAitem = rirekis[n];
      var targetWord = rirekiAitem.maila;
      if(maila == targetWord){
      comment = "あなたのアドレスはすでに登録されています";
      rirekis.splice(n,1);
      n = rirekis.length + 2;
      }
      n = n + 1;
    }
  }
}

function addList(){
  Name = document.getElementById("Name").value;
  livea = document.getElementById("liveadress").value;
  maila = document.getElementById("mailadress").value;
  num = rirekis.length;
  if(Name.length !==0 && maila.length !== 0){
    num = num + 1;
    comment = "こんにちわ"+ Name + "さん。あなたは" + num + "番目の方です。"
    deleteList()
    var newList = createList(Name,livea,maila);
    rirekis.unshift(newList);
    saveRirekiList();

    alert(comment);
    console.log(livea,maila);
  }
}

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
  });
}

inptApp();

function dooo(){
  addList();
}
