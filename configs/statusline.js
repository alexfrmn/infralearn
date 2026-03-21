#!/usr/bin/env node
// InfraLearn Statusline — простая версия для студентов
// Показывает: директорию, модель, контекст, время сессии

const data = JSON.parse(process.argv[2] || '{}');

const model = (data.model || 'unknown').replace('claude-', '').replace('-', ' ');
const contextPct = data.context_window_tokens
    ? Math.round((data.total_tokens_in_conversation / data.context_window_tokens) * 100)
    : 0;

// Progress bar
const barLen = 10;
const filled = Math.round(contextPct / 100 * barLen);
const bar = '\u2593'.repeat(filled) + '\u2591'.repeat(barLen - filled);

// Session duration
let duration = '';
if (data.session_start_time) {
    const mins = Math.round((Date.now() - data.session_start_time) / 60000);
    duration = mins < 60 ? `${mins}m` : `${Math.floor(mins/60)}h${String(mins%60).padStart(2,'0')}m`;
}

// Cost
const cost = data.total_cost ? `$${data.total_cost.toFixed(2)}` : '';

// Line 1
const parts = [model, `${bar} ${contextPct}%`, duration, cost].filter(Boolean);
const line1 = parts.join(' | ');

// Line 2: git changes
let line2 = '';
if (data.lines_added || data.lines_removed) {
    line2 = `+${data.lines_added || 0},-${data.lines_removed || 0} lines`;
}

const output = [line1, line2].filter(Boolean).join('\n');
process.stdout.write(output);
