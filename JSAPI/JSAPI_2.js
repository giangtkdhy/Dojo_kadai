(function() {
  
  "use strict";
  var products = {
    "kintone": "KN",
    "Garoon": "GR",
    "サイボウズ Office": "OF",
    "Mailwise": "MW"
  };
  var dateCell = "日付";
  var productCell = "サイボウズ製品";
  var numCell = "管理番号";
  var dupCellCode = "重複禁止項目_文字列";

  function formatDate(date) {
    return dayjs(date).format("YYYYMMDD");
  }

  kintone.events.on(["app.record.create.change." + productCell, "app.record.edit.change." + productCell,
    "app.record.create.change." + numCell, "app.record.edit.change." + numCell
  ], function(event) {
    var rec = event.record;
    var product = rec[productCell].value;
    var num = rec[numCell].value;
    var dupField = rec[dupCellCode];
 //重複チェック製品名と管理番号の両方が入力されている場合
    if (product && num) {
      var formattedDate = formatDate(dayjs());
      var productOmit = products[product];
      var formatValue = formattedDate + "-" + productOmit + "-" + num;
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
  });
})();
