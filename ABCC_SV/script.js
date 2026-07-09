// ==========================================================================
// ダークモード制御
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
// TIPの展開方向と位置を自動計算
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

// ==========================================================================
// スクロールスパイ（閲覧中のセクションを目次でハイライト）
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {
    const tocLinks = document.querySelectorAll('.sidebar a');
    
    // 目次のリンク先となる要素（idを持つ各セクション）を配列で取得
    const sections = Array.from(tocLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    function spyScroll() {
        // 現在のスクロール位置を取得（上部に140pxの判定バッファを設定）
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        const triggerOffset = 140; 

        let currentSectionId = '';

        // 現在どのセクションが画面上部を通過しているか判定
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPosition + triggerOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // 判定したセクションに対応する目次だけに active クラスを付与
        tocLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // スクロール時およびページ読み込み時に実行
    window.addEventListener('scroll', spyScroll);
    spyScroll();
});