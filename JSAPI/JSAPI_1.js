(() => {
  'use strict'; 

  kintone.events.on('app.record.create.show', (event) => {
    const table = 'Table'; // サブテーブルのフィールドコード
    const action5Dropdown = ['あくなき探求', '不屈の心体', '理想への共感', '心を動かす', '知識を増やす', '公明正大'];
    const subtable = action5Dropdown.map((value) => {
      return {
        value: {
          'Action5': { type: 'DROP_DOWN', value: value },
          '状況': { type: 'DROP_DOWN', value: ['未振り返り'] },
          '課題': { type: 'SINGLE_LINE_TEXT', value: '' }
        }
      };
    });

    event.record[table].value = subtable;

    return event;
  });

})();
