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
 //レコード作成時および編集時のイベントで呼び出される関数
  function checkDup(event) {
    const record = event.record;
    const product = record[productCell].value;
    const num = record[numCell].value;
    const dupField = record[dupCellCode];

    if (product && num) {
      const formattedDate = formatDate(new Date());
      const productOmit = products[product];
      const formatValue = formattedDate + "-" + productOmit + "-" + num;
      dupField.value = formatValue;
    } else {
      dupField.value = "";
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