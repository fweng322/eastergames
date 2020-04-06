//----------------------------------------------------------------
// 變數設定區域
//----------------------------------------------------------------

// 關鍵字陣列
var data = [
	{
        id: 1,
        keyword: "文件自由",
        clicked: false
    },

    {
        id: 2,
        keyword: "開放標準",
        clicked: false
    },
    
    {
        id: 3,
        keyword: "開放文件格式",
        clicked: false
    },
    
    {
        id: 4,
        keyword: "LibreOffice",
        clicked: false
    },
    
    {
        id: 5,
        keyword: "文件互通性",
        clicked: false
    },
    
    {
        id: 6,
        keyword: "選擇封閉格式所造成的衝擊",
        clicked: false
    },
    
    {
        id: 7,
        keyword: "無法存取舊資料",
        clicked: false
    },
    
    {
        id: 8,
        keyword: "自由軟體",
        clicked: false
    },
    
    {
        id: 9,
        keyword: "完全的所有權與控制權",
        clicked: false
    },
    
    {
        id: 10,
        keyword: "保證這些文件、資料在長時間後仍然是可用的",
        clicked: false
    },
];

var title = "希望您瞭解文件自由與開放標準的重要性！";
var text = "希望透過這個小遊戲，您可以瞭解到，真正的開放文件格式標準讓我們的文件可以互通，不會被鎖定在特定的軟體與格式上，也讓使用者在軟體的選擇上更多元：只要大家都遵循同樣的標準，您可以選擇有很棒功能的專有軟體，也可以選擇可以自由應用的自由軟體。祝您文件更自由，復活節開心！";

//----------------------------------------------------------------

// 總命中次數
var sum = 0;	

// 初始化 onload 事件
function init(){
    // 更新彩蛋計數器
    $("#box")[0].innerText = `找到 ${sum} / ${data.length}`;
}

// 再來一次
function reset(){

    // 重設資料
    sum = 0;
    data.map(a => a.clicked = false);
    
    // 更新彩蛋計數器
    $("#box")[0].innerText = `找到 ${sum} / ${data.length}`;

    // 移除 "再來一次" 按鈕
    // TODO: 這邊應該是隱藏彈跳框
    $("#reset").remove();
}

// 點擊觸發事件
function fly(obj) {
    // 遍歷陣列
    sum = 0;
    for ([i, k] of data.entries()) {

        // 有找到這次點的東西就設為已點過
        if (k.keyword === $(obj)[0].innerText) {
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
    $("#box")[0].innerText = `找到 ${sum} / ${data.length}`;


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
              <button type="button" class="btn btn-primary" data-dismiss="modal" onClick="reset()">再玩一次</button>
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
