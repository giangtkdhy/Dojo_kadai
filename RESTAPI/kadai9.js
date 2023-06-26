(function() {
  "use strict";
  const products = { "kintone": "KN", "Garoon": "GR", "サイボウズ Office": "OF", "Mailwise": "MW" };
  const productCell = "サイボウズ製品";
  const numCell = "管理番号";
  const dupCell = "重複禁止項目";

  // 重複チェック関数
  async function checkDup(value) {
    const query = `${dupCell} = "${value}"`;
    const params = { app: kintone.app.getId(), query: query };
    const response = await kintone.api(kintone.api.url('/k/v1/records'), 'GET', params);
    return response.records.length > 0;
  }

  // レコード保存時のイベントで呼び出される関数
  kintone.events.on(["app.record.create.submit", "app.record.edit.submit"], async function(event) {
    const record = event.record;
    const product = record[productCell].value;
    const num = record[numCell].value;
    const dupField = record[dupCell];

    if (product && num) {
      // 重複禁止項目の値をフォーマット
      const formatDate = dateFns.format(new Date(), "YYYYMMDD");
      const productOmit = products[product];
      const formatValue = formatDate + "-" + productOmit + "-" + num;
      // 重複チェック
      const Dup = checkDup(formatValue);
      if (Dup) {
        // 重複がある場合
        const confirmed = confirm("レコードが重複しています。このまま保存しますか？");
        if (!confirmed) {
          // キャンセルされた場合は保存操作をキャンセル
          return false;
        }
      }

      // 重複禁止項目の値を更新
      dupField.value = formatValue;
    } else {
      // サイボウズ製品か管理番号のどちらかが未入力の場合は重複禁止項目をクリア
      dupField.value = "";
    }

    return event;
  });
})();
