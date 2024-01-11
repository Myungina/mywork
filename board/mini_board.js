export class miniBoard {
    constructor() {
      this.gameType; //gamename
      this.boardType; //board Type (notice/ guide)
      this.i18n_txt; // 번역
    }
    API_URI() {
     //API지정 function
    }
    target(code, options) {
      this.i18n_txt = options.i18n;
      
          if (this.i18n_txt == "cn") {
        this.i18n_txt = "tw";
      } // 중국어 -> DB값으로 변경
      //i18n select fn
      $(".lang-list li").on("click", (e) => {
        var dataType = $(".board_tab li.active").attr("data-type");
        this.i18n_txt = $(e.currentTarget).attr("lang-code");
        if (this.i18n_txt == "zh-tw" || this.i18n_txt == "cn") {
          this.i18n_txt = "tw";
        }
        this.contentFn(code, options); //content
      });
      this.contentFn(code, options); //content
    }
  
    //content
    contentFn(code, options) {
      let url = this.API_URI() + 
        code +
        "/" +
        options.content_type +
        "/" +
        this.i18n_txt;
      var data = {
        search: $("#noti-search").val(),
        page: 1,
        board: options.board_type,
        limit: options.max,
      };
  
      $.post(url, data, (res) => {
        var board_arr = [];
        $.each(res.list, (index) => {
          board_arr.push({
            idx: res.list[index]["idx"],
            tag: res.list[index]["tag"],
            title: res.list[index]["title"],
            date: res.list[index]["utc_ts"],
          });
        });
        this.mk_content(options, board_arr);
      });
    }
  
    //content add html
    mk_content(options, res) {
      $(options.contain).html("");
      var list_html = "";
      if (res.length == 0) {
        list_html = "<li>";
        list_html += '<div class="no-list" >No List</div>';
        list_html += "</li>";
        $(options.contain).append(list_html);
      } else {
        $.each(res, (index, item) => {
          var date = item.date;
          var res_date = new Date(date * 1000);
          var res_year = res_date.getFullYear();
          var res_month = res_date.getMonth() +1;
          var res_day = res_date.getDate();+1
          
          if(res_month < 10){
            res_month = "0"+res_month;
          }
          if(res_day < 10){
            res_day = "0"+res_day;
          }
          
          var title = item.title;
          list_html = "<li>";
          list_html +=
            '<a href="/games/bptg/board.html?board=' +
            options.board_type +
            "&content=" +
            item.tag +
            '" target="_blank" class="board-title">' +
            title +
            "</a>";
          if (options.board_type == "notice") {
            list_html += '<span class="board-date">' + res_year +"-"+ res_month + "-"+ res_day+ "</span>";
          }
          list_html += "</li>";
          $(options.contain).append(list_html);
        });
      }
      $(options.contain).localize();
    }
  }