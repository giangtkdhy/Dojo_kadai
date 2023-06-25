(() => {
    'use strict';
    kintone.events.on('app.record.create.show', async (event) => {
        const AppId = '10'; // アプリのID
        const target = 'Action5'; // ターゲットフィールド名
        const targetTable = 'Table'; // ターゲットテーブル名
        const newIdset = 100; // 新しいレコードのID

        // フォームのフィールド情報を取得
        const form = await kintone.api(kintone.api.url('/k/v1/app/form/fields.json'), 'GET', { app: AppId, lang: 'ja' });

        // ターゲットテーブルのオプション情報を取得
        const options = form.properties[targetTable].fields[target].options;

        // オプションの数を取得
        const optionCount = Object.keys(options).length;

        // オプションをソートするための配列を作成
        const sortOptions = [];
        sortOptions[Number(optionCount) - 1] = '';

        // オプションをソートして配列に格納
        Object.keys(options).forEach((index) => {
            sortOptions[options[index].index] = index;
        });

        // ソートされたオプションを使って新しいレコードを作成
        sortOptions.forEach((option, index) => {
            if (index === 0) {
                // 最初のオプションを元のレコードにセット
                event.record[targetTable].value[index].value[target].value = option;
                event.record[targetTable].value[index].id = newIdset;
            } else {
                // 新しいレコードを作成し、オプションをセット
                const newItem = Object.assign({}, JSON.parse(JSON.stringify(event.record[targetTable].value[0])));
                newItem.value[target].value = option;
                newItem.id = newIdset + index;
                newItem.value['課題'].value = '';
                event.record[targetTable].value.push(newItem);
            }
        });
        return event;
    });
})();
