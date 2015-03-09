$(document).ready( function (){

function delWeek(week_id,major_id,this_one) {
  $.ajax({
    url: "/home/timeschedule_del" ,
    type: "POST",
    data: {
      week_id: week_id ,
      major_id: major_id ,
      name: username
    },
    success: function(data) {
      this_div.children('.classmate_box').css('display','none')

            //대동물 이었으면 다른 주황색 다시 살리기
            if (this_div.attr("id") == "major11"){
              $("[order=16]").addClass("large_animal")
              $("[order=17]").addClass("large_animal")
              $("[order=21]").addClass("large_animal")
              $("[order=22]").addClass("large_animal")
              $("[order=25]").addClass("large_animal")
              $("[order=26]").addClass("large_animal")
              $("span.large_animal").css("display","inherit")
              this_div.removeClass("active")  
            }
            //select취소 
            this_div.removeAttr("select")
            //이름표시 초기화
            this_one.text("일정선택")
            //major다시 보이게
            $("." + this_div.attr("id")).css("display","inherit")
            //meanless
            major_array[parseInt(this_order)-1]=""
            //id제거
            this_div.removeAttr("id")
            //다시 하얗게
            this_div.removeClass("active")
          console.log(major_array)
    }
  })
}


function delWeekWithNext(week_id,other_week_id,major_id,this_one) {
  $.ajax({
    url: "/home/timeschedule_del_double" ,
    type: "POST",
    data: {
      week_id: week_id ,
      other_week_id: other_week_id,
      major_id: major_id ,
      name: username
    },
    success: function(data) {
      this_div.children('.classmate_box').css('display','none')
            //다른div div 정의
            other_div = $("[order=" + other_order + "]")
      other_div.children('.classmate_box').css('display','none')
            //select취소
            this_div.removeAttr("select")
            //first취소
            this_div.removeAttr("first")
            //이름표시초기화
            this_one.text("일정선택")
            //다른div select 취소
            other_div.removeAttr("select")
            //다른div second 취소
            other_div.removeAttr("second")
            //다른div 이름표시 초기화
            other_div.children("li").children("a").text("일정선택")
            //major 다시 표기
            $("." + this_div.attr("id")).css("display","inherit")
            //id 취소
            this_div.removeAttr("id")
            //다른div id취소
            other_div.removeAttr("id")
            //다시 하얗게
            this_div.removeClass("active")
            //다른div 다시 하얗게
            other_div.removeClass("active")

            //meanless
            major_array[parseInt(this_order)-1]=""
            major_array[parseInt(other_order)-1]=""

            //이번 div가 대동물실습주간이면 주황색으로
            if ((this_div.attr("order")=="16") || (this_div.attr("order")=="17") || (this_div.attr("order")=="21") || (this_div.attr("order")=="22") || (this_div.attr("order")=="25") || (this_div.attr("order")=="26")){
              this_div.addClass("large_animal")
            }
            //다음 div가 대동물실습주간이면 주황색으로
            if ((other_div.attr("order")=="16") || (other_div.attr("order")=="17") || (other_div.attr("order")=="21") || (other_div.attr("order")=="22") || (other_div.attr("order")=="25") || (other_div.attr("order")=="26")){
              other_div.addClass("large_animal")
            }
          console.log(major_array)
            
    }
  })
}

function delWeekWithPrevious(week_id,other_week_id,major_id,this_one) {
  $.ajax({
    url: "/home/timeschedule_del_double" ,
    type: "POST",
    data: {
      week_id: week_id ,
      other_week_id: other_week_id,
      major_id: major_id ,
      name: username
    },
    success: function(data) {
      this_div.children('.classmate_box').css('display','none')
            //다른div정의
            other_div = $("[order=" + other_order + "]")
      other_div.children('.classmate_box').css('display','none')
            //다른 div는 이전것
            //select취소
            this_div.removeAttr("select")
            //second취소
            this_div.removeAttr("second")
            //이름표시초기화
            this_one.text("일정선택")
            //다른 div first, select취소
            other_div.removeAttr("select")
            other_div.removeAttr("first")
            //다른 div 이름표시 초기화
            other_div.children("li").children("a").text("일정선택")
            //major 다시 보이게
            $("." + this_div.attr("id")).css("display","inherit")

            //major_id지우고 하얗게
            this_div.removeAttr("id")
            other_div.removeAttr("id")
            this_div.removeClass("active")
            other_div.removeClass("active")
            //meanless
            major_array[parseInt(this_order)-1]=""
            major_array[parseInt(other_order)-1]=""
            //대동물실습주간이면 다시 주황색으로
            if ((this_div.attr("order")=="16") || (this_div.attr("order")=="17") || (this_div.attr("order")=="21") || (this_div.attr("order")=="22") || (this_div.attr("order")=="25") || (this_div.attr("order")=="26")){
              this_div.addClass("large_animal")
            }
            //다른 div가 대동물 실습주간이면 다시 주황색으로
            if ((other_div.attr("order")=="16") || (other_div.attr("order")=="17") || (other_div.attr("order")=="21") || (other_div.attr("order")=="22") || (other_div.attr("order")=="25") || (other_div.attr("order")=="26")){
              other_div.addClass("large_animal")
            }
          console.log(major_array)




    }
  })
}



function regiWeekWithNext(week_id,major_id,major_text,this_one) {
  is_haemaru = false
  if ((major_id == "major13") || (major_id == "major14") || (major_id == "major15") || (major_id == "major16") || (major_id == "major17") || (major_id == "major18") || (major_id == "major19") || (major_id == "major20") || (major_id == "major21") || (major_id == "major22")){
    is_haemaru = confirm("해마루 실습에 나가는 주간입니까?")
  }
  $.ajax({
    url: "/home/timeschedule_regi_double" ,
    type: "POST",
    data: {
      week_id: week_id,
      major_id: major_id ,
      name: username,
      is_haemaru: is_haemaru
    },
    success: function(data) {
      this_div.children('.classmate_box').css('display','initial')
      this_div.children('.classmate_box').children('#classmate_list').text(data.classmate_list1)
      this_div.children('.classmate_box').children('div').children('span').text(data.classmate_list1.length)
      next_div.children('.classmate_box').css('display','initial')
      next_div.children('.classmate_box').children('#classmate_list').text(data.classmate_list2)
      next_div.children('.classmate_box').children('div').children('span').text(data.classmate_list2.length)
          //누른거면  선택목록에서 사라지게 만들어야
          $("." + this_class).css("display","none")
          //이름 표시
          if (is_haemaru == true) {
            this_name.text("해마루외부실습")
          } else {
            this_name.text(major_text)
          }
          //id에 major 종류 지정
          this_div.attr("id",major_id)
          //select표시
          this_div.attr("select","true")
          //파랗게
          this_div.addClass("active")
          //대동물이어도 파랗게
          if ((this_div.attr("order")=="16") || (this_div.attr("order")=="17") || (this_div.attr("order")=="21") || (this_div.attr("order")=="22") || (this_div.attr("order")=="25") || (this_div.attr("order")=="26")){
            this_div.removeClass("large_animal")
          }
          //meanless
          array_index = parseInt(this_week) - 1
          major_array[array_index] = major_id
          //순서지정
          this_div.attr("first","true")
          //다음꺼 순서지정
          next_div.attr("second","true")
          //다음꺼 select표시
          next_div.attr("select","true")
          //다음꺼에 이름표시
          if (is_haemaru == true) {
            next_div.children("li").children("a").text("해마루외부실습");
          } else {
            next_div.children("li").children("a").text(major_text);
          }
          //다음꺼에 major종류 지정
          next_div.attr("id",major_id)
          //다음꺼 파랗게
          next_div.addClass("active")
          //다음꺼가 대동물이어도 파랗게
          if ((next_div.attr("order")=="16") || (next_div.attr("order")=="17") || (next_div.attr("order")=="21") || (next_div.attr("order")=="22") || (next_div.attr("order")=="25") || (next_div.attr("order")=="26")){
            next_div.removeClass("large_animal")
          }
          //드롭다운 닫기
          this_one.parent().parent().removeClass("open")

          //meanless
          next_index = parseInt(next_week) - 1
          major_array[next_index] = major_id
          console.log(major_array)
          location.reload(true);
    }
  })
}
function regiWeek(week_id,major_id,major_text,this_one) {
  is_haemaru = false
  if ((major_id == "major13") || (major_id == "major14") || (major_id == "major15") || (major_id == "major16") || (major_id == "major17") || (major_id == "major18") || (major_id == "major19") || (major_id == "major20") || (major_id == "major21") || (major_id == "major22")){
    is_haemaru = confirm("해마루 실습에 나가는 주간입니까?")
  }
  $.ajax({
    url: "/home/timeschedule_regi" ,
    type: "POST",
    data: {
      week_id: week_id ,
      major_id: major_id ,
      name: username,
      is_haemaru: is_haemaru
    },
    success: function(data) {
      this_div.children('.classmate_box').css('display','initial')
      this_div.children('.classmate_box').children('#classmate_list').text(data.classmate_list)
      this_div.children('.classmate_box').children('div').children('span').text(data.classmate_list.length)
      //누른거면  선택목록에서 사라지게 만들어야
      $("." + this_class).css("display","none")
      //이름표시
      if (is_haemaru == true) {
        this_name.text("해마루 외부실습")
      } else {
        this_name.text(major_text)
      }
      //id에 major종류 지정
      this_div.attr("id",major_id)
      //select true표시ㅓ
      this_div.attr("select","true")
      //파랗게
      this_div.addClass("active")
      //meanless
      array_index = parseInt(this_week) - 1
      major_array[array_index] = major_id
      //드롭다운 닫기
      this_one.parent().parent().removeClass("open")


      //대동물이었어도 파란색으로          
      if ((this_div.attr("order")=="16") || (this_div.attr("order")=="17") || (this_div.attr("order")=="21") || (this_div.attr("order")=="22") || (this_div.attr("order")=="25") || (this_div.attr("order")=="26")){
        this_div.removeClass("large_animal")
      }
      // 대동물 골랐으면 다른곳 색깔 없애기 
      if (this_class == "major11"){
        $("[order=16]").removeClass("large_animal")
        $("[order=17]").removeClass("large_animal")
        $("[order=21]").removeClass("large_animal")
        $("[order=22]").removeClass("large_animal")
        $("[order=25]").removeClass("large_animal")
        $("[order=26]").removeClass("large_animal")
        this_div.addClass("active")  
      }


          location.reload(true);
          console.log(major_array)
      
    }
  })
}


  major_array = new Array(39)
  $("#up-menu").addClass("active")

  $(".dropdown-toggle").click( function() {
      this_div = $(this).parent().parent()
      this_order = this_div.attr("order") 
      if (this_div.attr("select") == "true"){
        if (confirm("선택을 해제하시겠습니까") ==true){
          if (this_div.attr("first") == "true"){

            //2개짜리중 첫번째일 경우

            //다른div은 다음꺼
            other_order = parseInt(this_order) + 1

            this_one = $(this)
            major_id = this_div.attr("id")

            delWeekWithNext(this_order,other_order,major_id,this_one)

          } else if (this_div.attr("second") == "true"){
            //고른게 두번째일 경우
            this_one = $(this)
            //다른 div는 이전것 
            other_order = parseInt(this_order) - 1
            this_one = $(this)
            major_id = this_div.attr("id")
            //서버 전달

            delWeekWithPrevious(this_order,other_order,major_id,this_one)


          } else{
            //attr이 size가 1이었음.
            this_one = $(this)
            delWeek(this_div.attr("order"),$(this).attr("id"),this_one)
          }
        }else{
        }
      } else {
      }
    });

  $(".dropdown-menu li").click( function () { 
      this_class = $(this).attr('class')
      this_div = $(this).parent().parent().parent()
      this_name = $(this).parent().parent().children("a")
      this_week = this_div.attr("order")
      next_week = parseInt(this_week) + 1
      next_div = $("[order=" + next_week + "]")

      //다음주에 실습 차있고 2주짜리면 안됨
      if (next_div.attr("id")!=null){
        if(this_div.attr("id")!=null){
        alert("변경하려면 일정을 먼저 취소해야합니다")
          return false
        }
        if($(this).attr("size")==2){
          alert("다음주 일정이 있어 2주 실습을 넣을 수 없습니다")
          return false
        }
      }



      if (this_div.attr("id")==null){
      //이번주 일정 비어있음
        if ($(this).attr("size")==null){
        //1주짜리인 경우
          //
          //등록
          regiWeek(this_div.attr("order"),$(this).attr("id"),$(this).text(),$(this))

        } else {
        //2주짜리인경우
          //
          //마지막에 2주 넣지마
          if (this_div.attr("order") == 39){
            alert("마지막주에 2주 실습을 시작할 수 없습니다")
            return false
          }
          //
          //
          //등록
          regiWeekWithNext(this_div.attr("order"),$(this).attr("id"),$(this).text(),$(this))


        }
        return false


      } else {
        if(this_div.attr("id")!=null){
        alert("변경하려면 일정을 먼저 취소해야합니다")
          return false
        }
        return false;
      }
  });
})
