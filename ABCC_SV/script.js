// ==========================================================================
/* 【新規実装】純粋なJavaScriptによるダークモード制御（依存性なし） */
// ==========================================================================
const toggleBtn = document.getElementById('darkmode-toggle');

// 1. ブラウザのローカルストレージ情報、またはOS設定から初期化
const savedMode = localStorage.getItem('dark-mode');
const osPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedMode === 'enabled' || (!savedMode && osPrefersDark)) {
    document.body.classList.add('dark-mode');
}

// 2. ボタンクリック時のトグル（切り替え）イベント
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // ユーザーの最新の選択を次回訪問時のために保存
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
});

// ==========================================================================
// TIPの展開方向と位置を自動で計算して設定するスクリプト（既存ロジック維持）
// ==========================================================================
document.querySelectorAll('.tip-indicator').forEach(indicator => {
    const content = indicator.querySelector('.tip-content');
    if (!content) return;

    indicator.addEventListener('mouseenter', () => {
        const rect = indicator.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const contentWidth = 274;

        let top = rect.bottom;
        let left = 0;

        if (rect.left < windowWidth / 2) {
            left = rect.left;
            content.classList.remove('is-left');
            content.classList.add('is-right');

            if (left + contentWidth > windowWidth) {
                left = windowWidth - contentWidth - 16;
            }
        } else {
            left = rect.right - contentWidth;
            content.classList.remove('is-right');
            content.classList.add('is-left');

            if (left < 16) {
                left = 16;
            }
        }

        content.style.top = `${top}px`;
        content.style.left = `${left}px`;
    });
});
