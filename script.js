// ページが読み込まれた時にアニメーションを開始する
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const h1 = document.querySelector('h1');
    const p = document.querySelector('p');
    const links = document.querySelectorAll('.link-item');

    // containerのアニメーションを開始
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';

    // h1のアニメーションを開始
    h1.style.opacity = '1';
    h1.style.transform = 'translateY(0)';

    // pのアニメーションを開始
    p.style.opacity = '1';
    p.style.transform = 'translateY(0)';

    // リンクが1つずつアニメーションで表示される
    links.forEach((link, index) => {
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
        }, 200 * index); // リンクごとに遅延をつける
    });
});
