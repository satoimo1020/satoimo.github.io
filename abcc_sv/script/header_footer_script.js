// ==========================================================================
// 共通ヘッダー・フッターの動的読み込み＆ダークモード制御
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // index.html から見た親ディレクトリへのパス
    const basePath = '../../';

    Promise.all([
        fetch(`${basePath}header.html`).then(res => {
            if (!res.ok) throw new Error('Header network response was not ok');
            return res.text();
        }),
        fetch(`${basePath}footer.html`).then(res => {
            if (!res.ok) throw new Error('Footer network response was not ok');
            return res.text();
        })
    ])
    .then(([headerHtml, footerHtml]) => {
        // bodyの最初と最後にそれぞれ流し込む
        document.body.insertAdjacentHTML('afterbegin', headerHtml);
        document.body.insertAdjacentHTML('beforeend', footerHtml);

        // HTML挿入が完了した後にダークモードの初期化を実行
        initDarkMode();
    })
    .catch(err => console.error('コンポーネントの読み込みに失敗しました:', err));
});

function initDarkMode() {
    const toggleBtn = document.getElementById('darkmode-toggle');
    if (!toggleBtn) return;

    const savedMode = localStorage.getItem('dark-mode');
    const osPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // 初期状態の判定
    if (savedMode === 'enabled' || (!savedMode && osPrefersDark)) {
        document.body.classList.add('dark-mode');
    }

    // クリックイベントの登録
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
}
