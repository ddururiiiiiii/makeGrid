
const columns= [
      { name : "회원명", id : "memberId", dateType : "String"}
    , { name : "이름", id : "name", dateType : "Number"}
    , { name : "나이", id : "age", dateType : "Number"}
    , { name : "주소", id : "address", dateType : "String"}
];

const data = [
      { memberId : "id001", name : "홍길동1", age : 20, address : "서울시1"}
    , { memberId : "id002", name : "홍길동2", age : 20, address : "서울시2"}
    , { memberId : "id003", name : "홍길동3", age : 20, address : "서울시3"}
];

function createTable(columns, data){
    const table = document.createElement("table");
    table.classList.add('table', 'table-bordered');

    //thead 생성
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    columns.forEach((column, idx)=> {
        const  th = document.createElement('th');
        th.textContent = column.name;
        th.style = 'text-align:center;';
        headerRow.appendChild(th);
        if (idx === 0 ){
            const  checkTh = document.createElement('th');
            const allCheckBoxInput = document.createElement('input');
            allCheckBoxInput.type ='checkbox';
            allCheckBoxInput.id = 'allCheckBox';
            checkTh.appendChild(allCheckBoxInput);
            headerRow.insertBefore(checkTh, headerRow.firstChild);
            const noTh = document.createElement('th');
            noTh.textContent ='No';
            headerRow.insertBefore(noTh, headerRow.firstChild);
        }
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    //tbody 생성
    const tbody = document.createElement('tbody');
    data.forEach((rowData, idx) => {
        const tr = document.createElement('tr');
        columns.forEach((column, colIdx) => {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.classList.add('form-control');
            input.type = 'text';
            input.id = column.name + '_' + (idx+1);
            input.value = rowData[column.id];
            td.appendChild(input);
            tr.appendChild(td);

            if(colIdx === 0){
                const checkboxCell = document.createElement('td');
                const checkboxInput = document.createElement('input');
                checkboxInput.type = 'checkbox';
                checkboxInput.id = "checkbox_" + (idx + 1);
                checkboxCell.appendChild(checkboxInput);
                tr.insertBefore(checkboxCell, tr.firstChild);
                const NoCell = document.createElement('td');
                NoCell.textContent = idx + 1;
                tr.insertBefore(NoCell, tr.firstChild);
            }
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}

function addRow(){
    const tbody = document.querySelector('tbody');
    const rowCount = tbody.children.length;
    const newRow = document.createElement('tr');

    //행번호
    const numberCell = document.createElement('td');
    numberCell.textContent = rowCount + 1;
    newRow.appendChild(numberCell);

    //체크박스
    const checkboxCell = document.createElement('td');
    const newCheckBox = document.createElement('input');
    newCheckBox.type = 'checkbox';
    newCheckBox.id = 'checkbox_' + (rowCount + 1);
    checkboxCell.appendChild(newCheckBox);
    newRow.appendChild(checkboxCell);

    columns.forEach((column, colIdx) =>{
        const td = document.createElement('td');
        const input = document.createElement('input');
        input.classList.add('form-control');
        input.type = 'text';
        input.id = column.id + '_' + (rowCount + 1);
        td.appendChild(input);
        newRow.appendChild(td);
    })
    tbody.appendChild(newRow);
}

function delRow(){
    const tbody = document.querySelector('tbody');
    const checkboxs = document.querySelectorAll('input[id*="checkbox"]:checked');

    if (checkboxs.length === 0){
        alert("삭제할 행을 선택하세요.");
        return;
    }

    checkboxs.forEach(checkbox =>{
        const row = checkbox.parentNode.parentNode;
        tbody.removeChild(row);
    });

    //번호 제정렬
    const rows = tbody.children;
    for(let i = 0; i < rows.length; i++){
        rows[i].cells[0].textContent = i + 1;
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

function gridTotalCount(){
    let rowCount = document.getElementById('dataTable')
        .getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;
    document.getElementById("totalCount").textContent = rowCount;
}

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('tableDiv');
    container.appendChild(createTable(columns, data));
    gridTotalCount();
    document.getElementById('addBtn').addEventListener('click', function (){
        addRow();
        attachCheckboxEvents();
    });
    document.getElementById('allCheckBox').addEventListener('click', checkAllCheckboxes);
    document.getElementById('delBtn').addEventListener('click', delRow);
    attachCheckboxEvents();
});

