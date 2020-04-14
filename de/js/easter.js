//----------------------------------------------------------------
// 變數設定區域
//----------------------------------------------------------------

// 關鍵字陣列
var data = [
	{
        id: 1,
        keyword: "Document Freedom",
        clicked: false
    },

    {
        id: 2,
        keyword: "Open Document Format",
        clicked: false
    },
    
    {
        id: 3,
        keyword: "LibreOffice",
        clicked: false
    },
    
    {
        id: 4,
        keyword: "Open Format",
        clicked: false
    },
    
    {
        id: 5,
        keyword: "Interoperabilität",
        clicked: false
    },
    
    {
        id: 6,
        keyword: "open standard",
        clicked: false
    },
    
    {
        id: 7,
        keyword: "Lock-in-Effekt",
        clicked: false
    },
    
    {
        id: 8,
        keyword: "perfekte Doppel",
        clicked: false
    },
    
    {
        id: 9,
        keyword: "Besitzrecht und Kontrolle",
        clicked: false
    },
    
    {
        id: 10,
        keyword: "dauerhafte Verfügbarkeit",
        clicked: false
    },
];

var title = "Frohe Ostern! Werfe die Fesseln deiner digitalen Dokumente ab";
var text = "Wir hoffen, dir hat das Ostereier-Suchspiel gefallen und es fördert das Verständnis für die Bedeutung von Document Freedom. Open Document Format (ODF) und LibreOffice sind dazu das perfekt Doppel. Auf geht's... mit der Befreiung unserer digitalen Dokumente!";

//----------------------------------------------------------------

// hit count
var sum = 0;	

// Initialise onload event
function init(){
    // update count
    $("#box")[0].innerText = `${sum} / ${data.length} found`;
}

// Play again
function reset(){

    // reset data
    sum = 0;
    data.map(a => a.clicked = false);
    
    // update Easter egg count
    $("#box")[0].innerText = `${sum} / ${data.length} found`;

    // 移除 "再來一次" 按鈕
    // TODO: 這邊應該是隱藏彈跳框
    $("#reset").remove();
}

// 點擊觸發事件
function fly(obj) {
    // 遍歷陣列
    sum = 0;
    for ([i, k] of data.entries()) {

	var str1=k.keyword.toLowerCase()
	var str2=$(obj)[0].innerText.toLowerCase()

        // 有找到這次點的東西就設為已點過
        //if (k.keyword.toUpperCase() === $(obj)[0].innerText.toUpperCase()) {
        if (str1 === str2) {
            // 如果早就被點過就跳出不要彈動畫
            if(data[i].clicked){
                return;
            }

            data[i].clicked = true;
        }

        // 如果遍歷中的元素被點過 sum 就 +1
        if (k.clicked) {
            sum += 1;
        }
    }
    // 更新彩蛋計數器
    $("#box")[0].innerText = `${sum} / ${data.length} found`;


    // 複製一個 element 放在原來的地方
    // 避免這個 element 飛掉之後原本的地方空出一塊
    $(obj).clone().insertBefore(obj);

    // 將 position 設為 absolute，讓位置正確顯示
    $(obj).css({
        position: 'absolute',
        "z-index": 999,
        background: 'rgba(255,255,255,0.5)',
        backgroundFilter: "blur(8px)",
        textShadow: '0px 0px 15px red',
        padding: '15px'
    });

    // 移到畫面中間，動畫時間 500ms
    $(obj).animate({
        top: Math.max(0, (($(window).height() -  $(obj).outerHeight()) / 2) + $(window).scrollTop()) + "px",
        left: "50%",
        fontSize: "60px"
    }, 500);

    // 等 1.5 秒後飛到右下角
    // timeout 設為 2000 是因為 js 的 async 特性關係
    // 這一段會跟上面的動畫同步執行
    // 所以 2000 - 500 剛好就是 1500ms 的等待時間
    setTimeout(function () {
    $(obj).animate({
        top: Math.max(0, (($(window).height() -  $(obj).outerHeight()) * 0.95) + $(window).scrollTop()) + "px",
        left: "95%",
            opacity: 0
        }, 500);
    }, 2000);

    // 將元素刪除
    setTimeout(function () {
        $(obj).remove();
    }, 2500);

    // 如果所有元素都點過就顯示再玩一次
    // TODO: 這邊應該要彈跳框顯示結語 + 再玩一次按鈕 （已完成！！）
    if (sum === data.length) {
	  $('#mid').append(
        `<div class="modal fade" id="basicModal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="myModalLabel"> ${title} </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" class="no-border" onClick="reset()">×</span>
              </button>
            </div>
            <div class="modal-body">
              <p> ${text} </p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal" onClick="reset()">Nochmal</button>
            </div>
          </div>
        </div>
      </div>`
      );

     $('#basicModal').modal({
         backdrop: 'static',
     });
	}
}
