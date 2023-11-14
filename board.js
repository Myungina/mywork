export class Board {
    constructor() {
      this.pagecount = 10; //페이지 그룹나누기 (pc:10 / mo:5)
      this.currentpage = 1; //현재페이지
      this.contentlimit = 8; //게시글 제한
      this.first = 0; //paging 첫번째 페이지
      this.last = 0; //paging 마지막 페이지
      this.prev = 1;
      this.next = 1;
      this.dataType = "all"; //게시글 타입 default:all
      this.gameType; //gamename
      this.boardType; //board Type (notice/ guide)
      this.view_tag; //게시글 idx
      this.i18n_txt; // 번역
    }

    //개발서버, 로컬 확인용 URL변경
    API_URI() {
      // console.log(window.location.href.slice(0,16))
      if(window.location.pathname.length >= 16 && (window.location.href.slice(0, 16) == "http://localhost" || window.location.href.slice(0, 16) == "http://127.0.0.1") || window.location.href.slice(0,10) == "http://172" || window.location.href.slice(0, 16) == "https://qa.takeo") {
        return "";
      }else {
        return "/public/";
      }
    }
  
    target(code, tab, main) {
      const urlParams = new URL(location.href).searchParams;
      this.gameType = code;
      this.boardType = urlParams.get("board");
      this.menuType = urlParams.get("type");
      this.target_content = urlParams.get("content");
      var data_type = this.dataType;
      this.i18n_txt = i18next.language;
      
      //메뉴 바로가기
      if (this.menuType == undefined || this.menuType == '') {
        data_type ='all';
      }else{
        data_type = this.menuType;
      }
  
      if (this.boardType  == 'notice' && this.i18n_txt == "cn") {
        this.i18n_txt = "tw";
      }    
      $(".board-container").addClass(this.boardType);  
  
      this.mk_tab(tab, data_type); //menu
      this.pagingFn(main, data_type, this.currentpage); //paging
      this.resizePagingIndexFn(main, data_type); //디바이스별 페이징 그룹
      this.tabClickFn(main, tab); //탭클릭
      this.searchFn(main); //검색
  
      //특정 게시글 바로열기
      if (this.target_content != "" && this.target_content != undefined) {
        this.mk_detail(this.target_content);
      }
      if ($(".board-container.notice").hasClass("guide") == true) {
        $(".board-top").find(".page-title").children("img").attr("src", "images/sub/guide-banner-text.png");
      }
  
      //i18n select fn
      $(".lang-list li").on("click", (e) => {
        var dataType = $(".board_tab li.active").attr("data-type");
        this.i18n_txt = $(e.currentTarget).attr("lang-code");
        if (this.i18n_txt == "zh-tw" || this.i18n_txt == "cn") {
          this.i18n_txt = "tw";
        }
        this.contentFn(main, dataType); //content
        this.mk_tab(tab, data_type); //menu
        this.pagingFn(main, data_type, this.currentpage); //paging
        if ($(".noti-view").css("display") === "block") {
          this.mk_detail(this.target_content);
        }
      });
  
      //목록가기
      $(".btn-list").on("click", () => {
        var url_txt = window.location.href;
        var split_url = url_txt.split("&");
        var go_url;
  
        if(split_url.length < 3){
          go_url = split_url[0]   ;     
        }else{
          go_url = split_url[0]+"&"+split_url[1];
        }      
         location.href = go_url;
      });
  
      $(document).on("click", "#page .number > a", (event) => {
        event.preventDefault();
        let target = event.currentTarget;
        var currentPageNum = $(target).text();
        this.pagingFn(main, data_type, currentPageNum); //paging
      })
  
      //pagenation next,prev
      $("#page button").click((e) => {
        if ($(e.currentTarget).hasClass("no-click")) {
          e.preventDefault();
        } else if ($(e.currentTarget).hasClass("next")) {
          this.pagingFn(main, data_type, this.next);
        } else {
          let distance = this.first - 1;
          this.pagingFn(main, data_type,this.prev);
        }
      });
  
      $(window).on("resize", ()=> {
        if ($(window).innerWidth() < 768) {
          this.pagecount = 5; 
          this.pagingFn(main, data_type, this.currentpage); //paging
        }else{
          this.pagecount = 10; 
          this.pagingFn(main, data_type, this.currentpage); //paging
        }
      })
    }
  
    tabClickFn(main, tab) {
      //tab click event
      $(document).on("click", tab + " li", (event) => {
        let target = event.currentTarget;
        var dataType = $(target).attr("data-type");
        var url_txt = window.location.href;
        var split_url = url_txt.split("&");
        var go_url = split_url[0];
  
        location.href=go_url+"&type="+dataType;
      });
    }
  
    //반응형 paging
    resizePagingIndexFn(main, data_type) {
      // console.log("ㅇㅇㅇㅇ")
      $(document).ready(() => {
        if ($(window).innerWidth() < 678) {
          this.pagecount = 5;
        }
      });
    }
  
    //menu
    mk_tab(tab, data_type) {
      $(tab).html("");
      var url = this.API_URI() + this.gameType + "/tab/" + this.i18n_txt + "/";
      var data = {
        board: this.boardType,
      };
      var list_html = "";
      $.post(url, data, (res) => {
        var list = res.list;
        $.each(list, (index, item) => {
          list_html = '<li class="' + list[index]["tab"];
          if (item.tab == data_type) {
            list_html += " active";
          }
          list_html += '"data-type="' + list[index]["tab"] + '">' + list[index]["title"] + "</li>";
          $(tab).append(list_html);
        });
        $(tab).localize();
        $("#board_title").text($(tab).find("li.active").text());
      });
    }
  
    //pageing
    pagingFn(main, type, nowpage) {
      if (nowpage == undefined) {
        nowpage = 1;
      }
  
      let url = this.API_URI() + this.gameType + "/" + type + "/" + this.i18n_txt + "/";
      var data = {
        board: this.boardType,
        search: $("#noti-search").val(),
        page: nowpage,
        limit: this.contentlimit,
      };
      $.post(url, data, (res) => {
        let index = this.calculatPageIndex(res, nowpage, data.limit);
        this.mk_paging(index.totalpage, index.first, index.last, nowpage, index.next, index.prev);
        this.contentFn(main, type, nowpage);
      });
    }
  
    //paging calc
    calculatPageIndex(res, currentpage, limit) {
      var nowpage = currentpage;
      var totalpage = Math.ceil(res.total / limit); //총 페이지수
      if (nowpage > totalpage) {
        nowpage = totalpage;
      } else if (nowpage < 1) {
        nowpage = 1;
      }
      var pagegroup = Math.ceil(nowpage / this.pagecount); //페이지 그룹
      var last = pagegroup * this.pagecount; //페이지그룹의 마지막
  
      if (last > totalpage) {
        last = totalpage;
      }
      var first = 0;
      var lastPageGorup = Math.ceil(totalpage / this.pagecount);
      var first = lastPageGorup == pagegroup ? this.pagecount * (pagegroup - 1) + 1 : last - (this.pagecount - 1);
  
      this.next = last + 1; //nextbtn
      this.prev = first - 1; //prevbtn
  
  
      this.currentpage = currentpage = nowpage;
      this.first = first;
      this.last = last;
  
      if (this.next > totalpage) {
        $("#page .next").css("opacity", "0.5").addClass("no-click");
      } else {
        $("#page .next").css("opacity", "1").removeClass("no-click");
      }
      if (this.prev <= 0) {
        $("#page .prev").css("opacity", "0.5").addClass("no-click");
      } else {
        $("#page .prev").css("opacity", "1").removeClass("no-click");
      }    
  
      return {
        first: first,
        last: last,
        totalpage: totalpage,
        nowpage: nowpage,
      };
    }
  
    //pagin add html
    mk_paging(totalpage, first, last, currentpage) {
      $("#page > .number").html("");
      var page_html = "";
      if (totalpage <= 0) {
        page_html += '<a href="#" class="active page' + currentpage + '">1</a>';
      } else {
        for (var i = first; i <= last; i++) {
          page_html += '<a href="#" class=';
          if (i == currentpage) {
            page_html += '"active"';
          }
          page_html += ' data-num="' + i + '">' + i + "</a>";
        }
      }
      $("#page > .number").append(page_html);
    }
  
    //content
    contentFn(main, type, currentpage) {
      //console.log(type);
      if (currentpage == undefined) {
        currentpage = 1;
      }
      let url = this.API_URI() + this.gameType + "/" + type + "/" + this.i18n_txt;
      var data = {
        board: this.boardType,
        search: $("#noti-search").val(),
        page: currentpage,
        limit: this.contentlimit,
      };
  
      $.post(url, data, (res) => {
        var list = [];
        $.each(res.list, (index) => {
          list.push({
            idx: res.list[index]["idx"],
            order: res.list[index]["tab"],
            content_type: res.list[index]["tab"],
            tab_name: res.list[index]["tab_name"],
            tag: res.list[index]["tag"],
            title: res.list[index]["title"],
            date: res.list[index]["utc_ts"],
            content: res.list[index]["content"],
          });
        });
        this.mk_content(main, list , data.search);
      });
    }
  
    //content add html
    mk_content(main, res , search_val) {
      $(main).html("");
      var url_txt = window.location.href;
      var url_txt2 = window.location.pathname;
      var split_url = url_txt.split("?");
      var go_url = split_url[1];
  
      if(search_val.length > 0 ){
        $('#board_title').attr('data-i18n','5.board-search');
        $('#board_title').localize();
      }
      var list_html = "";
      if (res.length == 0) {
        $('#page').hide();
        list_html = '<div class="row"style="display:block;">';
        list_html += '<div class="left" style="display:block; width:100%;">';
        if(search_val != ''){
          list_html += '<h4 class="title no-list" data-i18n="5.result-no"></h4>';
        }else{
          list_html += '<h4 class="title no-list" >No List</h4>';
        }      
        list_html += "</div>";
        list_html += "</div>";
        $(main).append(list_html);
      } else {
        $.each(res, (index, item) => {
          // console.log(res.length)
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
          // if (title.length > 60) {
          //   title = title.substr(0, 60) + "...";
          // }
  
          list_html = '<div class="row" data-type="' + item.tag + '">';
          list_html += '<div class="left">';
          list_html += '<h4 class="cate">' + item.tab_name + "</h4>";
          //list_html += '<a href="/board.html?board=' + this.boardType + "&content=" + item.tag + '" class="title">' + title + "</a>";
          list_html += '<a href="'+url_txt2 + '?' + go_url+'&content='+item.tag+'" class="title">' +title+ '</a>'
          
          if (this.boardType == "notice") {
            list_html += '<p class="date">' + res_year +"-"+ res_month + "-"+ res_day+ "</p>";
          }
          list_html += "</div>";
          list_html += "</div>";
          $(main).append(list_html);
        });
      }
      $(main).localize();
    }
  
    //detail add html
    mk_detail(tag) {
      var viewarea = $(".noti-view");
      viewarea.find(".cate").text();
      viewarea.find(".date").text();
      viewarea.find(".title").text();
      viewarea.find(".contents p").text();
  
      var url = this.API_URI() + this.gameType + "/view/" + this.i18n_txt;
      var data = {
        tag: tag,
        board: this.boardType,
      };
      $.post(url, data, (res) => {
        var content = res.view["contents"];
        content = content.replace(/(?:\r\n|\r|\n)/g, "<br />");
        var date = res.view["utc_ts"];
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
        var input_date = res_year +"-"+ res_month + "-"+ res_day;
  
        viewarea.find(".cate").html(res.view["tab_name"]);
        if (this.boardType == "notice") {
          viewarea.find(".date").html(input_date);
        }
        viewarea.find(".title").html(res.view["title"]);
        viewarea.find(".contents").html(content);
        viewarea.localize();
      });
      $(".borderlist").hide();
      viewarea.show();
    }
  
    //search
    searchFn(main) {
      //search event
      $(".btn-search").on("click", (e) => {
        var dataType = $(".board_tab li.active").attr("data-type");      
        if(dataType == undefined){
          dataType = 'all'
        }
        if($('#noti-search').val() != '' ){
          this.contentFn(main, dataType); //content
          this.pagingFn(main, dataType, 1); //paging
        }      
      });
      $("#noti-search").on("keypress", (e) => {
        var dataType = $(".board_tab li.active").attr("data-type");
        if(dataType == undefined){
          dataType = 'all'
        }
        if (e.keyCode == 13){
          if($('#noti-search').val() != '' ){
            this.contentFn(main, dataType); //content
            this.pagingFn(main, dataType, 1); //paging
          }  
        }           
      });
  
      //input maxlength
      $('#noti-search').on("keyup", function(){
        var target_lng = $(this).val().length;
        var max = 50;
        if(target_lng > 50){
          $(this).val($(this).val().substr(0, max));
        }
      })
  
  
      //검색어 작성시 delete버튼 나옴
      $("#noti-search").on("keyup", () => {
        $(".search_del").show();
        $('.search-danger').removeClass('show');
      });
  
      if ($("#noti-search").is(":focus") == true) {
        $(".search_del").show();
      } else {
        $(".search_del").hide();
      }
      // 검색어 지우기
      $(".search_del").on("click", () => {
        $("#noti-search").val("");
        $(".search_del").hide();
      });
    }
  }