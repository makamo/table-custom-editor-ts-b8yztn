import './CustomEditorDemo.scss';

import { DataType, Table, useTableInstance } from 'ka-table';
import React, { useState } from 'react';

import { EditingMode } from 'ka-table/enums';
import { ICellEditorProps } from 'ka-table/props';

const dataArray: any[] = [
  {
    id: 1,
    group: 'Autres',
    name: '110106 - Écrou de retenue large',
    min: 4,
    max: 8,
    newMin: null,
    newMax: null,
    qteOnHand: 80,
    qteReq: 6,
    qteTransit: 2,
  },
  {
    id: 2,
    group: 'Diamants',
    name: '110110 - Bague de retenu',
    min: 4,
    max: 8,
    newMin: null,
    newMax: null,
    qteOnHand: 50,
    qteReq: 6,
    qteTransit: 2,
  },
  {
    id: 3,
    group: 'Diamants',
    name: '110112 - Adapteur Fairfield',
    min: 6,
    max: 18,
    newMin: 5,
    newMax: null,
    qteOnHand: 5,
    qteReq: 11,
    qteTransit: 2,
  },
];

const CustomEditor = ({ column, rowKeyValue, value }: ICellEditorProps) => {
  const table = useTableInstance();
  const close = () => {
    table.closeEditor(rowKeyValue, column.key);
  };
  const [editorValue, setValue] = useState(value);
  return (
    <div className="custom-editor">
      <input
        className="form-control"
        type="text"
        value={editorValue}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <button
        className="custom-editor-button custom-editor-button-save"
        onClick={() => {
          table.updateCellValue(rowKeyValue, column.key, editorValue);
          close();
        }}
      >
        Save
      </button>
      <button
        className="custom-editor-button custom-editor-button-cancel"
        onClick={close}
      >
        Cancel
      </button>
    </div>
  );
};

const CustomLookupEditor = ({
  column,
  dispatch,
  rowKeyValue,
  value,
}: ICellEditorProps) => {
  const table = useTableInstance();
  const [editorValue, setValue] = useState(value);
  return (
    <div>
      <select
        className="form-control"
        autoFocus={true}
        defaultValue={editorValue}
        onBlur={() => {
          table.updateCellValue(rowKeyValue, column.key, editorValue);
          table.closeEditor(rowKeyValue, column.key);
        }}
        onChange={(event) => {
          setValue(event.currentTarget.value === 'true');
        }}
      >
        <option value={'true'}>True</option>
        <option value={'false'}>False</option>
      </select>
    </div>
  );
};

const CustomEditorDemo: React.FC = () => {
  return (
    <Table
      columns={[
        {
          dataType: DataType.String,
          key: 'group',
          title: 'Groupe',
          width: 100,
        },
        { dataType: DataType.String, key: 'name', title: 'Name', width: 390 },
        { key: 'min', title: 'Min', dataType: DataType.Number, width: 90 },
        {
          key: 'newMin',
          title: 'NewMin',
          dataType: DataType.Number,
          width: 90,
        },
        { key: 'max', title: 'Max', dataType: DataType.Number, width: 90 },
        {
          key: 'newMax',
          title: 'NewMax',
          dataType: DataType.Number,
          width: 90,
        },
        {
          key: 'qteOnHand',
          title: 'QteOnHand',
          dataType: DataType.Number,
          width: 90,
        },
        {
          key: 'qteReq',
          title: 'QteReq',
          dataType: DataType.Number,
          width: 90,
        },
        {
          key: 'qteTransit',
          title: 'QteTransit',
          dataType: DataType.Number,
          width: 90,
        },
        { key: 'qte', title: 'Qte', dataType: DataType.Number, width: 90 },

        /* {
          dataType: DataType.Date,
          key: 'nextTry',
          title: 'Next Try',
        },*/
      ]}
      format={({ column, value }) => {
        if (column.dataType === DataType.Date) {
          return (
            value &&
            value.toLocaleDateString('en', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
            })
          );
        }
      }}
      data={dataArray}
      editableCells={[{ columnKey: 'name', rowKeyValue: 1 }]}
      editingMode={EditingMode.Cell}
      groups={[{ columnKey: 'group' }]}
      groupPanel={{
        enabled: true,
        text: 'For grouping, drag a column here...',
      }}
      rowKeyField={'id'}
      childComponents={{
        table: {
          elementAttributes: () => ({
            className: 'custom-editor-demo-table',
          }),
        },
        groupCell: {
          content: (props) => {
            return props.groupKey[props.groupIndex];
          },
        },
        cellEditor: {
          content: (props) => {
            switch (props.column.key) {
              case 'group':
                return props;
              case 'passed':
                return <CustomLookupEditor {...props} />;
              case 'name':
                return <CustomEditor {...props} />;
            }
          },
        },
      }}
    />
  );
};

export default CustomEditorDemo;
