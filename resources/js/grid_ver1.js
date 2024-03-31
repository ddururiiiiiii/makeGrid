

function gridAddRow(){
    let newRow = document.createElement('tr');
    let rowCount = document.getElementById('dataTable')
        .getElementsByTagName('tbody')[0].getElementsByTagName('tr').length + 1;
    newRow.innerHTML =
          '<td><input type="checkbox" id="checkbox_' + rowCount + '"></td>'
        + '<td style="text-align: center;"><span id="gridNo_' + rowCount + '">' + rowCount + '</span></td>'
        + '<td><input class="form-control" type="text" id="name_' + rowCount + '" placeholder="이름"></td>'
        + '<td><input class="form-control" type="text" id="position_' + rowCount + '" placeholder="직급"></td>'
        + '<td><input class="form-control" type="text" id="office_' + rowCount + '" placeholder="부서"></td>'
        + '<td><input class="form-control" type="text" id="age_' + rowCount + '" placeholder="나이"></td>'
        + '<td><input class="form-control" type="text" id="startDate_' + rowCount + '" placeholder="입사일"></td>'
        + '<td><input class="form-control" type="text" id="salary_' + rowCount + '" placeholder="연봉"></td>';

    document.getElementById('dataTable').getElementsByTagName('tbody')[0].appendChild(newRow);
    gridTotalCount();
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

    gridTotalCount();
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

function gridTotalCount(){
    let rowCount = document.getElementById('dataTable')
        .getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;
    document.getElementById("totalCount").textContent = rowCount;
}


//5글자 제한, 숫자 입력 불가.
document.querySelectorAll('[id^="name_"]').forEach(function (input){
    input.addEventListener('input', function () {
        let value = this.value.replace(/\d/g, '');
        if(value.length > 5){
            value = value.slice(0, 5);
        }
        this.value = value;
    })
});
//한글만 입력가능
//숫자만 입력가능 + 최대 길이
//숫자만 입력가능 + 최대 길이 + 3자리 콤마


document.addEventListener('DOMContentLoaded', function() {
    gridTotalCount();
    document.getElementById('addBtn').addEventListener('click', function (){
        gridAddRow();
        attachCheckboxEvents();
    });
    document.getElementById('delBtn').addEventListener('click', gridDelRow );
    document.getElementById('allCheckBox').addEventListener('click', checkAllCheckboxes);
    attachCheckboxEvents();
    
});

