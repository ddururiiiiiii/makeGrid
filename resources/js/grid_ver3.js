class TableManager {
    constructor(columns, data, containerId, addBtnId, delBtnId, totalCountId) {
        this.columns = columns;
        this.data = data;
        this.container = document.getElementById(containerId);
        this.addBtn = document.getElementById(addBtnId);
        this.delBtn = document.getElementById(delBtnId);
        this.totalCount = document.getElementById(totalCountId);

        this.init();
    }

    init() {
        this.renderTable();
        this.updateTotalCount();
        this.addBtn.addEventListener('click', () => {
            this.addRow();
            this.attachCheckboxEvents();
        });
        this.delBtn.addEventListener('click', () => this.delRow());
        document.getElementById('allCheckBox').addEventListener('click', (e) => this.checkAllCheckboxes(e));
        this.attachCheckboxEvents();
    }

    renderTable() {
        this.container.appendChild(this.createTable());
    }

    createTable() {
        const table = document.createElement('table');
        table.classList.add('table', 'table-bordered');
        table.id = 'dataTable';

        // Thead 생성
        const thead = this.createThead();
        table.appendChild(thead);

        // Tbody 생성
        const tbody = this.createTbody();
        table.appendChild(tbody);

        return table;
    }

    createThead() {
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        this.columns.forEach((column, idx) => {
            const th = document.createElement('th');
            th.textContent = column.name;
            th.style = 'text-align:center;';
            headerRow.appendChild(th);

            if (idx === 0) {
                const checkTh = document.createElement('th');
                const allCheckBoxInput = document.createElement('input');
                allCheckBoxInput.type = 'checkbox';
                allCheckBoxInput.id = 'allCheckBox';
                checkTh.appendChild(allCheckBoxInput);
                headerRow.insertBefore(checkTh, headerRow.firstChild);
                const noTh = document.createElement('th');
                noTh.textContent = 'No';
                headerRow.insertBefore(noTh, headerRow.firstChild);
            }
        });

        thead.appendChild(headerRow);
        return thead;
    }

    createTbody() {
        const tbody = document.createElement('tbody');
        this.data.forEach((rowData, idx) => {
            const tr = document.createElement('tr');
            this.columns.forEach((column, colIdx) => {
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.classList.add('form-control');
                input.type = 'text';
                input.id = `${column.name}_${idx + 1}`;
                input.value = rowData[column.id];
                td.appendChild(input);
                tr.appendChild(td);

                if (colIdx === 0) {
                    const checkboxCell = document.createElement('td');
                    const checkboxInput = document.createElement('input');
                    checkboxInput.type = 'checkbox';
                    checkboxInput.id = `checkbox_${idx + 1}`;
                    checkboxCell.appendChild(checkboxInput);
                    tr.insertBefore(checkboxCell, tr.firstChild);
                    const noCell = document.createElement('td');
                    noCell.textContent = idx + 1;
                    tr.insertBefore(noCell, tr.firstChild);
                }
            });
            tbody.appendChild(tr);
        });
        return tbody;
    }

    addRow() {
        const tbody = document.querySelector('tbody');
        const rowCount = tbody.children.length;
        const newRow = document.createElement('tr');

        // 행번호
        const numberCell = document.createElement('td');
        numberCell.textContent = rowCount + 1;
        newRow.appendChild(numberCell);

        // 체크박스
        const checkboxCell = document.createElement('td');
        const newCheckBox = document.createElement('input');
        newCheckBox.type = 'checkbox';
        newCheckBox.id = `checkbox_${rowCount + 1}`;
        checkboxCell.appendChild(newCheckBox);
        newRow.appendChild(checkboxCell);

        this.columns.forEach((column) => {
            const td = document.createElement('td');
            const input = document.createElement('input');
            input.classList.add('form-control');
            input.type = 'text';
            input.id = `${column.id}_${rowCount + 1}`;
            td.appendChild(input);
            newRow.appendChild(td);
        });

        tbody.appendChild(newRow);
        this.updateTotalCount();
    }

    delRow() {
        const tbody = document.querySelector('tbody');
        const checkboxes = document.querySelectorAll('input[id*="checkbox"]:checked');

        if (checkboxes.length === 0) {
            alert("삭제할 행을 선택하세요.");
            return;
        }

        checkboxes.forEach(checkbox => {
            const row = checkbox.parentNode.parentNode;
            tbody.removeChild(row);
        });

        // 번호 재정렬
        Array.from(tbody.children).forEach((row, idx) => {
            row.cells[0].textContent = idx + 1;
        });
        this.updateTotalCount();
    }

    checkAllCheckboxes(event) {
        const isChecked = event.target.checked;
        const checkboxes = document.querySelectorAll('[id^="checkbox_"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
    }

    attachCheckboxEvents() {
        document.querySelectorAll('[id^="checkbox_"]').forEach(checkbox => {
            checkbox.addEventListener('click', () => {
                const allCheckBox = document.getElementById('allCheckBox');
                allCheckBox.checked = [...document.querySelectorAll('[id^="checkbox_"]')].every(checkbox => checkbox.checked);
            });
        });
    }

    updateTotalCount() {
        const rowCount = document.getElementById('dataTable')
            .getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;
        this.totalCount.textContent = rowCount;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const columns = [
        { name: "회원명", id: "memberId", dateType: "String" },
        { name: "이름", id: "name", dateType: "Number" },
        { name: "나이", id: "age", dateType: "Number" },
        { name: "주소", id: "address", dateType: "String" }
    ];

    const data = [
        { memberId: "id001", name: "홍길동1", age: 20, address: "서울시1" },
        { memberId: "id002", name: "홍길동2", age: 20, address: "서울시2" },
        { memberId: "id003", name: "홍길동3", age: 20, address: "서울시3" }
    ];

    new TableManager(columns, data, 'tableDiv', 'addBtn', 'delBtn', 'totalCount');
});