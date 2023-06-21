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
    var record = event.record;
    var product = record[productCell].value;
    var num = record[numCell].value;
    var dupField = record[dupCellCode];

    if (product && num) {
      var formattedDate = formatDate(dayjs());
      var productOmit = products[product];
      var formatValue = formattedDate + "-" + productOmit + "-" + num;
      dupField.value = formatValue;
    } else {
      dupField.value = "";
    }
    return event;
  });
})();
