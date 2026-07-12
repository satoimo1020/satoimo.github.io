document.addEventListener('DOMContentLoaded', () => {
    // 1. モーダル用のHTML要素（背景と拡大画像格納用）を動的に作成してbodyに追加
    const overlay = document.createElement('div');
    overlay.className = 'image-modal-overlay';

    const modalImg = document.createElement('img');
    modalImg.className = 'image-modal-content';
    modalImg.alt = '拡大画像';

    overlay.appendChild(modalImg);
    document.body.appendChild(overlay);

    // 2. main要素内のすべての img タグを対象にラッパーを適用
    const images = document.querySelectorAll('main img');

    images.forEach(img => {
        // 二重処理防止
        if (img.parentElement.classList.contains('image-preview-wrapper')) return;

        // 画像を包むコンテナ（ラッパー）を生成
        const wrapper = document.createElement('div');
        wrapper.className = 'image-preview-wrapper';

        // HTML上のimgをラッパーの中に移し替える
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);

        // 画像（ラッパー）クリックでモーダルを開く
        wrapper.addEventListener('click', () => {
            modalImg.src = img.src;
            overlay.classList.add('is-active');
            document.body.style.overflow = 'hidden'; // 背面のメイン画面のスクロールを禁止
        });
    });

    // 3. 余白（背景）をクリックしたら画像表示を終了する
    overlay.addEventListener('click', (e) => {
        // クリックされたのが画像（modalImg）そのものではない場合＝背景（余白）の場合
        if (e.target !== modalImg) {
            overlay.classList.remove('is-active');
            document.body.style.overflow = ''; // スクロール禁止を解除

            // フェードアウトアニメーションが終わった後にsrcを空にする（次回開く際の一瞬の残像防止）
            setTimeout(() => {
                if (!overlay.classList.contains('is-active')) {
                    modalImg.src = '';
                }
            }, 300);
        }
    });
});
