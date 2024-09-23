const totalDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

  function generateCalendar(selectedMonth = 0) {
    const year = 2024; // Ano específico (2024 é bissexto)
    const calendarContainer = document.getElementById('calendarContainer');
    calendarContainer.innerHTML = ''; // Limpa o calendário antes de gerar

    let isFolga = false; // Alterna entre folga e trabalho (true para folga, false para trabalho)

    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    for (let month = 1; month <= 12; month++) {
      if (selectedMonth !== 0 && month !== selectedMonth) continue; // Exibe apenas o mês selecionado, ou todos se for "Todos"

      const daysInMonth = totalDaysInMonth(month, year);
      const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long' });

      // Criar o container do mês
      const monthDiv = document.createElement('div');
      monthDiv.classList.add('month');

      // Adicionar o nome do mês
      const monthHeader = document.createElement('h2');
      monthHeader.textContent = monthName;
      monthDiv.appendChild(monthHeader);

      // Criar os dias da semana como cabeçalhos
      const daysDiv = document.createElement('div');
      daysDiv.classList.add('days');
      dayNames.forEach(dayName => {
        const dayHeaderDiv = document.createElement('div');
        dayHeaderDiv.classList.add('day', 'day-header');
        dayHeaderDiv.textContent = dayName;
        daysDiv.appendChild(dayHeaderDiv);
      });

      // Preencher os dias do mês com base no primeiro dia da semana
      const firstDayOfWeek = new Date(year, month - 1, 1).getDay();

      // Adicionar espaços vazios antes do primeiro dia do mês
      for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('day');
        daysDiv.appendChild(emptyDiv);
      }

      // Preencher o calendário com os dias do mês
      for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = day;

        // Alterna folga e trabalho (um dia sim, outro não)
        if (isFolga) {
          dayDiv.classList.add('folga');
        }

        // Alterna entre folga e trabalho
        isFolga = !isFolga;

        // Colore o final de semana
        const dayOfWeek = new Date(year, month - 1, day).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          dayDiv.classList.add('weekend');
        }

        daysDiv.appendChild(dayDiv);
      }

      // Adicionar os dias ao mês
      monthDiv.appendChild(daysDiv);
      calendarContainer.appendChild(monthDiv);
    }
  }

  // Filtrar meses com base na seleção do usuário
  const monthFilter = document.getElementById('monthFilter');
  monthFilter.addEventListener('change', function() {
    const selectedMonth = parseInt(this.value);
    generateCalendar(selectedMonth);
  });

  // Gerar calendário inicial (todos os meses)
  generateCalendar();