console.log('view.js');

var mainViewPage = function(){
	var intro = "Main";
	var page = `
	    <div>
	 		<h1>${intro}</h1>
	    </div>
	`;
	return page;
}

var readViewPage = function(){
	var intro = "Read";
	var page = `
	  <h1>${intro}</h1>
      <table class="table my-3">
        <thead>
          <tr>
            <th scope="col">대분류</th>
            <th scope="col">소분류</th>
            <th scope="col">회사명</th>
            <th scope="col">등록일</th>
            <th scope="col">삭제</th>
            <th scope="col">수정</th>
          </tr>
        </thead>
        <tbody id="financeInfo_table">
        </tbody>
      </table>
	`;
	return page;
}

var registerViewPage = function(){
	var intro = "Register";
	var page = `
	  <h1>${intro}</h1>
      <div id="register_view" class="my-3">
        <div class="row">
            <div class="col-sm-3"><span>대분류</span></div>
            <div class="col-sm-9"><input id="category" class="form-control" type="" name=""></div>
          </div>
          <div class="row" style="margin-top: 20px">
            <div class="col-sm-3"><span>소분류</span></div>
            <div class="col-sm-9"><input id="sub_category" class="form-control" type="" name=""></div>
          </div>
          <div class="row" style="margin-top: 20px">
            <div class="col-sm-3"><span>회사이름</span></div>
            <div class="col-sm-9"><input id="company_name" class="form-control" type="" name=""></div>
          </div>
          <div class="row" style="margin-top: 20px">
            <div class="col-sm-3"><span>제목</span></div>
            <div class="col-sm-9"><input id="title" class="form-control" type="" name=""></div>
          </div>
          <div class="row" style="margin-top: 20px">
            <div class="col-sm-3"><span>접수시작일</span></div>
            <div class="col-sm-3"><input id="start_date" class="form-control" type="" name=""></div>
            <div class="col-sm-3"><span>접수마감일</span></div>
            <div class="col-sm-3"><input id="end_date" class="form-control" type="" name=""></div>
          </div>
          <div class="row" style="margin-top: 20px">
            <div class="col-sm-3"><span>모집 공고 내용</span></div>
            <div class="col-sm-9"><textarea id="content" class="form-control" rows="8"></textarea></div>
          </div>
          <div class="row" style="margin-top: 20px">
            <div class="col-sm-3"><span>이미지 링크</span></div>
            <div class="col-sm-9"><input id="image_url" class="form-control" type="" name=""></div>
          </div>
          <div class="row" style="margin-top: 20px">
            <div class="col-sm-3"><span>출처 링크</span></div>
            <div class="col-sm-9"><input id="content_link" class="form-control" type="" name=""></div>
          </div>
          <button id="save_btn" class="btn btn-info mt-3" style="float: right">저장</button>
      </div>
	`;
	return page;
}