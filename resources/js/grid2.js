

function gridAddRow(){
    let newRow = document.createElement('tr');
    let rowCount = document.getElementById('dataTable')
        .getElementsByTagName('tbody')[0].getElementsByTagName('tr').length + 1;
    newRow.innerHTML =
          '<td><input type="checkbox" id="checkbox_' + rowCount + '"></td>'
        + '<td><span id="gridNo_' + rowCount + '">' + rowCount + '</span></td>'
        + '<td><input class="form-control" type="text" id="name_' + rowCount + '" placeholder="이름"></td>'
        + '<td><input class="form-control" type="text" id="position_' + rowCount + '" placeholder="직급"></td>'
        + '<td><input class="form-control" type="text" id="office_' + rowCount + '" placeholder="부서"></td>'
        + '<td><input class="form-control" type="text" id="age_' + rowCount + '" placeholder="나이"></td>'
        + '<td><input class="form-control" type="text" id="startDate_' + rowCount + '" placeholder="입사일"></td>'
        + '<td><input class="form-control" type="text" id="salary_' + rowCount + '" placeholder="연봉"></td>';

    document.getElementById('dataTable').getElementsByTagName('tbody')[0].appendChild(newRow);
}


function gridDelRow(){
    let checkedCount = document.querySelectorAll('[id*="checkbox_"]:checked').length;
    let rowCount = document.getElementById('dataTable')
        .getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;

    if(rowCount === 0){
        alert("삭제할 행이 없습니다.");
    }

    if (checkedCount === 0){
        alert("삭제할 행을 체크해주세요.");
    } else {
        let checkedCheckboxes = document.querySelectorAll('[id^="checkbox_"]:checked');

        if (checkedCheckboxes.length > 0) {
            checkedCheckboxes.forEach(function(checkbox) {
                let row = checkbox.closest('tr');
                row.parentNode.removeChild(row);
            });

            let gridNoSpans = document.querySelectorAll('[id^="gridNo_"]');
            gridNoSpans.forEach(function(span, index) {
                span.textContent = index + 1;
            });
        } else {
            alert("선택된 행이 없습니다.");
        }
    }
}

function checkAllCheckboxes(){
    let isChecked = this.checked;
    let checkboxes = document.querySelectorAll('[id^="checkbox_"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = isChecked;
    });
}

function attachCheckboxEvents() {
    document.querySelectorAll('[id^="checkbox_"]').forEach(function(checkbox) {
        checkbox.addEventListener('click', function() {
            let allCheckBox = document.getElementById('allCheckBox');
            allCheckBox.checked = [...document.querySelectorAll('[id^="checkbox_"]')].every(checkbox => checkbox.checked);
        });
    });
}

let currentPage = 1; // 현재 페이지
const rowsPerPage = 5; // 페이지 당 행 수

// 페이지네이션 업데이트 함수
function updatePagination() {
    const tableRows = document.querySelectorAll("#dataTable tbody tr");
    const totalPages = Math.ceil(tableRows.length / rowsPerPage);

    const paginationContainer = document.querySelector(".pagination");
    paginationContainer.innerHTML = "";

    // 이전 페이지 버튼 추가
    const prevPageBtn = document.createElement("li");
    prevPageBtn.classList.add("page-item");
    if (currentPage === 1) {
        prevPageBtn.classList.add("disabled");
    }
    prevPageBtn.innerHTML = `<a class="page-link" href="#" tabindex="-1">Previous</a>`;
    prevPageBtn.addEventListener("click", function() {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });
    paginationContainer.appendChild(prevPageBtn);

    // 페이지 버튼 추가
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("li");
        pageBtn.classList.add("page-item");
        if (currentPage === i) {
            pageBtn.classList.add("active");
        }
        pageBtn.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageBtn.addEventListener("click", function() {
            currentPage = i;
            updatePagination();
        });
        paginationContainer.appendChild(pageBtn);
    }

    // 다음 페이지 버튼 추가
    const nextPageBtn = document.createElement("li");
    nextPageBtn.classList.add("page-item");
    if (currentPage === totalPages) {
        nextPageBtn.classList.add("disabled");
    }
    nextPageBtn.innerHTML = `<a class="page-link" href="#">Next</a>`;
    nextPageBtn.addEventListener("click", function() {
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });
    paginationContainer.appendChild(nextPageBtn);
}


function initializePagination() {
    showPage(currentPage);
    addEventListeners();
}

// 페이지를 보여주는 함수
function showPage(pageNumber) {
    const rows = document.querySelectorAll("#dataTable tbody tr"); // 테이블의 모든 행 가져오기
    const startIndex = (pageNumber - 1) * rowsPerPage; // 페이지의 시작 인덱스 계산
    const endIndex = startIndex + rowsPerPage - 1; // 페이지의 끝 인덱스 계산

    // 모든 행을 숨김
    rows.forEach(row => {
        row.classList.add("d-none");
    });

    // 현재 페이지에 해당하는 행만 표시
    for (let i = startIndex; i <= endIndex && i < rows.length; i++) {
        rows[i].classList.remove("d-none");
    }
}

function addEventListeners() {
    const pageLinks = document.querySelectorAll(".pagination .page-link");
    pageLinks.forEach(link => {
        link.addEventListener("click", function() { debugger;
            paginationActiveChange(this);
            const pageNumber = parseInt(this.textContent);
            currentPage = pageNumber;
            showPage(currentPage);
        });
    });
}

function paginationActiveChange(clickPage) {
    let pagination = document.querySelectorAll(".pagination .page-item");
    pagination.forEach(page => {
        page.classList.remove("active");
    });
    clickPage.parentNode.classList.add("active");
}


document.addEventListener('DOMContentLoaded', function() {
    updatePagination();
    initializePagination();
    document.getElementById('addBtn').addEventListener('click', function (){
        gridAddRow();
        attachCheckboxEvents();
    });
    document.getElementById('delBtn').addEventListener('click', gridDelRow );
    document.getElementById('allCheckBox').addEventListener('click', checkAllCheckboxes);
    attachCheckboxEvents();


});

