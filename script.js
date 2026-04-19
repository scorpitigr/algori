// Флаги и значения
var CURRENT_COLOR = "rgb(255, 102, 46)"; // Начальный цвет (красный)
var DEFAULT_COLOR = "rgb(62, 62, 62)";   // Цвет по умолчанию (темно-серый)
var IS_CLICKED = false; // Флаг для отслеживания состояния кнопки мыши
var FILL_MODE = false; // Флаг для режима заливки


// Массив соответствия классов и цветов
var COLOR_MAP = {
    "red": "rgb(255, 102, 46)",
    "green": "rgb(26, 218, 84)",
    "blue": "rgb(83, 15, 255)",
    "yellow": "rgb(255, 236, 26)",
    "skyblue": "rgb(142, 229, 255)"
};

// Отслеживаем состояние кнопки мыши
document.addEventListener('mousedown', function() {
    IS_CLICKED = true;
});

document.addEventListener('mouseup', function() {
    IS_CLICKED = false;
});

// Заполняем поле клетками
let field = document.querySelector('.field')
for (let i = 0; i < 450; i += 1) {
    let cell = document.createElement('div')
    cell.classList.add('cell')
	cell.setAttribute('id', `${i}`) // Добавляем ID для анимации
    field.appendChild(cell)
}

// Каждой ячейке добавляем обработчики событий
let cells = document.querySelectorAll('.cell')
for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    
    // Обработчик клика (для одиночного закрашивания)
    cell.addEventListener('click', function() {
        cell.style.backgroundColor = CURRENT_COLOR;
    })
    
    // Обработчик наведения мыши (для рисования с зажатой кнопкой)
    cell.addEventListener('mouseover', function() {
        if (IS_CLICKED) {
            cell.style.backgroundColor = CURRENT_COLOR;
        }
    })
    
    // Обработчик нажатия мыши на ячейке 
    cell.addEventListener('mousedown', function() {
         if (FILL_MODE) {
            // Если включен режим заливки, анимируем заливку всех ячеек
            let cell_id = parseInt(cell.getAttribute('id'));
            
            anime({
                targets: '.cell',
                backgroundColor: CURRENT_COLOR,
                easing: 'easeInOutQuad',
                duration: 500,
                delay: anime.stagger(50, {grid: [30, 15], from: cell_id}),
            });
            
            // После анимации устанавливаем цвет для всех ячеек
            setTimeout(() => {
                for (let j = 0; j < cells.length; j++) {
                    cells[j].style.backgroundColor = CURRENT_COLOR;
                }
            }, 1000); // Задержка чуть больше максимальной длительности анимации
        } else {
            cell.style.backgroundColor = CURRENT_COLOR;
        }
    })
	
	
}

// Выбор цвета из палитры
let color_cells = document.querySelectorAll('.color-cell')
for (let i = 0; i < color_cells.length; i++) {
    let color_cell = color_cells[i];
    color_cell.addEventListener('click', function() {
        // Определяем цвет по классу элемента
        let colorClass = "";
        if (color_cell.classList.contains("red")) colorClass = "red";
        else if (color_cell.classList.contains("green")) colorClass = "green";
        else if (color_cell.classList.contains("blue")) colorClass = "blue";
        else if (color_cell.classList.contains("yellow")) colorClass = "yellow";
        else if (color_cell.classList.contains("skyblue")) colorClass = "skyblue";
        
        // Устанавливаем текущий цвет
        CURRENT_COLOR = COLOR_MAP[colorClass];
		
		// Выключаем режим заливки при выборе цвета
        FILL_MODE = false;
        
        // Обновляем выделение в палитре
        document.querySelector('.selected').classList.remove('selected')
        color_cell.classList.add('selected')
    })
}

// Обработчик для ластика
document.querySelector('.eraser').addEventListener('click', function() {
    CURRENT_COLOR = DEFAULT_COLOR;
	FILL_MODE = false; // Выключаем режим заливки при выборе ластика
    
    // Убираем выделение с предыдущего выбранного элемента
    document.querySelector('.selected').classList.remove('selected')
    
    // Добавляем выделение на ластик
    this.classList.add('selected')
})

// Обработчик инструмента заливки
document.querySelector('.fill-tool').addEventListener('click', function() {
    FILL_MODE = true;
    
    document.querySelector('.selected').classList.remove('selected')
    this.classList.add('selected')
})