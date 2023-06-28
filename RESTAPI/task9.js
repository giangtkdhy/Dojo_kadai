(function() {
    "use strict";
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
      const duplicateProhibitedItem = event.record[dupCell].value;
      // 重複チェック
      const isDuplicate = await checkDup(duplicateProhibitedItem);
      if (!isDuplicate) {
        return event;
      }
      const isConfirmed = confirm("レコードが重複しています。このまま保存しますか？");
      if (!isConfirmed) {
        return false;
      }
    });
  })();
  