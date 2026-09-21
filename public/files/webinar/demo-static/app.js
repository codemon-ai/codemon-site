/* === Filter real cards, expose state to assistive technology === */
const filters = [...document.querySelectorAll('[data-filter]')];
const projects = [...document.querySelectorAll('[data-category]')];
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  projects.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
  document.getElementById('filterStatus').textContent = `사례 ${projects.filter(card => !card.hidden).length}개 표시`;
}));
/* === Copy email, with a visible fallback when clipboard is unavailable === */
document.getElementById('copyEmail').addEventListener('click', async () => {
  const email = document.getElementById('emailLink').textContent.trim();
  const status = document.getElementById('copyStatus');
  try {
    await navigator.clipboard.writeText(email);
    status.textContent = `${email} 복사 완료. 예시 주소이므로 실제 발송 전에 본인 주소로 교체하세요.`;
  } catch {
    status.textContent = `자동 복사를 사용할 수 없습니다. ${email}을 직접 선택해 복사하세요.`;
  }
});
