(() => {
    'use strict'; 
    kintone.events.on('app.record.create.show', (event) => {
      event.record['Table'].value = [
        { value: { 'Action5': { type: 'DROP_DOWN', value: 'あくなき探求' }, '状況': { type: 'DROP_DOWN', value: ['未振り返り'] }, '課題': { type: 'SINGLE_LINE_TEXT', value: '' } } },
        { value: { 'Action5': { type: 'DROP_DOWN', value: '不屈の心体' }, '状況': { type: 'DROP_DOWN', value: ['未振り返り'] }, '課題': { type: 'SINGLE_LINE_TEXT', value: '' } } },
        { value: { 'Action5': { type: 'DROP_DOWN', value: '理想への共感' }, '状況': { type: 'DROP_DOWN', value: ['未振り返り'] }, '課題': { type: 'SINGLE_LINE_TEXT', value: '' } } },
        { value: { 'Action5': { type: 'DROP_DOWN', value: '心を動かす' }, '状況': { type: 'DROP_DOWN', value: ['未振り返り'] }, '課題': { type: 'SINGLE_LINE_TEXT', value: '' } } },
        { value: { 'Action5': { type: 'DROP_DOWN', value: '知識を増やす' }, '状況': { type: 'DROP_DOWN', value: ['未振り返り'] }, '課題': { type: 'SINGLE_LINE_TEXT', value: '' } } },
        { value: { 'Action5': { type: 'DROP_DOWN', value: '公明正大' }, '状況': { type: 'DROP_DOWN', value: ['未振り返り'] }, '課題': { type: 'SINGLE_LINE_TEXT', value: '' } } }
      ];
      return event;
    });
  })();
  
  

