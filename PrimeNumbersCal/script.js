function calcRun() {
    const result = document.getElementById('result');
    const primeCheckResult = document.getElementById('primeCheckResult');  // 素数判定の結果を表示する要素
    const numInput = document.getElementById('num');
    let num = Number(numInput.value);

    // 6桁までの制限を実施
    if (numInput.value.length > 6) {
        numInput.value = numInput.value.slice(0, 6);  // 6桁を超える入力は切り捨て
        num = Number(numInput.value);  // 切り捨てた後の値を使用
    }

    const pnList = [];  // 配列に変更
    let i = NaN;
    let j = NaN;
    let divideFlag = false;

    // 2以上の数字に対して素数判定を行う
    for (i = 2; i < num; i++) {
        divideFlag = true;

        // iの平方根までチェック
        for (j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                divideFlag = false;
                break;
            }
        }

        // 素数ならpnListに追加
        if (divideFlag) {
            pnList.push(i);
        }
    }

    // 結果を表示
    result.textContent = pnList.join(', ');  // 配列を文字列に変換して表示

    // 素数判定の結果を表示
    if (num < 2) {
        primeCheckResult.textContent = `${num} は素数ではありません。`;
        primeCheckResult.style.color = 'red';  // 赤色で表示
    } else {
        divideFlag = true;
        // numの素数判定
        for (j = 2; j <= Math.sqrt(num); j++) {
            if (num % j === 0) {
                divideFlag = false;
                break;
            }
        }

        if (divideFlag) {
            primeCheckResult.textContent = `${num} は素数です。`;
            primeCheckResult.style.color = 'green';  // 緑色で表示
        } else {
            primeCheckResult.textContent = `${num} は素数ではありません。`;
            primeCheckResult.style.color = 'red';  // 赤色で表示
        }
    }

}

window.onload = function() {
    document.getElementById('num').oninput = calcRun;
}
