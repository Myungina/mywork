//배너 내용 미리보기 삽입
document.querySelectorAll('#mid_title , #big_title , #btn_txt').forEach(el => {
    el.addEventListener('keyup', function(){
        let $this = this.id;
        let $this_val = this.value;
        let set_txt_target = 'pre_subTie'; // 미리보기 html class(default : 작은글자[서브타이틀])

        if($this == "big_title"){
            set_txt_target = 'pre_Tie';
            $this_val = $this_val.replace(/\n/g, '<br>');  //두줄 <br>태그
        }else if($this == 'btn_txt'){
            set_txt_target = 'prv_btn';
        }
        //console.log($this_val);
        document.querySelector('.'+set_txt_target).innerHTML = $this_val;
    });
});

//이미지 첨부시 미리보기 삽입
const previewImgFn = (imgsrc) => {
    //console.log(imgsrc);
    const $target = document.querySelector('.prv_inner');
    $target.style.backgroundImage = `url(${imgsrc})`;
    $target.style.backgroundSize = 'cover';
    $target.style.backgroundRepeat = 'no-repeat';
}