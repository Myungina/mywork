<?php
include_once("../../_common.php");
include_once("./search_query_ajax.php");
$cm_lec = new cm_lec;
$it_id = $_POST['it_id'] ?? $_GET['it_id'] ?? '';
$selected_cat_id = $_POST['cat_id'] ?? $_GET['cat_id'] ?? '';

if(!$it_id){
    echo "상품 ID 없음";
    exit;
}

$subject_list = $cm_lec->GetLectureId_v2($it_id);

if(empty($subject_list)){
    echo "과목 정보 없음";
    exit;
}
?>
<link rel="stylesheet" href="/mobile/css/curriculum.css">
<div class="curriculum_wrap">
    <div class="curriculum_select">
        <div id="categorySelect" class="category_select">
            <?php foreach($subject_list['tb_list'] as $i => $row){ ?>
            <button 
                class="category-item <?= $i==0 ? 'selected' : '' ?>"
                data-value="<?= $row['cat_id'] ?>"
                data-cat-name="<?= $row['cat_name'] ?>"
            >
                <?= $row['cat_name'] ?>
            </button>

        <?php } ?>
        </div>
        <div  class="subject_select_wrap">
            <select id="subjectSelect"></select>
        </div>
    </div>

    <div class="curriculum_body">
        <ul id="tbListContainer" class="tbListContainer"></ul>
        <p class="sub_info">더 자세한 내용은 PC에서 확인해주세요.</p>        
    </div>
</div>
<script>

(function(){

const it_id = "<?= $it_id ?>";
const subjectList = <?= json_encode($subject_list['tb_list']) ?>;

const categorySelect = document.getElementById('categorySelect');
const subjectSelect = document.getElementById('subjectSelect');
const tbContainer = document.getElementById('tbListContainer');
//const subjectTitle = document.getElementById('currentSubject');


/* 과목 select 생성 */
function buildSubjectSelect(cat_id){

    subjectSelect.innerHTML = '';

    const data = subjectList.find(v => v.cat_id == cat_id);

    if(!data || !data.cat_content) return;

    data.cat_content.forEach(v => {

        const option = document.createElement('option');

        option.value = v.tbsubject_as;
        option.textContent = v.tbsubject_name;

        subjectSelect.appendChild(option);

    });

}


/* 차시 리스트 불러오기 */
function loadTbList(cat_id){

    const formData = new FormData();

    formData.append('action','get_tb_list');
    formData.append('it_id', it_id);
    formData.append('cat_id', cat_id);

    fetch('/mobile/mb/ajax_curriculum.php',{
        method:'POST',
        body:formData
    })
    .then(r => r.text())
    .then(html => {

        tbContainer.innerHTML =
            html.trim() || '<li class="empty">차시 정보 없음</li>';

    });

}


/* 카테고리 클릭 */
if(categorySelect){

    categorySelect.addEventListener('click', function(e){

        const btn = e.target.closest('.category-item');
        if(!btn) return;

        const cat_id = btn.dataset.value;
        const cat_name = btn.dataset.catName;

        document
            .querySelectorAll('#categorySelect .category-item')
            .forEach(v => v.classList.remove('selected'));

        btn.classList.add('selected');

        //subjectTitle.textContent = cat_name;

        buildSubjectSelect(cat_id);

        loadTbList(cat_id);

    });

} 


/* 과목 select 변경 */
subjectSelect.addEventListener('change', function(){

    const tbsubject_as = this.value;

    document
        .querySelectorAll('#tbListContainer .tb_list_section')
        .forEach(v => v.classList.remove('block'));

    const target = document.getElementById(tbsubject_as);

    if(target) target.classList.add('block');

});

/* 아코디언 애니메이션 */
if(!window.curriculumAccordionInit){

    window.curriculumAccordionInit = true;

    document.addEventListener('click', function(e){

        const btn = e.target.closest('.top_tb_item'); 
        if(!btn) return;

        const container = btn.closest('.dt_toggle_contain');
        const area = container.querySelector('.dt_toggle_area');
        const wrap = container.closest('#curriculum_area');        
        const inner = area.querySelector('.dt_toggle_inner');
        if(!wrap) return;

        // 다른 아코디언 닫기
        // wrap.querySelectorAll('.dt_toggle_contain').forEach(item=>{
        //     if(item !== container){
        //         item.classList.remove('active');
        //         const other = item.querySelector('.dt_toggle_area');
        //         if(other){
        //             other.style.height = '0px';
        //         }
        //     }
        // });


        // 토글
        if(container.classList.contains('active')){
            container.classList.remove('active');
            area.style.height = '0px';
        }else{
            container.classList.add('active');
            area.style.height = inner.getBoundingClientRect().height + 'px';
        }

    });

}


/* 첫 로딩 */
const firstBtn = document.querySelector('#categorySelect .category-item');

if(firstBtn){

    const cat_id = firstBtn.dataset.value;
    const cat_name = firstBtn.dataset.catName;

    firstBtn.classList.add('selected');

    //subjectTitle.textContent = cat_name;

    buildSubjectSelect(cat_id);

    loadTbList(cat_id);

}

})();

</script>