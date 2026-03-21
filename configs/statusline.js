#!/usr/bin/env node
// InfraLearn Statusline — простая версия для студентов
// Показывает: модель, контекст %, время сессии, стоимость

let inputData = '';
process.stdin.on('data', (chunk) => { inputData += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(inputData);

    // Модель
    const model = data.model?.display_name || 'Claude';

    // Контекст %
    const contextPct = Math.round(data.context_window?.used_percentage || 0);
    const barLen = 10;
    const filled = Math.round(contextPct / 100 * barLen);
    const bar = '\u2593'.repeat(filled) + '\u2591'.repeat(barLen - filled);

    // Время сессии
    let duration = '';
    if (data.session?.duration_seconds) {
      const mins = Math.round(data.session.duration_seconds / 60);
      duration = mins < 60
        ? `${mins}m`
        : `${Math.floor(mins / 60)}h${String(mins % 60).padStart(2, '0')}m`;
    }

    // Стоимость
    const cost = data.session?.cost_usd
      ? `$${data.session.cost_usd.toFixed(2)}`
      : '';

    // Изменения
    let changes = '';
    if (data.git?.lines_added || data.git?.lines_removed) {
      changes = `+${data.git.lines_added || 0},-${data.git.lines_removed || 0} lines`;
    }

    // Собираем строку
    const parts = [model, `${bar} ${contextPct}%`, duration, cost].filter(Boolean);
    const line1 = parts.join(' \u2022 ');

    const output = changes ? `${line1}\n${changes}` : line1;
    process.stdout.write(output);
  } catch (e) {
    process.stdout.write('statusline error');
  }
});
