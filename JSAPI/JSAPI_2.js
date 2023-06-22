(function() {
  
  "use strict";
  const products = { "kintone": "KN", "Garoon": "GR", "サイボウズ Office": "OF", "Mailwise": "MW" };
  const productCell = "サイボウズ製品";
  const numCell = "管理番号";
  const dupCellCode = "重複禁止項目_文字列";
// dateFnsライブラリー
  function formatDate(date) {
    return dateFns.format(date, "YYYYMMDD");
  }

  kintone.events.on(["app.record.create.change." + productCell, "app.record.edit.change." + productCell,
    "app.record.create.change." + numCell, "app.record.edit.change." + numCell
  ], function(event) {
    var record = event.record;
    var product = record[productCell].value;
    var num = record[numCell].value;
    var dupField = record[dupCellCode];

    if (product && num) {
      const formattedDate = formatDate(new Date());
      const productOmit = products[product];
      const formatValue = formattedDate + "-" + productOmit + "-" + num;
      dupField.value = formatValue;
 // subject 変数の定義: productField と numField の値を使用して、クエリ文字列を作成
      var subject = productCell + '="' + product + '" and ' + numCell + '="' + num + '"';
//アプリID、クエリ、および重複禁止項目のフィールドコードを設定します。
      var params = {
        app: kintone.app.getId(),
        query: subject,
        fields: [dupCellCode]
      };
//取得リクエストを送信
      kintone.api(kintone.api.url('/k/v1/records', true), 'GET', params, function(resp) {
        dupCell.error = resp.records.length > 0 ? '重複するよ' : null;
      });
    } else {
      dupCell.value = "";
      dupCell.error = null;
    }
    return event;
  }

  kintone.events.on(["app.record.create.show", "app.record.edit.show"], function(event) {
    const record = event.record;
    record[dupCellCode].disabled = true; //重複禁止項目_文字列フィールドを編集不可にする
    return event;
  });

  kintone.events.on(["app.record.create.change." + productCell, "app.record.edit.change." + productCell,
    "app.record.create.change." + numCell, "app.record.edit.change." + numCell
  ], checkDup);
})();
